import express, {type Request, type Response} from 'express';

const app = express();
const port = 3001;

app.use(express.json());

app.get("/pin" , (req: Request, res: Response) =>{
    res.send("Servidor funcionando con TypeScript");
})

app.listen(port, ()=>{
    console.log("Servidor corriendo en el puerto: ", port);
})