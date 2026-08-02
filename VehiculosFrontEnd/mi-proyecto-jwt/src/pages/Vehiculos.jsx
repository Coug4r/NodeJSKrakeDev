import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";
import { useAuth } from "../context/AuthContext";
import ListarVehiculos from "../components/ListaVehiculos";

function Vehiculos() {
  const navigate = useNavigate();
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { token } = useAuth();
  const [listaVehiculos, setListaVehiculos] = useState([]);

  const cargarVehiculos = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/vehiculos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("No se pudo listar los vehículos!");
      }
      const datos = await response.json();
      setListaVehiculos(datos);
    } catch (error) {
      setErrorMsg(error.message);
    }
  }, [token]);

  useEffect(() => {
    cargarVehiculos();
  }, [cargarVehiculos]);

  const manejarArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!archivo) {
      setErrorMsg("Debe seleccionar una foto del vehículo!");
      return;
    }

    const formData = new FormData();
    formData.append("file", archivo);
    formData.append("marca", marca);
    formData.append("modelo", modelo);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/vehiculos/registrar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Error || "No se pudo registrar el vehículo!");  
      }
      setSuccessMsg("Vehículo registrado con éxito");
      setMarca("");
      setModelo("");
      setArchivo(null);
      cargarVehiculos();
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Gestión de Vehículos</h1>
        <p className="auth-subtitle">Registra un nuevo vehículo</p>

        <form className="auth-form" onSubmit={manejarSubmit}>
          <div className="form-group">
            <label>Marca</label>
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Ingresa la marca"
              required
            />
          </div>

          <div className="form-group">
            <label>Modelo</label>
            <input
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              placeholder="Ingresa el modelo"
              required
            />
          </div>

          <div className="form-group">
            <label>Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={manejarArchivo}
              required
            />
          </div>

          {errorMsg && <div className="alert alert-error">{errorMsg}</div>}
          {successMsg && <div className="alert alert-success">{successMsg}</div>}

          <button type="submit" className="btn btn-primary">
            Registrar Vehículo
          </button>
        </form>

        <div className="auth-footer">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/perfil")}
          >
            Ir a Perfil
          </button>
        </div>

        <ListarVehiculos vehiculos={listaVehiculos} />
      </div>
    </div>
  );
}

export default Vehiculos;
