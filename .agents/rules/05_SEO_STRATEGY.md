# 05. SEO STRATEGY

## 1. Alcance geográfico (DEFINIDO)
Mercado objetivo confirmado: **Perú, Lima**, con expansión futura planeada dentro de **Sudamérica** (sin fecha ni países específicos aún). Esto fija `es_PE` como locale de metadata (doc. 05 §6) y `LocalBusiness`/`hreflang` para Perú en esta fase; la arquitectura de contenido (doc. 12, 14) no debe bloquear agregar otros países/locales más adelante.

## 2. Keywords candidatas (PROPUESTO, derivadas de servicios y dolores reales — doc. 02)
### Por servicio
- desarrollo de software a medida
- automatización de procesos RPA
- consultoría en Power BI / dashboards empresariales
- desarrollo de aplicaciones móviles para empresas
- inteligencia artificial aplicada a negocios
- desarrollo de landing pages y páginas web para empresas
- integración de sistemas y APIs
- consultoría tecnológica para empresas

### Por dolor/intención de búsqueda
- cómo automatizar procesos manuales en excel
- solución para no tener presencia digital
- sistema para controlar información dispersa
- empresa de tecnología para digitalizar mi negocio

**PENDIENTE:** validar volumen y competencia real con herramientas de keyword research (no incluido en el alcance documental).

## 3. Metadata (PROPUESTO — plantilla, contenido final a definir en implementación)
- **Meta title (Home):** `ColdSolutions TI | Soluciones tecnológicas para digitalizar tu negocio`
- **Meta description (Home):** `Automatización, software a medida, datos e IA para tu empresa. Cuéntanos tu problema y te ayudamos a encontrar la solución tecnológica adecuada.`
- Cada sección relevante (servicios) puede tener anclas (`id`) para permitir enlaces internos y, si se decide crear páginas de servicio individuales en el futuro CMS, metadata propia.

## 4. Estructura semántica (PROPUESTO)
- **H1 único** en Hero: propuesta de valor principal.
- **H2** por sección principal (Dolores, Servicios, Proceso, Casos de éxito, Contacto).
- **H3** para ítems dentro de secciones (cada dolor, cada servicio, cada paso del proceso).
- URLs amigables por ancla: `/#servicios`, `/#casos-de-exito`, `/#contacto`, etc. (single-page en fase 1; **PROPUESTO** evaluar páginas independientes por servicio en fase CMS).

## 5. Schema.org (PROPUESTO)
- `Organization` en el `<head>` con nombre, logo, contactPoint (teléfonos por tipo de consulta — doc. 02 §9).
- `LocalBusiness` **condicionado a PENDIENTE** de confirmación de dirección/ciudad.
- `Service` (uno por cada uno de los 8 servicios) si se implementan anclas o páginas propias.
- `BreadcrumbList` solo aplicable si se crean subpáginas (no aplica a landing single-page en fase 1).

## 6. Open Graph / Twitter Cards (PROPUESTO)
- `og:title`, `og:description`, `og:image` (imagen basada en la identidad visual del doc. 04, no la infografía original con el badge "LIVE"), `og:type=website`, `og:locale` (PENDIENTE según país confirmado).
- Twitter Card tipo `summary_large_image`.

## 7. Indexación técnica (PROPUESTO)
- `sitemap.xml` generado automáticamente (aunque sea single-page en fase 1, se prepara la estructura para futuras páginas del CMS).
- `robots.txt` permitiendo indexación completa del sitio público, bloqueando únicamente rutas internas/API si existieran.
- Canonical apuntando a la URL raíz (evitar duplicados por parámetros UTM — ver doc. 07).
- Alta y verificación en **Google Search Console** tras el deploy.

## 8. Core Web Vitals (referencia cruzada doc. 10)
La estrategia SEO depende directamente del cumplimiento de Core Web Vitals (LCP, INP, CLS), documentado en detalle en `10_PERFORMANCE.md`.

## 9. Internal linking (PROPUESTO)
- Menú de navegación ancla a cada sección (Servicios, Proceso, Casos, Contacto).
- Footer con enlaces repetidos a secciones clave + datos de contacto (refuerzo semántico y de usabilidad).
