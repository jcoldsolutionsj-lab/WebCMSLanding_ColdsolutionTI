---
trigger: model_decision
description: Flujo de leads, campos del formulario, validaciones, webhook de n8n, esquema de reintentos y notificaciones por Telegram, Gmail y Calendar.
---

# 09. LEAD FORM, NOTIFICATIONS & CRM

> Actualizado: 2026-10-03 (Fase 0). La integración con n8n y las notificaciones por Telegram, Gmail y Calendar **están dentro del alcance** y se implementan ahora.

## 1. Flujo de datos completo (DEFINIDO)
```text
Landing (Formulario React)
      ↓
API FastAPI (Valida, aplica rate limit, sanitiza)
      ↓
1. Guarda Lead en Postgres (estado = "nuevo")
      ↓
2. Envía POST al webhook de n8n (con payload estructurado y token de seguridad)
      ↓
3. Responde HTTP 201 al Frontend → Usuario ve mensaje de éxito.

--- Proceso asíncrono en n8n ---
n8n recibe el webhook:
  ├→ Telegram: mensaje al grupo de Jonathan y Jimy con detalles del lead.
  ├→ Gmail: correo de aviso a Jonathan y Jimy, enviado desde jcoldsolutionsj@gmail.com (incluye botón wa.me).
  └→ Calendar: crea evento para contactar al cliente, invitando a ambos.
```
**Regla de oro:** La API guarda en Postgres *antes* de avisar a n8n. Si n8n falla o está apagado, el lead ya está seguro en la base de datos y se puede procesar después. El frontend no se entera si n8n falla.

## 2. Campos del formulario (DEFINIDO 2026-10-03)
Enfoque en minimizar fricción:
| Campo | UI | Obligatorio | Notas |
|---|---|---|---|
| Nombre | input text | Sí | |
| Empresa/Negocio | input text | No | Público objetivo incluye independientes |
| Teléfono/WhatsApp | input tel | Sí | Canal principal de contacto |
| Correo | input email | No | Si se llena, validar formato (RFC 5322) |
| Servicio de interés | select | Sí | Los 8 de la regla 02 + "Aún no lo sé, necesito orientación" (PENDIENTE aprobación) |
| ¿Qué está pasando? | textarea | Sí | El problema de negocio |
| Consentimiento | checkbox | Sí | "Acepto las políticas de privacidad" |

**Campos ocultos:** `captcha_token` (obligatorio), `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `gclid` (opcionales).

## 3. Notificaciones y Horarios (PROPUESTO / PENDIENTE)
Para no perder leads de madrugada (hora Perú, `America/Lima`):

- **Recepción inmediata:** Telegram, Gmail y el insert en Postgres ocurren al instante, 24/7.
- **Calendar:**
  - Si el lead entra dentro del horario de atención: crear evento para `hora actual + 15 min`.
  - Si el lead entra fuera del horario: crear evento para `hora de apertura del día hábil siguiente`.
- **Mensaje al cliente (UI):**
  - Dentro de horario: "Te contactamos en los próximos 15 minutos".
  - Fuera de horario: "Recibimos tu solicitud. Te contactaremos a primera hora."
- **Recordatorio:** n8n revisa a primera hora los leads en estado "nuevo" y avisa por Telegram.

**PENDIENTES que debe confirmar el cliente:**
1. Horario de atención (días y horas).
2. ¿Se envía correo automático al cliente (si dejó correo)?

## 4. Endpoint de la API
`POST /api/leads`
- Recibe JSON con todos los campos (visibles y ocultos).
- Verifica token CAPTCHA contra el proveedor (reCAPTCHA/hCaptcha).
- Valida con Pydantic.
- Protegido con límite de IP (5/minuto).
- Dispara petición HTTP (ej. con `httpx` de forma background/asíncrona) al webhook de n8n.

## 5. Integración con n8n
- El webhook de n8n se protege con un `Authorization: Bearer <TOKEN>` configurado en Render y n8n.
- La API de Python loguea (o guarda en una tabla `notificaciones_log`) si la llamada a n8n fue exitosa o falló, para poder reintentar los envíos fallidos sin perder el lead.
