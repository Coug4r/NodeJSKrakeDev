import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/apiConfig";

function ListaPeliculas({ peliculas, onEditar, onEliminar }) {
  const [postersUrl, setPostersUrl] = useState({});

  useEffect(() => {
    const urlsCreadas = [];

    const descargarPosters = async () => {
      for (const pelicula of peliculas) {
        try {
          const res = await fetch(`${API_BASE_URL}/auth/peliculas/${pelicula.id}/poster`);
          if (res.ok) {
            const blob = await res.blob();
            const urlLocal = URL.createObjectURL(blob);
            urlsCreadas.push(urlLocal);

            setPostersUrl((prev) => ({
              ...prev,
              [pelicula.id]: urlLocal,
            }));
          }
        } catch (error) {
          console.log("Fallo al descargar el poster", error);
        }
      }
    };

    if (peliculas.length > 0) {
      descargarPosters();
    }

    return () => {
      for (const url of urlsCreadas) {
        URL.revokeObjectURL(url);
      }
    };
  }, [peliculas]);

  if (peliculas.length === 0) {
    return <p className="empty-msg">No hay películas registradas</p>;
  }

  return (
    <div className="movies-grid">
      {peliculas.map((p) => (
        <div className="movie-card" key={p.id}>
          {postersUrl[p.id] ? (
            <img className="movie-poster" src={postersUrl[p.id]} alt={`Poster de ${p.titulo}`} />
          ) : (
            <div className="movie-poster-placeholder">Sin poster</div>
          )}
          <div className="movie-info">
            <h3>{p.titulo}</h3>
            <p>Director: {p.director}</p>
            <p>Año: {p.anio}</p>
          </div>
          <div className="movie-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => onEditar(p)}>
              Editar
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onEliminar(p.id)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaPeliculas;
