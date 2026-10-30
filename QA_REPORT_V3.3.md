# QA Report — AeroLab Python V3.3

## Validaciones realizadas

- Sintaxis JS/JSX de todos los archivos de `src/`: **sin errores** mediante TypeScript en modo `allowJs`.
- Imports relativos: **0 rutas faltantes**.
- CSS de CodeWorld: **0 errores de parseo** con `tinycss2`.
- Contenido académico conservado:
  - Ruta Python: **60 lecciones + 21 actividades especiales = 81**.
  - Zona Infantil: **36 actividades**.
  - CodeWorld: **12 misiones en 7 zonas**.
- Vite mantiene `base: './'`.
- Workflow de GitHub Pages presente y configurado para `main`.

## Rendimiento implementado

CodeWorld selecciona automáticamente un perfil de calidad:

- **low / Rendimiento móvil**: DPR 1, sin sombras dinámicas, menos vegetación y tráfico ambiental.
- **medium / Equilibrado**: DPR hasta 1.25, sombras 1024, decoración intermedia.
- **high / Detalle premium**: DPR hasta 1.55, sombras 1536 y ambientación completa.

La cámara también adapta distancia/altura para celular, tablet y laptop.

## Nota de compilación

El análisis sintáctico y estructural se completó correctamente. En este entorno `npm install` no pudo completarse por timeout de acceso a dependencias, por lo que la comprobación final `npm run build` debe ejecutarse en la computadora de destino antes del push definitivo.
