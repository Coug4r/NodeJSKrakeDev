const express = require("express");
const app = express();
const puerto = 3002;
const bd = [{id: 1, marca: "Dell", procesador: "i7", memoria: 16, disco: 1000}];
let ultimoID = 0;
app.use(express.json());
app.use("/laptops", (req, res, next)=>{
    console.log("Headers: ", req.headers);
    next();
})

app.post("/laptops", (req, res)=>{
    const nuevaLaptop = req.body;
    ultimoID ++
    nuevaLaptop.id = ultimoID;
    bd.push(nuevaLaptop);
    console.log("Laptop agregada" , nuevaLaptop.id);
    res.send(nuevaLaptop)
})

app.get("/laptops", (req,res)=>{
    res.json(bd)
})

app.put("/laptops/:idLap", (req, res) => {
    const id = parseInt(req.params.idLap); // convertir a número
    const datosActualizados = req.body;
    const index = bd.findIndex(laptop => laptop.id === id);
    if (index !== -1) {
        bd[index] = { ...bd[index], ...datosActualizados };
        console.log("Laptop actualizada:", bd[index]);
        res.json({ mensaje: "Laptop actualizada con éxito", laptop: bd[index] });
    } else {
        res.status(404).json({ mensaje: "Laptop no encontrada" });
    }
});

app.delete("/laptops/:idLap", (req,res)=>{
    const id = parseInt(req.params.idLap); // convertir a número
    const index = bd.findIndex(laptop => laptop.id === id);

    if (index !== -1) {
        // Eliminar del array
        const eliminada = bd.splice(index, 1); // splice devuelve el elemento eliminado
        console.log("Laptop eliminada:", eliminada[0]);
        res.json({ mensaje: "Laptop eliminada con éxito", laptop: eliminada[0] });
    } else {
        res.status(404).json({ mensaje: "Laptop no encontrada" });
    }
})
app.listen(puerto, () => { console.log("Servidor listo en el puerto " + puerto) })   