import { useState, useEffect, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";
import {useAuth} from '../context/AuthContext'
import ListarVehiculos from "../components/ListaVehiculos";

function vehiculos() {
    const navigate = useNavigate();
    const [marca, setMarca] = useState("");
    const [modelo, setmodelo] = useState("");
    const [archivo, setarchivo] = useState(null);
    const [erroMsg, seterroMsg] = useState("");
    const [succesMsg, setsuccesMsg] = useState("");
    const {token} = useAuth();
    const [ListaVehiculos, setListaVehiculos] = useState([])
    
    const cargarVehiculos = useCallback( async ()=>{
        try {
            console.log("Token usado en fetch:", token);
            const responce = await fetch(`${API_BASE_URL}/auth/vehiculo`,{
                 headers:{
                    Authorization: `Bearer ${token}`
                 }
            });
            if(!responce.ok){
                throw new Error("No se pudo listar los vehiculos!");
            }

            const datos = await responce.json();
            setListaVehiculos(datos);

        } catch (error) {
            seterroMsg(error.message)
        }
    },[token])

    useEffect(()=>{
        cargarVehiculos();
    },[cargarVehiculos])
    
    const manejarArchivo = (e) => {
        setarchivo(e.target.files[0]);
    }

    const manejarSubmit = async (e) => {
        e.preventDefault();
        seterroMsg("");
        setsuccesMsg("");

        if (!archivo) {
            seterroMsg("Debe Seleccionar una foto del vehiculo!");
            return;
        }
        const formData = new FormData();
        formData.append("file", archivo);
        formData.append("marca", marca);
        formData.append("modelo", modelo);

        try {
            const responce = await fetch(`${API_BASE_URL}/auth/vehiculo/registrar`, {
                method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,    
            });
            if(!responce.ok){
                throw new Error("No se pudo registrar el vehiculo!");
            }
            setsuccesMsg("Vhiculo registrado con exito");
            setMarca("");
            setmodelo("");
            setarchivo(null);
            cargarVehiculos();

        }
        catch (error) {
            seterroMsg(error.message)
        }
    }
    return (
        <div>
            <button className="btn btn-primary" onClick={() => { navigate("/perfil") }}>
                Gestionar Vehiculos
            </button>
            <h1>GESTION DE VEHICULOS</h1>
            <h2>REGISTRA NUEVO VEHICULO</h2>
            <form onSubmit={manejarSubmit}>
                <div>
                    <label>Marca: </label>
                    <input
                        type="text"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Modelo: </label>
                    <input
                        type="text"
                        value={modelo}
                        onChange={(e) => setmodelo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Archivo: </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={manejarArchivo}
                        required
                    />
                </div>
                <button type="submit"> REGISTRAR VEHICULO</button>
            </form>
            <form>
                    {erroMsg && <p>{erroMsg} </p>}
                    {succesMsg && <p>{succesMsg} </p>}
                    <ListarVehiculos
                        vehiculos={ListaVehiculos}
                    />
            </form>
        </div>
    )
}
export default vehiculos;