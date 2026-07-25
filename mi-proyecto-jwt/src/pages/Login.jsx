import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config/apiConfig.js'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const texto = await response.text()
        throw new Error(texto || 'Usuario o contraseña incorrectos')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      navigate('/perfil')
    } catch (err) {
      setError(err.message || 'No se pudo conectar con el servidor')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="auth-page">
      <aside className="auth-badge-panel">
        <div className="badge-card">
          <span className="badge-chip">ACCESO</span>
          <h1>mi-proyecto-jwt</h1>
          <p className="badge-caption">Autenticación basada en JSON Web Tokens</p>
          <div className="badge-token">
            <span className="badge-token-text">eyJhbGciOiJIUzI1NiJ9...</span>
            <span className="badge-token-alg">HS256</span>
          </div>
        </div>
      </aside>

      <main className="auth-form-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>
          <p className="auth-subtitle">Ingresa tus credenciales para continuar</p>

          {error && <div className="mensaje mensaje-error">{error}</div>}

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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>

          <p className="auth-switch">
            ¿No tienes una cuenta activa? <Link to="/registrar">Regístrate aquí</Link>
          </p>
        </form>
      </main>
    </div>
  )
}

export default Login
