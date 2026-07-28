import express, {type Request, type Response} from 'express';
import authRouter from '../src/routes/auth.js';
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

app.listen(port, ()=>{
    console.log("Servidor corriendo el puerto: ", port);
})