import { useState } from 'react'
import { login } from '../auth'

export default function Login({ onSuccess }) {

  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await login(username, password)
      onSuccess()
    } catch (err) {
      setError('Usuário ou senha inválidos')
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>
          Usuário
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </label>

        <label>
          Senha
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        {error && <div className="login-error">{error}</div>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
