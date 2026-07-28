import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

function Registrar() {
  const [formulario, setFormulario] = useState({
    username: "",
    password: "",
    rol: "USER",
  });
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito("");
    setMensajeError("");
    setCargando(true);

    try {
      const respuesta = await fetch(`${API_BASE_URL}/auth/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formulario),
      });

      if (respuesta.status === 201) {
        setMensajeExito(
          "¡Usuario registrado exitosamente! Redirigiendo al login..."
        );
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const textoError = await respuesta.text();
        setMensajeError(
          textoError || "No se pudo registrar el usuario. Intenta de nuevo."
        );
      }
    } catch (err) {
      setMensajeError("Error de red: no se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Crear Cuenta</h1>
        <p className="auth-subtitle">Regístrate para acceder al sistema</p>

        <form className="auth-form" onSubmit={manejarSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formulario.username}
              onChange={manejarCambio}
              placeholder="Elige un nombre de usuario"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formulario.password}
              onChange={manejarCambio}
              placeholder="Crea una contraseña segura"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rol">Rol en el sistema</label>
            <select
              id="rol"
              name="rol"
              value={formulario.rol}
              onChange={manejarCambio}
              required
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {mensajeExito && (
            <div className="alert alert-success">{mensajeExito}</div>
          )}
          {mensajeError && (
            <div className="alert alert-error">{mensajeError}</div>
          )}

          <button type="submit" className="btn btn-primary" disabled={cargando}>
            {cargando ? "Registrando..." : "Registrarme"}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="auth-link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registrar;
