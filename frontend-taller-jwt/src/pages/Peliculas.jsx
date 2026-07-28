import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";
import { useAuth } from "../context/AuthContext";
import ListaPeliculas from "../components/ListaPeliculas";

const FORMULARIO_VACIO = { titulo: "", director: "", anio: "" };

function Peliculas() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [peliculas, setPeliculas] = useState([]);
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [archivo, setArchivo] = useState(null);
  const [idEnEdicion, setIdEnEdicion] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [cargando, setCargando] = useState(false);

  const cargarPeliculas = useCallback(async () => {
    try {
      const respuesta = await fetch(`${API_BASE_URL}/auth/peliculas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!respuesta.ok) {
        throw new Error("No se pudo listar las películas!");
      }
      const datos = await respuesta.json();
      setPeliculas(datos);
    } catch (error) {
      setErrorMsg(error.message);
    }
  }, [token]);

  useEffect(() => {
    cargarPeliculas();
  }, [cargarPeliculas]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const manejarArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const limpiarFormulario = () => {
    setFormulario(FORMULARIO_VACIO);
    setArchivo(null);
    setIdEnEdicion(null);
  };

  const manejarEditar = (pelicula) => {
    setIdEnEdicion(pelicula.id);
    setFormulario({
      titulo: pelicula.titulo,
      director: pelicula.director,
      anio: pelicula.anio,
    });
    setArchivo(null);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const manejarEliminar = async (id) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const respuesta = await fetch(`${API_BASE_URL}/auth/peliculas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!respuesta.ok) {
        throw new Error("No se pudo eliminar la película!");
      }
      setSuccessMsg("Película eliminada con éxito");
      if (idEnEdicion === id) {
        limpiarFormulario();
      }
      cargarPeliculas();
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!idEnEdicion && !archivo) {
      setErrorMsg("Debe seleccionar un poster para la película!");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", formulario.titulo);
    formData.append("director", formulario.director);
    formData.append("anio", formulario.anio);
    if (archivo) {
      formData.append(idEnEdicion ? "poster" : "file", archivo);
      if (idEnEdicion) {
        formData.append("mimeType", archivo.type);
      }
    }

    setCargando(true);
    try {
      const url = idEnEdicion
        ? `${API_BASE_URL}/auth/peliculas/${idEnEdicion}`
        : `${API_BASE_URL}/auth/peliculas/create`;

      const respuesta = await fetch(url, {
        method: idEnEdicion ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!respuesta.ok) {
        throw new Error(
          idEnEdicion
            ? "No se pudo actualizar la película!"
            : "No se pudo registrar la película!"
        );
      }

      setSuccessMsg(
        idEnEdicion
          ? "Película actualizada con éxito"
          : "Película registrada con éxito"
      );
      limpiarFormulario();
      cargarPeliculas();
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="peliculas-page">
      <header className="peliculas-header">
        <h1>Gestión de Películas</h1>
        <button className="btn btn-secundario" onClick={() => navigate("/perfil")}>
          Volver al Perfil
        </button>
      </header>

      <div className="peliculas-contenido">
        <div className="auth-card peliculas-form-card">
          <h2 className="auth-title">
            {idEnEdicion ? "Editar Película" : "Registrar Nueva Película"}
          </h2>

          <form className="auth-form" onSubmit={manejarSubmit}>
            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input
                id="titulo"
                name="titulo"
                type="text"
                value={formulario.titulo}
                onChange={manejarCambio}
                placeholder="Ej. El Padrino"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="director">Director</label>
              <input
                id="director"
                name="director"
                type="text"
                value={formulario.director}
                onChange={manejarCambio}
                placeholder="Ej. Francis Ford Coppola"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="anio">Año</label>
              <input
                id="anio"
                name="anio"
                type="number"
                value={formulario.anio}
                onChange={manejarCambio}
                placeholder="Ej. 1972"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="poster">
                Poster {idEnEdicion && "(opcional, deja vacío para conservar el actual)"}
              </label>
              <input
                id="poster"
                type="file"
                accept="image/*"
                onChange={manejarArchivo}
                required={!idEnEdicion}
              />
            </div>

            {errorMsg && <div className="alert alert-error">{errorMsg}</div>}
            {successMsg && <div className="alert alert-success">{successMsg}</div>}

            <button type="submit" className="btn btn-primary" disabled={cargando}>
              {cargando
                ? "Guardando..."
                : idEnEdicion
                ? "Actualizar Película"
                : "Registrar Película"}
            </button>

            {idEnEdicion && (
              <button
                type="button"
                className="btn btn-secundario"
                onClick={limpiarFormulario}
              >
                Cancelar Edición
              </button>
            )}
          </form>
        </div>

        <ListaPeliculas
          peliculas={peliculas}
          onEditar={manejarEditar}
          onEliminar={manejarEliminar}
        />
      </div>
    </div>
  );
}

export default Peliculas;
