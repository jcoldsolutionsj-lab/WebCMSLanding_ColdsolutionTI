# 🚀 Guía de Despliegue en Render (ColdSolutions TI)

Esta guía detalla los pasos exactos para poner en producción los 3 servicios del proyecto en [Render](https://render.com).

---

## 1. Base de Datos (PostgreSQL Administrado)
* Ya creada y configurada en Render: `colsolutionsti_03102026`.
* Las tablas del schema `app` (`leads`, `servicios`, `leads_tracking`, `notificaciones_log`) ya están activas y persistiendo datos.

---

## 2. Servicio 1: Backend (FastAPI)
1. En Render, crea un nuevo **Web Service**.
2. Conecta el repositorio de GitHub y selecciona la rama (`feat/render-deployment` o `main`).
3. **Configuración básica:**
   * **Name:** `api-coldsolutions` (o similar)
   * **Root Directory:** `backend`
   * **Runtime:** `Docker` (utilizará automáticamente `backend/Dockerfile`)
   * **Instance Type:** `Free`
4. **Variables de Entorno (Environment Variables):**
   * `DATABASE_URL`: `postgresql://db_jht_q05l_user:wKpJM7Ydjue3L0r37Cb2DCOKzpC597bI@dpg-d8pn72jtqb8s738bl1d0-a.virginia-postgres.render.com/colsolutionsti_03102026`
   * `TURNSTILE_SECRET_KEY`: `0x4AAAAAAFP7bSHlpXzhuS6w1tE0-ViZHEU`
   * `ALLOWED_ORIGINS`: `https://coldsolutionsti.com,https://www.coldsolutionsti.com`
   * `N8N_WEBHOOK_URL`: `https://[NOMBRE_DE_TU_N8N].onrender.com/webhook/leads` *(se completa tras crear n8n)*
   * `N8N_WEBHOOK_TOKEN`: `super_secret_token_123`
5. Haz clic en **Create Web Service**.

---

## 3. Servicio 2: Automatizaciones (n8n)
1. En Render, crea un nuevo **Web Service**.
2. Conecta el repositorio.
3. **Configuración básica:**
   * **Name:** `n8n-coldsolutions`
   * **Root Directory:** `n8n`
   * **Runtime:** `Docker` (utilizará `n8n/Dockerfile`)
   * **Instance Type:** `Free`
4. **Variables de Entorno:**
   * `N8N_PORT`: `10000`
   * `N8N_PROTOCOL`: `https`
   * `WEBHOOK_URL`: `https://n8n-coldsolutions.onrender.com/` *(reemplazar con tu subdominio de Render)*
   * `GENERIC_TIMEZONE`: `America/Lima`
5. Haz clic en **Create Web Service**.
6. Una vez desplegado, entra a la URL pública, importa tu flujo (`workflow-leads.json`) y actívalo en producción.

---

## 4. Servicio 3: Frontend (Next.js)
1. En Render, crea un nuevo **Web Service** (o Static Site / Vercel).
2. **Configuración básica:**
   * **Name:** `web-coldsolutions`
   * **Root Directory:** *(dejar vacío / raíz del proyecto)*
   * **Runtime:** `Node`
   * **Build Command:** `npm install && npm run build`
   * **Start Command:** `npm run start`
3. **Variables de Entorno:**
   * `NEXT_PUBLIC_API_URL`: `https://api-coldsolutions.onrender.com` *(la URL pública de tu backend en Render)*
   * `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: `0x4AAAAAAFP7bTMNbM6Aad8K`
   * `NEXT_PUBLIC_GTM_ID`: `GTM-XXXXXXX` *(o el ID real que provea Jimy)*
4. En la pestaña **Settings > Custom Domains**, agrega `coldsolutionsti.com` y `www.coldsolutionsti.com`.
5. En Cloudflare, apunta los registros CNAME o A hacia Render.
