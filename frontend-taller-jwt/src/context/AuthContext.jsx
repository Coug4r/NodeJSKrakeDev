import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Decodifica el payload de un JWT sin necesitar una librería externa
function decodificarToken(token) {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(() => {
    const t = localStorage.getItem("token");
    return t ? decodificarToken(t) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setUsuario(decodificarToken(token));
    } else {
      localStorage.removeItem("token");
      setUsuario(null);
    }
  }, [token]);

  const login = (nuevoToken) => setToken(nuevoToken);
  const logout = () => setToken(null);

  const value = {
    token,
    usuario,           // datos decodificados del JWT: { sub, rol, ... }
    estaAutenticado: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  }
  return context;
}
