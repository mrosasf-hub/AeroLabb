# AeroLab Python V3.3 — Final Premium Edition

## CodeWorld 3D

- Rediseño visual del campus para dejar atrás la apariencia de maqueta/prototipo.
- Nueva isla con volumen, bordes, variaciones de terreno y áreas verdes.
- Plaza central más compacta para mejorar escala y lectura de cámara.
- Caminos curvos entre zonas en lugar de depender únicamente de trazos rectos.
- Arcos de acceso AeroLab/CodeWorld, mobiliario, árboles, flores, rocas y luminarias.
- Balizas holográficas por zona y haces de energía de sistemas restaurados hacia el núcleo.
- Tráfico ambiental de drones para dar vida al campus.
- Cielo degradado procedural, iluminación cinematográfica suave y tone mapping ACES.
- Avatar chibi renovado con más detalle, uniforme AeroLab, cabello, pulsera tecnológica y animación más suave.
- Giro del personaje interpolado y cámara adaptativa según ancho de pantalla.
- Conserva cinemáticas de activación, partículas y transformaciones de sistemas.

## Responsive y rendimiento

- Tres perfiles automáticos de render: **Rendimiento móvil**, **Equilibrado** y **Detalle premium**.
- El perfil considera ancho de pantalla, núcleos del dispositivo y memoria disponible cuando el navegador la expone.
- DPR, antialias, resolución de sombras y densidad ambiental cambian por perfil.
- Ajustes específicos para laptop, tablet, celular, pantallas bajas y móvil horizontal.
- HUD y controles táctiles más compactos para no tapar el mundo 3D.
- CodeWorld continúa cargándose con `React.lazy()` para no penalizar Inicio, Zona Infantil o Ruta Python.

## Compatibilidad

- React + Vite.
- React Three Fiber + Three.js.
- Pyodide/Web Worker para Python.
- `base: './'` conservado para GitHub Pages.
- Workflow `.github/workflows/deploy-pages.yml` incluido.
