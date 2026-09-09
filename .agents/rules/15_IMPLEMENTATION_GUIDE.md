# 15. IMPLEMENTATION GUIDE (para Gemini 3.1 Pro / Antigravity)

## 1. Orden de lectura obligatorio
Ver `matriz de dependencias` al final de este documento y en la respuesta principal del arquitecto. No comenzar a codificar sin haber leído los documentos 01 a 14.

## 2. Fases de implementación sugeridas (PROPUESTO)

### Fase A — Fundaciones
1. Inicializar el proyecto frontend según doc. 13 (estructura de carpetas, stack).
2. Cargar el contenido real de doc. 02 en la capa `/content` (doc. 13 §4 / doc. 14), **sin inventar ni completar campos que están marcados PENDIENTE**.
3. Implementar los tokens de diseño de doc. 04 (colores, tipografía) como variables globales (CSS variables o equivalente del stack elegido).

### Fase B — Estructura y contenido visual
4. Construir las secciones en el orden y con el contenido de doc. 03, sección por sección.
5. Implementar el botón flotante de WhatsApp (doc. 06 §1) usando el número resuelto en doc. 01 §5 (**confirmar con el cliente antes de publicar**).
6. Implementar el formulario de contacto/diagnóstico según doc. 09 §2 (frontend) — validación básica en cliente.

### Fase C — Backend mínimo de leads
0. **Entorno ya existente (DEFINIDO):** el backend Python se ejecuta dentro del `.venv` ya creado por el equipo del proyecto, con todas las dependencias ya instaladas ahí. No crear un entorno virtual nuevo ni reinstalar paquetes ya presentes; activar el `.venv` existente antes de correr o agregar dependencias, y usar `pip freeze`/`requirements.txt` solo para registrar nuevas dependencias que se agreguen sobre ese entorno.
7. Implementar el endpoint `POST /api/leads` según doc. 09 §4, incluyendo validación server-side, CAPTCHA y rate limiting (doc. 11).
8. Conectar el formulario del frontend al endpoint, con manejo de estados de éxito/error (doc. 06 §4).

### Fase D — Tracking
9. Instalar GTM (doc. 07 §1) y configurar dataLayer para todos los eventos de doc. 06 §4.
10. Configurar GA4, conversiones, y Meta Pixel (doc. 07 §2–§4).
11. Implementar captura y persistencia de UTM (doc. 07 §5) antes de cualquier otro tag.

### Fase E — SEO técnico
12. Implementar metadata, Schema.org, sitemap y robots.txt (doc. 05).
13. Validar con Lighthouse y ajustar performance (doc. 10) hasta cumplir los objetivos de Core Web Vitals.

### Fase F — Seguridad y hardening
14. Aplicar headers de seguridad, CSP, HTTPS/HSTS (doc. 11).
15. Auditoría manual: confirmar que ningún secreto quede expuesto en el bundle del frontend.

### Fase G — Validación final
16. Revisar el checklist completo de doc. 16 antes de considerar el proyecto listo para producción.

### Fase H — Contenedorización y despliegue a Render
17. Generar `requirements.txt` desde el `.venv` local (doc. 17 §5).
18. Construir el Dockerfile y `docker-compose.yml` de desarrollo local según doc. 17 §2.
19. Provisionar PostgreSQL en Render y aplicar las buenas prácticas de escalabilidad/concurrencia de doc. 17 §1.
20. Crear el Web Service en Render, cargar variables de entorno (doc. 17 §3.2) y ejecutar migraciones en producción.
21. Redactar el `README.md` real del repositorio siguiendo la estructura de doc. 17 §4.

## 3. Reglas no negociables durante la implementación
- No inventar contenido (textos, servicios, cifras, testimonios) que no exista en docs. 01–02.
- No implementar CMS, CRM ni integraciones marcadas como "futuro" en docs. 09 y 12.
- Todo elemento marcado **PENDIENTE** debe quedar señalado (ej. comentario en el código o placeholder visible solo en entorno de desarrollo) para que el cliente lo confirme antes de producción — nunca debe llegar a producción un dato inventado para "rellenar" un pendiente.

## 4. Matriz de dependencias entre documentos
```text
01_PROJECT_CONTEXT
        ↓
02_BUSINESS_CONTENT
        ↓
03_LANDING_STRUCTURE
        ↓
04_UX_UI_GUIDELINES
        ↓
05_SEO_STRATEGY
        ↓
06_CTA_CONVERSION_STRATEGY
        ↓
07_ANALYTICS_TRACKING
        ↓
08_ADS_INTEGRATION
        ↓
09_LEAD_FORM_CRM
        ↓
10_PERFORMANCE
        ↓
11_SECURITY
        ↓
12_DJANGO_CMS_ARCHITECTURE
        ↓
13_FRONTEND_ARCHITECTURE
        ↓
14_CONTENT_MODEL
        ↓
15_IMPLEMENTATION_GUIDE  (este documento)
        ↓
16_ACCEPTANCE_CRITERIA
        ↓
17_DEPLOYMENT_INFRASTRUCTURE
```
Nota: 14_CONTENT_MODEL depende conceptualmente de 02, 06, 09 y 12 (consolida sus entidades), por lo que puede consultarse en paralelo a 12–13 según se necesite. 17_DEPLOYMENT_INFRASTRUCTURE se consulta al final, pero define requisitos (PostgreSQL, Docker) que condicionan decisiones tomadas desde doc. 09 y doc. 12 — conviene una lectura temprana si el implementador ya sabe que el destino final es Render.
