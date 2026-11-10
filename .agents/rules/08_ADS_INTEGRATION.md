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



## 5. ESTADO REAL IMPLEMENTADO (actualizado 2026-10-25)
- **Diferencia con §1 y §4:** el plan decía "importar conversiones desde GA4 y evitar doble tag". Se implementó el método directo: **etiqueta de conversión de Google Ads en GTM** disparada por `lead_created`. Se evita el doble conteo **no importando** la misma conversión desde GA4.
- **Cuenta de Google Ads:** la etiqueta de Google es `AW-18501972554`. El resto de datos de la cuenta no se documentan aquí.
- **Conversión creada:** categoría "Enviar formulario de clientes potenciales", origen "Sitio web", configuración manual con código, recuento **Una**, valor "mismo valor para cada conversión". VERIFICADO con Tag Assistant: la etiqueta se activó 1 vez al enviar un formulario de prueba.
- **Checklist §4, estado hoy:** GTM instalado y publicado ✔ · GA4 con evento de lead ✔ (falta marcarlo como evento clave) · Meta Pixel ✘ PENDIENTE · UTM y `gclid` persistidos ✔ (`fbclid` PENDIENTE) · Estado de "gracias" que dispara la conversión ✔ (tras respuesta OK del backend) · Formulario con backend real ✔.
- **Saldo:** Google Ads muestra el aviso de saldo agotado. Las campañas no se publican hasta recargar.
- **Titular de facturación:** distinto al RUC que aparece en la web. No bloquea las campañas ni la medición; coordinar con el contador cómo se sustentan las facturas de publicidad.
- **§3 (landings por campaña):** sigue PENDIENTE. Hoy todo el tráfico va a la página principal.
