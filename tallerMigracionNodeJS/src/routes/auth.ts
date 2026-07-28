import { Router } from "express";
import multer from "multer";
import { login, registrar, verPerfil } from "../controllers/auth.controllers.js";
import { addPeliculas, obtenerPeliculas, obtenerPoster, actualizarPelicula, eliminarPelicula } from "../controllers/pelicula.controller.js";
import { validarAuth } from "../middlewares/auth.middleware.js";

const router = Router();
const upload = multer({storage:multer.memoryStorage()});

router.get("/verPerfil", verPerfil)
router.post("/registrar", registrar);
router.post("/login", login);
router.get("/peliculas", validarAuth, obtenerPeliculas);
router.get("/peliculas/:id/poster", validarAuth, obtenerPoster);
router.post("/peliculas/create", validarAuth, upload.single("file"),addPeliculas);
router.put("/peliculas/:id", validarAuth, upload.single("file"), actualizarPelicula);
router.delete("/peliculas/:id", validarAuth, eliminarPelicula);

export default router;