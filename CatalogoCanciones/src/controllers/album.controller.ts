import { type Request, type Response } from "express";
import prisma from "../database/prisma.js";

export const obtenerAlbum = async (req: Request, res:Response)=>{
    try{
        const albunes = await prisma.album.findMany();
        res.json(albunes);
    }
    catch(error){
        res.status(500).json({Error: "Error al obtener contactos!"});
    }
}

export const crearAlbum = async (req:Request, res:Response)=>{
    const {titulo, artista, anio} = req.body;
    try{
        const nuevoAlbum = await prisma.album.create({
            data:{
                titulo, artista, anio
            }
        })
        res.status(200).json(nuevoAlbum);
    }
    catch(error){
        res.status(500).json({Error: "Error al crear nuevo album"});
    }
}

export const actualizarAlbum = async (req:Request, res: Response)=>{
    const {id} = req.params;
    const {titulo,artista,anio} = req.body;

    try{
        const albumActualizado = await prisma.album.update({
            where: {id: Number(id)},
            data: {
                titulo, artista, anio
            }
        })
        res.json(albumActualizado);
    }
    catch(error){
        res.status(404).json({Error: "Album no encontrado"})
    }
}

export const eliminarAlbum = async (req: Request, res: Response)=>{
    const {id} = req.params;
    try{
        await prisma.album.delete({
            where: {id: Number(id)}
        })
        res.json({Exito: "Album eliminado con exito!"})
    }
    catch(error){
        res.status(404).json({Error: "Album no encontrado!"})
    }
}