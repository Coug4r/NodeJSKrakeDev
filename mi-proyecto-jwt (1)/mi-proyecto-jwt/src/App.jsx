import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Registrar from "./pages/Registrar.jsx";
import Perfil from "./pages/Perfil.jsx";
import Vehiculos from "./pages/Vehiculos.jsx";
import { useAuth } from "../src/context/AuthContext.jsx";

function RutaProtegida() {
  const { estaAutenticado } = useAuth();
  return estaAutenticado ? <Outlet /> : <Navigate to="/login" replace />;
}


function App() {
  return (
    <Routes>
      {/* Rutas públicas: no requieren token JWT */}
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Registrar />} />

      {/* Ruta protegida: requiere token JWT */}
      <Route element={<RutaProtegida />}>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/vehiculos" element={<Vehiculos/>}/>
      </Route>

      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
