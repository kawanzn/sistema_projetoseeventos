Front-end changes
-----------------

- Adicionado `src/components/Login.jsx`: componente de login simples que chama `/api/auth/login`.
- Adicionado `src/auth.js`: helper para autenticação (login, getToken, logout) que usa `localStorage`.
- Modificado `src/App.jsx` para apresentar a tela de login quando não autenticado e mostrar o aplicativo somente após login.

Como testar localmente

1. Inicie o backend (ver [BACKEND.md](BACKEND.md) para instruções).
2. Inicie o front-end com `npm install` e `npm run dev` (Vite).
3. Abra a aplicação e faça login com usuário `admin` e senha `admin` (usuário criado em memória para testes).

Observações

- O token JWT retornado é armazenado em `localStorage` sob a chave `auth_token`.
- Em produção, é recomendável utilizar cookie `HttpOnly` ou armazenamento mais seguro que `localStorage`.
- A URL do backend pode ser configurada via variável de ambiente `VITE_API_URL`.
