# Instrucciones para agentes — IBM-BOB-Solar-System-Orientation

Se aplica a todo el repositorio. Codex debe leer este archivo; con Claude u otra herramienta, incluirlo explícitamente si no lo carga automáticamente.

## Antes de cambiar archivos

Lee `README.md`, `index.html` y `bob-code-solar-orientation4.js`. Los nombres de archivos reales prevalecen sobre descripciones antiguas.

Comprueba `git status --short` y la rama. Conserva cambios ajenos y lee las instrucciones de cualquier subdirectorio afectado. Contrasta los documentos con el código: un plan o resultado antiguo no demuestra una función actual. Limita cada cambio al encargo recibido.

## Reglas del proyecto

- Conserva HTML/CSS/JS sin dependencias ni backend salvo necesidad del encargo.
- Diferencia animación ilustrativa, observaciones reales e inferencia. No llames mínimos cuadrados o solución de Kepler al cálculo heurístico actual.
- No inventes precisión, datos de agencias o fuentes de efemérides. Un cambio del modelo numérico debe tener requisitos y verificación independiente.
- Conserva IDs de canvas y controles compartidos entre HTML y JavaScript. No renombres assets sin actualizar los enlaces.

## Validación y entrega

`node --check bob-code-solar-orientation4.js` comprueba sintaxis, no el DOM ni el modelo. Para cambios de interfaz abre `index.html` o el servidor HTTP del README y prueba clic, fecha, velocidad y las tres vistas canvas. No hay npm, build ni suite de tests configurados. Para algoritmos, compara con un referente independiente antes de publicar garantías de exactitud.

En cambios solo de documentación, comprueba rutas, enlaces relativos y comandos contra los archivos reales; no hace falta repetir toda la suite si no cambia el comportamiento. No inventes pruebas ausentes ni marques como aprobado un comando que no ejecutaste. Informa comando, resultado y alcance pendiente.

Revisa el diff antes de hacer commit. No incluyas dependencias instaladas, archivos generados, datos personales, credenciales, cookies, tokens ni archivos de entorno privados. Mantén los documentos útiles existentes y actualiza el estado si cambia una decisión o una limitación. Los commits deben explicar el resultado y su validación; separa documentación y cambios funcionales.
