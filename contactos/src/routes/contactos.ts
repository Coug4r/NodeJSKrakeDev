import { Router } from "express";
import { obtenerContactos, crearContacto, actualizarContacto, eliminarContacto } from "../controllers/contactos/controller.js";

const route = Router();

/**
 * @swagger
 * /contactos:
 *   get:
 *     summary: Obtiene la lista completa de contactos
 *     tags: [Contactos]
 *     responses:
 *       200:
 *         description: Lista de contactos obtenida exitosamente
 */
route.get("/", obtenerContactos);

/**
 * @swagger
 * /contactos:
 *   post:
 *     summary: Crea un nuevo contacto
 *     tags: [Contactos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               celular:
 *                 type: string
 *               ciudad:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contacto creado exitosamente
 *       500:
 *         description: Error al crear contacto
 */
route.post("/", crearContacto);

/**
 * @swagger
 * /contactos/{id}:
 *   put:
 *     summary: Actualiza un contacto existente
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del contacto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               celular:
 *                 type: string
 *               ciudad:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contacto actualizado exitosamente
 *       404:
 *         description: Contacto no encontrado
 *       500:
 *         description: Error al actualizar contacto
 */
route.put("/:id", actualizarContacto);

/**
 * @swagger
 * /contactos/{id}:
 *   delete:
 *     summary: Elimina un contacto existente
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del contacto a eliminar
 *     responses:
 *       200:
 *         description: Contacto eliminado exitosamente
 *       404:
 *         description: Contacto no encontrado
 *       500:
 *         description: Error al eliminar contacto
 */
route.delete("/:id", eliminarContacto);

export default route;
