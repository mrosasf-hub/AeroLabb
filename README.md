# AeroLab Python V3.4 — CodeWorld Definitive Edition

Plataforma educativa web de AeroLab Center con tres experiencias integradas:

- **Zona Infantil:** 36 actividades visuales y minijuegos para introducir lógica y Python.
- **Ruta Python:** 60 lecciones y 21 actividades especiales (81 actividades).
- **CodeWorld 3D:** 12 misiones en un campus futurista que responde a código Python real.

## Ejecutar localmente

```powershell
npm install
npm run dev
```

## Validar producción

```powershell
npm run build
npm run preview
```

## CodeWorld 3D

El alumno explora un campus de estilo anime low-poly. El avatar se mueve libremente; Python controla los sistemas del entorno: comunicaciones, energía, puertas, jardín, drones, ciudad de datos, torre lógica y núcleo central. Las terminales validan comportamiento y conceptos, no una respuesta literal.

Controles PC: **WASD / flechas**, `Shift` para correr y `E` para usar una terminal. En pantallas táctiles aparecen controles en pantalla.

### Rendimiento adaptable

CodeWorld selecciona perfiles de calidad según tamaño de pantalla y capacidad estimada del dispositivo:

- **Calidad ligera:** móviles o equipos de recursos limitados.
- **Equilibrado:** tablets, laptops compactas y equipos medios.
- **Detalle premium:** equipos con más recursos.

Los perfiles ajustan DPR, sombras, densidad ambiental y elementos animados. La cámara también cambia distancia y altura para laptop, tablet y celular. El 3D se carga de forma diferida.

## GitHub Pages

Vite conserva `base: './'` y el workflow `.github/workflows/deploy-pages.yml` compila `dist/` y publica automáticamente al hacer push a `main`. En GitHub, `Settings → Pages → Source` debe estar en **GitHub Actions**.
