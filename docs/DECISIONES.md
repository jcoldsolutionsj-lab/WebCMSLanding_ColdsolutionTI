# Bitácora de Decisiones Arquitectónicas (ADR)

Este documento registra por qué se tomaron decisiones importantes, para no tener que volver a discutirlas en el futuro.

## 2026-10-03 - Base de Datos Postgres compartida y Schemas
**Decisión:** Usar la instancia de Render `db_jht_q05l` (compartida con un cliente) en lugar de una exclusiva, creando ahí la base de datos `colsolutionsti_03102026`.
**Motivo:** Optimización de recursos y presupuesto.
**Riesgo:** Si la instancia cae, se afecta tanto ColdSolutions como el cliente JHT.
**Mitigación:** Separar todo en _schemas_ (`app` para Leads y `n8n` para n8n) para evitar cruces de tablas.

## 2026-10-03 - Alembic + SQLAlchemy
**Decisión:** Usar SQLAlchemy como ORM y Alembic para las migraciones en lugar de crear tablas directo en SQL.
**Motivo:** Estándar seguro en FastAPI; permite versionar la base de datos y tener el mismo entorno exacto en local y producción, cumpliendo la regla de que "todo cambio va en una migración".

## 2026-10-03 - Catálogo de Servicios
**Decisión:** Guardar los servicios en una tabla `servicios` en Postgres en vez de pasarlos como texto libre.
**Motivo:** Enfoque profesional que permite estadísticas precisas de ads (agrupar leads por servicio) y facilita agregar o quitar servicios futuros sin tener que redeployar el código.

## 2026-10-03 - Gestión de madrugada (Calendar)
**Decisión:** Posponer la cita en Google Calendar si el lead llega fuera del horario de oficina, pero notificar igual por Telegram.
**Motivo:** Asegurar que ningún lead se pierda, gestionando la expectativa del cliente ("Te contactamos a primera hora") sin alertar innecesariamente en la madrugada, pero dejando el aviso visible a los fundadores.


## 2026-10-20 - Conversión de Ads con etiqueta directa y no por importación de GA4
**Decisión:** Medir el lead con la etiqueta de conversión de Google Ads en GTM, disparada por el evento `lead_created`.
**Motivo:** Es el camino más directo y no depende de que GA4 esté listo ni de ventanas de importación.
**Riesgo:** Si además se importa `generate_lead` desde GA4 a Ads, el mismo lead se cuenta dos veces.
**Mitigación:** No importar esa conversión. `click_whatsapp`, `click_call` y `scroll_75` quedan solo como eventos de analítica.

## 2026-10-24 - GA4 sin vincular la etiqueta detectada automáticamente
**Decisión:** Al crear el flujo web de GA4 se rechazó la opción "Usar la etiqueta de Google detectada" y se configuró GA4 de forma independiente en GTM.
**Motivo:** Google avisaba que los ajustes de la etiqueta de Ads podían sobrescribirse. Mantener cada etiqueta separada en GTM evita pisar ajustes.

## 2026-10-24 - Mantener despiertos los servicios gratuitos con un pinger acotado en horario
**Decisión:** `cron-job.org` llama cada 10 minutos al API y a n8n, de lunes a sábado de 8:00 a 20:50 (hora de Lima).
**Motivo:** Render duerme los servicios gratuitos a los 15 minutos y n8n tarda entre 3 y 7 minutos en volver. El presupuesto es de 750 horas al mes compartidas, así que 24 horas al día no cabe (unas 1.488 h con 2 servicios).
**Riesgo:** Fuera de horario el aviso de n8n puede fallar aunque el lead se guarde. El colchón de horas es corto (~70 h).
**Mitigación:** Revisión semanal del consumo en Render. Mejora pendiente: reintento automático de avisos fallidos. Detalle en `docs/OPERACION_Y_MANTENIMIENTO.md`.

## 2026-10-25 - Schema.org sin datos que no podemos sustentar
**Decisión:** Se quitaron las coordenadas y el rango de precios del JSON-LD, y se usa `areaServed: Perú`.
**Motivo:** Las coordenadas eran del centro de Lima, sin una oficina real que las respalde. No se publican datos inventados (ver reglas de `AGENTS.md`).

## 2026-10-25 - RUC distinto entre la web y el titular de Google Ads
**Decisión:** Se mantiene el RUC del footer de la web y la facturación de Google Ads a nombre del socio. No es un bloqueo técnico.
**Motivo:** Google Ads no cruza el RUC de la web con el titular del pago. Podría pedirse verificación del anunciante más adelante.
**Pendiente:** Coordinar con el contador cómo sustentar las facturas de publicidad. A futuro, valorar una persona jurídica con un único RUC.
