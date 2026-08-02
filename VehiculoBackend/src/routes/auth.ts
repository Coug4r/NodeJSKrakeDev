import { Router } from "express";
import multer from "multer";
import { login, verPerfil, registrar } from "../controllers/auth.controllers.js";
import { obtenerVehiculos, registrarVehiculo, obtenerFotoVehiculo } from "../controllers/vehiculo.controllers.js";
import { validarAuth } from "../middlewares/auth.middleware.js";

const router = Router();
const upload = multer({storage:multer.memoryStorage()});
router.post("/registrar", registrar);
router.post("/login", login);
/**
 * @swagger
 * /auth/verPerfil:
 *  get:
 *     summary: Ver el perfil del usuario
 *     tags: [perfil]
 *     security:
 *           - bearerAuth: []
 *     responses:
 *          200:
 *              description: Informacion del usuario (Rol, Username, Status), opciones de cerrar sesion y administrar vehiculos
 *          401:
 *              description: No autorizado credenciales incorrectas
 */
router.get("/verPerfil", verPerfil)
router.get("/vehiculos", validarAuth, obtenerVehiculos);
router.get("/vehiculos/:id/foto", validarAuth, obtenerFotoVehiculo);
router.post("/vehiculos/registrar", validarAuth, upload.single("file"),registrarVehiculo);

export default router;