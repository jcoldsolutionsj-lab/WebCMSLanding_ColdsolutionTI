# OperaciÃ³n y mantenimiento (producciÃ³n)

Runbook para mantener en pie la captaciÃ³n de leads de ColdSolutions TI en el plan gratuito de Render. Ãšltima actualizaciÃ³n: 25-oct-2026.

---

## 1. Servicios en producciÃ³n

| Servicio | URL | Tipo en Render | Se duerme |
|---|---|---|---|
| Web | `https://coldsolutionsti.com` | Static Site | No |
| API (FastAPI) | `https://api-coldsolutions.onrender.com` | Web Service Docker (free) | SÃ­, a los 15 min sin trÃ¡fico |
| n8n | `https://n8n-coldsolutions.onrender.com` | Web Service Docker (free) | SÃ­, a los 15 min sin trÃ¡fico |
| Base de datos | Instancia PostgreSQL de Render compartida (ver `DECISIONES.md`) | Administrada | No aplica |

Flujo de un lead: `Formulario â†’ API (valida, guarda) â†’ Postgres â†’ webhook n8n â†’ Telegram + Gmail + Calendar`.

Despertar de un servicio dormido:
- API: unos 20 a 35 segundos.
- n8n: de 3 a 7 minutos (levanta el contenedor, conecta a Postgres y carga flujos). **Los datos no se pierden**, estÃ¡n en Postgres.

---

## 2. Mantener despiertos los servicios (anti-sleep)

Herramienta: **cron-job.org** (cuenta gratuita, zona horaria `America/Lima`).

| Cronjob | URL | ExpresiÃ³n crontab |
|---|---|---|
| Keep-alive Backend ColdSolutions | `https://api-coldsolutions.onrender.com/api/servicios` | `*/10 8-20 * * 1-6` (VERIFICADO con captura el 10-nov-2026, `200 OK`) |
| Keep-alive n8n ColdSolutions | `https://n8n-coldsolutions.onrender.com/healthz` | `*/10 8-20 * * 1-6` (VERIFICADO con captura el 10-nov-2026) |

La expresiÃ³n significa: cada 10 minutos, de las 8:00 a las 20:50, de lunes a sÃ¡bado. Domingos y noches quedan apagados a propÃ³sito.

Comprobaciones hechas (VERIFICADO): `/api/servicios` devolviÃ³ la lista de 9 servicios y `/healthz` devolviÃ³ `{"status":"ok"}`.

### Presupuesto de horas de Render
Render da **750 horas gratis al mes en total para el espacio de trabajo**, y las comparten todos los servicios web gratuitos. La web estÃ¡tica no cuenta.

CÃ¡lculo con el horario actual (ventana de 8:00 a 20:50 mÃ¡s unos 15 minutos hasta que Render duerme el servicio, es decir unas 13 horas al dÃ­a):

| Concepto | Horas |
|---|---|
| 2 servicios Ã— ~13 h Ã— 26 dÃ­as de trabajo | ~680 |
| ColchÃ³n sobre 750 | ~70 |

El colchÃ³n es corto. Revisar **Render â†’ Billing â†’ Usage** despuÃ©s de la primera semana. Si se acerca a 750, acortar la ventana a `8-19` y ganar 1 hora por dÃ­a y servicio. **Si se superan las 750 horas, Render suspende los servicios hasta fin de mes y se pierden los avisos.**

### QuÃ© esperar fuera de horario
- El lead **se guarda igual** en Postgres, porque la API despierta sola.
- El aviso de n8n puede fallar, ya que el webhook de la API tiene un timeout de 10 segundos y n8n tarda minutos en despertar. El fallo queda registrado en la tabla `notificaciones_log`.
- Pendiente de mejora: reintento automÃ¡tico de avisos fallidos y revisiÃ³n periÃ³dica de leads sin notificaciÃ³n.

---

## 3. RevisiÃ³n semanal (5 minutos)

- [ ] Render â†’ Billing â†’ Usage: horas consumidas.
- [ ] cron-job.org â†’ Cronjobs: ambos en verde, sin fallos repetidos.
- [ ] GA4 â†’ Tiempo real o Informes â†’ Eventos: llegan `page_view` y `generate_lead`.
- [ ] Search Console â†’ PÃ¡ginas y Rendimiento: sin errores nuevos.
- [ ] Revisar leads recientes y que cada uno tenga su aviso en `notificaciones_log`.
- [ ] Google Ads: saldo (hoy aparece aviso de saldo agotado).

---

## 4. Incidentes comunes

| SÃ­ntoma | Causa probable | QuÃ© hacer |
|---|---|---|
| `503 Service Unavailable` en una prueba | Servicio dormido o arrancando | Esperar 1 minuto y repetir |
| n8n tarda minutos en responder | Arranque en frÃ­o | Esperar. No refrescar de forma repetida |
| Lead guardado pero sin aviso | n8n dormido al llegar el lead | Revisar `notificaciones_log`, avisar al equipo manualmente y revisar el horario del cron |
| Cron en rojo de forma repetida | URL cambiada o servicio caÃ­do | Abrir la URL a mano y revisar logs en Render |
| ConversiÃ³n de Ads no dispara | Etiqueta o activador mal configurados, o versiÃ³n sin publicar | Vista previa de GTM, comprobar el evento `lead_created` |
| Formulario falla con CAPTCHA | Variable `TURNSTILE_SECRET_KEY` ausente o invÃ¡lida | Revisar variables en Render (en producciÃ³n rechaza por seguridad) |

---

## 5. Riesgos conocidos (pendientes de resolver)

1. **Secretos en el repositorio.** `render.yaml` contiene valores reales de `N8N_WEBHOOK_TOKEN` y `N8N_ENCRYPTION_KEY`. Esto contradice la regla "los secretos solo van en variables de entorno" (ver `AGENTS.md`). Antes de moverlos hay que tener en cuenta que **cambiar `N8N_ENCRYPTION_KEY` hace ilegibles las credenciales ya guardadas en n8n**: esa clave no se rota sin plan. El token del webhook sÃ­ se puede rotar actualizando a la vez la API y el flujo de n8n. Los valores **no se copian a este documento**.
2. **Token por defecto en cÃ³digo.** `backend/main.py` usa un valor de reserva para el token de n8n si la variable no existe. DeberÃ­a fallar en producciÃ³n en lugar de usar un valor por defecto.
3. **Base de datos compartida.** La instancia de Postgres se comparte con otro cliente (ver `DECISIONES.md`). Confirmar en Render su plan y si tiene fecha de vencimiento.
4. **Dependencia del pinger.** Si `cron-job.org` falla, los servicios vuelven a dormirse sin que nadie lo note. SoluciÃ³n definitiva: plan de pago de Render.
