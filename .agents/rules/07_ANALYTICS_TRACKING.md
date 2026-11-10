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



## 7. ESTADO REAL IMPLEMENTADO (actualizado 2026-10-25)
Esta sección corrige lo que quedó distinto del plan de las secciones 1 a 6. Detalle operativo y pasos en `docs/PLAYBOOK_MARKETING_MEDICION.md`.

- **GTM (§1): IMPLEMENTADO y VERIFICADO.** Contenedor `GTM-MN398M78`, cargado desde `src/app/layout.tsx` con `NEXT_PUBLIC_GTM_ID`.
- **GA4 (§2): IMPLEMENTADO.** Propiedad "ColdSolutions TI", flujo web `ColdSolutions Web`, ID de medición `G-ZQYPDZDJ7P`. Las etiquetas de evento mapean así: `lead_created` → `generate_lead`; `click_whatsapp`, `click_call` y `scroll_75` con el mismo nombre.
- **Diferencia con §2:** el plan decía que `form_submit` y `click_whatsapp` serían conversiones. En la práctica, **la única conversión es `lead_created`**; `click_whatsapp`, `click_call` y `scroll_75` son **solo analíticos** y no se configuran como conversiones de Ads. `form_submit` es un intento de envío, no un lead.
- **Diferencia con §3 (Google Ads):** no se importan conversiones desde GA4. Se usa **la etiqueta de Google Ads (ID de conversión + etiqueta de conversión) disparada por el activador `lead_created`** en GTM. Para no contar dos veces el mismo lead, **no se debe importar `generate_lead` de GA4 a Google Ads como conversión** mientras exista esa etiqueta.
- **Consentimiento (§6):** **no hay banner de cookies**. Decisión vigente: no se implementa mientras el mercado sea solo Perú. Reevaluar si se hacen campañas en la Unión Europea o el Reino Unido.
- **Meta Pixel (§4): PENDIENTE.** No implementado.
- **Eventos adicionales que emite la web y no estaban en el doc 06:** `click_cta_hero`, `click_cta_final`, `form_error`, `page_view_attributed`.
