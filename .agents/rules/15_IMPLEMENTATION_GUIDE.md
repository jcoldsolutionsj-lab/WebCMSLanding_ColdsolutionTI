---
trigger: model_decision
description: Guía de implementación por fases, con el estado actual del proyecto (qué está hecho y qué sigue).
---

# 15. IMPLEMENTATION GUIDE (Fases)

> Actualizado: 2026-10-03 (Fase 0 completada).

## Fases del Proyecto

### Fase 0: Diagnóstico y Contexto (COMPLETADA)
- Reglas limpias.
- Repositorio limpio (`.gitignore` corregido).
- `GEMINI.md` raíz creado.
- Toma de decisiones arquitectónicas (Render, Postgres, n8n).

### Fase 1: Base de Datos y Backend (EN ESPERA)
1. Conectar FastAPI a PostgreSQL usando **SQLAlchemy** y **Alembic**.
2. Crear la primera migración con las tablas `servicios`, `leads`, `leads_tracking` y `notificaciones_log`.
3. Cargar la tabla `servicios` con los 9 registros iniciales mediante un seeder (doc. 02).
4. Actualizar el endpoint `POST /api/leads` para guardar en las nuevas tablas.
5. Preparar la llamada asíncrona al webhook de n8n.
6. Guardar variables en un `.env`.

### Fase 2: n8n y Notificaciones (FUTURA)
1. Provisionar n8n con Docker.
2. Crear flujo de n8n: Webhook → Telegram → Gmail → Calendar (doc. 09).
3. Conectar el backend con n8n de forma segura usando un token.

### Fase 3: Ajustes de Interfaz y Formulario (FUTURA)
1. Modificar el formulario en React (`ContactSection.tsx`) para incluir el selector de servicios traído de la API.
2. Agregar campo de consentimiento y enlazar a las futuras páginas de legales.
3. Asegurar que los campos opcionales/obligatorios coincidan con la regla 09.
4. Corregir el teléfono "945 430 358" a "945 430 381" en toda la UI.

### Fase 4: Tracking y UTM (FUTURA)
1. Capturar y enviar `utm_*` y `gclid` al backend.
2. Eventos de dataLayer (`form_submit` seguro, `click_whatsapp`, etc.).

### Fase 5: Páginas Legales (FUTURA)
1. Crear `/terminos` y `/privacidad` como páginas estáticas.

### Fase 6: Despliegue en Render (FUTURA)
1. Crear Dockerfile para la API.
2. Desplegar Static Site (Next.js) y Web Service (FastAPI) en Render.
3. Correr migraciones en producción.

## Reglas no negociables
- No tocar producción sin autorización explícita.
- Trabajar por fases, una conversación y rama por fase.
- Todo lo PENDIENTE debe resolverse antes de subir a producción.
