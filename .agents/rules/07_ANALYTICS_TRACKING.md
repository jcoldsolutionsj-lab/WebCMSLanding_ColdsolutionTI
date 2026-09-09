# 07. ANALYTICS & TRACKING

## 1. Capa central: Google Tag Manager (PROPUESTO)
GTM se implementa como capa central de gestión de etiquetas desde el día uno, para no requerir cambios de código cuando se agreguen o modifiquen tags (GA4, Meta Pixel, Google Ads).
- Contenedor único en el `<head>` (snippet estándar) + `<body>` (noscript).
- Todos los eventos de la sección 4 del doc. 06 se disparan vía `dataLayer.push()`, no directamente embebidos por proveedor, para mantener el frontend desacoplado de la capa de analítica.

## 2. Google Analytics 4 (PROPUESTO)
Eventos a configurar como conversiones en GA4 (mapeados 1:1 con doc. 06 §4):
- `click_whatsapp`
- `form_submit`
- `lead_created`
Eventos informativos (no conversión): `click_cta_hero`, `click_cta_final`, `form_start`, `form_error`, `scroll_75`.

## 3. Google Ads (PROPUESTO)
- Conversion tracking vinculado a GA4 (importación de conversiones GA4 → Google Ads) para evitar doble instrumentación.
- Conversiones primarias a importar: `form_submit`, `lead_created`.
- **PENDIENTE:** el cliente debe proveer el ID de cuenta de Google Ads cuando exista campaña activa (fuera del alcance documental actual, solo se deja la arquitectura lista).

## 4. Meta (Facebook/Instagram) Ads (PROPUESTO)
- **Meta Pixel** vía GTM, con eventos estándar mapeados:
  - `Contact` ↔ `click_whatsapp`
  - `Lead` ↔ `form_submit` / `lead_created`
- **Conversions API (CAPI):** documentado como preparación futura (server-side), no se implementa en fase 1. Requiere backend de formulario (doc. 09) para enviar el evento server-side en paralelo al pixel de navegador, mejorando la fiabilidad de atribución.

## 5. Estrategia UTM (PROPUESTO)
Parámetros estándar a soportar:
```text
utm_source     (ej. google, facebook, instagram, referido)
utm_medium     (ej. cpc, social, organic, referral)
utm_campaign   (nombre de campaña)
utm_content    (variante de anuncio/creativo)
utm_term       (palabra clave, en campañas de búsqueda)
```
### Persistencia durante el recorrido (PROPUESTO — requisito técnico para el implementador)
1. Al cargar la landing, capturar los parámetros UTM de la URL.
2. Guardarlos en `sessionStorage` (o cookie de primera parte con expiración corta, ej. 30 días) para sobrevivir a la navegación dentro de la misma sesión/single-page.
3. Al enviar el formulario, incluir los UTM guardados como campos ocultos del payload enviado al backend, para que el lead quede asociado a su origen de campaña.
4. Si no existen UTM en la URL (tráfico orgánico/directo), registrar `utm_source=direct` o `organic` según corresponda, para no dejar el campo vacío.

## 6. Consentimiento y privacidad (PROPUESTO, referencia cruzada doc. 11)
- Banner de consentimiento de cookies antes de cargar tags no esenciales (GA4, Meta Pixel), acorde a buenas prácticas de Consent Mode de Google.
- **PENDIENTE:** confirmar si aplica normativa local de protección de datos (ej. Ley de Protección de Datos Personales de Perú, si se confirma el mercado objetivo — ver doc. 05 §1).
