# Web CMS Landing - ColdSolutions TI

Este repositorio contiene la Landing Page y el Backend de **ColdSolutions TI**.

## Arquitectura Actual
- **Frontend:** Next.js (SSG/Static Export).
- **Backend:** FastAPI (Python) conectado a base de datos PostgreSQL.
- **Base de Datos:** PostgreSQL alojada en Render (instancia compartida, schema `app`).
- **Automatización (Próximamente):** Webhooks hacia n8n para notificaciones en Telegram, Gmail y Google Calendar.

---

## 🚀 Cómo ejecutar el proyecto en tu PC (Modo Desarrollo)

### 1. Levantar el Backend (FastAPI)
El backend actualmente se conecta a la base de datos de producción/desarrollo en **Render**.
Asegúrate de tener el archivo `backend/.env` creado (puedes basarte en `backend/.env.example`).

1. Abre una terminal y entra a la carpeta del backend:
```powershell
cd backend
```
2. Activa el entorno virtual (solo la primera vez o si cerraste la terminal):
```powershell
.\.venv\Scripts\Activate.ps1
```
3. Inicia el servidor:
```powershell
uvicorn main:app --reload
```
*La API estará disponible en [http://localhost:8000/docs](http://localhost:8000/docs).*

*(Nota: Si deseas probar desde tu celular en la misma red WiFi, usa `uvicorn main:app --host 0.0.0.0 --port 8000 --reload`)*

### 2. Levantar el Frontend (Next.js)
El frontend consumirá los endpoints locales del backend (`http://localhost:8000/api/...`).

1. Abre una **nueva terminal** en la raíz del proyecto.
2. Inicia el servidor de React:
```powershell
npm run dev
```
*La web estará disponible en [http://localhost:3000](http://localhost:3000).*

*(Nota: Para ver la web desde tu celular en la misma red, usa `npx next dev -H 0.0.0.0 -p 3000`)*

---

## 🛠 Comandos útiles de Base de Datos (Alembic)
Si haces cambios en los modelos de base de datos (`backend/models.py`), debes crear una migración:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
# Generar la migración:
alembic revision --autogenerate -m "Descripción del cambio"
# Aplicar los cambios a Render:
alembic upgrade head
```

