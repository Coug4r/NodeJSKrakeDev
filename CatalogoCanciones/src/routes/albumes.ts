import { Router } from "express";
import { obtenerAlbum, crearAlbum, actualizarAlbum, eliminarAlbum } from "../controllers/album.controller.js";

const route = Router();

route.get("/", obtenerAlbum);
route.post("/" , crearAlbum);
route.put("/:id", actualizarAlbum);
route.delete("/:id", eliminarAlbum);

export default route;