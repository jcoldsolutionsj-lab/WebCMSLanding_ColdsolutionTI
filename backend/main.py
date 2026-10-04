from fastapi import FastAPI, Request, HTTPException, status, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from sqlalchemy.orm import Session
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import os
import logging
from dotenv import load_dotenv

import models
from database import engine, SessionLocal, Base

# Load env
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="ColdSolutions TI - Leads API")

# Rate limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://coldsolutionsti.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Dependencia para DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---- Schemas (Pydantic) ----

class ServicioOut(BaseModel):
    id: int
    nombre: str
    descripcion: Optional[str]
    orden: int

    class Config:
        from_attributes = True

class LeadCreate(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=150)
    empresa: Optional[str] = Field(None, max_length=150)
    telefono: str = Field(..., min_length=7, max_length=50)
    correo: Optional[EmailStr] = None
    servicio_id: int
    problema: str = Field(..., min_length=10)
    consentimiento: bool
    captcha_token: str = Field(..., description="Token from reCAPTCHA/hCaptcha")
    
    # UTMs (opcionales)
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_term: Optional[str] = None
    utm_content: Optional[str] = None
    gclid: Optional[str] = None

# ---- Utilities ----

def verify_captcha(token: str) -> bool:
    # PENDIENTE: Integrar verificación real con Google reCAPTCHA / hCaptcha
    # Por ahora, validación stub que acepta cualquier token no vacío
    if not token or token == "invalid":
        return False
    return True

def send_to_n8n_background(lead_id: int, payload: dict):
    # PENDIENTE: Fase 2 - Implementar llamada HTTP asíncrona real a n8n
    # Aquí irá un requests.post() o httpx.AsyncClient() para llamar al webhook
    # y luego guardar el resultado en models.NotificacionLog
    logger.info(f"Simulando envío a n8n para lead_id={lead_id}: {payload}")
    pass

# ---- Endpoints ----

@app.get("/api/servicios", response_model=List[ServicioOut])
def get_servicios(db: Session = Depends(get_db)):
    """Retorna la lista de servicios activos para el formulario."""
    servicios = db.query(models.Servicio).filter(models.Servicio.activo == True).order_by(models.Servicio.orden).all()
    return servicios

@app.post("/api/leads", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_lead(request: Request, lead: LeadCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    # 1. Validación de CAPTCHA
    if not verify_captcha(lead.captcha_token):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Validación de CAPTCHA fallida."
        )
    
    # 2. Validación de Consentimiento
    if not lead.consentimiento:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Debe aceptar las políticas de privacidad."
        )

    # 3. Guardar Lead
    try:
        # Extraer IP (muy básico, puede mejorar si hay proxies, ej. x-forwarded-for)
        client_ip = request.client.host if request.client else "unknown"

        db_lead = models.Lead(
            nombre=lead.nombre,
            empresa=lead.empresa,
            telefono=lead.telefono,
            correo=lead.correo,
            servicio_id=lead.servicio_id,
            problema=lead.problema,
            consentimiento=lead.consentimiento,
            consentimiento_ip=client_ip,
            estado="nuevo"
        )
        db.add(db_lead)
        db.flush() # Para obtener el ID del lead antes del commit

        # Guardar UTMs si al menos una existe
        if any([lead.utm_source, lead.utm_medium, lead.utm_campaign, lead.utm_term, lead.utm_content, lead.gclid]):
            db_tracking = models.LeadTracking(
                lead_id=db_lead.id,
                utm_source=lead.utm_source,
                utm_medium=lead.utm_medium,
                utm_campaign=lead.utm_campaign,
                utm_term=lead.utm_term,
                utm_content=lead.utm_content,
                gclid=lead.gclid
            )
            db.add(db_tracking)
            
        db.commit()
        db.refresh(db_lead)

        # 4. Programar tarea en background para n8n
        payload_n8n = {
            "id": db_lead.id,
            "nombre": db_lead.nombre,
            "empresa": db_lead.empresa,
            "telefono": db_lead.telefono,
            "correo": db_lead.correo,
            "servicio_id": db_lead.servicio_id,
            "problema": db_lead.problema
        }
        background_tasks.add_task(send_to_n8n_background, db_lead.id, payload_n8n)

        return {"message": "Lead registrado exitosamente", "status": "success", "lead_id": db_lead.id}

    except Exception as e:
        db.rollback()
        logger.error(f"Error guardando lead: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error interno al procesar el lead."
        )
