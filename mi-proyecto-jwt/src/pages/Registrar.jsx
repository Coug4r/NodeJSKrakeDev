import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config/apiConfig.js'

function Registrar() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('USER')
  const [mensaje, setMensaje] = useState(null) // { tipo: 'exito' | 'error', texto }
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje(null)
    setCargando(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, rol }),
      })

      if (response.status === 201) {
        setMensaje({
          tipo: 'exito',
          texto: 'Usuario registrado correctamente. Redirigiendo al login...',
        })
        setTimeout(() => navigate('/login'), 2000)
        return
      }

      // Error del servidor: ej. el nombre de usuario ya está registrado
      const texto = await response.text()
      setMensaje({
        tipo: 'error',
        texto: texto || `No se pudo completar el registro (código ${response.status}).`,
      })
    } catch (err) {
      // Error de red: backend caído, sin conexión, CORS, etc.
      setMensaje({
        tipo: 'error',
        texto: 'No se pudo conectar con el servidor. Intenta nuevamente.',
      })
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="auth-page">
      <aside className="auth-badge-panel">
        <div className="badge-card">
          <span className="badge-chip">NUEVO USUARIO</span>
          <h1>mi-proyecto-jwt</h1>
          <p className="badge-caption">Crea una cuenta para acceder al sistema</p>
          <div className="badge-token">
            <span className="badge-token-text">rol seleccionado</span>
            <span className={`badge-rol badge-rol-${rol.toLowerCase()}`}>{rol}</span>
          </div>
        </div>
      </aside>

      <main className="auth-form-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Crear cuenta</h2>
          <p className="auth-subtitle">Regístrate para obtener acceso al sistema</p>

          {mensaje && (
            <div className={`mensaje ${mensaje.tipo === 'exito' ? 'mensaje-exito' : 'mensaje-error'}`}>
              {mensaje.texto}
            </div>
          )}

          <label htmlFor="username">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="rol">Rol en el sistema</label>
          <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button type="submit" disabled={cargando}>
            {cargando ? 'Registrando...' : 'Registrarme'}
          </button>

          <p className="auth-switch">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </main>
    </div>
  )
}

export default Registrar
