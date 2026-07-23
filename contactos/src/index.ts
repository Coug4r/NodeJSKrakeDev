import express, {type Request, type Response} from 'express';
import contactosRouter from '../src/routes/contactos.js';

const app = express();
const port = 3001;

app.use(express.json());

app.use("/contactos", contactosRouter);

app.listen(port, ()=>{
    console.log("Servidor corriendo el puerto: ", port);
})