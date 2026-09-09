---
trigger: always_on
---

# 03. LANDING STRUCTURE

## Criterio de diseño de la estructura
La estructura se definió a partir del contenido real disponible (doc. 02), evitando incluir secciones para las cuales no existe contenido verídico (ej. FAQ y Blog no tienen contenido fuente, por lo que se dejan como **PENDIENTE / opcional post-lanzamiento**, no como secciones vacías o inventadas).

## Estructura propuesta (PROPUESTO)

| # | Sección | Contenido fuente | Objetivo |
|---|---|---|---|
| 01 | **Hero** | Propuesta de valor + CTA WhatsApp (doc. 02 §1, §9) | Enganchar y calificar en 3 segundos |
| 02 | **¿Esto te está pasando?** (Dolores) | 8 pain points (doc. 02 §2) | Que el visitante se identifique con el problema |
| 02bis | **Voz del cliente** (citas + respuesta) | doc. 02 §2bis | Reforzar identificación emocional con lenguaje textual del propio cliente, antes de pasar a "cómo trabajamos" |
| 03 | **Propuesta de valor / Cómo trabajamos** | "Empezamos por el problema, no por la herramienta" (doc. 02 §1) | Generar confianza en el enfoque consultivo |
| 04 | **Servicios** | 8 servicios (doc. 02 §3) | Mostrar capacidades técnicas |
| 05 | **Profundización (Automatización & Datos)** | doc. 02 §4, incluye ejemplo Antes/Después | Reforzar autoridad técnica con un caso concreto y persuasivo, no solo listado de capacidades |
| 06 | **Modelo de soluciones por alcance** | Esencial / Profesional / Integral (doc. 02 §5) | Bajar la barrera de entrada ("no es una inversión enorme") |
| 07 | **Nuestro proceso** | 5 pasos (doc. 02 §6) | Reducir incertidumbre sobre "qué pasa si contacto" |
| 08 | **Casos de éxito** | JHT, Gianis, proyectos confidenciales (doc. 02 §7) | Prueba social |
| 09 | **CTA final** | Mensajes de cierre (doc. 02 §8) | Última oportunidad de conversión antes del footer |
| 10 | **Contacto / Formulario** | Datos de contacto (doc. 02 §9) + formulario de diagnóstico | Captura de lead estructurada |
| 11 | **Footer** | Marca, contacto, enlaces legales (PENDIENTE contenido legal) | Cierre, SEO (enlaces internos), confianza |

## Secciones descartadas o condicionadas (con justificación)
- **FAQ:** no existe contenido de preguntas frecuentes en las fuentes. **PENDIENTE:** si el cliente provee FAQs reales, se agrega como sección 10 (antes de Contacto). No se debe inventar contenido.
- **Blog:** mencionado únicamente como capacidad futura del CMS Django (doc. 12). No aplica a la Landing Page de esta fase.
- **Testimonios con cita textual de cliente:** no existen citas reales. Se reemplaza por "Casos de éxito" (sección 08), que sí tiene contenido verídico.
- **Sección "Live / Evento":** el badge "LIVE EN VIVO" de la pieza gráfica corresponde a una promoción puntual (probablemente una transmisión en redes), no a un elemento evergreen de marca. **PROPUESTO** no incluirlo en la landing permanente; **PENDIENTE** confirmar con el cliente si desea una sección dinámica para promocionar eventos en vivo recurrentes.

## Jerarquía de conversión dentro de la página (PROPUESTO)
```text
Hero (CTA WhatsApp + CTA Diagnóstico)
   ↓
Calificación (dolores) → refuerza intención
   ↓
Confianza (propuesta + servicios + proceso + casos)
   ↓
CTA final + Formulario de contacto/diagnóstico
   ↓
Footer (SEO + contacto secundario)
```

## Reglas de CTA por sección (referencia cruzada a doc. 06)
- CTA de WhatsApp disponible de forma persistente (botón flotante) desde el Hero hasta el Footer.
- CTA de "Solicitar diagnóstico" presente en Hero, después de Servicios, y en CTA final.
- El formulario de contacto vive únicamente en la sección 10, para no fragmentar la atención del usuario.