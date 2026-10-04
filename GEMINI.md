# ColdSolutions TI: web de captación de contactos
Objetivo: captar contactos desde el formulario, guardarlos en Postgres y avisar al equipo con n8n.
Marca oficial: **ColdSolutions TI** (siempre en plural). Dominio: `coldsolutionsti.com`. Mercado: Perú (hora `America/Lima`).

## Stack (confirmado en Fase 0)
- **Frontend:** Next.js 16 (`output: 'export'`, sitio estático) + React 19 + TypeScript + Tailwind v4 + CSS Modules + Framer Motion. Carpeta `src/`.
- **API:** FastAPI (Python 3.12) en `backend/`. Validación con Pydantic, límite por IP con SlowAPI.
- **Base de datos:** PostgreSQL en Render (instancia compartida), base `colsolutionsti_03102026`.
- **Automatización:** n8n (Docker) → Telegram + Gmail + Google Calendar.
- **Hosting:** Render (Static Site para la web; Web Services Docker para la API y n8n). DNS, SSL y multimedia (R2) en Cloudflare.

## Arquitectura
`Formulario web → API FastAPI (valida y guarda) → Postgres → webhook n8n (con token) → Telegram + Gmail + Calendar`
La API guarda primero y avisa después: si n8n falla, el lead no se pierde y el aviso se reintenta.

## Reglas de trabajo
- Responde en español. Antes de cambiar código, resume tu plan en pocas líneas.
- No asumas tecnologías: si algo no está en el repositorio, pregunta.
- Nunca pongas secretos en el código ni en documentos: usa variables de entorno y un `.env.example`.
- Todo cambio de base de datos va en una migración versionada.
- Trabaja una fase a la vez y no avances sin mi aprobación.
- Al terminar, lista los archivos modificados y cómo probarlo.
- No ejecutes comandos destructivos ni toques producción sin confirmar.
- No inventes contenido (servicios, cifras, testimonios). Lo marcado **PENDIENTE** se pregunta, no se rellena.

## Dónde está cada cosa (leer según el tema)
| Tema | Archivo |
|---|---|
| Estado de las fases y qué sigue | `.agents/rules/15_IMPLEMENTATION_GUIDE.md` |
| Decisiones tomadas (con fecha y motivo) | `docs/DECISIONES.md` |
| Negocio, servicios, teléfonos | `.agents/rules/01_PROJECT_CONTEXT.md`, `02_BUSINESS_CONTENT.md` |
| Formulario, leads y notificaciones (n8n) | `.agents/rules/09_LEAD_FORM_CRM.md` |
| Modelo de datos y migraciones | `.agents/rules/14_CONTENT_MODEL.md` |
| Seguridad | `.agents/rules/11_SECURITY.md` |
| Tracking (GTM, GA4, UTM, gclid) | `.agents/rules/07_ANALYTICS_TRACKING.md` |
| Render, Docker, Cloudflare | `.agents/rules/17_DEPLOYMENT_INFRASTRUCTURE.md` |
| Criterios de aceptación | `.agents/rules/16_ACCEPTANCE_CRITERIA.md` |
| Auditoría de cada fase | workflow `/verificar` (`.agents/workflows/verificar.md`) |