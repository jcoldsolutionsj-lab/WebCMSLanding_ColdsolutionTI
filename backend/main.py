import os
import sqlite3
from datetime import datetime
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

app = FastAPI(title="ColdSolutions TI - Leads API")

# Rate limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS (Configurado para permitir el frontend local por ahora, PENDIENTE doc. 11: restringir al dominio oficial)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Pydantic models for validation
class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    company: str = Field(..., min_length=2, max_length=150)
    phone: str = Field(..., min_length=7, max_length=20)
    email: EmailStr
    problem: str = Field(..., min_length=10, max_length=1000)
    captcha_token: str = Field(..., description="Token from reCAPTCHA/hCaptcha")
    # UTMs (opcionales)
    utm_source: str | None = None
    utm_medium: str | None = None
    utm_campaign: str | None = None

# DB Setup (SQLite para Fase 1)
DB_FILE = "leads.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            company TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL,
            problem TEXT NOT NULL,
            utm_source TEXT,
            utm_medium TEXT,
            utm_campaign TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

@app.on_event("startup")
def startup_event():
    init_db()

def verify_captcha(token: str) -> bool:
    # PENDIENTE: Integrar verificación real con Google reCAPTCHA / hCaptcha (doc. 11)
    # Por ahora, validación stub que acepta cualquier token no vacío
    if not token or token == "invalid":
        return False
    return True

@app.post("/api/leads", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_lead(request: Request, lead: LeadCreate):
    # 1. Validación de CAPTCHA
    if not verify_captcha(lead.captcha_token):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Validación de CAPTCHA fallida."
        )
    
    # 2. Sanitización básica / Persistencia
    # En FastAPI + Pydantic, la inyección SQL se previene usando parámetros en la query
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('''
            INSERT INTO leads (name, company, phone, email, problem, utm_source, utm_medium, utm_campaign)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            lead.name, lead.company, lead.phone, lead.email, lead.problem,
            lead.utm_source, lead.utm_medium, lead.utm_campaign
        ))
        conn.commit()
        conn.close()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error interno al procesar el lead."
        )

    # 3. Respuesta de éxito
    return {"message": "Lead registrado exitosamente", "status": "success"}
