# 12. DJANGO CMS ARCHITECTURE (futuro — NO implementar en esta fase)

## 1. Objetivo de este documento
Dejar documentada la dirección arquitectónica hacia la que debe evolucionar el proyecto, para que las decisiones de la fase 1 (frontend, API de leads) no la bloqueen ni obliguen a una reconstrucción completa.

## 2. Arquitectura objetivo (DEFINIDO por el brief del usuario)
```text
Frontend Landing
        ↓
      API
        ↓
Django Backend
        ↓
   Django CMS
        ↓
 PostgreSQL
```

## 3. Principio de diseño para la fase 1 (PROPUESTO)
El frontend de la landing debe consumir su contenido de forma que sea fácil de "enchufar" a una API real en el futuro:
- Evitar hardcodear todo el copy directamente disperso en múltiples componentes sin estructura; centralizar el contenido (doc. 02) en una capa de datos local (ej. archivos de configuración/JSON) que imite la forma en que luego vendría de una API.
- Nombrar los campos de contenido igual que las entidades futuras de doc. 14 (ej. `hero.title`, `service.name`, `service.description`) para que el mapeo futuro a la API de Django sea directo.

## 4. Contenido administrable en el futuro CMS (DEFINIDO por el brief, aplicado al contenido real)
| Módulo | Contenido real disponible hoy (doc. 02) |
|---|---|
| Hero | Propuesta de valor, CTA |
| Servicios | 8 servicios con nombre + descripción |
| Dolores / Beneficios | 8 pain points |
| Proceso | 5 pasos |
| Casos de éxito | JHT, Gianis, nota de confidencialidad |
| CTA | Textos de cierre |
| Contacto | Teléfonos por área |
| FAQ | **Sin contenido aún — módulo preparado, vacío hasta que el cliente lo provea** |
| Blog | **Sin contenido — módulo preparado para fase futura** |
| SEO metadata | Título/descripción por sección o página futura |

## 5. Fases de evolución (PROPUESTO)
1. **Fase 1 (actual):** landing estática/SSR + API mínima de leads (doc. 09).
2. **Fase 2:** Django + PostgreSQL exponiendo API de contenido (Hero, Servicios, Casos, etc.) que el mismo frontend consume en lugar de datos locales.
3. **Fase 3:** Panel de administración (Django admin o CMS headless) para que el equipo de ColdSolutions TI edite contenido sin intervención de desarrollo.

## 6. Separación de responsabilidades (DEFINIDO como requisito de aceptación, doc. 16)
- El frontend nunca debe acceder directamente a la base de datos.
- Toda persistencia y lógica de negocio vive detrás de la API (Django en el futuro).
- El backend de leads de la fase 1 (doc. 09) debe diseñarse de forma que pueda ser absorbido por el backend Django sin cambiar el contrato de la API consumida por el frontend (mismos endpoints/payloads en la medida de lo posible).

## 7. Base de datos e infraestructura de despliegue (referencia cruzada)
El diseño de PostgreSQL (escalabilidad, control de concurrencia), la contenedorización con Docker y el despliegue en Render se documentan en detalle en `17_DEPLOYMENT_INFRASTRUCTURE.md`. Ese documento asume esta arquitectura Django/PostgreSQL como base.
