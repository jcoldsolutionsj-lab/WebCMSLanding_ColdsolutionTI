# 01. PROJECT CONTEXT — ColdSolutions TI Landing Page

## Propósito de este documento
Establecer el contexto de negocio y de proyecto que debe guiar todas las decisiones técnicas posteriores. Este es el primer documento que debe leer el agente implementador (Gemini 3.1 Pro / Antigravity).

## 1. Identidad de la empresa (DEFINIDO)
- **Nombre comercial:** ColdSolutions TI
- **Tagline:** "Soluciones tecnológicas que impulsan tu negocio"
- **Categoría de negocio:** empresa de servicios tecnológicos B2B (software, automatización, datos, IA, web, apps, integración, consultoría).
- **Posicionamiento discursivo (extraído del brochure):** "No necesitas saber qué tecnología necesitas. Cuéntanos qué está pasando en tu negocio y te ayudamos a encontrar una solución." — enfoque **problema-primero**, no herramienta-primero.
- **Canales de contacto (DEFINIDO, ver contradicción en sección 5):**
  - Soporte TI: 992 609 046
  - Tecnología: 945 430 358
  - Comercial: 963 478 502
  - WhatsApp (destacado en pieza gráfica principal): 992 609 046

## 2. A quién se dirige (DEFINIDO + PROPUESTO)
- **DEFINIDO:** empresas que "saben que algo podría funcionar mejor, pero no saben qué tecnología necesitan"; negocios con procesos manuales, exceso de Excel, falta de visibilidad de datos, necesidad de movilidad, interés en IA sin saber por dónde empezar, o sin presencia digital.
- **PROPUESTO:** segmento objetivo = PYMEs y empresas medianas en fase de digitalización, con áreas operativas/logísticas/comerciales que generan datos dispersos. Los casos de éxito mostrados (transporte/logística, estética) sugieren un abanico amplio de industrias, no un nicho único.
- **PENDIENTE:** confirmar industrias prioritarias para ads/SEO (¿todas las PYME o sectores específicos como logística, salud/estética, retail?), ubicación geográfica objetivo (los números telefónicos sugieren Perú, pero no hay confirmación explícita en los documentos).

## 3. Problema que resuelve (DEFINIDO)
Actúa como puente entre "tengo un problema operativo" y "la solución tecnológica correcta", cubriendo un espectro desde automatizaciones puntuales hasta soluciones integrales, mediante un proceso consultivo: **Diagnóstico → Diseño → Implementación → Evolución**.

## 4. Objetivo del proyecto (DEFINIDO por el brief del usuario)
Construir, en esta primera fase, **una Landing Page de captación B2B** (no un CMS completo), con arquitectura preparada para evolucionar hacia un CMS en Django sin reconstruir el frontend. El sitio debe funcionar como sistema de adquisición: tráfico → landing → CTA → tracking → lead → CRM.

### Fuera de alcance en esta fase (DEFINIDO)
- CMS funcional con panel de administración.
- Integraciones reales con CRM, WhatsApp Business API, N8N o automatizaciones de notificación.
- Blog funcional (puede dejarse como sección "preparada" sin contenido real).
- Backend Django completo (solo se documenta la arquitectura futura).

## 5. Contradicciones detectadas entre documentos
| # | Contradicción | Fuente A | Fuente B | Resolución propuesta |
|---|---|---|---|---|
| 1 | Número de WhatsApp vs. número "Soporte TI" | Infografía: WhatsApp = 992 609 046 | PDF: 992 609 046 etiquetado como "Soporte TI" (no como WhatsApp) | PROPUESTO: usar 992 609 046 como CTA de WhatsApp principal (coincide con la pieza más reciente/orientada a conversión), y usar 963 478 502 (Comercial) como número alternativo para formularios de cotización si se requiere un segundo canal. **PENDIENTE confirmación del cliente.** |
| 2 | Nombre de marca "ColdSolutions" vs "ColdSolution" | Documento base: "ColdSolutions TI" | Logo en infografía/PDF: "COLDSOLUTION TI" (singular) | PROPUESTO: usar "ColdSolutions TI" en textos y metadata (coincide con el naming del proyecto y el documento base), pero **PENDIENTE verificar con el cliente cuál es la razón social/naming oficial**, ya que el logo gráfico usa singular. |

## 6. Información faltante para SEO/Ads/Branding (PENDIENTE)
- Dominio del sitio.
- Dirección física / cobertura geográfica exacta.
- Correo electrónico de contacto.
- Redes sociales (Instagram, LinkedIn, Facebook, TikTok, YouTube — la infografía menciona un "LIVE" que sugiere presencia en alguna red, pero no se especifica cuál).
- Paleta de colores en códigos hexadecimales exactos (solo existe referencia visual).
- Testimonios de clientes con texto real (no existen citas de clientes en los documentos, solo nombres de dos proyectos).
- Certificaciones o alianzas tecnológicas.
- Métricas o estadísticas de impacto (años de experiencia, número de clientes, etc. — no deben inventarse).

## 7. Oportunidades detectadas (PROPUESTO)
- El enfoque "problema-primero" es un diferenciador claro y debe ser el eje narrativo del Hero y la sección de propuesta de valor.
- Los 8 "dolores" de la infografía son contenido ya validado y listo para usarse como sección de calificación de leads ("¿esto te está pasando?").
- El proceso de 5 pasos (con variantes en PDF e infografía) puede unificarse en una sola narrativa visual para toda la landing.
- Los dos casos de éxito (JHT Transporte Logístico, Gianis Estética) son prueba social real y deben usarse aunque sea de forma breve, respetando que uno de los proyectos es "multiplataforma" (app + web) y el otro solo web.
