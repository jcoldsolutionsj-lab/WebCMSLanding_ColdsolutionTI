import asyncio
import os
import sys

# Agregar path para poder importar módulos
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ["N8N_WEBHOOK_URL"] = "http://localhost:5678/webhook-test/leads"

from main import send_to_n8n_background

payload = {
    "id": 999,
    "nombre": "Oliver olivera Prueba",
    "empresa": "JHT Transporte Company",
    "telefono": "+51 999888777",
    "correo": "jhonvs2015@gmail.com",
    "servicio_id": 2,
    "problema": "Automatizar archivos de Excel y PDF para generar reportes de manera eficiente.",
}

async def run_test():
    print("Enviando petición de prueba a n8n...")
    try:
        await send_to_n8n_background(999, payload)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(run_test())
