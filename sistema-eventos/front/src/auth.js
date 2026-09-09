const API = import.meta.env.VITE_API_URL || ''

export async function login(username, password) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  if (!res.ok) throw new Error('Login failed')

  const data = await res.json()
  localStorage.setItem('auth_token', data.token)
}

export function getToken() {
  return localStorage.getItem('auth_token')
}

export function logout() {
  localStorage.removeItem('auth_token')
  window.location.reload()
}
