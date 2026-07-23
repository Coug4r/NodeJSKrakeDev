//define url de cada operacion
import { Router } from "express";
import { obtenerContactos, crearContacto, actualizarContacto, eliminarContacto } from "../controllers/contactos/controller.js";

const route = Router();

route.get("/", obtenerContactos);
route.post("/", crearContacto);
route.put("/:id", actualizarContacto);
route.delete("/:id", eliminarContacto);

export default route;