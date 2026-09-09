# Web CMS Landing - ColdSolution TI

Este repositorio contiene la Landing Page principal y el CMS de **ColdSolution TI**.

## Estado del Proyecto (Avance Actual)

### ✅ Lo que ya está implementado (Frontend - Next.js)
- **Estructura Base:** Inicialización de Next.js 15 (Turbopack) con React 19 y arquitectura de carpetas (src/sections, src/components).
- **Sistema de Diseño (UI/UX):** 
  - CSS Modules para modularidad estricta (sin Tailwind).
  - Tema oscuro moderno con acentos "Electric Cyan" (Branding).
  - Efectos visuales avanzados: Glassmorphism, bordes gradientes, fondos con partículas/nodos (Hero), y cards tridimensionales (TiltCard).
  - Cursor de marca personalizado (CursorGlow.tsx) con físicas spring (anillo y punto brillante).
- **Secciones Completadas (Landing Page):**
  - **HeroSection:** Animaciones de entrada escalonadas, teclado dinámico.
  - **ValuePropositionSection:** Características con iconos iluminados, texto tipo máquina de escribir.
  - **PainPointsSection:** Identificación de dolores del cliente con modales emergentes y tarjetas magnéticas.
  - **DeepDiveSection:** Carrusel infinito para "Especialidades".
  - **ServicesSection:** Presentación de 8 servicios con diseño expandible/colapsable y sub-niveles.
  - **ProcessSection / SolutionTiers / CaseStudies:** Flujos interactivos.
  - **Footer:** Diseño a 4 columnas sin bordes, con Tooltip interactivo para el nuevo dominio y la historia de la empresa (15 años de experiencia).
- **Animaciones Globales:** 
  - Componente genérico ScrollReveal.tsx implementado.
  - Animaciones de scroll (once: false) configuradas en toda la página (subida y bajada).

### 🚧 Lo que falta (Pendiente)
- **Integración Backend:** Conectar el Frontend con el CMS y la API de Django/FastAPI (backend en desarrollo/planificación).
- **Formularios de Contacto:** Lógica funcional para capturar leads (correos, validaciones, conexión con base de datos o CRM).
- **Contenidos Finales:** Reemplazar textos placeholders o imágenes temporales (si los hay) por los assets de marketing definitivos (por ejemplo, el dominio real).
- **Optimización SEO Avanzada:** Sitemaps automáticos y meta tags dinámicas conectadas al CMS.
- **Despliegue (Deploy):** Configurar CI/CD para producción en Vercel, AWS u otro proveedor.

---
## Frontend (web - Next.js)
Servidor de desarrollo local:
```bash
npm run dev
```

Aperturar Frontend en Red Local (para ver desde celular/tablet en la misma red Wi-Fi):
```bash
npx next dev -H 0.0.0.0 -p 3000
```

---

## Backend (api - FastAPI / Python)
1. Entra a la carpeta del backend:
```bash
cd backend
```

2. Crea el entorno virtual (si no estaba creado):
```bash
python -m venv .venv
```

3. Activa el entorno virtual (Windows PowerShell):
```powershell
.\.venv\Scripts\Activate.ps1
```

4. Instala las dependencias:
```bash
pip install -r requirements.txt
```

5. Levanta la API localmente:
```bash
uvicorn main:app --reload
```

6. Aperturar API en Red Local (para conectar desde dispositivos mÃ³viles en la misma red):
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

