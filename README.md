# AntiSocial Net

AntiSocial Net es una aplicación de red social simulada, hecha como trabajo práctico de la UnaHur. Permite registrarse, iniciar sesión, ver el feed de publicaciones (con filtro por etiquetas), entrar al detalle de cada publicación, comentar y crear publicaciones con imágenes y etiquetas.

## Funcionalidades

- **Inicio** (`/`): feed con todas las publicaciones, filtro por etiquetas, paginación y publicaciones destacadas.
- **Detalle de publicación** (`/post/:id`): imágenes, etiquetas, descripción y comentarios. Con sesión iniciada se puede comentar.
- **Iniciar sesión** (`/login`) y **Registrarse** (`/registro`). La contraseña es `123456` para todos los usuarios.
- **Mi perfil** (`/perfil`, requiere sesión): datos del usuario y sus publicaciones.
- **Crear publicación** (`/create-post`, requiere sesión): descripción, imágenes y etiquetas.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Bootstrap y Bootstrap
- React Router DOM
- Google Fonts (Cormorant Garamond y Jost)
- OxLint

## API

El frontend consume la API REST del backend del grupo:

- Repositorio del backend: <https://gitea.unahur.edu.ar/Estrategia-de-persistencia-C2-2026/ejercicio-56-grupo-28>
- URL de la API: `http://localhost:3000`
- Documentación (Swagger): `http://localhost:3000/api-docs`

La URL de la API está en [src/api/config.ts](src/api/config.ts). Para usar otra, se puede crear un archivo `.env` (ver [.env.example](.env.example)) con:

```
VITE_API_URL=http://localhost:3000
```

### Levantar el backend

El backend tiene que estar corriendo antes de abrir el frontend.

1. Clonar el repositorio del backend y entrar a la carpeta:

   ```bash
   git clone https://gitea.unahur.edu.ar/Estrategia-de-persistencia-C2-2026/ejercicio-56-grupo-28.git
   cd ejercicio-56-grupo-28
   ```

2. Instalar las dependencias:

   ```bash
   npm i
   ```

3. Crear las tablas de la base de datos:

   ```bash
   npm run db:migrate
   ```

4. Iniciar el servidor (queda escuchando en el puerto 3000):

   ```bash
   npm run dev
   ```

## Instalación y ejecución del frontend

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/guilleguevara245/frontend-unahur-antisocial-net.git
   ```

2. Entrar a la carpeta del proyecto:

   ```bash
   cd frontend-unahur-antisocial-net
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abrir en el navegador `http://localhost:5173`. Tiene que ser ese puerto, porque el backend solo acepta pedidos (CORS) desde `http://localhost:5173`.

## Integrantes

- Guillermo Guevara
- Elias Ezequiel Llorens
- Tomas Valentin Cardenas
- Nicolás Alexandro Medina Cabral
