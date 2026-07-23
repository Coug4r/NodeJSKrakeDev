import { type Request, type Response } from "express";
import prisma from "../../database/prisma.js";

//enpoint get
export const obtenerContactos = async (req: Request, res: Response) => {
    try {
        const contactos = await prisma.contacto.findMany();
        res.json(contactos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener contactos!" })
    }
};

export const crearContacto = async (req: Request, res: Response) => {
    const { nombre, celulat, ciudad } = req.body;
    try {
        const nuevoContacto = await prisma.contacto.create({
            data: {
                nombre, celulat, ciudad
            }
        })
        res.status(200).json(nuevoContacto)
    }
    catch (error) {
        res.status(500).json({ error: "Error al crear el contacto" })
    }
}

export const actualizarContacto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, celulat, ciudad } = req.body
    try {
        const contactoActualizado = await prisma.contacto.update({
            where: { id: Number(id) },
            data: { nombre, celulat, ciudad }
        })
        res.json(contactoActualizado)
    }
    catch (error) {
        res.status(500).json({ error: "Contacto no encontrado!" })
    }
}

export const eliminarContacto = async (req: Request, res: Response) =>{
    const {id} = req.params;
    try{
        await prisma.contacto.delete({
            where:{id:Number(id)}
        })
        res.json({Exito: "Contacto eliminado con exito!"})
    }
    catch(error){
        res.status(404).json({Error: "Contacto no encontrado!"})
    }
}

