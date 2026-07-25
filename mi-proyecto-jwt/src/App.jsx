import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Registrar from './pages/Registrar.jsx'
import Perfil from './pages/Perfil.jsx'

// Envoltorio simple: solo deja pasar si existe un token JWT guardado.
function RutaProtegida({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      {/* Rutas públicas: no requieren token JWT */}
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Registrar />} />

      {/* Ruta protegida: requiere sesión iniciada */}
      <Route
        path="/perfil"
        element={
          <RutaProtegida>
            <Perfil />
          </RutaProtegida>
        }
      />

      {/* Redirecciones por defecto */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
