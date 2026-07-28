import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../database/prisma.js";

// Registrar usuario
export const registrar = async (req: Request, res: Response) => {
  const { username, password, rol } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ Error: "username y password son obligatorios!" });
    }

    const existente = await prisma.usuarios.findFirst({ where: { username } });
    if (existente) {
      return res.status(409).json({ Error: "El usuario ya existe!" });
    }

    const passwordHasheado = await bcrypt.hash(password, 10);
    const nuevoUsuario = await prisma.usuarios.create({
      data: {
        username,
        password: passwordHasheado,
        rol: rol ?? null,
      },
      select: { id: true, username: true, rol: true },
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ Error: "Error en el servidor!" });
  }
};

// Login usuario
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const usuario = await prisma.usuarios.findFirst({
      where: { username },
    });

    if (!usuario) {
      return res.status(401).json({ Error: "Credenciales incorrectas!" });
    }

    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res.status(401).json({ Error: "Credenciales incorrectas!" });
    }

    const token = jwt.sign(
      { id: usuario.id, username: usuario.username, rol: usuario.rol },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ Error: "Error en el servidor!" });
  }
};

// Ver perfil protegido por JWT
export const verPerfil = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      Error:
        "Acceso denegado: debe proveer un token válido en la cabecera Authorization!",
    });
  }

  const token = authHeader.substring(7);

  try {
    const datosToken: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "secreto"
    );

    return res.json({
      Mensaje: "Bienvenido sistema protegido por JWT",
      Usuario: datosToken.username,
      Rol: datosToken.rol,
      Estatus: "Autenticado correctamente!",
    });
  } catch (error) {
    return res
      .status(401)
      .json({ Error: "Acceso denegado: token inválido o expirado!" });
  }
};
