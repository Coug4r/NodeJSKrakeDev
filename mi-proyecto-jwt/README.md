# mi-proyecto-jwt

Proyecto React (Vite) para el "Taller: Registro y JWT en React". Incluye el
flujo base de autenticación (Login / Perfil) y la nueva página de **registro**
que consume `POST /auth/registrar` del backend Spring Boot.

## Estructura

```
mi-proyecto-jwt/
├── src/
│   ├── config/
│   │   └── apiConfig.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Perfil.jsx
│   │   └── Registrar.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Requisitos previos

- Node.js 18+ y npm instalados.
- El backend Spring Boot corriendo (por defecto se asume `http://localhost:8080`,
  ajústalo en `src/config/apiConfig.js` si tu API usa otro host/puerto).
- CORS habilitado en el backend para el origen de Vite (`http://localhost:5173`).

## Comandos, en orden

```bash
# 1. Entrar a la carpeta del proyecto
cd mi-proyecto-jwt

# 2. Instalar dependencias (React, React Router, Vite)
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

Vite mostrará la URL local (normalmente `http://localhost:5173`). Abre esa
URL, y desde `/login` usa el enlace "Regístrate aquí" para llegar a `/registrar`.

## Notas importantes sobre lo que se implementó

- El PDF pedía **extender** un proyecto `Taller_JWT/jwt` ya existente, pero no
  se disponía de ese proyecto de partida. Por eso se generó desde cero el
  esqueleto mínimo (`Login.jsx`, `Perfil.jsx`, `App.jsx`, `apiConfig.js`,
  enrutamiento con token en `localStorage`) necesario para que el taller
  tenga sentido y se pueda extender. Esa parte es una base razonable, no un
  requisito literal del PDF, así que revísala y ajústala a como ya tenías
  tu propio login si el proyecto original existe en otra parte.
- `Login.jsx` asume un endpoint `POST /auth/login` que devuelve `{ token: "..." }`.
  Este endpoint **no está definido en el PDF**; si tu backend usa otra ruta o
  forma de respuesta, ajusta esa parte en `Login.jsx`.
- Todo lo relacionado con `Registrar.jsx` (Paso 3) sigue exactamente lo pedido
  en el PDF:
  - Campos `username`, `password`, `rol` (select con `USER` / `ADMIN`).
  - `POST` con `fetch` a `${API_BASE_URL}/auth/registrar`, JSON en el body.
  - Éxito (`201 Created`): mensaje verde y redirección a `/login` tras 2s.
  - Error (red o servidor, ej. usuario ya registrado): mensaje de error en pantalla.
- La ruta `/registrar` se agregó como **pública** en `App.jsx` (Paso 2), y el
  enlace desde `Login.jsx` hacia `/registrar` se agregó como Paso 1.
- Estilos 100% responsive en `index.css` (Paso 4): layout de dos paneles que
  se apila en móviles (`@media (max-width: 768px)`).

## Para los entregables del taller

1. **Captura 1**: abre DevTools (F12) → activa la vista móvil → captura
   `/login` y `/registrar`.
2. **Captura 2**: con la pestaña **Network** abierta, envía el formulario de
   registro y captura la petición `POST /auth/registrar` (código `201`),
   su *Payload* y su *Response*.
3. Sube el proyecto a un repositorio en GitHub.
4. Envía las capturas al grupo de WhatsApp.
