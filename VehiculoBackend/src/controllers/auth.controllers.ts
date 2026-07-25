import { type Request, type Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import prisma from "../database/prisma.js";

export const login = async (req:Request, res:Response)=>{
    const {username, password} = req.body;
    try{
        const usuario = await prisma.usuarios.findFirst({
            where:{username: username}
        })
        if(!usuario){
            res.status(401).json({Error: "Credenciales incorrectas!"});
            return;
        }
        const passwordCorrecto = await bcrypt.compare(password, usuario.password);
        if(!passwordCorrecto){
            res.status(401).json({Error: "Credenciales incorrectas!"});
            return;
        }
        const token = jwt.sign(
            {id: usuario.id, username: usuario.username},
            process.env.JWT_SECRET || "secreto",
            {expiresIn: "2h"}
        )
        res.json({token})
    }catch(error){
        res.status(500).json({Error: "Error en el servidor!"})
    }
}