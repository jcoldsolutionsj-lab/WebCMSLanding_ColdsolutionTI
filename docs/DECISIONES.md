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
