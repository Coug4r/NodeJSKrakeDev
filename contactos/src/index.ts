import express from "express";
import contactosRouter from "../src/routes/contactos.js";
import { swaggerDocs } from "./swagger.js";

const app = express();
const port = 3001;

app.use(express.json());

app.use("/contactos", contactosRouter);

app.listen(port, () => {
  swaggerDocs(app, port);
  console.log("Servidor corriendo en el puerto:", port);
});