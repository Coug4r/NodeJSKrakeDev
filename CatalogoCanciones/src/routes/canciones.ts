import { Router } from "express";
import { obtenerCancion, crearCancion, actualizarCancion, eliminarCancion } from "../controllers/cancion.controller.js";

const route = Router();

route.get("/", obtenerCancion);
route.post("/", crearCancion);
route.put("/:id", actualizarCancion);
route.delete("/:id", eliminarCancion);

export default route;