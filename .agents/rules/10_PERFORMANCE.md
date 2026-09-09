# 10. PERFORMANCE

## Contexto (por qué importa especialmente aquí)
La identidad visual de ColdSolutions TI usa imágenes pesadas por naturaleza (mockups de dashboards, fondos con efectos de partículas/circuitos, íconos). Sin optimización, esto puede degradar seriamente el LCP en móvil, canal prioritario según la propia marca ("necesitas trabajar desde el celular").

## 1. Core Web Vitals — objetivos (PROPUESTO)
| Métrica | Objetivo |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s en móvil (4G) |
| INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |

## 2. Imágenes (PROPUESTO)
- Formatos modernos: **WebP/AVIF** con fallback a JPEG/PNG donde sea necesario.
- El mockup de laptop/smartphone del Hero (elemento más pesado visualmente) debe optimizarse agresivamente o reconstruirse como composición ligera (SVG + imagen recortada) en lugar de una sola imagen grande.
- `lazy loading` nativo (`loading="lazy"`) para todo lo que no esté en el viewport inicial (servicios, casos de éxito, proceso).
- Definir `width`/`height` (o `aspect-ratio`) en todas las imágenes para evitar CLS.

## 3. Fuentes (PROPUESTO)
- Auto-hospedar las fuentes (evitar dependencia de terceros no listados en la red permitida) o usar `font-display: swap` si se usa un proveedor externo.
- Limitar a 2 familias tipográficas y los pesos estrictamente necesarios (doc. 04 §3).

## 4. Cache y CDN (PROPUESTO)
- Cache-Control agresivo para assets estáticos versionados (JS/CSS/imágenes con hash en el nombre de archivo).
- Servir la landing a través de CDN para reducir latencia, especialmente importante si el mercado objetivo es geográficamente amplio (PENDIENTE confirmar alcance geográfico, doc. 05 §1).

## 5. JavaScript mínimo (PROPUESTO)
- Priorizar HTML/CSS para la mayor parte de la interfaz; usar JavaScript solo donde sea imprescindible (formulario, tracking, botón flotante de WhatsApp, animaciones puntuales).
- Code splitting: cargar el bundle del formulario/validación solo cuando el usuario llega a esa sección o interactúa con un CTA, no en el bundle inicial.
- Minificación y compresión (Gzip/Brotli) en todos los assets servidos.

## 6. Performance móvil (PROPUESTO)
- Diseño mobile-first (doc. 04 §4): construir primero la experiencia móvil y expandir a desktop, no al revés.
- Testear regularmente con **Lighthouse** (móvil) como parte del checklist de aceptación (doc. 16).

## 7. Relación con SEO y Ads (referencia cruzada)
El cumplimiento de estas métricas es condición necesaria para los objetivos de doc. 05 (SEO) y doc. 08 (Quality Score en Ads).
