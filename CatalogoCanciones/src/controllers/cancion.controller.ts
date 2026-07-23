import { type Request, type Response } from "express";
import prisma from "../database/prisma.js";

export const obtenerCancion = async (req:Request, res: Response)=>{
    try{
        const canciones = await prisma.cancion.findMany();
        res.json(canciones);
    }
    catch(error){
        res.status(500).json({Error: "Error al crear el contacto"})
    }
}
export const crearCancion = async (req: Request, res: Response)=>{
    const {titulo, duracion, albumId} = req.body;
    try{
        const nuevaCancion = await prisma.cancion.create({
            data: {
                titulo, duracion, albumId
            }
        })
        res.status(201).json(nuevaCancion);
    }catch(error){
        res.status(500).json({Error: "Error al crear nueva cancion!"});
    }
}
export const actualizarCancion = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const {titulo, duracion, albumId} = req.body;
    try{
        const cancionActualizada = await prisma.cancion.update({
            where: {id: Number(id)},
            data: {titulo, duracion, albumId}
        })
        res.json(cancionActualizada);
    }catch(error){
        res.status(404).json({Error: "Cancion no encontrada!"});
    }
}

export const eliminarCancion = async (req: Request, res: Response)=>{
    const {id} = req.params;
    try{
        await prisma.cancion.delete({
            where:{id: Number(id)}
        })
        res.json({Exito: "Cancion eliminada con exito!"})
    }
    catch(error){
        res.status(404).json({Error: "Cancion no encotrada!"})
    }
}