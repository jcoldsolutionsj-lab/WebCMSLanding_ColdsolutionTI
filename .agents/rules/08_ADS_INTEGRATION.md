# 08. ADS INTEGRATION

## Alcance de este documento
Se documenta únicamente **cómo debe quedar preparada la arquitectura** para recibir tráfico pago y medir conversiones. No se definen presupuestos, campañas ni creatividades (no forman parte del material fuente ni del alcance de este proyecto).

## 1. Preparación para Google Ads (PROPUESTO)
- La landing debe cumplir con las políticas de páginas de destino de Google Ads: información de contacto visible, propuesta de valor clara en el primer scroll, sin elementos engañosos.
- Velocidad de carga (doc. 10) es crítica porque afecta directamente el Quality Score de las campañas.
- Parámetros UTM y `gclid` deben poder coexistir en la misma URL sin romper la captura de UTM (doc. 07 §5).
- Conversion tracking vía importación desde GA4 (evitar doble tag de Google Ads + GA4 simultáneo para no inflar conversiones).

## 2. Preparación para Meta Ads (PROPUESTO)
- Meta Pixel + evento `Lead` como conversión principal (ver doc. 07 §4).
- La landing debe soportar el parámetro `fbclid` sin conflicto con la captura de UTM.
- Recomendado (PROPUESTO, no bloqueante para fase 1): preparar el backend para eventualmente enviar eventos server-side vía Conversions API, mejorando atribución bajo restricciones de cookies de terceros.

## 3. Landing pages de campaña vs. landing principal (PENDIENTE)
Los documentos no indican si se requieren landing pages específicas por campaña (ej. una por servicio) o si toda la inversión en ads apuntará a la landing principal con anclas (`#servicios`, `#contacto`). **PROPUESTO** para fase 1: apuntar todo el tráfico pago a la landing principal, usando `utm_content`/anclas para diferenciar creatividades. **PENDIENTE** confirmar con el cliente si planea campañas segmentadas por servicio que ameriten páginas dedicadas (esto sí sería responsabilidad del futuro CMS Django, doc. 12).

## 4. Checklist de arquitectura lista para Ads (PROPUESTO)
- [ ] GTM instalado y publicado.
- [ ] GA4 configurado con conversiones (doc. 07 §2).
- [ ] Meta Pixel instalado vía GTM.
- [ ] UTM/gclid/fbclid persistidos hasta el envío del formulario.
- [ ] Thank You state/página que dispara conversión.
- [ ] Formulario funcional y validado (backend real, no solo frontend) para que las conversiones sean reales y no solo `form_start`.
