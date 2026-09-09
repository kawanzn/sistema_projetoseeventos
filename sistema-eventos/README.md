# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Deploy / Vercel (monorepo `front/` + `back/`)

Este repositório foi reorganizado para conter duas pastas na raiz: `front/` (frontend Vite) e `back/` (backend Spring Boot).

Para que o Vercel faça o build do frontend automaticamente a partir da pasta `front/`, há um arquivo `vercel.json` na raiz que instrui o builder a usar `front/package.json` e gerar o output em `front/dist`.

Passos rápidos no Vercel:

1. No painel do Vercel, abra seu projeto e vá em Settings → Git. Garanta que o repositório e a branch (`main`) estão corretos.
2. Em Settings → Build & Development Settings, confirme que o Framework Preset está em `Vite` (opcional, o `vercel.json` já aponta para `front`).
3. Em Environment Variables adicione `VITE_API_URL` apontando para a URL do seu backend (ex.: `https://meu-backend.example.com`).
4. Volte para Deploys e clique em Redeploy (ou faça um novo push). O Vercel deverá executar o build usando `front/package.json`.

Observação: não posso alterar as configurações do painel do Vercel sem acesso. Se preferir, forneça acesso ou execute o passo 2 e 3 no painel conforme acima.
