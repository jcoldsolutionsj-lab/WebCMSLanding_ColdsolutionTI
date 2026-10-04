---
trigger: model_decision
description: Contexto de negocio de ColdSolutions TI (identidad, teléfonos, público, objetivo y alcance actual). Leer antes de decidir contenido, alcance o datos de contacto.
---

# 01. PROJECT CONTEXT: ColdSolutions TI

> Actualizado: 2026-10-03 (Fase 0). Reemplaza la versión inicial, que dejaba n8n y las notificaciones fuera de alcance.

## 1. Identidad de la empresa (DEFINIDO)
- **Nombre oficial:** ColdSolutions TI (siempre en plural, en textos, metadatos y logos).
- **Tagline:** "Soluciones tecnológicas que impulsan tu negocio".
- **Categoría:** servicios tecnológicos (software, automatización, datos, IA, web, apps, integración, consultoría).
- **Posicionamiento:** "No necesitas saber qué tecnología necesitas. Cuéntanos qué está pasando en tu negocio y te ayudamos a encontrar una solución." Enfoque **problema-primero**.
- **Dominio:** `coldsolutionsti.com` (DNS en Cloudflare, conectado al Static Site de Render).
- **Mercado:** Perú, Lima (hora `America/Lima`). Expansión futura a Sudamérica.

## 2. Equipo y canales de contacto (DEFINIDO)
| Persona / canal | Dato |
|---|---|
| Jonathan Vera Segura (Tecnología) | 945 430 381 · jhonvs2014@gmail.com |
| Jimy Mallqui (Comercial) | 963 478 502 · jimymallqui@gmail.com |
| Soporte TI / WhatsApp principal de la web | 992 609 046 |
| Cuenta que envía las notificaciones | jcoldsolutionsj@gmail.com |
| Bot de Telegram | `@ColdSolutions_Leads_bot` (grupo con Jonathan y Jimy) |

> [!WARNING]
> El número 945 430 358 que aparece en la web como "Tecnología" es un **error**. El correcto es **945 430 381**. Se corrige en el código en la fase de interfaz.

## 3. A quién se dirige (DEFINIDO)
- Microempresas, pequeños negocios, **personas independientes sin empresa** y PYMEs en digitalización.
- Dolores típicos: procesos manuales, exceso de Excel, falta de visibilidad de datos, necesidad de movilidad, interés en IA sin saber por dónde empezar, sin presencia digital.
- Consecuencia de diseño: el formulario **no debe exigir datos de empresa** (ver doc. 09).

## 4. Objetivo del proyecto (DEFINIDO)
Una web de captación que funcione como sistema de adquisición completo:
```text
Tráfico (Ads / orgánico) → Landing → Formulario → API → Postgres → n8n → Telegram + Gmail + Calendar → Seguimiento
```

### Dentro del alcance (actual)
- Landing (ya construida) + páginas `/privacidad` y `/terminos`.
- API propia FastAPI que guarda en **Postgres** con un modelo relacional (doc. 14).
- Notificaciones vía **n8n**: Telegram, Gmail (con botón `wa.me`) y Google Calendar (doc. 09).
- Tracking para Ads: GTM, GA4, UTM y `gclid` (doc. 07, 08).
- Despliegue en Render + Cloudflare (doc. 17).

### Fuera de alcance (por ahora)
- WhatsApp Business API de pago y librerías no oficiales de WhatsApp (riesgo de bloqueo del número).
- CMS con panel de administración y blog.
- Django (descartado; la arquitectura antigua está archivada en `docs/archivo/`).

## 5. Contradicciones resueltas
| Tema | Resolución |
|---|---|
| "ColdSolution" vs "ColdSolutions" | **ColdSolutions TI** (confirmado por el cliente, 2026-10-03) |
| Teléfono de Tecnología | **945 430 381** (el 945 430 358 es un error) |
| WhatsApp principal | 992 609 046 (se mantiene; confirmar si cambia) |

## 6. Información aún faltante (PENDIENTE)
- Horario de atención (necesario para los mensajes fuera de horario, doc. 09).
- Dirección física, redes sociales, testimonios reales, métricas (no se inventan).
