# Frontend - Taller JWT (Películas)

Frontend en React + Vite construido siguiendo el mismo patrón y diseño visual
del proyecto de referencia `mi-proyecto-jwt` (AuthContext con JWT decodificado
en el cliente, rutas protegidas con `react-router-dom`, mismo sistema de
estilos rojo/negro), adaptado al backend `taller_jwt` (gestión de **Películas**
en lugar de Vehículos).

## Instalación

```bash
npm install
npm run dev
```

La app corre por defecto en `http://localhost:5173`, que es el origen
permitido por el `CorsConfigurationSource` y el `@CrossOrigin` del backend.

## Configuración

`src/config/apiConfig.js` apunta a `http://localhost:8080`. Ajusta el puerto
si tu backend Spring Boot corre en otro distinto.

## Estructura

- `src/context/AuthContext.jsx` — guarda el token JWT en `localStorage`,
  lo decodifica (sin librerías externas) para exponer `usuario` (`sub`, `rol`, ...).
- `src/pages/Login.jsx` y `Registrar.jsx` — consumen `/auth/login` y
  `/auth/registrar`.
- `src/pages/Perfil.jsx` — consume `/auth/verPerfil` (con el token en el header
  `Authorization: Bearer`).
- `src/pages/Peliculas.jsx` + `src/components/ListaPeliculas.jsx` — CRUD
  completo contra el controlador `PeliculaControllers` del backend:
  - `GET /auth/peliculas` — listar (sin poster, por performance).
  - `POST /auth/peliculas/create` — crear (multipart: `file`, `titulo`,
    `director`, `anio`).
  - `GET /auth/peliculas/{id}/poster` — descarga el poster como imagen.
  - `PUT /auth/peliculas/{id}` — actualizar (multipart: `titulo`, `director`,
    `anio`, `poster` opcional, `mimeType` opcional).
  - `DELETE /auth/peliculas/{id}` — eliminar.

## ⚠️ Nota importante sobre el backend

El código de `taller_jwt` que revisé sólo incluye el `PeliculaControllers`
(CRUD de películas) y la seguridad JWT (`SecurityConfig`, `JwtAutenticationFilter`,
`JwtUtil`, `TokenBlackList`). El `SecurityConfig` deja libres las rutas
`/auth/login` y `/auth/registrar`, pero **no encontré un `AuthController`**
que las implemente (ni tampoco `/auth/verPerfil`) en el zip que subiste.

Este frontend asume que esas rutas existen con el mismo contrato que en
`mi-proyecto-jwt`:

- `POST /auth/login` → `{ username, password }` → responde `{ token }`.
- `POST /auth/registrar` → `{ username, password, rol }` → `201 Created`.
- `GET /auth/verPerfil` (con `Authorization: Bearer <token>`) → responde
  `{ Mensaje, Usuario, Rol, Estatus }`.

Si aún no tienes ese controlador en el backend, avísame y te ayudo a crearlo
para que el login/registro funcionen de punta a punta con este frontend.
