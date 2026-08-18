// Importa o CSS principal da aplicação
import './App.css'

// Importa o useState do React
// Ele vai permitir guardar qual tela está ativa
import { useState } from 'react'

// Importa os componentes da aplicação
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import Eventos from './components/Eventos.jsx'

// Componente principal da aplicação
function App() {

  // Cria uma variável chamada "pagina"
  // O valor inicial dela será "dashboard"
  const [pagina, setPagina] = useState('dashboard')

  // Retorna a estrutura principal da aplicação
  return (
    <div className="app">

      {/* Envia para a Sidebar a função que troca de página */}
      <Sidebar setPagina={setPagina} />

      {/* Se a página for dashboard, mostra o Dashboard */}
      {pagina === 'dashboard' && <Dashboard />}

      {/* Se a página for eventos, mostra a tela de Eventos */}
      {pagina === 'eventos' && <Eventos />}

    </div>
  )
}

// Exporta o App
export default App