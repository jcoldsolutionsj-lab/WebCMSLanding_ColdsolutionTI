# 13. FRONTEND ARCHITECTURE

## 1. Principios rectores (DEFINIDO por el brief)
- Frontend y backend claramente separados desde el inicio (doc. 12 §6).
- Arquitectura basada en componentes, para permitir mantenibilidad y evolución hacia consumo de API real (doc. 12 §3).
- Cero secretos en el frontend (doc. 11 §6).
- Rendimiento y SEO como restricciones de diseño, no como optimización posterior (doc. 05, doc. 10).

## 2. Enfoque técnico recomendado (PROPUESTO — decisión de stack, PENDIENTE confirmación del equipo implementador)
Dado que el proyecto debe:
- Tener excelente SEO técnico (doc. 05) → se recomienda renderizado del lado del servidor o estático (SSR/SSG) en lugar de una SPA pura en cliente.
- Evolucionar hacia consumo de API Django (doc. 12) → se recomienda una arquitectura basada en componentes con capa de datos desacoplada (fetch/API layer aislada del resto de la UI).

**PROPUESTO:** stack tipo framework SSR/SSG basado en componentes (ej. Next.js u otro equivalente con soporte SSG/SSR y buenas prácticas de SEO out-of-the-box). **PENDIENTE:** confirmación final del stack por parte del equipo/agente implementador, ya que este documento define requisitos, no impone una tecnología cerrada.

## 3. Estructura de carpetas propuesta (PROPUESTO, conceptual)
```text
/src
  /components      → componentes de UI reutilizables (Hero, ServiceCard, ProcessStep, etc.)
  /sections         → composición de componentes en las secciones de doc. 03
  /content          → datos de contenido (doc. 02) en formato estructurado (JSON/TS), simulando la futura API (doc. 12)
  /lib
    /analytics      → helpers de dataLayer/eventos (doc. 06, doc. 07)
    /utm            → captura y persistencia de UTM (doc. 07 §5)
    /api            → cliente para el endpoint de leads (doc. 09)
  /styles           → tokens de diseño (colores, tipografía — doc. 04)
  /assets           → imágenes optimizadas (doc. 10)
```

## 4. Gestión de contenido en fase 1 (referencia cruzada doc. 12 §3)
Todo el copy de doc. 02 se centraliza en `/content`, con una forma de datos que anticipe los campos de la futura API (doc. 14), evitando que el copy quede disperso directamente en JSX/HTML de cada componente.

## 5. Configuración por entorno (PROPUESTO)
- Variables de entorno para: URL del endpoint de leads, IDs de GTM/GA4/Meta Pixel, clave pública de CAPTCHA (nunca la clave secreta — doc. 11 §6).
- Separación clara entre configuración de desarrollo, staging y producción.
- **Entorno Python (DEFINIDO):** el backend/API (doc. 09) se desarrolla y ejecuta dentro del `.venv` ya existente en el proyecto, con las dependencias ya instaladas. No crear un entorno virtual adicional; cualquier dependencia nueva se agrega sobre ese mismo `.venv`.

## 6. Requisitos no funcionales que el frontend debe cumplir (checklist, referencia cruzada docs. 05/10/11)
- [ ] SSR/SSG o equivalente que permita contenido indexable sin depender de JS para el HTML inicial.
- [ ] Sin bundle de JS bloqueante innecesario en el critical path (doc. 10 §5).
- [ ] Sin credenciales/secretos en el bundle cliente (doc. 11 §6).
- [ ] dataLayer y captura de UTM implementados antes de cualquier tag de terceros (doc. 07).
