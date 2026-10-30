# QA — AeroLab Python V3.0

## Validaciones realizadas
- 35 archivos JS/JSX analizados con el parser de TypeScript: 0 errores sintácticos.
- `src/index.css` analizado con PostCSS: sintaxis válida.
- 4 mundos infantiles encontrados.
- 36 actividades infantiles encontradas.
- 36 IDs infantiles únicos.
- Cada mundo contiene 9 actividades y termina con un Jefe.
- Comprobación de imports relativos: 0 rutas faltantes.
- `kidsCourse.js` y `useKidsProgress.js` validados con `node --check`.

## Build
El entorno de creación no pudo completar `npm install` por limitaciones de red/tiempo, por lo que el build final con Vite debe ejecutarse localmente o mediante el workflow incluido de GitHub Actions.

Comandos:

```bash
npm install
npm run build
```
