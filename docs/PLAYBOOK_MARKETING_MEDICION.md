# Playbook: Marketing y medición para un proyecto web nuevo

Guía reutilizable, sacada de lo que hicimos y verificamos en ColdSolutions TI (oct-2026). Sirve para repetir el flujo en el próximo proyecto sin partir de cero.

> **Regla de oro:** nada se marca como hecho sin evidencia (captura, respuesta HTTP, Tag Assistant o GA4 en tiempo real). Los secretos nunca van en el chat ni en el repositorio: solo en variables de entorno.

Estados que se usan en este documento: **VERIFICADO** (hay evidencia), **NO VERIFICADO** (se hizo o se reportó, pero falta comprobarlo) y **PENDIENTE** (no existe aún).

---

## 1. Qué se mide y con qué herramienta

| Necesidad | Herramienta | Costo |
|---|---|---|
| Cargar etiquetas sin tocar código | Google Tag Manager (GTM) | Gratis |
| Medir conversiones de anuncios | Google Ads (etiqueta de conversión) | Gratis medir; la publicidad se paga |
| Medir tráfico y comportamiento | Google Analytics 4 (GA4) | Gratis |
| Aparecer en Google de forma orgánica | Search Console + Schema.org + sitemap | Gratis |
| Mantener despiertos los servicios free de Render | cron-job.org | Gratis |

**Decisión de diseño (importante):** la conversión que cuenta para Google Ads es la **etiqueta de Google Ads disparada por el evento `lead_created`**. Los eventos de GA4 son **informativos**. No se importan conversiones de GA4 a Google Ads mientras exista la etiqueta de Ads, porque **contaría el mismo lead dos veces**.

---

## 2. Orden de trabajo recomendado

### Fase 0. Preparación
- [ ] Una sola cuenta de Google para GTM, GA4, Search Console y Ads (evita permisos cruzados).
- [ ] Definir quién es el titular de facturación de Google Ads. El RUC del titular no tiene que coincidir con el de la web, pero hay que coordinarlo con el contador para sustentar el gasto.
- [ ] Datos de empresa a usar en Schema.org: nombre, RUC, teléfonos por tipo, ciudad. **No inventar** dirección, coordenadas ni rango de precios.

### Fase 1. Código del sitio
- [ ] Función `trackEvent(nombre, params)` que hace `dataLayer.push({ event, ... })`. El frontend no habla directo con ningún proveedor.
- [ ] Captura de `utm_*` y `gclid` al aterrizar, guardados en `sessionStorage` y enviados con el formulario.
- [ ] Snippet de GTM en `<head>` y `<noscript>` en `<body>`, con el ID en la variable `NEXT_PUBLIC_GTM_ID`.
- [ ] Metadata (title, description, Open Graph, `robots`) y JSON-LD con Organization + ProfessionalService + catálogo de servicios.
- [ ] `sitemap.xml` y `robots.txt` generados por la app.

**Eventos estándar que emite la web:**

| Evento del `dataLayer` | Cuándo se dispara | Rol |
|---|---|---|
| `lead_created` | Solo tras respuesta OK del backend | **Conversión principal** |
| `form_submit` | Al intentar enviar | Informativo |
| `form_error` | Error del formulario | Informativo |
| `click_whatsapp` | Clic en WhatsApp | Informativo |
| `click_call` | Clic en teléfono | Informativo |
| `scroll_75` | Pasa el 75 % de la página | Informativo |
| `click_cta_hero`, `click_cta_final` | Clic en CTAs | Informativo |
| `page_view_attributed` | Carga con UTM | Informativo |

`lead_created` debe dispararse **después** de la respuesta exitosa del backend y no al hacer clic, para no contar leads falsos. La deduplicación (ventana de 5 minutos por IP + contacto) y Turnstile protegen en el backend.

### Fase 2. Google Tag Manager
1. Entrar al contenedor **existente**. No crear cuentas nuevas desde "Añadir cuenta".
2. Crear y publicar las etiquetas base: **Etiqueta de Google** (`AW-...`) y **Vinculador de conversiones**, ambas con activador `Initialization - All Pages`.
3. Publicar cada cambio como versión con nombre claro (`v3 - Conversion Lead Formulario`).

### Fase 3. Conversión en Google Ads
1. Google Ads → Objetivos → Conversiones → Nueva acción → **Sitio web**.
2. Categoría **Enviar formulario de clientes potenciales** → **Manualmente con código**.
3. Configuración: valor **"mismo valor para cada conversión"**, recuento **"Una"**, acción principal.
4. Al terminar, abrir la pestaña **Utilizar Google Tag Manager** y copiar el **ID de conversión** y la **Etiqueta de conversión**. Estos dos datos son identificadores públicos, no secretos.
5. En GTM: activador **Evento personalizado** `lead_created` y etiqueta **Seguimiento de conversiones de Google Ads** con esos dos datos.
6. Publicar y hacer QA (sección 3).

### Fase 4. Google Analytics 4
1. Crear cuenta, propiedad y flujo web.
2. Cuando GA4 ofrezca **"Usar la etiqueta de Google detectada"**, **no aceptarla**: puede sobrescribir ajustes de la etiqueta de Ads. Cerrar con la X y copiar el **ID de medición** (`G-...`).
3. En GTM: etiqueta **Google Analytics** con el ID `G-...` y activador `Initialization - All Pages`.
4. Una etiqueta **Google Analytics: evento de GA4** por cada evento, con su activador de evento personalizado:

| Evento del `dataLayer` | Nombre del evento en GA4 |
|---|---|
| `lead_created` | `generate_lead` (nombre estándar de Google) |
| `click_whatsapp` | `click_whatsapp` |
| `click_call` | `click_call` |
| `scroll_75` | `scroll_75` |

5. En GA4, marcar `generate_lead` como **evento clave**.
6. Vincular GA4 con Google Ads y con Search Console.

### Fase 5. Search Console (SEO orgánico)
1. Verificar la propiedad del dominio.
2. Sitemaps → enviar `https://<dominio>/sitemap.xml`.
3. Inspección de URLs → URL principal → **Solicitar indexación** (tras cambios importantes de contenido o Schema).
4. El aviso "Página con redirección" para las variantes `http://` y `www` es **normal**: Google no indexa esas versiones porque redirigen al dominio oficial.

### Fase 6. Servicios gratuitos de Render que se duermen
Ver `docs/OPERACION_Y_MANTENIMIENTO.md`.

---

## 3. QA de extremo a extremo (con evidencia)

| Prueba | Cómo se hace | Evidencia esperada |
|---|---|---|
| El contenedor GTM carga | Tag Assistant → Conectar al dominio | Aparece `GTM-...` y las etiquetas base |
| La conversión de Ads dispara al enviar el formulario | Vista previa de GTM → enviar formulario de prueba | Evento `lead_created` → etiqueta de conversión **"Activado 1 vez"** |
| No hay duplicados | Enviar y revisar el conteo | 1 disparo por envío |
| GA4 recibe visitas | GA4 → Informes → En tiempo real | Usuarios activos ≥ 1 y `page_view` |
| GA4 recibe eventos | Tiempo real → "Número de eventos por nombre" | `scroll_75`, `click_whatsapp`, `click_call`, `generate_lead` |
| Search Console tiene el sitemap | Search Console → Sitemaps | Estado "Correcto" |
| Backend y n8n responden | Abrir `/api/servicios` y `/healthz` | HTTP 200 / `{"status":"ok"}` |

La vista previa de GTM funciona **antes de publicar**, así que sirve para probar sin riesgo. Después hay que **publicar** la versión para que corra en producción.

---

## 4. Errores que ya tuvimos (para no repetirlos)

- Regla de URL en Google Ads con la dirección duplicada (`coldsolutionsti.com/https://coldsolutionsti.com/`). Debe ser solo el dominio.
- Abrir "Añadir cuenta nueva" en GTM por error. Se vuelve con la flecha y se elige el contenedor existente.
- Elegir la etiqueta de configuración de GA4 cuando se quería una **de evento**.
- Dejar dos activadores en una etiqueta de evento (`Initialization - All Pages` más el evento): el evento se disparaba en cada carga. Debe quedar solo el de evento.
- Probar `cron-job.org` con el servicio dormido: la primera prueba devuelve **503** porque Render tarda unos 30 segundos en despertar. Se repite la prueba.
- Se afirmó que GA4 medía WhatsApp, llamadas y scroll sin tener las etiquetas de evento. **Verificar con evidencia antes de afirmar.**

---

## 5. Valores de ColdSolutions TI (identificadores públicos)

| Concepto | Valor |
|---|---|
| Contenedor GTM | `GTM-MN398M78` |
| Etiqueta de Google Ads | `AW-18501972554` |
| ID de conversión (Ads) | `18501972554` |
| Etiqueta de conversión (Ads) | `DEYqCKTZnKQdEMrktvZE` |
| ID de medición GA4 | `G-ZQYPDZDJ7P` |
| Dominio | `coldsolutionsti.com` |

---

## 6. Estado actual de ColdSolutions TI (25-oct-2026)

| Elemento | Estado | Evidencia |
|---|---|---|
| GTM publicado con etiquetas base de Ads | VERIFICADO | Tag Assistant |
| Conversión de Ads `lead_created` | VERIFICADO | "Activado 1 vez" en la prueba de envío |
| GTM v4 con GA4 (configuración) | VERIFICADO | Pantalla de versión 4 publicada |
| GA4 recibe visitas | VERIFICADO | Tiempo real: 1 usuario activo, `page_view` |
| `scroll_75` llega a GA4 | VERIFICADO | Aparece en tiempo real |
| Etiquetas de evento `generate_lead`, `click_whatsapp`, `click_call` y `scroll_75` **publicadas** | VERIFICADO | El contenedor público `gtm.js?id=GTM-MN398M78` (25-oct-2026) contiene `generate_lead`, `click_whatsapp`, `click_call`, `scroll_75`, `lead_created`, `G-ZQYPDZDJ7P`, `AW-18501972554` y la etiqueta de conversión de Ads |
| Disparo real de cada etiqueta de evento | VERIFICADO para `lead_created`/`generate_lead`, `click_whatsapp` (vista previa) y `scroll_75` (GA4 en tiempo real). `click_call`: NO VERIFICADO | Falta probar un clic en el teléfono y verlo en vista previa o en GA4 en tiempo real |
| `generate_lead` como evento clave en GA4 | PENDIENTE | |
| Vinculación GA4 ↔ Google Ads y GA4 ↔ Search Console | PENDIENTE | |
| Search Console: sitemap enviado e indexación solicitada | VERIFICADO | Mensajes de confirmación |
| Schema.org en producción | VERIFICADO en vivo (10-nov-2026) | Desplegado en `coldsolutionsti.com` (`Organization`, `ProfessionalService`, `WebSite`, `areaServed: Perú`, `taxID: 10482568811`) |
| Perfil de Empresa de Google | PENDIENTE | |
| Bing Webmaster Tools | PENDIENTE | |
| Medición de velocidad (PageSpeed / Lighthouse) | PENDIENTE | El hero usa video de fondo |
| Páginas por servicio y preguntas frecuentes (`faqItems` vacío) | PENDIENTE | |
| Imagen Open Graph 1200×630 propia | PENDIENTE | Hoy se usa el logo |
| Google Ads con saldo | PENDIENTE | Google Ads muestra aviso de saldo agotado |

---

## 7. Cuando se pueda invertir (para tenerlo presente)

Todo lo de esta lista es opcional y de pago o requiere decisión:
- Recargar saldo de Google Ads y definir presupuesto diario, ubicación (Lima/Perú) y palabras clave.
- Meta Ads (pixel y API de conversiones): documentado en `07_ANALYTICS_TRACKING.md`, sin implementar.
- Plan de pago de Render para quitar el modo de suspensión y no depender del pinger.
- Persona o herramienta para crear contenido (páginas por servicio, blog, casos de éxito con permiso del cliente).
- Registro como persona jurídica (RUC 20) cuando haya más de un socio facturando.
