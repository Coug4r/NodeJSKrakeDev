import {type Request, type Response} from 'express';
import prisma from '../database/prisma.js';

export const obtenerPeliculas = async (req: Request, res: Response) => {
    try {
        const peliculas = await prisma.peliculas.findMany({
        });
        res.json(peliculas);
    } catch (error) {
        console.error("Error al obtener películas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const addPeliculas = async (req: Request, res: Response) => {
    const {titulo, director, anio} = req.body;
    const archivo = req.file;
    try {
        const nuevaPelicula = await prisma.peliculas.create({
            data: {
                titulo,
                director,
                anio: anio ? Number(anio) : null,
                ...(archivo
                  ? { poster: new Uint8Array(archivo.buffer), mime_type: archivo.mimetype }
                  : {}),
            },
        });
        res.status(201).json(nuevaPelicula);
    } catch (error) {
        console.error("Error al registrar película:", error);
        res.status(500).json({Error: "Error al registrar la película!"});
    }
}

export const obtenerPoster = async (req: Request, res: Response)=>{
    const {id} = req.params;
    try {
        const pelicula = await prisma.peliculas.findUnique({
            where: {id:Number(id)}
        });
        if(!pelicula){
            res.status(404).json({Error: "Pelicula no encontrada!"})
            return;
        }
        res.setHeader("Content-Type", pelicula.mime_type ?? "application/octet-stream");
        res.send(pelicula.poster);
    } catch (error) {
        res.status(500).json({Error: "Error al obtener el poster!"})
    }
}

export const actualizarPelicula = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, director, anio } = req.body;
  const archivo = req.file;

  try {
    const pelicula = await prisma.peliculas.update({
      where: { id: Number(id) },
      data: {
        titulo,
        director,
        anio: anio ? Number(anio) : null,
        ...(archivo
          ? { poster: new Uint8Array(archivo.buffer), mime_type: archivo.mimetype }
          : {}),
      },
    });
    res.json({ Exito: "Película actualizada", pelicula });
  } catch (error) {
    console.error("Error al actualizar película:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const eliminarPelicula = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.peliculas.delete({
      where: { id: Number(id) },
    });

    res.json({ mensaje: "Película eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar película:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};