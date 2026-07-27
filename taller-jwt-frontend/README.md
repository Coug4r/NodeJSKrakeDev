# Taller JWT - Frontend (Gestión de Películas)

Frontend en React + Vite para el backend `taller_jwt` (Spring Boot).
A diferencia de `mi-proyecto-jwt`, **este frontend no tiene pantallas de login/registro**:
se conecta directamente a los endpoints de `/auth/peliculas` del backend.

## Estructura

```
src/
├── config/apiConfig.js         # URL base del backend (http://localhost:8080)
├── pages/Peliculas.jsx         # Página principal: formulario + listado
├── components/ListaPeliculas.jsx      # Grid de tarjetas con poster, título, director, año
├── components/EditarPeliculaModal.jsx # Modal para editar una película existente
├── App.jsx / main.jsx
└── index.css                   # Mismo tema visual (rojo/negro) que mi-proyecto-jwt
```

## Endpoints que consume

| Acción              | Método | Endpoint                       |
|---------------------|--------|---------------------------------|
| Listar películas     | GET    | `/auth/peliculas`               |
| Ver poster           | GET    | `/auth/peliculas/{id}/poster`   |
| Crear película       | POST   | `/auth/peliculas/create` (multipart: file, titulo, director, anio) |
| Actualizar película   | PUT    | `/auth/peliculas/{id}` (multipart: titulo, director, anio, poster, mimeType) |
| Eliminar película     | DELETE | `/auth/peliculas/{id}`          |

## ⚠️ Importante: ajuste necesario en el backend

En `SecurityConfig.java` actualmente solo se permite acceso sin token a:

```java
.requestMatchers("/auth/login", "/auth/registrar").permitAll()
.anyRequest().authenticated()
```

Como este frontend **no envía token JWT** (no hay login), las peticiones a
`/auth/peliculas/**` serán rechazadas con 401 mientras esa regla siga activa.
Para que el acceso directo funcione, agrega esa ruta a `permitAll()`, por ejemplo:

```java
.requestMatchers("/auth/login", "/auth/registrar", "/auth/peliculas/**").permitAll()
.anyRequest().authenticated()
```

## Cómo correrlo

```bash
npm install
npm run dev
```

Se ejecuta en `http://localhost:5173` (mismo origen que ya está permitido en el CORS del backend).
