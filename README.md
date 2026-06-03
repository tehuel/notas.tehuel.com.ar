# notas.tehuel.com.ar

Aplicación web (frontend HTML + backend NodeJS) para acceder a reporte de notas de Plataformas Móviles.

## Inicio rápido
- Instalar dependencias: `npm install`.
- Construir archivos estáticos: `npm run build`.
- Ejecutar en desarrollo: `npm run dev` (o `npm start`). Ambos comandos generan primero `public/index.html` y `public/app.js`.

## Variables de entorno

En `.env.example` están las variables necesarias. Crear un archivo `.env` con los valores adecuados. `GITHUB_CLIENT_ID` y `GITHUB_SHA` se inyectan en el build de los archivos estáticos.