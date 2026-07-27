# mi-proyecto-jwt (Frontend React)

Frontend del Taller: Registro y JWT en React, que consume el backend Spring Boot `talle_jwt`.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Esto levanta el proyecto en `http://localhost:5173` (puerto por defecto de Vite).

## Requisito importante: CORS en el backend

El backend Spring Boot (`talle_jwt`) actualmente **no tiene configurado CORS**. Como el
frontend corre en `http://localhost:5173` y el backend en `http://localhost:8080`, el
navegador bloqueará las peticiones `fetch` hasta que agregues una configuración de CORS
en el backend. Ejemplo (crear `WebConfig.java` en el paquete `com.krakedev.talle_jwt`):

```java
package com.krakedev.talle_jwt;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/auth/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*");
            }
        };
    }
}
```

## Estructura

```
mi-proyecto-jwt/
├── src/
│   ├── config/
│   │   └── apiConfig.js       -> URL base del backend (http://localhost:8080)
│   ├── pages/
│   │   ├── Login.jsx          -> Login + enlace a /registrar
│   │   ├── Registrar.jsx      -> Formulario de registro (POST /auth/registrar)
│   │   └── Perfil.jsx         -> Ruta protegida (GET /auth/verPerfil)
│   ├── App.jsx                -> Rutas públicas/protegidas
│   ├── main.jsx
│   └── index.css              -> Estilos responsive
```

## Flujo cubierto

1. **Login** (`/login`): formulario de acceso + enlace "¿No tienes cuenta? Regístrate aquí" -> `/registrar`.
2. **Registrar** (`/registrar`, ruta pública): captura `username`, `password` y `rol`
   (select con `USER`/`ADMIN`), hace `POST ${API_BASE_URL}/auth/registrar` con JSON.
   - Éxito (201): mensaje verde y redirección a `/login` tras 2 segundos.
   - Error: muestra el mensaje de error devuelto por el backend o de red.
3. **Perfil** (`/perfil`, ruta protegida): requiere token JWT en `localStorage`;
   si no existe, redirige a `/login`. Consume `GET /auth/verPerfil` con el header
   `Authorization: Bearer <token>`.
