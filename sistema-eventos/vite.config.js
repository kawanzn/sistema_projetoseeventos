// =====================================================
// IMPORTAÇÕES
// =====================================================

// Importa a função usada para configurar o Vite
import { defineConfig } from 'vite'

// Plugin responsável por fazer o React funcionar com o Vite
import react from '@vitejs/plugin-react'

// Plugin responsável por adicionar suporte a PWA
import { VitePWA } from 'vite-plugin-pwa'

// =====================================================
// CONFIGURAÇÃO DO VITE
// =====================================================

export default defineConfig({
  plugins: [
    // Ativa o React
    react(),

    // =================================================
    // CONFIGURAÇÃO DO PWA
    // =================================================

    VitePWA({
      // Atualiza automaticamente o Service Worker
      // quando uma nova versão do sistema for publicada
      registerType: 'autoUpdate',

      // Arquivos adicionais da pasta "public"
      // que serão incluídos no PWA
      includeAssets: ['favicon.ico'],

      // =================================================
      // MANIFESTO DO APLICATIVO
      // =================================================
      // O manifest define como o sistema será apresentado
      // quando for instalado no computador ou celular.

      manifest: {
        // Nome completo do aplicativo
        name: 'Sistema de Projetos e Eventos',

        // Nome curto exibido abaixo do ícone
        short_name: 'Eventos',

        // Descrição do aplicativo
        description: 'Sistema de gerenciamento de projetos e eventos',

        // Página inicial quando o aplicativo for aberto
        start_url: '/',

        // Faz o PWA abrir como um aplicativo independente,
        // sem a barra normal do navegador
        display: 'standalone',

        // Cor utilizada pelo sistema/navegador
        theme_color: '#ffffff',

        // Cor de fundo utilizada durante o carregamento
        background_color: '#ffffff',

        // =================================================
        // ÍCONES DO PWA
        // =================================================
        // Esses arquivos ficarão dentro da pasta "public".
        // Vamos adicionar os ícones posteriormente.

        icons: [
          {
            // Ícone menor
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            // Ícone maior
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            // Ícone adaptável para Android
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})