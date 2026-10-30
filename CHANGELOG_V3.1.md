# AeroLab Python V3.1 — CodeWorld 3D

## Nueva experiencia principal

Se integra **CodeWorld 3D — Programa un mundo**, una aventura tridimensional separada de la Zona Infantil y de la Ruta Python.

### Concepto

El alumno controla libremente un avatar chibi dentro de un campus futurista de AeroLab. Python no mueve al personaje: Python modifica el mundo. Las terminales del campus ejecutan código real mediante Pyodide y convierten las llamadas del alumno en acciones visuales.

### Campus y sistemas

- Centro de comunicaciones.
- Laboratorio de energía.
- Jardín digital.
- Hangar de drones.
- Ciudad de datos.
- Torre lógica.
- Núcleo central.

### 12 misiones 3D

La progresión cubre `print()`, variables, `if`, `for`, listas, funciones, diccionarios, `while`, automatización y un proyecto integrador final.

### Cambios visuales persistentes

Al completar misiones, el campus cambia: antena encendida, generador activo, compuerta abierta, jardín iluminado, dron patrullando, ciudad de datos encendida, torre sincronizada y núcleo restaurado.

### Navegación y rendimiento

- Entrada CodeWorld añadida al inicio, menú lateral y navegación móvil.
- Carga diferida con `React.lazy()` para que Three.js no aumente el arranque del resto de AeroLab.
- Calidad 3D reducida automáticamente en pantallas pequeñas o dispositivos con pocos núcleos.
- Controles WASD/flechas en PC y controles táctiles en móvil.
- Terminales accesibles también desde un mapa/lista de acceso rápido.

### Tecnología

- React 19.
- React Three Fiber 9.x.
- Three.js.
- Pyodide en Web Worker.
- CodeMirror 6.
- Vite.
