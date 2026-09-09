# 17. DEPLOYMENT & INFRASTRUCTURE (PostgreSQL + Docker + Render)

## 0. Alcance de este documento (DEFINIDO por instrucción del usuario)
Se agrega esta capa porque el proyecto migrará, una vez terminado en local, a **Render** como entorno de producción. Cubre: modelo de base de datos PostgreSQL orientado a evitar contención de concurrencia y ser escalable, contenedorización con Docker para desplegar como servicios en Render, y estructura del README de despliegue paso a paso. Sigue el mismo principio del resto del proyecto: **documento de especificación, no implementación final** — el código real lo construye el agente implementador siguiendo esto.

## 1. Base de datos: PostgreSQL (PROPUESTO)

### 1.1 Principios de diseño para evitar contención de concurrencia
- **Conexiones:** usar **connection pooling** (ej. `PgBouncer` o el pool nativo de Render para Postgres) en lugar de conexiones directas por request, para que picos de tráfico de campañas (doc. 08) no agoten conexiones.
- **Escrituras del lead (doc. 09):** el `INSERT` de un lead es una operación aislada y de bajo conflicto (no hay updates concurrentes sobre la misma fila desde el frontend), por lo que el riesgo de contención real es bajo; el cuidado principal es no bloquear la tabla de leads con transacciones largas ni locks innecesarios — cada envío de formulario debe resolverse en una transacción corta y atómica.
- **Índices:** crear índices en las columnas de consulta frecuente del futuro backoffice/CRM (`created_at`, `status`, `utm_source`), evitando exceso de índices que penalicen la escritura.
- **Aislamiento:** nivel de aislamiento por defecto de Postgres (`READ COMMITTED`) es suficiente para esta carga; no se requiere `SERIALIZABLE` dado que no hay operaciones críticas de negocio con condiciones de carrera (ej. inventario, pagos).

### 1.2 Escalabilidad (PROPUESTO)
- Diseñar el esquema (doc. 14) ya en 3FN básica desde el inicio, evitando columnas tipo "cajón de sastre" (JSON gigante) salvo para metadata realmente flexible (ej. payload crudo de UTM adicional si se necesitara).
- Migraciones versionadas desde el día uno con el sistema de migraciones de Django (`makemigrations`/`migrate`), nunca cambios manuales al esquema en producción.
- Separar la base de datos de contenido/CMS (doc. 12, futura) de la tabla de leads transaccional si el volumen de leads crece mucho más rápido que el contenido editorial — **PROPUESTO** mantenerlas en el mismo Postgres inicialmente (misma instancia, mismo esquema) y solo separar si el volumen lo justifica más adelante.
- Backups automáticos (los que provee Render por defecto en su plan de Postgres) — **PENDIENTE** confirmar plan/tier de Render a contratar según presupuesto del cliente.

### 1.3 Relación con el modelo de contenido (referencia cruzada doc. 14)
Las entidades de doc. 14 (`Lead`, y en fase 2 `Service`, `PainPoint`, `CaseStudy`, etc.) se traducen directamente a modelos de Django/tablas Postgres. En fase 1 solo `Lead` es una tabla real; el resto sigue viviendo en la capa de contenido local del frontend (doc. 13 §4) hasta la fase 2 del CMS (doc. 12 §5).

## 2. Contenedorización con Docker (PROPUESTO)

### 2.1 Servicios a contenedorizar
```text
- web (backend Django/API de leads, doc. 09)
- db (PostgreSQL) → en Render se usa como servicio administrado, no como contenedor propio
- frontend (si se sirve como contenedor separado; si es SSG estático puede desplegarse como Static Site de Render sin Docker)
```

### 2.2 Buenas prácticas de Dockerfile (PROPUESTO)
- Imagen base **slim** (ej. `python:3.x-slim`) para reducir tamaño y superficie de ataque.
- Build multi-stage: una etapa para instalar dependencias/compilar assets, otra final más liviana solo con lo necesario en runtime.
- Nunca copiar el `.venv` local ni credenciales/`.env` dentro de la imagen (doc. 11 §6); las dependencias se reinstalan dentro del contenedor a partir de `requirements.txt` generado desde el `.venv` local (ver doc. 13 §5, doc. 15 Fase C).
- Variables de entorno inyectadas en runtime por Render (Environment Variables de Render), nunca hardcodeadas en el Dockerfile.
- Exponer el puerto según lo que Render espera (`$PORT` dinámico que Render inyecta, no un puerto fijo hardcodeado).

### 2.3 docker-compose para desarrollo local (PROPUESTO)
Un `docker-compose.yml` de uso **solo local** (no se usa en Render, que orquesta los servicios a su manera) para levantar `web` + `db` (Postgres) de forma reproducible antes de migrar a producción, evitando el clásico "en mi máquina funciona".

## 3. Despliegue en Render (PROPUESTO)

### 3.1 Servicios en Render
- **Web Service** (Docker) → backend Django/API.
- **PostgreSQL** → base de datos administrada de Render (no contenedor propio).
- **Static Site** (si el frontend es SSG/estático, doc. 13) o un segundo **Web Service** si requiere SSR con servidor Node/similar.

### 3.2 Variables de entorno requeridas en Render (PROPUESTO, sin valores reales — solo nombres)
```text
DATABASE_URL
SECRET_KEY
DEBUG=False
ALLOWED_HOSTS
CAPTCHA_PUBLIC_KEY / CAPTCHA_SECRET_KEY   (doc. 11 §4)
GTM_ID / GA4_ID / META_PIXEL_ID          (doc. 07)
CORS_ALLOWED_ORIGINS                      (doc. 11 §2)
```
**PENDIENTE:** el cliente/equipo debe generar y cargar los valores reales directamente en el panel de Render, nunca en el repositorio.

### 3.3 Flujo de despliegue (PROPUESTO)
```text
Desarrollo local (.venv + docker-compose)
        ↓
Repositorio Git (rama main/producción)
        ↓
Render detecta push → build de imagen Docker
        ↓
Migraciones de base de datos (paso manual o automatizado en el deploy hook)
        ↓
Servicio en producción (dominio de Render o dominio propio conectado)
```

## 4. README de despliegue (PROPUESTO — estructura mínima que debe tener el README real)
El README que construya el implementador (archivo real `README.md` en la raíz del repo, fuera de esta carpeta `/docs`) debe seguir esta estructura concreta, sin relleno innecesario:

1. **Descripción breve** del proyecto (1-2 líneas).
2. **Requisitos previos:** Python (versión), Docker, Docker Compose, cuenta de Render.
3. **Configuración local:**
   - Activar el `.venv` existente.
   - Copiar `.env.example` → `.env` y completar variables.
   - `docker-compose up` para levantar `web` + `db` local.
   - Comando de migraciones (`python manage.py migrate`).
4. **Variables de entorno:** tabla con cada variable de la sección 3.2 y su propósito (sin valores reales).
5. **Despliegue en Render (paso a paso):**
   - Crear servicio Postgres en Render.
   - Crear Web Service apuntando al Dockerfile del repo.
   - Cargar variables de entorno en el panel de Render.
   - Ejecutar migraciones en producción (deploy hook o comando manual).
   - Verificar health check / URL pública.
6. **Comandos útiles** (correr tests, generar `requirements.txt` actualizado desde el `.venv`, etc.).
7. **Checklist post-deploy:** referencia directa a `16_ACCEPTANCE_CRITERIA.md`.

## 5. Requirements (PROPUESTO)
- `requirements.txt` generado y congelado desde el `.venv` local ya existente (`pip freeze > requirements.txt`), como única fuente de verdad de dependencias para el Dockerfile — evita discrepancias entre lo instalado localmente y lo que se construye en Render.
- Mantener un `requirements-dev.txt` opcional separado si se agregan herramientas de desarrollo (linters, testing) que no deben ir a la imagen de producción.
