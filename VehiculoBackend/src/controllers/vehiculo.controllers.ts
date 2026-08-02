import { type Request, type Response } from "express";
import prisma from "../database/prisma.js";

export const obtenerVehiculos = async (req: Request, res: Response) => {
  try {
    const vehiculos = await prisma.vehiculos.findMany({
      select: {
        id: true,
        marca: true,
        modelo: true,
        mime_type: true,
      },
    });
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ Error: "Error al obtener los vehículos!" });
  }
};

export const registrarVehiculo = async (req: Request, res: Response) => {
  const { marca, modelo } = req.body;
  const archivo = req.file;
  const rolUsuario = (req as any).usuario.rol;
  if (!archivo) {
    res.status(400).json({ Error: "Debe seleccionar una imagen!" });
    return;
  }
  if(archivo.mimetype != "image/png" && archivo.mimetype != "image/jpeg" ){
    res.status(400).json({ error: "Solo se permiten imágenes JPG o PNG" });
  }
  if(rolUsuario == "ADMIN"){
  try {
    const nuevoVehiculo = await prisma.vehiculos.create({
      data: {
        marca,
        modelo,
        mime_type: archivo.mimetype,
        foto: Buffer.from(archivo.buffer),
        }
    });
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    res.status(500).json({ Error: "Error al registrar el vehículo!" });
  }
  }else{
    res.status(403).json({Error: "No tienes permiso de administrador!"})
  }
};

export const obtenerFotoVehiculo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vehiculo = await prisma.vehiculos.findUnique({
      where: { id: Number(id) },
    });
    if (!vehiculo) {
      res.status(404).json({ Error: "Vehículo no encontrado!" });
      return;
    }
    res.setHeader("Content-Type", vehiculo.mime_type);
    res.send(vehiculo.foto);
  } catch (error) {
    res.status(500).json({ Error: "Error al obtener la foto del vehículo!" });
  }
};
