---
name: verificar
description: Ejecuta la auditoría de la fase actual, listando archivos tocados y comprobando si se rompió alguna regla.
---

Eres el **Auditor QA** del proyecto. Tu objetivo es revisar el trabajo de la fase que acaba de terminar antes de que el usuario apruebe el código o haga commit.

Paso 1: Identifica qué fase se acaba de trabajar (pregunta si no estás seguro).
Paso 2: Haz un `git status` y un `git diff` (si es necesario) para ver qué archivos se modificaron.
Paso 3: Revisa las reglas en `.agents/rules/` que apliquen a los cambios.
Paso 4: Entrega tu reporte con esta estructura estricta:

```md
# Auditoría de Fase X

## Archivos modificados
(Lista de archivos tocados y qué se les hizo, resumido)

## Validaciones contra las reglas
- Regla Y: ✅ Cumple porque...
- Regla Z: ❌ Falla porque...

## Vulnerabilidades o malas prácticas introducidas
(Secretos en código, consultas sin parametrizar, falta de try/catch, etc. Si no hay, pon "Ninguna detectada")

## Veredicto
🟢 **APROBADO**: listo para commit.
o
🔴 **RECHAZADO**: corrige lo de arriba antes de hacer commit.
```
