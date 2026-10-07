from fastapi import FastAPI, Request, HTTPException, status, Depends, BackgroundTasks, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import os
import logging
from datetime import datetime, timedelta, timezone
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
cors_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://coldsolutionsti.com",
    "https://www.coldsolutionsti.com",
]
env_origins = os.getenv("ALLOWED_ORIGINS")
if env_origins:
    cors_origins.extend([o.strip() for o in env_origins.split(",") if o.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
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

class TrackingOut(BaseModel):
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    utm_term: Optional[str] = None
    utm_content: Optional[str] = None
    gclid: Optional[str] = None

    class Config:
        from_attributes = True

class LeadDetailOut(BaseModel):
    id: int
    nombre: str
    empresa: Optional[str] = None
    telefono: str
    correo: Optional[str] = None
    servicio_id: int
    servicio_nombre: Optional[str] = None
    problema: str
    consentimiento: bool
    consentimiento_ip: Optional[str] = None
    estado: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    tracking: Optional[TrackingOut] = None

    class Config:
        from_attributes = True

class MetricasResumenOut(BaseModel):
    total_leads: int
    leads_por_estado: dict
    leads_por_servicio: dict
    leads_por_fuente_utm: dict


# ---- Utilities ----

async def verify_captcha(token: str) -> bool:
    secret_key = os.getenv("TURNSTILE_SECRET_KEY")
    if not secret_key:
        logger.warning("TURNSTILE_SECRET_KEY no configurada. Saltando verificación (Modo Dev).")
        # En desarrollo sin llave, permitimos pasar si mandan un token dummy
        return bool(token)
        
    url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
    data = {
        "secret": secret_key,
        "response": token
    }
    try:
        import httpx
        async with httpx.AsyncClient() as client:
            response = await client.post(url, data=data)
            result = response.json()
            if not result.get("success", False):
                logger.error(f"Turnstile rechazado: {result.get('error-codes')}")
                return False
            return True
    except Exception as e:
        logger.error(f"Error HTTP verificando Turnstile: {e}")
        return False

import httpx
from database import SessionLocal

async def send_to_n8n_background(lead_id: int, payload: dict):
    n8n_url = os.getenv("N8N_WEBHOOK_URL", "http://localhost:5678/webhook/leads")
    n8n_token = os.getenv("N8N_WEBHOOK_TOKEN", "super_secret_token_123")
    
    headers = {"X-API-Key": n8n_token}
    db = SessionLocal()
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(n8n_url, json=payload, headers=headers, timeout=10.0)
            
            exito = response.status_code in (200, 201)
            
            if lead_id != 999:
                log = models.NotificacionLog(
                    lead_id=lead_id,
                    canal="webhook_n8n",
                    payload_enviado=payload,
                    respuesta_http=response.status_code,
                    error_detalle=response.text if not exito else None,
                    exito=exito
                )
                db.add(log)
                db.commit()
            logger.info(f"Envío a n8n para lead_id={lead_id}: {'EXITO' if exito else 'FALLO'}, response: {response.text}")
    except Exception as e:
        logger.error(f"Error conectando a n8n para lead_id={lead_id}: {e}")
        if lead_id != 999:
            log = models.NotificacionLog(
                lead_id=lead_id,
                canal="webhook_n8n",
                payload_enviado=payload,
                respuesta_http=None,
                error_detalle=str(e),
                exito=False
            )
            db.add(log)
            db.commit()
    finally:
        db.close()

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
    if not await verify_captcha(lead.captcha_token):
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

    # 3. Deduplicación de Leads (ventana de 5 minutos por correo/teléfono + IP)
    client_ip = request.client.host if request.client else "unknown"
    cinco_minutos_atras = datetime.now(timezone.utc) - timedelta(minutes=5)

    lead_reciente_query = db.query(models.Lead).filter(
        models.Lead.created_at >= cinco_minutos_atras,
        models.Lead.consentimiento_ip == client_ip
    )

    filtros_contacto = []
    if lead.correo:
        filtros_contacto.append(models.Lead.correo == lead.correo)
    if lead.telefono:
        filtros_contacto.append(models.Lead.telefono == lead.telefono)

    if filtros_contacto:
        from sqlalchemy import or_
        lead_reciente = lead_reciente_query.filter(or_(*filtros_contacto)).first()
        if lead_reciente:
            logger.warning(f"Lead duplicado detectado para teléfono={lead.telefono} o correo={lead.correo} desde IP={client_ip}")
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Ya hemos recibido tu solicitud hace un momento. Nos pondremos en contacto contigo a la brevedad."
            )

    # 4. Guardar Lead
    try:
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

@app.get("/api/leads", response_model=List[LeadDetailOut])
def get_leads(
    limit: int = Query(20, ge=1, le=100, description="Cantidad de registros a retornar"),
    offset: int = Query(0, ge=0, description="Desplazamiento para paginación"),
    estado: Optional[str] = Query(None, description="Filtrar por estado: nuevo, contactado, propuesta, ganado, perdido"),
    servicio_id: Optional[int] = Query(None, description="Filtrar por id de servicio"),
    db: Session = Depends(get_db)
):
    """
    Retorna la lista de leads registrados con soporte de paginación y filtros.
    Incluye datos del servicio relacionado y origen de tracking (UTMs).
    """
    query = (
        db.query(models.Lead)
        .options(
            joinedload(models.Lead.servicio),
            joinedload(models.Lead.tracking)
        )
    )

    if estado:
        query = query.filter(models.Lead.estado == estado)
    if servicio_id:
        query = query.filter(models.Lead.servicio_id == servicio_id)

    leads = query.order_by(models.Lead.created_at.desc()).offset(offset).limit(limit).all()

    # Mapeo estructurado para respuesta
    resultados = []
    for l in leads:
        resultados.append(
            LeadDetailOut(
                id=l.id,
                nombre=l.nombre,
                empresa=l.empresa,
                telefono=l.telefono,
                correo=l.correo,
                servicio_id=l.servicio_id,
                servicio_nombre=l.servicio.nombre if l.servicio else None,
                problema=l.problema,
                consentimiento=l.consentimiento,
                consentimiento_ip=l.consentimiento_ip,
                estado=l.estado,
                created_at=l.created_at.isoformat() if l.created_at else None,
                updated_at=l.updated_at.isoformat() if l.updated_at else None,
                tracking=TrackingOut.from_orm(l.tracking) if l.tracking else None
            )
        )
    return resultados

@app.get("/api/leads/metricas/resumen", response_model=MetricasResumenOut)
def get_leads_metricas(db: Session = Depends(get_db)):
    """
    Retorna métricas agregadas en tiempo real para dashboards y reportes de captación.
    - Total de leads
    - Conteo por estado
    - Conteo por servicio
    - Conteo por origen publicitario (UTM Source)
    """
    total = db.query(models.Lead).count()

    # Conteo por estado
    estados_raw = (
        db.query(models.Lead.estado, func.count(models.Lead.id))
        .group_by(models.Lead.estado)
        .all()
    )
    leads_por_estado = {estado: count for estado, count in estados_raw}

    # Conteo por servicio
    servicios_raw = (
        db.query(models.Servicio.nombre, func.count(models.Lead.id))
        .join(models.Lead, models.Lead.servicio_id == models.Servicio.id)
        .group_by(models.Servicio.nombre)
        .all()
    )
    leads_por_servicio = {nombre: count for nombre, count in servicios_raw}

    # Conteo por fuente publicitaria (UTM Source)
    utm_raw = (
        db.query(models.LeadTracking.utm_source, func.count(models.LeadTracking.lead_id))
        .group_by(models.LeadTracking.utm_source)
        .all()
    )
    leads_por_fuente = {source or "Directo / Orgánico": count for source, count in utm_raw}

    return MetricasResumenOut(
        total_leads=total,
        leads_por_estado=leads_por_estado,
        leads_por_servicio=leads_por_servicio,
        leads_por_fuente_utm=leads_por_fuente
    )

@app.get("/api/leads/{lead_id}", response_model=LeadDetailOut)
def get_lead_by_id(lead_id: int, db: Session = Depends(get_db)):
    """Retorna el detalle completo de un lead específico por su ID."""
    lead = (
        db.query(models.Lead)
        .options(
            joinedload(models.Lead.servicio),
            joinedload(models.Lead.tracking)
        )
        .filter(models.Lead.id == lead_id)
        .first()
    )
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Lead con ID {lead_id} no encontrado."
        )

    return LeadDetailOut(
        id=lead.id,
        nombre=lead.nombre,
        empresa=lead.empresa,
        telefono=lead.telefono,
        correo=lead.correo,
        servicio_id=lead.servicio_id,
        servicio_nombre=lead.servicio.nombre if lead.servicio else None,
        problema=lead.problema,
        consentimiento=lead.consentimiento,
        consentimiento_ip=lead.consentimiento_ip,
        estado=lead.estado,
        created_at=lead.created_at.isoformat() if lead.created_at else None,
        updated_at=lead.updated_at.isoformat() if lead.updated_at else None,
        tracking=TrackingOut.from_orm(lead.tracking) if lead.tracking else None
    )

