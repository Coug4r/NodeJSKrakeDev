import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { type Application } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Contactos",
      version: "1.0.1",
      description: "Documentación de la API REST para gestión de contactos"
    },
    servers: [
      { url: "http://localhost:3001" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/routes/*.ts", "./src/routes/*.js"] // soporta TS y JS
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Application, port: number) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Documentación disponible en http://localhost:${port}/api-docs`);
};