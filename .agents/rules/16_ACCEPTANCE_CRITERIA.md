# 16. ACCEPTANCE CRITERIA

## Contenido
- [ ] Todo el contenido publicado corresponde a información real de docs. 01–02 (sin servicios, clientes, certificaciones ni estadísticas inventadas).
- [ ] Todo elemento marcado PENDIENTE en docs. 01–14 fue confirmado por el cliente antes de ir a producción, o quedó explícitamente excluido del lanzamiento.
- [ ] El posicionamiento "problema-primero" (doc. 01 §3, doc. 02 §1) es el eje narrativo visible del Hero.
- [ ] Los 8 dolores (doc. 02 §2) y los 8 servicios (doc. 02 §3) están completos y sin alteraciones de sentido.

## Conversión
- [ ] Existe un camino claro y visible hacia el lead desde cualquier punto de scroll (WhatsApp flotante + CTA por sección, doc. 03 §"Reglas de CTA").
- [ ] Los CTA de doc. 06 están implementados y disparan los eventos definidos en doc. 06 §4.
- [ ] El formulario de contacto/diagnóstico funciona end-to-end (frontend → backend → almacenamiento del lead, doc. 09).
- [ ] WhatsApp y formulario están ambos disponibles como alternativas de contacto.

## SEO
- [ ] Metadata (title, description, OG, Twitter Card) implementada según doc. 05 §3, §6.
- [ ] Marcado Schema.org (`Organization` como mínimo) implementado, doc. 05 §5.
- [ ] Sitemap.xml y robots.txt publicados y accesibles, doc. 05 §7.
- [ ] Estructura semántica H1 único / H2 por sección / H3 por ítem verificada, doc. 05 §4.
- [ ] Sitio dado de alta en Google Search Console.

## Marketing
- [ ] La landing puede recibir tráfico de Google Ads y Meta Ads sin romper la captura de UTM/gclid/fbclid (doc. 08).
- [ ] Las conversiones de campaña son medibles de extremo a extremo (clic en ad → GTM → GA4/Meta → lead real en backend).

## Tecnología
- [ ] Frontend y backend están completamente separados (doc. 12 §6, doc. 13).
- [ ] El contenido está centralizado de forma que facilite la futura migración a la API de Django (doc. 12 §3, doc. 14).
- [ ] No existen modelos Django ni integraciones de CMS/CRM implementadas en esta fase (fuera de alcance, doc. 01 §4).

## Performance
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1 en pruebas móviles (doc. 10 §1).
- [ ] Imágenes en formato WebP/AVIF con lazy loading fuera del viewport inicial (doc. 10 §2).
- [ ] Lighthouse móvil ejecutado y documentado como parte de la entrega (doc. 10 §6).

## Seguridad
- [ ] HTTPS + HSTS activo; CSP configurada sin bloquear tags de tracking (doc. 11 §1).
- [ ] CAPTCHA y rate limiting activos en el endpoint de leads (doc. 11 §4).
- [ ] Auditoría confirma cero secretos/API keys expuestos en el frontend (doc. 11 §6, §8).
- [ ] Validación de formulario duplicada en frontend y backend (doc. 09 §3, doc. 11 §5).

## Infraestructura y despliegue
- [ ] `requirements.txt` generado desde el `.venv` local y sincronizado con el Dockerfile (doc. 17 §5).
- [ ] Imagen Docker construye y corre localmente vía `docker-compose` antes de subir a Render (doc. 17 §2.3).
- [ ] PostgreSQL en Render configurado con pooling de conexiones (doc. 17 §1.1).
- [ ] Variables de entorno cargadas en Render, ninguna en el repositorio (doc. 17 §3.2).
- [ ] Migraciones ejecutadas correctamente en producción tras el primer deploy (doc. 17 §3.3).
- [ ] README real del repositorio sigue la estructura de doc. 17 §4 y permite a alguien nuevo desplegar sin ayuda externa.
