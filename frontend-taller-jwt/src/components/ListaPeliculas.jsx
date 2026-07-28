import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/apiConfig";

function ListaPeliculas({ peliculas, onEditar, onEliminar }) {
  const [postersUrl, setPostersUrl] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    const urlsCreadas = [];

    const descargarPosters = async () => {
      for (const pelicula of peliculas) {
        try {
          const res = await fetch(
            `${API_BASE_URL}/auth/peliculas/${pelicula.id}/poster`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

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
  }, [peliculas, token]);

  return (
    <div className="peliculas-lista">
      <h2 className="seccion-titulo">Catálogo de Películas</h2>
      {peliculas.length === 0 ? (
        <p className="texto-vacio">Aún no hay películas registradas</p>
      ) : (
        <div className="peliculas-grid">
          {peliculas.map((p) => (
            <div className="pelicula-card" key={p.id}>
              <div className="pelicula-poster">
                {postersUrl[p.id] ? (
                  <img src={postersUrl[p.id]} alt={`Poster de ${p.titulo}`} />
                ) : (
                  <div className="pelicula-poster-vacio">Sin poster</div>
                )}
              </div>
              <div className="pelicula-info">
                <h3>{p.titulo}</h3>
                <p className="pelicula-director">Dir. {p.director}</p>
                <p className="pelicula-anio">{p.anio}</p>
              </div>
              <div className="pelicula-acciones">
                <button
                  className="btn btn-editar"
                  onClick={() => onEditar(p)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-eliminar"
                  onClick={() => onEliminar(p.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaPeliculas;
