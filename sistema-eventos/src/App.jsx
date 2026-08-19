// =====================================================
// IMPORTAÇÕES
// =====================================================

// Importa o CSS principal da aplicação
import './App.css'

// Importa o useState para controlar qual página está aberta
import { useState } from 'react'

// Importa os componentes do sistema
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import Eventos from './components/Eventos.jsx'
import Fornecedores from './components/Fornecedores.jsx'
import Agenda from './components/Agenda.jsx'


// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

function App() {

  // Guarda qual página está aberta atualmente
  // Começamos pelo Dashboard
  const [pagina, setPagina] = useState('dashboard')


  return (
    <div className="app">

      {/* =================================================
          SIDEBAR
          ================================================= */}

      {/* 
        Enviamos duas informações para a Sidebar:

        pagina = página atual
        setPagina = função responsável por trocar a página
      */}
      <Sidebar
        pagina={pagina}
        setPagina={setPagina}
      />


      {/* =================================================
          ÁREA DIREITA DO SISTEMA
          ================================================= */}

      <div className="app-principal">

        {/* =================================================
            BARRA SUPERIOR
            ================================================= */}

        <header className="topbar">

          {/* Nome do sistema */}
          <div>
            <h2>Sistema de Projetos e Eventos</h2>

            <p>
              Organização, controle e acompanhamento
            </p>
          </div>


          {/* Pequeno identificador do setor */}
          <div className="topbar-setor">
            Setor de Projetos e Eventos
          </div>

        </header>


        {/* =================================================
            PÁGINAS
            ================================================= */}

        {/* Exibe o Dashboard */}
        {pagina === 'dashboard' && <Dashboard />}

        {/* Exibe Eventos */}
        {pagina === 'eventos' && <Eventos />}

        {/* Exibe Fornecedores */}
        {pagina === 'fornecedores' && <Fornecedores />}

        {/* Exibe Agenda */}
        {pagina === 'agenda' && <Agenda />}

      </div>

    </div>
  )
}


// Exporta o App
export default App