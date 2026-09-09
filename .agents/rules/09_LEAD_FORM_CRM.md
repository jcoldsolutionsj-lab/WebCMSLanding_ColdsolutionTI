# 09. LEAD FORM & CRM (preparación)

## 1. Flujo de datos en fase 1 (DEFINIDO por el brief)
```text
Landing (formulario)
        ↓
   Backend / API
        ↓
   Almacenamiento del Lead (BD)
        ↓
  (futuro) CRM / Email / WhatsApp / N8N / Notificaciones comerciales
```
Solo se implementan las dos primeras capas en esta fase. Las integraciones posteriores **solo se documentan**, no se construyen.

## 2. Campos del formulario (PROPUESTO, ver justificación en doc. 06 §5)
| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| Nombre | texto | Sí | |
| Empresa | texto | Sí | Al ser B2B, es dato calificador clave |
| Teléfono / WhatsApp | texto (validado) | Sí | Canal de contacto preferido de la marca |
| Correo electrónico | email (validado) | Sí | |
| Descripción del problema | textarea | Sí | Alineado a "cuéntanos qué está pasando en tu negocio" |
| Tipo de solicitud | selector (Diagnóstico / Cotización) | No | Ver doc. 06 §2, pendiente de confirmación |
| Campos ocultos UTM | hidden | No | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (doc. 07 §5) |

## 3. Validación (referencia cruzada doc. 11)
- Validación en frontend (UX inmediata) **y** validación duplicada en backend (seguridad — nunca confiar solo en el cliente).
- Protección anti-spam/CAPTCHA obligatoria antes de aceptar el envío (doc. 11 §4).
- Rate limiting por IP para evitar abuso del endpoint (doc. 11).

## 4. Backend / API mínimo viable (PROPUESTO)
- Endpoint único (ej. `POST /api/leads`) que recibe el payload del formulario.
- Responsabilidades del endpoint:
  1. Validar y sanitizar datos.
  2. Verificar CAPTCHA/anti-spam.
  3. Persistir el lead en base de datos.
  4. Responder al frontend con estado de éxito/error para disparar `form_submit`/`form_error`/`lead_created` (doc. 06 §4, doc. 07).
  5. (Preparado, no implementado en fase 1) Notificar por email al área Comercial.

## 5. Preparación para integraciones futuras (DEFINIDO como alcance documental únicamente)
- **CRM:** el modelo de datos del lead (doc. 14) debe incluir campos estándar (nombre, empresa, contacto, mensaje, origen UTM, fecha, estado) para facilitar una futura sincronización con cualquier CRM.
- **Notificaciones comerciales:** dejar previsto un punto de extensión en el backend (ej. función/hook post-guardado) donde en el futuro se conecte email, WhatsApp Business API o N8N, sin modificar el endpoint principal.
- **Automatizaciones (N8N u otras):** el endpoint debe poder exponer o emitir el evento de "nuevo lead" (ej. vía webhook saliente) como mecanismo de integración desacoplada a futuro.

## 6. Seguridad del formulario (referencia cruzada doc. 11)
Ningún dato sensible (tokens, claves de API de terceros) debe manejarse desde el frontend; toda comunicación con servicios externos (si los hubiera en el futuro) se hace desde el backend.
