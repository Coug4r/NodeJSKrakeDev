import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import {swaggerDocs} from "../src/swagger.js"
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.listen(port, ()=>{
    swaggerDocs(app, port);
    console.log("Servidor levantado en el puerto", port);
});