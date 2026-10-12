# ❄️ ColdSolutions TI — Landing & Leads Platform

Plataforma oficial de captación y automatización de leads para **ColdSolutions TI** ([coldsolutionsti.com](https://coldsolutionsti.com)).

---

## 🏛️ Arquitectura del Sistema

El proyecto está diseñado bajo una arquitectura desacoplada, moderna y de costo optimizado ($0 en costos fijos de servidor):

| Componente | Tecnología | Entorno en Render | Costo |
|---|---|---|---|
| **Frontend** | Next.js (Static Site Export) | **Static Site** (servido desde CDN/archivos) | **$0 / Gratis** |
| **Backend API** | FastAPI + SQLAlchemy (Python 3.12) | **Web Service** (Docker) | **$0 / Free Tier** |
| **Automatización** | n8n (Webhooks → Telegram, Gmail, Calendar) | **Web Service** (Docker) | **$0 / Free Tier** |
| **Base de Datos** | PostgreSQL (Render Administrado) | **PostgreSQL** (schema `app` y `n8n`) | Existente |

---

## 💻 Desarrollo Local (Cómo correrlo en tu PC)

### 1. Requisitos previos
* Node.js v20+ y npm
* Python 3.11 o 3.12
* Git

### 2. Backend (FastAPI)
1. Abre una terminal en la carpeta `backend`:
   ```powershell
   cd backend
   ```
2. Activa el entorno virtual:
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```
3. Asegúrate de tener tu archivo `backend/.env` configurado (ver `backend/.env.example`).
4. Inicia el servidor de desarrollo:
   ```powershell
   uvicorn main:app --reload
   ```
   * *API y Documentación interactiva Swagger:* [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Frontend (Next.js)
1. Abre una segunda terminal en la raíz del proyecto:
   ```powershell
   npm install
   npm run dev
   ```
   * *Landing Page disponible en:* [http://localhost:3000](http://localhost:3000)

### 4. Scripts de Utilidad Local
* `backend/test_n8n.py`: Envía un lead de prueba sintético directamente a la API para verificar la conexión con n8n.
* `backend/update_n8n.py`: Actualiza parámetros y plantillas de nodos en la instancia de n8n.

---

## 🚀 Despliegue en Producción (Paso a Paso en Render)

### Paso 1: Backend FastAPI (Web Service)
1. En tu panel de Render, haz clic en **New + > Web Service**.
2. Conecta el repositorio y selecciona la rama `main` (o `release/produccion`).
3. **Configuración básica:**
   * **Name:** `api-coldsolutions`
   * **Root Directory:** `backend`
   * **Runtime:** `Docker` *(detecta automáticamente `backend/Dockerfile`)*
   * **Plan:** `Free`
4. **Variables de Entorno (Environment Variables):**
   * `DATABASE_URL`: *(Tu URL completa de PostgreSQL de Render)*
   * `ENVIRONMENT`: `production`
   * `TURNSTILE_SECRET_KEY`: *(Tu Secret Key de Cloudflare Turnstile)*
   * `ALLOWED_ORIGINS`: `https://coldsolutionsti.com,https://www.coldsolutionsti.com`
   * `N8N_WEBHOOK_URL`: `https://[TU-N8N].onrender.com/webhook/leads` *(se completa tras el Paso 2)*
   * `N8N_WEBHOOK_TOKEN`: `super_secret_token_123`
5. Clic en **Deploy Web Service**. Copia la URL generada (ej: `https://api-coldsolutions.onrender.com`).

---

### Paso 2: Automatizaciones n8n (Web Service)
1. En Render, clic en **New + > Web Service**.
2. **Configuración básica:**
   * **Name:** `n8n-coldsolutions`
   * **Root Directory:** `n8n`
   * **Runtime:** `Docker` *(detecta automáticamente `n8n/Dockerfile`)*
   * **Plan:** `Free`
3. **Variables de Entorno (Persistencia en PostgreSQL para no perder flujos):**
   * `N8N_PORT`: `10000`
   * `N8N_PROTOCOL`: `https`
   * `WEBHOOK_URL`: `https://n8n-coldsolutions.onrender.com/` *(con tu subdominio asignado)*
   * `GENERIC_TIMEZONE`: `America/Lima`
   * `DB_TYPE`: `postgresdb`
   * `DB_POSTGRESDB_DATABASE`: `colsolutionsti_03102026`
   * `DB_POSTGRESDB_HOST`: `dpg-d8pn72jtqb8s738bl1d0-a.virginia-postgres.render.com`
   * `DB_POSTGRESDB_PORT`: `5432`
   * `DB_POSTGRESDB_USER`: `db_jht_q05l_user`
   * `DB_POSTGRESDB_PASSWORD`: *(Tu password de Postgres)*
   * `DB_POSTGRESDB_SCHEMA`: `n8n`
4. Clic en **Deploy Web Service**.
5. Abre la URL pública de n8n, crea tu cuenta de administrador, importa `n8n/workflow-leads.json` y activa el webhook.
6. Copia la URL del webhook de producción y configúrala en el Backend (`N8N_WEBHOOK_URL`).

---

### Paso 3: Frontend Next.js (Static Site)
1. En Render, clic en **New + > Static Site** *(¡No Web Service! El Static Site es 100% gratuito y no se duerme)*.
2. **Configuración básica:**
   * **Name:** `web-coldsolutions`
   * **Root Directory:** *(dejar vacío, raíz del repositorio)*
   * **Build Command:** `npm install && npm run build`
   * **Publish Directory:** `out`
3. **Variables de Entorno (definir antes del primer build):**
   * `NEXT_PUBLIC_API_URL`: `https://api-coldsolutions.onrender.com` *(URL de tu backend en Render)*
   * `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: `0x4AAAAAAFP7bTMNbM6Aad8K`
   * `NEXT_PUBLIC_GTM_ID`: `GTM-XXXXXXX` *(o el ID proporcionado por el equipo de analítica)*
4. Clic en **Create Static Site**.

---

### Paso 4: Conectar Dominio en Cloudflare
1. En Render, ve al Static Site del frontend (`web-coldsolutions`) > **Settings > Custom Domains**.
2. Agrega `coldsolutionsti.com` y `www.coldsolutionsti.com`.
3. Render te indicará los registros DNS correspondientes:
   * **CNAME** o **A** apuntando a Render con Proxy activado o desactivado según la configuración recomendada por Render.
4. En tu panel de **Cloudflare DNS**, añade los registros y en pocos minutos tu sitio estará en producción con SSL automático.
