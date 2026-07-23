import express, {type Request, type Response} from 'express';
import albumRouter from '../src/routes/albumes.js';
import cancionesRouter from '../src/routes/canciones.js';

const app = express();
const port = 3001;

app.use(express.json());

app.use("/albums", albumRouter);
app.use("/canciones", cancionesRouter)

app.listen(port, ()=>{
    console.log("Servidor corriendo el puerto: ", port);
})