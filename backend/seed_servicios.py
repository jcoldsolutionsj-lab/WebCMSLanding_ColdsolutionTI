from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models

def seed_servicios():
    servicios_data = [
        {"id": 1, "nombre": "Software & Sistemas", "descripcion": "Sistemas empresariales, software a medida, módulos y plataformas. Resolver procesos y centralizar operación.", "orden": 1},
        {"id": 2, "nombre": "Web", "descripcion": "Páginas corporativas, landing pages, CMS, portales y e-commerce. Dar presencia, captación y canales digitales.", "orden": 2},
        {"id": 3, "nombre": "Aplicaciones móviles", "descripcion": "Apps Android y soluciones para equipos de campo. Capturar y consultar información desde cualquier lugar.", "orden": 3},
        {"id": 4, "nombre": "Automatización & RPA", "descripcion": "Python, bots, tareas asistidas/desatendidas, procesos 24/7. Eliminar tareas repetitivas y reducir errores.", "orden": 4},
        {"id": 5, "nombre": "IA aplicada", "descripcion": "Asistentes, agentes, consultas, clasificación y automatización con IA. Aplicar IA donde exista un beneficio práctico.", "orden": 5},
        {"id": 6, "nombre": "Datos & BI", "descripcion": "ETL, SQL, Power BI, dashboards, KPIs y reportes. Convertir datos dispersos en información útil.", "orden": 6},
        {"id": 7, "nombre": "Integración tecnológica", "descripcion": "APIs, bases de datos, sistemas y servicios cloud. Hacer que distintas piezas trabajen juntas.", "orden": 7},
        {"id": 8, "nombre": "Consultoría tecnológica", "descripcion": "Diagnóstico, arquitectura, proyectos, DevOps y datos. Definir antes de invertir y acompañar el proyecto.", "orden": 8},
        {"id": 9, "nombre": "Aún no lo sé, necesito orientación", "descripcion": "Opción para prospectos sin necesidad definida.", "orden": 9},
    ]

    db: Session = SessionLocal()
    try:
        # Verificar si ya existen servicios
        if db.query(models.Servicio).count() == 0:
            for s_data in servicios_data:
                servicio = models.Servicio(**s_data)
                db.add(servicio)
            db.commit()
            print("Servicios insertados correctamente.")
        else:
            print("Los servicios ya estaban insertados.")
    except Exception as e:
        db.rollback()
        print(f"Error insertando servicios: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_servicios()
