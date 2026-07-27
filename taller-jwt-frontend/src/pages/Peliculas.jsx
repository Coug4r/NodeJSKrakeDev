import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "../config/apiConfig";
import ListaPeliculas from "../components/ListaPeliculas";
import EditarPeliculaModal from "../components/EditarPeliculaModal";

function Peliculas() {
  const [titulo, setTitulo] = useState("");
  const [director, setDirector] = useState("");
  const [anio, setAnio] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [erroMsg, setErroMsg] = useState("");
  const [succesMsg, setSuccesMsg] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [listaPeliculas, setListaPeliculas] = useState([]);
  const [peliculaEditando, setPeliculaEditando] = useState(null);

  const cargarPeliculas = useCallback(async () => {
    try {
      const respuesta = await fetch(`${API_BASE_URL}/auth/peliculas`);
      if (!respuesta.ok) {
        throw new Error("No se pudo listar las películas!");
      }
      const datos = await respuesta.json();
      setListaPeliculas(datos);
    } catch (error) {
      setErroMsg(error.message);
    }
  }, []);

  useEffect(() => {
    cargarPeliculas();
  }, [cargarPeliculas]);

  const manejarArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setErroMsg("");
    setSuccesMsg("");

    if (!archivo) {
      setErroMsg("Debe seleccionar un poster de la película!");
      return;
    }

    const formData = new FormData();
    formData.append("file", archivo);
    formData.append("titulo", titulo);
    formData.append("director", director);
    formData.append("anio", anio);

    setEnviando(true);
    try {
      const respuesta = await fetch(`${API_BASE_URL}/auth/peliculas/create`, {
        method: "POST",
        body: formData,
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo registrar la película!");
      }

      setSuccesMsg("Película registrada con éxito");
      setTitulo("");
      setDirector("");
      setAnio("");
      setArchivo(null);
      e.target.reset();
      cargarPeliculas();
    } catch (error) {
      setErroMsg(error.message);
    } finally {
      setEnviando(false);
    }
  };

  const eliminarPelicula = async (id) => {
    setErroMsg("");
    setSuccesMsg("");
    try {
      const respuesta = await fetch(`${API_BASE_URL}/auth/peliculas/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo eliminar la película!");
      }

      setSuccesMsg("Película eliminada con éxito");
      setListaPeliculas((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      setErroMsg(error.message);
    }
  };

  const manejarActualizado = (peliculaActualizada) => {
    setListaPeliculas((prev) =>
      prev.map((p) => (p.id === peliculaActualizada.id ? peliculaActualizada : p))
    );
    setPeliculaEditando(null);
    setSuccesMsg("Película actualizada con éxito");
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Gestión de Películas</h1>
      <p className="page-subtitle">Taller JWT - Acceso directo al backend</p>

      {erroMsg && <div className="alert alert-error">{erroMsg}</div>}
      {succesMsg && <div className="alert alert-success">{succesMsg}</div>}

      <div className="card">
        <h2 className="card-title">Registrar Nueva Película</h2>
        <form className="form" onSubmit={manejarSubmit}>
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Director:</label>
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Año:</label>
            <input
              type="number"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Poster:</label>
            <input type="file" accept="image/*" onChange={manejarArchivo} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={enviando}>
            {enviando ? "Registrando..." : "Registrar Película"}
          </button>
        </form>
      </div>

      <div className="movies-section">
        <h2>Películas Registradas</h2>
        <ListaPeliculas
          peliculas={listaPeliculas}
          onEditar={setPeliculaEditando}
          onEliminar={eliminarPelicula}
        />
      </div>

      {peliculaEditando && (
        <EditarPeliculaModal
          pelicula={peliculaEditando}
          onCerrar={() => setPeliculaEditando(null)}
          onActualizado={manejarActualizado}
        />
      )}
    </div>
  );
}

export default Peliculas;
