const express = require("express");
const app = express();
const puerto = 3001

app.use(express.json())

app.use("/contactos", (req, res, next)=>{
    console.log("Headers: ", req.headers);
    console.log("Body: ", req.body);
    console.log("Primero Ingresa a Middelware");

    next();
})

app.get("/contacts", (request, response) => {
    const contactos = [
        { id: 1, nombre: "Andres", celular: 123453643, ciudad: "Milagro"},
        { id: 2, nombre: "Maria", celular: 987654321, ciudad: "Quito"},
        { id: 3, nombre: "Luis", celular: 112233445, ciudad: "Guayaquil"},
        { id: 4, nombre: "Carla", celular: 556677889, ciudad: "Cuenca"},
        { id: 5, nombre: "Pedro", celular: 998877665, ciudad: "Ambato"},
        { id: 6, nombre: "Sofia", celular: 334455667, ciudad: "Loja"},
        { id: 7, nombre: "Jorge", celular: 778899001, ciudad: "Machala"},
        { id: 8, nombre: "Ana", celular: 223344556, ciudad: "Esmeraldas"},
        { id: 9, nombre: "Diego", celular: 445566778, ciudad: "Manta"},
        { id: 10, nombre: "Valeria", celular: 667788990, ciudad: "Portoviejo"}
    ]
    response.send(contactos);
})
app.post("/contactos", (req, res) => {
    req.body.id = 1;
    res.send(req.body);
})
app.put("/contactos/:idParam", (req, res) => {
    const id = req.params.idParam;
    console.log("Id recuperada de url: ", id)
    res.send(req.body)
})
app.delete("/contactos/:idEliminar", (req, res) => {
    const id = req.params.idEliminar;
    console.log("Objeto eliminado id: ", id)
    res.send("Contacto con eliminado")
})
app.listen(puerto, () => { console.log("Servidor listo en el puerto " + puerto) })   