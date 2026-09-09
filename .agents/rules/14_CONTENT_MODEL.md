# 14. CONTENT MODEL

## Propósito
Definir la forma de los datos de contenido, tanto para la capa de contenido local de la fase 1 (doc. 13 §4) como para anticipar los modelos que eventualmente existirán en Django (doc. 12). **No se crean modelos Django reales en esta fase** — solo se define la forma conceptual de las entidades.

## 1. HeroContent (DEFINIDO, contenido real en doc. 02 §1)
```text
HeroContent
- title: string           → propuesta de valor principal
- subtitle: string        → texto de apoyo
- primary_cta_label: string
- primary_cta_type: enum(whatsapp | form)
```

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

## 9. Lead (PROPUESTO — entidad transaccional, no de contenido editorial, doc. 09)
```text
Lead
- name: string
- company: string
- phone: string
- email: string
- message: string
- request_type: enum(diagnostico | cotizacion)   → PENDIENTE de confirmación, doc. 06 §2
- utm_source, utm_medium, utm_campaign, utm_content, utm_term: string (nullable)
- status: enum(nuevo | contactado | en_diagnostico | propuesta_enviada | ganado | perdido)  → doc. 06 §7
- created_at: datetime
```

## 10. SEOMetadata (PROPUESTO, por sección/página futura — doc. 05)
```text
SEOMetadata
- page_or_section_id: string
- meta_title: string
- meta_description: string
- og_image: string
```
