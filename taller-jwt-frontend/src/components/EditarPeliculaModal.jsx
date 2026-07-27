import { useState } from "react";
import { API_BASE_URL } from "../config/apiConfig";

function EditarPeliculaModal({ pelicula, onCerrar, onActualizado }) {
  const [titulo, setTitulo] = useState(pelicula.titulo || "");
  const [director, setDirector] = useState(pelicula.director || "");
  const [anio, setAnio] = useState(pelicula.anio || "");
  const [archivo, setArchivo] = useState(null);
  const [erroMsg, setErroMsg] = useState("");
  const [enviando, setEnviando] = useState(false);

  const manejarArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setErroMsg("");
    setEnviando(true);

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("director", director);
    formData.append("anio", anio);
    if (archivo) {
      formData.append("poster", archivo);
      formData.append("mimeType", archivo.type);
    }

    try {
      const respuesta = await fetch(`${API_BASE_URL}/auth/peliculas/${pelicula.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo actualizar la película!");
      }

      const actualizada = await respuesta.json();
      onActualizado(actualizada);
    } catch (error) {
      setErroMsg(error.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="card-title">Editar Película</h2>

        {erroMsg && <div className="alert alert-error">{erroMsg}</div>}

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
            <label>Nuevo poster (opcional):</label>
            <input type="file" accept="image/*" onChange={manejarArchivo} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={enviando}>
              {enviando ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCerrar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarPeliculaModal;
