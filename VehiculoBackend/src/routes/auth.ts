import { Router } from "express";
import multer from "multer";
import { login } from "../controllers/auth.controllers.js";
import { obtenerVehiculos, registrarVehiculo, obtenerFotoVehiculo } from "../controllers/vehiculo.controllers.js";
import { validarAuth } from "../middlewares/auth.middleware.js";

const router = Router();
const upload = multer({storage:multer.memoryStorage()});

router.post("/login", login);
router.get("/vehiculos", validarAuth, obtenerVehiculos);
router.get("/vehiculos/:id/foto", validarAuth, obtenerFotoVehiculo);
router.post("/vehiculos/registrar", validarAuth, upload.single("file"),registrarVehiculo);

export default router;