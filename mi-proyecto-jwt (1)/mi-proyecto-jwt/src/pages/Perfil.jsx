import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";
import { useAuth } from "../context/AuthContext";

function Perfil() {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const respuesta = await fetch(`${API_BASE_URL}/auth/verPerfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (respuesta.ok) {
          const info = await respuesta.json();
          setDatos(info);
        } else {
          setError("Sesión inválida o expirada. Inicia sesión de nuevo.");
          localStorage.removeItem("token");
          setTimeout(() => navigate("/login"), 2000);
        }
      } catch (err) {
        setError("No se pudo conectar con el servidor.");
      }
    };

    obtenerPerfil();
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Perfil</h1>

        {error && <div className="alert alert-error">{error}</div>}

        {datos && (
          <div className="perfil-info">
            <p>
              <strong>Mensaje:</strong> {datos.Mensaje}
            </p>
            <p>
              <strong>Usuario:</strong> {datos.Usuario}
            </p>
            <p>
              <strong>Rol:</strong> {datos.Rol}
            </p>
            <p>
              <strong>Estatus:</strong> {datos.Estatus}
            </p>
          </div>
        )}

        <button className="btn btn-primary" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
        <button className="btn btn-primary"  onClick={()=>{navigate("/vehiculos")}}>
          Gestionar Vehiculos
        </button>
      </div>
    </div>
  );
}

export default Perfil;
