# 06. CTA / CONVERSION STRATEGY

## 1. CTAs confirmados por el material del cliente (DEFINIDO)
| CTA | Fuente | Acción |
|---|---|---|
| **WhatsApp** | Infografía: "Escríbenos por WhatsApp 992 609 046"; PDF: número de Soporte TI/Comercial | Abre chat de WhatsApp con mensaje predefinido |
| **Solicitar diagnóstico** | PDF/infografía: "Diagnóstico sin compromiso" es paso 2 del proceso comercial | Abre formulario de contacto con foco en "cuéntanos tu problema" |
| **Contacto general** | Datos de contacto por área (Comercial/Tecnología/Soporte) | Formulario o llamada directa |

## 2. CTA propuestos sin confirmación explícita del cliente (PROPUESTO / PENDIENTE)
- **Formulario de cotización:** no aparece explícitamente en los materiales del cliente (brochure/infografía hablan de "diagnóstico", no de "cotización" como paso separado). **PROPUESTO** mantenerlo como variante opcional del mismo formulario de contacto (checkbox o selector "Quiero una cotización" / "Quiero un diagnóstico"), en lugar de crear un formulario adicional. **PENDIENTE** validar con el cliente si maneja cotizaciones formales separadas del diagnóstico.
- **Solicitud de demo:** no hay ninguna mención a "demo" en los materiales. **PROPUESTO no incluir este CTA** en esta fase.

## 3. Jerarquía de CTAs
1. **Primario:** WhatsApp (fricción mínima, canal ya validado por la marca).
2. **Secundario:** Formulario "Cuéntanos tu problema" / diagnóstico (para leads que prefieren no usar WhatsApp o requieren dejar más contexto escrito).
3. **Terciario:** Llamada directa a número Comercial (usuarios que prefieren voz).

## 4. Eventos de conversión medibles (DEFINIDO por convención estándar, aplicados al caso real)
```text
click_whatsapp          -> clic en cualquier botón/enlace de WhatsApp
click_cta_hero          -> clic en CTA principal del Hero
click_cta_final         -> clic en CTA de la sección de cierre
form_start              -> el usuario interactúa por primera vez con el formulario
form_submit             -> el usuario envía el formulario correctamente
form_error              -> el envío falla por validación
lead_created            -> el backend confirma la creación del lead (evento server-side)
scroll_75               -> el usuario llega al 75% de la página (señal de interés, opcional)
```
No se incluyen eventos de "cotización" o "demo" como eventos independientes hasta que el cliente confirme esos flujos (ver sección 2).

## 5. Formulario de contacto/diagnóstico — campos propuestos (PROPUESTO, ver doc. 09 para detalle técnico)
- Nombre
- Empresa
- Teléfono / WhatsApp
- Correo electrónico
- ¿Qué está pasando en tu negocio? (campo abierto, alineado al copy real: "Explícanos el problema con tus propias palabras")
- Selector opcional: Diagnóstico / Cotización (ver sección 2)

## 6. Thank You Page (PROPUESTO)
- Página o estado post-envío confirmando recepción, reforzando el mensaje "Analizamos tu caso y te contactamos" (coherente con el paso 2 del proceso real: "Diagnóstico sin compromiso").
- Debe disparar el evento `lead_created` y la conversión de Google Ads/Meta (ver doc. 07 y 08).

## 7. Estados de conversión (PROPUESTO, para preparar backend/CRM futuro — doc. 09)
```text
Nuevo → Contactado → En diagnóstico → Propuesta enviada → Ganado / Perdido
```
Esto no se implementa en la fase 1, pero el modelo de datos del lead debe dejar espacio para un campo de estado (ver doc. 14).
