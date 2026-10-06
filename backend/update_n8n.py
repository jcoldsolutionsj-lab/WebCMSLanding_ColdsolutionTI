import httpx
import json

API_KEY = "TU_API_KEY_AQUI"
WORKFLOW_ID = "UGYYY7uBxXMltPjK"
BASE_URL = "http://localhost:5678/api/v1/workflows"

headers = {
    "X-N8N-API-KEY": API_KEY,
    "Accept": "application/json",
    "Content-Type": "application/json"
}

def update():
    res = httpx.get(f"{BASE_URL}/{WORKFLOW_ID}", headers=headers)
    if res.status_code != 200:
        print(f"Error GET: {res.text}")
        return
    
    workflow = res.json()
    nodes = workflow.get("nodes", [])
    connections = workflow.get("connections", {})
    
    webhook_node_name = next((n.get("name") for n in nodes if n.get("type") == "n8n-nodes-base.webhook"), None)
    if not webhook_node_name:
        print("No se encontró el nodo Webhook en el flujo.")
        return
        
    telegram_node = next((n for n in nodes if n.get("type") == "n8n-nodes-base.telegram"), None)
    gmail_node = next((n for n in nodes if n.get("type") == "n8n-nodes-base.gmail"), None)
    calendar_node = next((n for n in nodes if n.get("type") == "n8n-nodes-base.googleCalendar"), None)

    clean_text = "=🚀 *¡NUEVO LEAD RECIBIDO!*\n\n*Nombre:* {{ $json.body.nombre }}\n*Empresa:* {{ $json.body.empresa || 'No especificada' }}\n*Teléfono:* {{ $json.body.telefono }}\n*Correo:* {{ $json.body.correo || 'No especificado' }}\n\n*Problema:*\n_{{ $json.body.problema }}_"

    if telegram_node:
        telegram_node["parameters"]["text"] = clean_text
    else:
        nodes.append({
            "parameters": {
                "chatId": "-5302237975",
                "text": clean_text,
                "additionalFields": {"parse_mode": "Markdown"}
            },
            "id": "node-telegram-injected",
            "name": "Aviso Telegram",
            "type": "n8n-nodes-base.telegram",
            "typeVersion": 1,
            "position": [450, 100]
        })

    if not gmail_node:
        nodes.append({
            "parameters": {
                "sendTo": "jcoldsolutionsj@gmail.com",
                "subject": "={{ 'NUEVO LEAD: ' + $json.body.nombre }}",
                "message": "={{ '¡Hola equipo!<br><br>Acaba de entrar un nuevo lead a través de la web:<br><br><b>Nombre:</b> ' + $json.body.nombre + '<br><b>Empresa:</b> ' + ($json.body.empresa || 'No especificada') + '<br><b>Teléfono:</b> ' + $json.body.telefono + '<br><b>Correo:</b> ' + ($json.body.correo || 'No especificado') + '<br><br><b>Problema/Necesidad:</b><br>' + $json.body.problema + '<br><br><a href=\"https://wa.me/' + $json.body.telefono.replace(/[^0-9]/g, '') + '\">📲 Contactar por WhatsApp</a>' }}",
                "appendAttribution": False,
                "options": {}
            },
            "id": "node-gmail-injected",
            "name": "Aviso Gmail",
            "type": "n8n-nodes-base.gmail",
            "typeVersion": 2,
            "position": [450, 300]
        })

    # Calendar
    if calendar_node:
        calendar_node["parameters"] = {
            "operation": "create",
            "calendar": "primary",
            "start": "={{ $now.plus(15, 'minutes').format() }}",
            "end": "={{ $now.plus(45, 'minutes').format() }}",
            "additionalFields": {
                "summary": "=📞 Llamar a Lead: {{ $json.body.nombre }}",
                "description": "=<b>Empresa:</b> {{ $json.body.empresa || 'No especificada' }}\n<b>Teléfono:</b> {{ $json.body.telefono }}\n<b>Correo:</b> {{ $json.body.correo }}\n\n<b>Problema:</b>\n{{ $json.body.problema }}\n\n<a href=\"https://wa.me/{{ $json.body.telefono.replace(/[^0-9]/g, '') }}\">📲 Contactar por WhatsApp</a>",
                "attendees": [
                    "jhonvs2014@gmail.com",
                    "jimymallqui@gmail.com"
                ]
            }
        }
    else:
        nodes.append({
            "parameters": {
                "operation": "create",
                "calendar": "primary",
                "start": "={{ $now.plus(15, 'minutes').format() }}",
                "end": "={{ $now.plus(45, 'minutes').format() }}",
                "summary": "={{ 'Llamar a Lead: ' + $json.body.nombre }}",
                "options": {
                    "description": "={{ 'Teléfono: ' + $json.body.telefono + '\nProblema: ' + $json.body.problema }}"
                }
            },
            "id": "node-calendar-injected",
            "name": "Agendar Contacto",
            "type": "n8n-nodes-base.googleCalendar",
            "typeVersion": 1,
            "position": [450, 500]
        })

    if webhook_node_name not in connections:
        connections[webhook_node_name] = {"main": [[]]}
    if len(connections[webhook_node_name]["main"]) == 0:
        connections[webhook_node_name]["main"].append([])
        
    existing_connections = [c["node"] for c in connections[webhook_node_name]["main"][0]]
    if "Aviso Telegram" not in existing_connections:
        connections[webhook_node_name]["main"][0].append({"node": "Aviso Telegram", "type": "main", "index": 0})
    if "Aviso Gmail" not in existing_connections:
        connections[webhook_node_name]["main"][0].append({"node": "Aviso Gmail", "type": "main", "index": 0})
    if "Agendar Contacto" not in existing_connections:
        connections[webhook_node_name]["main"][0].append({"node": "Agendar Contacto", "type": "main", "index": 0})

    # Correo al Cliente
    gmail_cliente_node = next((n for n in nodes if n.get("name") == "Correo al Cliente"), None)
    if gmail_cliente_node:
        gmail_cliente_node["parameters"]["sendTo"] = "={{ $json.body.correo }}"
        gmail_cliente_node["parameters"]["subject"] = "Hemos recibido tu solicitud - ColdSolutions TI"
        gmail_cliente_node["parameters"]["message"] = "={{ '<p>Hola <b>' + $json.body.nombre + '</b>,</p><p>Gracias por contactarte con <b>ColdSolutions TI</b>. Hemos recibido tu solicitud correctamente.</p><p>Nuestro equipo de expertos está revisando tu caso sobre <i>\"' + $json.body.problema + '\"</i> y nos pondremos en contacto contigo a la brevedad posible al número <b>' + $json.body.telefono + '</b>.</p><p>Si tienes información adicional que quieras compartir, no dudes en responder a este correo.</p><br><p>Atentamente,</p><p><b>El equipo de ColdSolutions TI</b><br><a href=\"https://coldsolutionsti.com\">www.coldsolutionsti.com</a></p>' }}"
    else:
        nodes.append({
            "parameters": {
                "sendTo": "={{ $json.body.correo }}",
                "subject": "Hemos recibido tu solicitud - ColdSolutions TI",
                "message": "={{ '<p>Hola <b>' + $json.body.nombre + '</b>,</p><p>Gracias por contactarte con <b>ColdSolutions TI</b>. Hemos recibido tu solicitud correctamente.</p><p>Nuestro equipo de expertos está revisando tu caso sobre <i>\"' + $json.body.problema + '\"</i> y nos pondremos en contacto contigo a la brevedad posible al número <b>' + $json.body.telefono + '</b>.</p><p>Si tienes información adicional que quieras compartir, no dudes en responder a este correo.</p><br><p>Atentamente,</p><p><b>El equipo de ColdSolutions TI</b><br><a href=\"https://coldsolutionsti.com\">www.coldsolutionsti.com</a></p>' }}",
                "appendAttribution": False,
                "options": {}
            },
            "id": "node-gmail-cliente-injected",
            "name": "Correo al Cliente",
            "type": "n8n-nodes-base.gmail",
            "typeVersion": 2,
            "position": [450, 700]
        })
        
        connections[webhook_node_name]["main"][0].append({"node": "Correo al Cliente", "type": "main", "index": 0})

    workflow["nodes"] = nodes
    workflow["connections"] = connections
    
    allowed_keys = ["name", "nodes", "connections"]
    payload = {k: v for k, v in workflow.items() if k in allowed_keys}
    payload["settings"] = {}
    
    put_res = httpx.put(f"{BASE_URL}/{WORKFLOW_ID}", headers=headers, json=payload)
    if put_res.status_code == 200:
        print("¡Éxito! Nodos inyectados correctamente.")
    else:
        print(f"Error PUT: {put_res.text}")

if __name__ == "__main__":
    update()
