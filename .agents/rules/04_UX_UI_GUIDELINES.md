# 04. UX/UI GUIDELINES

## Fuente de referencia visual
Imagen de referencia: pieza gráfica "infografía comercial ColdSolutions TI" (LiveStado.png). Se usa **como referencia de identidad**, no se copia literalmente (siguiendo instrucción explícita del brief).

## 0. Decisión de diseño confirmada (DEFINIDO)
Se optó por **Dark Mode / Dark UI** como modo único de la landing (no se implementa modo claro alternable). Esta decisión es consistente con la identidad visual ya observada en la referencia (sección 1) y queda fijada como requisito de diseño, no como sugerencia.

## 1. Percepción de marca a preservar (DEFINIDO por observación de la referencia)
- Estética **tecnológica, oscura, "premium tech"**: fondo azul marino/negro profundo con efectos de partículas/circuitos.
- Acentos en **azul cian/eléctrico** para elementos interactivos, íconos y datos destacados.
- Tipografía de titulares **bold, sans-serif, mayúsculas** para impacto.
- Uso de **mockups de dispositivos** (laptop + smartphone mostrando dashboards) para comunicar "producto tecnológico real".
- Iconografía en **círculos con contorno, estilo line-icon**, consistente en toda la pieza.
- Verde para el CTA de WhatsApp (color asociado a la app), contrastando intencionalmente con la paleta azul/cian del resto de la marca.

## 2. Paleta de color (PROPUESTO — sin hex oficiales del cliente, PENDIENTE validación)
| Uso | Propuesta |
|---|---|
| Fondo principal | Azul marino muy oscuro (~#0A1526 – #0D1B2A) |
| Fondo secundario / cards | Azul marino ligeramente más claro (~#101F35) |
| Acento primario | Cian/azul eléctrico (~#1EA7FF – #3DDCFF) |
| Acento CTA WhatsApp | Verde WhatsApp estándar (~#25D366) |
| Texto principal | Blanco / gris muy claro (~#F5F7FA) |
| Texto secundario | Gris azulado (~#9FB0C3) |

**PENDIENTE:** el cliente debe confirmar o proveer manual de marca con hex exactos, logo en formato vectorial (SVG) y variantes (claro/oscuro).

## 3. Tipografía (PROPUESTO)
- Titulares: sans-serif geométrica/técnica, peso bold–black (ej. Inter, Poppins o similar libre de licencias).
- Cuerpo de texto: sans-serif de alta legibilidad (ej. Inter, Roboto).
- Jerarquía: H1 grande e impactante en Hero; H2 consistente por sección; evitar más de 2 familias tipográficas.

## 4. Principios de UX (DEFINIDO por el brief + refuerzo de la referencia)
- Prioridad: **Claridad → Confianza → Valor → Conversión** (no sacrificar UX por efectos visuales).
- Mobile-first: la propia marca promueve "trabajar desde el celular", por lo que la landing debe ser ejemplo de excelencia móvil.
- CTA de WhatsApp siempre visible (botón flotante) — patrón ya validado por la marca en su pieza gráfica.
- Evitar fricción: el formulario principal debe ser corto (calificación mínima) y ofrecer WhatsApp como alternativa de baja fricción.
- Uso de números/íconos para procesos y pasos (ya validado visualmente en la infografía "Nuestro proceso es simple").

## 5. Tono de comunicación (DEFINIDO, extraído del copy real)
- Directo, empático con el dolor del cliente, no técnico en exceso ("No necesitas saber qué tecnología necesitas").
- Profesional pero cercano — evita jerga corporativa vacía; usa preguntas retóricas para conectar con el visitante.

## 6. Accesibilidad y contraste (PROPUESTO)
- Al usar fondo oscuro, garantizar contraste AA mínimo (4.5:1) entre texto y fondo.
- Botones de CTA con suficiente tamaño táctil (mínimo 44x44px) para uso móvil.
- No depender solo del color para transmitir estado (ej. formularios con error).

## 7. Elementos a NO replicar del material original (DEFINIDO por instrucción del brief)
- El badge "LIVE EN VIVO" (evento puntual, no elemento evergreen).
- Copiar el layout exacto de la infografía pixel por pixel.
- Cualquier logo de terceros usado como referencia de estilo.

## 8. Iconografía (DEFINIDO)
Se usa la librería **`lucide-react`** (íconos de línea, estilo minimalista) para todos los íconos de la interfaz (servicios, dolores, botón de WhatsApp, etc.), en reemplazo de emojis/placeholders de texto. Mantener un tamaño y grosor de trazo consistente en toda la página.

## 9. Animaciones de scroll (DEFINIDO)
Las tarjetas de las secciones (Servicios, Dolores, Casos de éxito, Proceso) deben aparecer/desaparecer al hacer scroll con una animación de entrada desde los laterales (efecto tipo "rompecabezas ensamblándose"), no con simples fundes estáticos. Implementar con una librería de animación basada en scroll (ej. `framer-motion`), asegurando que el efecto se degrade con elegancia en dispositivos móviles (sin afectar el rendimiento de doc. 10) y que el layout final, una vez ensamblado, sea completamente responsive en web y móvil.

