import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

export interface CustomeRequest extends Request{
    usuario?: any;
}

export const validarAuth = (req: CustomeRequest, res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        res.status(401).json({Error: "Acceso denegado!"})
        return;
    }
    try{
        const verificado = jwt.verify(token, process.env.JWT_SECRET || "secreto");
        req.usuario = verificado;
        next();
    }catch(error){
        res.status(403).json({Error: "Token invalido o expirado!"})
    }

}