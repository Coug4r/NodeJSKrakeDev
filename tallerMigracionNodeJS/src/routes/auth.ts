import { Router } from "express";
import multer from "multer";
import { login, registrar, verPerfil } from "../controllers/auth.controllers.js";
import { addPeliculas, obtenerPeliculas, obtenerPoster, actualizarPelicula, eliminarPelicula } from "../controllers/pelicula.controller.js";
import { validarAuth } from "../middlewares/auth.middleware.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /auth/verPerfil:
 *   get:
 *     summary: Ver perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *       401:
 *         description: No autorizado
 */
router.get("/verPerfil", validarAuth, verPerfil);

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/registrar", registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/peliculas:
 *   get:
 *     summary: Obtener todas las películas
 *     tags: [Peliculas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de películas obtenida exitosamente
 *       401:
 *         description: No autorizado
 */
router.get("/peliculas", validarAuth, obtenerPeliculas);

/**
 * @swagger
 * /auth/peliculas/{id}/poster:
 *   get:
 *     summary: Obtener el poster de una película
 *     tags: [Peliculas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Poster obtenido exitosamente
 *       404:
 *         description: Película no encontrada
 */
router.get("/peliculas/:id/poster", validarAuth, obtenerPoster);

/**
 * @swagger
 * /auth/peliculas/create:
 *   post:
 *     summary: Crear una nueva película
 *     tags: [Peliculas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               titulo:
 *                 type: string
 *               director:
 *                 type: string
 *               año:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Película creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/peliculas/create", validarAuth, upload.single("file"), addPeliculas);

/**
 * @swagger
 * /auth/peliculas/{id}:
 *   put:
 *     summary: Actualizar una película existente
 *     tags: [Peliculas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               titulo:
 *                 type: string
 *               director:
 *                 type: string
 *               año:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Película actualizada exitosamente
 *       404:
 *         description: Película no encontrada
 */
router.put("/peliculas/:id", validarAuth, upload.single("file"), actualizarPelicula);

/**
 * @swagger
 * /auth/peliculas/{id}:
 *   delete:
 *     summary: Eliminar una película
 *     tags: [Peliculas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Película eliminada exitosamente
 *       404:
 *         description: Película no encontrada
 */
router.delete("/peliculas/:id", validarAuth, eliminarPelicula);

export default router;