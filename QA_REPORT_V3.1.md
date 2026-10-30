# QA — AeroLab Python V3.1 CodeWorld

## Pruebas realizadas en el paquete

- 12 misiones CodeWorld detectadas con IDs únicos.
- Imports relativos: 0 archivos faltantes.
- Balance de llaves CSS de CodeWorld: correcto.
- Archivos JS no JSX nuevos: `node --check` sin errores.
- Balance de llaves/paréntesis/corchetes en los componentes JSX nuevos: correcto.
- Los 12 códigos iniciales de las misiones fueron ejecutados contra el mismo contrato de acciones del mundo.
- Resultado de validación de ejemplos: 12/12 correctos.
- Validaciones probadas: llamadas, variables, `if`, `for`, listas, diccionarios, funciones y `while`.

## Rendimiento previsto

- CodeWorld se carga con `React.lazy()`.
- Three.js y React Three Fiber no forman parte de la ruta inicial de la aplicación hasta entrar a CodeWorld.
- En móvil o equipos de pocos núcleos se reduce DPR, antialias y sombras.
- No se incluyen modelos GLTF ni texturas externas pesadas; la escena utiliza geometría low-poly generada en código.

## Pendiente en entorno local del usuario

Ejecutar:

```bash
npm install
npm run build
```

El entorno de generación no tuvo acceso al registro npm, por lo que la instalación completa de dependencias no pudo ejecutarse aquí.
