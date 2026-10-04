---
trigger: model_decision
description: Esquema de base de datos PostgreSQL (tablas de leads, servicios y logs). Leer para escribir modelos SQLAlchemy o consultar relaciones.
---

# 14. CONTENT MODEL & DATABASE SCHEMA

## Propósito
Definir la estructura de la base de datos PostgreSQL y los modelos transaccionales de la fase 1. Todo cambio se realiza mediante migraciones versionadas (Alembic).

## 1. Tablas de Frontend (Capa local)
El contenido visual (Hero, Casos de éxito, Proceso, Tiers) se mantiene como JSON/TS local en `/content` (ver doc. 13). No requiere tablas en Postgres en esta fase.

## 2. PainPoint (DEFINIDO, 8 registros reales — doc. 02 §2)
```text
PainPoint
- id: string
- title: string           → ej. "Demasiado Excel"
- description: string
- icon: string (referencia visual, doc. 04)
```

## 3. Service (DEFINIDO, 8 registros reales — doc. 02 §3)
```text
Service
- id: string
- name: string
- description: string
- icon: string
- detail: string (opcional)  → solo para Automatización&RPA y Datos&BI, que tienen contenido ampliado (doc. 02 §4)
```

## 4. SolutionTier (DEFINIDO, 3 registros — doc. 02 §5)
```text
SolutionTier
- id: string          → esencial | profesional | integral
- name: string
- description: string
```

## 5. ProcessStep (DEFINIDO, 5 registros — doc. 02 §6)
```text
ProcessStep
- order: int
- title: string
- description: string
```

## 6. CaseStudy (DEFINIDO, 2 registros reales + 1 nota de confidencialidad — doc. 02 §7)
```text
CaseStudy
- id: string
- client_name: string          → "JHT Transporte Logístico" | "Gianis Estética"
- summary: string
- highlights: array<string>    → ej. ["App móvil", "Plataforma web", "Logística y mantenimiento"]
- is_confidential_placeholder: boolean  → true solo para la tarjeta genérica de "proyectos confidenciales"
```

## 7. ContactChannel (DEFINIDO — doc. 02 §9, sujeto a resolución de contradicción doc. 01 §5)
```text
ContactChannel
- type: enum(whatsapp | comercial | tecnologia | soporte)
- label: string
- phone_number: string
```

## 8. FAQItem (PENDIENTE — sin contenido fuente aún)
```text
FAQItem
- question: string
- answer: string
```
Módulo definido en el modelo pero **sin registros** hasta que el cliente entregue contenido real (doc. 03).

## 2. Modelos de Base de Datos (PostgreSQL, Schema `app`)
Implementación con **SQLAlchemy** en el backend.

### Tabla: `servicios` (Catálogo)
```text
- id: int (PK)
- nombre: varchar(100)
- descripcion: text
- orden: int
- activo: boolean
```

### Tabla: `leads` (Principal)
```text
- id: int (PK)
- nombre: varchar(150)
- empresa: varchar(150) (nullable)
- telefono: varchar(50)
- correo: varchar(150) (nullable)
- servicio_id: int (FK -> servicios.id)
- problema: text
- consentimiento: boolean
- consentimiento_ip: varchar(45)
- estado: varchar(50)  (nuevo | contactado | propuesta | ganado | perdido)
- created_at: timestamp
- updated_at: timestamp
```

### Tabla: `leads_tracking` (Orígenes)
```text
- lead_id: int (PK, FK -> leads.id)
- utm_source: varchar(100)
- utm_medium: varchar(100)
- utm_campaign: varchar(100)
- utm_term: varchar(100)
- utm_content: varchar(100)
- gclid: varchar(255)
```

### Tabla: `notificaciones_log`
Para auditar llamadas al webhook de n8n.
```text
- id: int (PK)
- lead_id: int (FK -> leads.id)
- canal: varchar(50)  (ej. 'webhook_n8n')
- payload_enviado: jsonb
- respuesta_http: int
- error_detalle: text
- exito: boolean
- created_at: timestamp
```
