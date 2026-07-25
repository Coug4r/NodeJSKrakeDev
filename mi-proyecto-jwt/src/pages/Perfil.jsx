import { useNavigate } from 'react-router-dom'

function Perfil() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="perfil-page">
      <div className="perfil-card">
        <span className="badge-chip">SESIÓN ACTIVA</span>
        <h1>Perfil</h1>
        <p>Has iniciado sesión correctamente con tu token JWT.</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  )
}

export default Perfil
