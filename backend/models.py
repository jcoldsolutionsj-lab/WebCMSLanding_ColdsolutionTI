from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSONB
from database import Base

class Servicio(Base):
    __tablename__ = "servicios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(Text, nullable=True)
    orden = Column(Integer, default=0)
    activo = Column(Boolean, default=True)

    leads = relationship("Lead", back_populates="servicio")


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150), nullable=False)
    empresa = Column(String(150), nullable=True)
    telefono = Column(String(50), nullable=False)
    correo = Column(String(150), nullable=True)
    servicio_id = Column(Integer, ForeignKey("app.servicios.id"), nullable=False)
    problema = Column(Text, nullable=False)
    consentimiento = Column(Boolean, nullable=False)
    consentimiento_ip = Column(String(45), nullable=True)
    estado = Column(String(50), default="nuevo")  # nuevo, contactado, propuesta, ganado, perdido
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    servicio = relationship("Servicio", back_populates="leads")
    tracking = relationship("LeadTracking", back_populates="lead", uselist=False)
    notificaciones = relationship("NotificacionLog", back_populates="lead")


class LeadTracking(Base):
    __tablename__ = "leads_tracking"

    lead_id = Column(Integer, ForeignKey("app.leads.id"), primary_key=True)
    utm_source = Column(String(100), nullable=True)
    utm_medium = Column(String(100), nullable=True)
    utm_campaign = Column(String(100), nullable=True)
    utm_term = Column(String(100), nullable=True)
    utm_content = Column(String(100), nullable=True)
    gclid = Column(String(255), nullable=True)

    lead = relationship("Lead", back_populates="tracking")


class NotificacionLog(Base):
    __tablename__ = "notificaciones_log"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("app.leads.id"), nullable=False)
    canal = Column(String(50), nullable=False)  # ej: webhook_n8n
    payload_enviado = Column(JSONB, nullable=True)
    respuesta_http = Column(Integer, nullable=True)
    error_detalle = Column(Text, nullable=True)
    exito = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    lead = relationship("Lead", back_populates="notificaciones")
