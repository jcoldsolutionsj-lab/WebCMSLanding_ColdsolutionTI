# 11. SECURITY

## 1. Transporte y headers (PROPUESTO)
- HTTPS obligatorio en todo el sitio (incluye redirección forzada HTTP→HTTPS).
- Headers de seguridad recomendados: `Content-Security-Policy` (CSP), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (o `frame-ancestors 'none'` en CSP), `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security` (HSTS).
- CSP debe permitir explícitamente los dominios de GTM, GA4 y Meta Pixel (doc. 07), y bloquear el resto por defecto.

## 2. CORS (PROPUESTO)
- El endpoint de leads (doc. 09) debe restringir `Access-Control-Allow-Origin` únicamente al dominio oficial de la landing (**PENDIENTE:** dominio a confirmar, doc. 01 §6).

## 3. CSRF (PROPUESTO)
- Si el formulario se sirve desde el mismo dominio/backend que procesa el envío, usar tokens CSRF estándar. Si el frontend está desacoplado (llamando a una API en otro subdominio), usar un esquema basado en tokens de sesión/origen validado en servidor en lugar de depender solo de CORS.

## 4. Protección de formularios / anti-spam (DEFINIDO como requisito del brief)
- CAPTCHA (ej. reCAPTCHA v3 / hCaptcha) integrado en el formulario de contacto.
- Rate limiting por IP en el endpoint `POST /api/leads` (doc. 09) para mitigar abuso o ataques de fuerza bruta de envío.
- Sanitización de todos los campos de texto libre antes de persistir (protección contra inyección de scripts/HTML en el campo "descripción del problema").

## 5. Validación (referencia cruzada doc. 09)
- Validación duplicada: frontend (UX) + backend (seguridad real). Nunca confiar únicamente en la validación del cliente.

## 6. Gestión de secretos (DEFINIDO como regla no negociable del brief)
- Ninguna API key, token, credencial o secreto debe colocarse en el código del frontend ni en el bundle público de JavaScript.
- Todas las claves (CAPTCHA, futura integración con CRM/N8N, credenciales de base de datos) se gestionan vía **variables de entorno** en el backend, nunca hardcodeadas.
- El futuro backend Django (doc. 12) es responsable exclusivo de cualquier comunicación con servicios que requieran credenciales.

## 7. Exposición de datos (PROPUESTO)
- No exponer IDs incrementales de leads en URLs o respuestas públicas (usar identificadores no predecibles si en algún momento se requiere referenciar un lead desde el frontend, ej. en una Thank You Page personalizada).
- No exponer estructura interna de la base de datos ni mensajes de error detallados del backend hacia el frontend (mensajes de error genéricos al usuario, logs detallados solo en servidor).

## 8. Checklist de seguridad mínima para aceptación (referencia cruzada doc. 16)
- [ ] HTTPS + HSTS activo.
- [ ] CSP configurada y probada (no bloquea GTM/GA4/Meta Pixel).
- [ ] CAPTCHA activo en formulario.
- [ ] Rate limiting activo en endpoint de leads.
- [ ] Ninguna clave/secreto presente en el código fuente del frontend (auditoría manual antes de release).
