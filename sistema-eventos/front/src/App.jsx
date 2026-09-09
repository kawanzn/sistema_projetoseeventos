// =====================================================
// IMPORTAÇÕES
// =====================================================

// CSS principal da aplicação.
import './App.css'

// useState:
// guarda informações que podem mudar durante o uso.
import { useState } from 'react'
import Login from './components/Login.jsx'
import { getToken, logout } from './auth'

// Componentes principais do sistema.
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import Eventos from './components/Eventos.jsx'
import Fornecedores from './components/Fornecedores.jsx'
import Agenda from './components/Agenda.jsx'


// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

function App() {

  // ===================================================
  // PÁGINA ATUAL
  // ===================================================
  //
  // Guarda qual página está sendo exibida.
  //
  // O sistema começa pelo Dashboard.
  const [pagina, setPagina] = useState('dashboard')
  const [autenticado, setAutenticado] = useState(Boolean(getToken()))


  // ===================================================
  // CONTROLE DA SIDEBAR NO CELULAR
  // ===================================================
  //
  // No computador, a Sidebar fica sempre visível.
  //
  // No celular, ela poderá ser aberta e fechada
  // através do botão presente na Topbar.
  const [sidebarAberta, setSidebarAberta] = useState(false)


  // ===================================================
  // INFORMAÇÕES DAS PÁGINAS
  // ===================================================
  //
  // Aqui centralizamos os nomes das páginas.
  //
  // Isso evita precisar escrever vários ifs
  // apenas para descobrir o título da Topbar.
  const informacoesPaginas = {

    dashboard: {
      titulo: 'Dashboard',
      descricao: 'Visão geral do setor'
    },

    eventos: {
      titulo: 'Eventos',
      descricao: 'Gestão dos eventos cadastrados'
    },

    fornecedores: {
      titulo: 'Fornecedores',
      descricao: 'Gestão de fornecedores e parceiros'
    },

    agenda: {
      titulo: 'Agenda',
      descricao: 'Acompanhamento dos próximos eventos'
    }

  }


  // ===================================================
  // PÁGINA SELECIONADA
  // ===================================================
  //
  // Pegamos automaticamente as informações
  // correspondentes à página atual.
  const paginaAtual = informacoesPaginas[pagina]


  // ===================================================
  // TROCAR DE PÁGINA
  // ===================================================
  //
  // Além de trocar a página,
  // fechamos a Sidebar caso o usuário esteja no celular.
  const trocarPagina = (novaPagina) => {

    setPagina(novaPagina)

    setSidebarAberta(false)

  }

  const onLoginSuccess = () => setAutenticado(true)

  const handleLogout = () => {
    logout()
    setAutenticado(false)
  }


  // ===================================================
  // PARTE VISUAL
  // ===================================================

  return (

    <div className="app">

      {!autenticado && (
        <Login onSuccess={onLoginSuccess} />
      )}

      {autenticado && (

      {/* =================================================
          SIDEBAR
          ================================================= */}

      <Sidebar
        pagina={pagina}
        setPagina={trocarPagina}
        aberta={sidebarAberta}
        onFechar={() => setSidebarAberta(false)}
      />


      {/* =================================================
          OVERLAY DO CELULAR
          =================================================
          
          Quando a Sidebar estiver aberta no celular,
          escurecemos levemente o restante da tela.
          
          Clicar nessa área fecha o menu.
      */}

      {sidebarAberta && (

        <button
          type="button"
          className="sidebar-overlay"
          onClick={() => setSidebarAberta(false)}
          aria-label="Fechar menu"
        />

      )}


      {/* =================================================
          ÁREA PRINCIPAL
          ================================================= */}

      <div className="app-principal">


        {/* =================================================
            TOPBAR
            ================================================= */}

        <header className="topbar">


          {/* ===============================================
              LADO ESQUERDO
              =============================================== */}

          <div className="topbar-esquerda">


            {/* =============================================
                BOTÃO MOBILE
                =============================================
                
                Só aparece em telas menores.
            */}

            <button
              type="button"
              className="botao-menu-mobile"
              onClick={() => setSidebarAberta(true)}
              aria-label="Abrir menu"
            >

              <span />

              <span />

              <span />

            </button>


            {/* =============================================
                IDENTIFICAÇÃO DA PÁGINA
                ============================================= */}

            <div className="topbar-pagina">

              <span className="topbar-contexto">
                Sistema de Projetos e Eventos
              </span>

              <div className="topbar-titulo-linha">

                <h2>
                  {paginaAtual.titulo}
                </h2>

                <span className="topbar-separador">
                  /
                </span>

                <p>
                  {paginaAtual.descricao}
                </p>

              </div>

            </div>

          </div>


          {/* ===============================================
              LADO DIREITO
              =============================================== */}

          <div className="topbar-direita">


            {/* =============================================
                INDICADOR DO SISTEMA
                ============================================= */}

            <div className="topbar-status">

              <span className="topbar-status-ponto" />

              Sistema online

            </div>


            {/* =============================================
                IDENTIFICAÇÃO DO SETOR
                ============================================= */}

            <div className="topbar-setor">

              <div className="topbar-setor-icone">
                PE
              </div>

              <div>

                <strong>
                  Projetos & Eventos
                </strong>

                <span>
                  Setor interno
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* =================================================
            PÁGINAS
            ================================================= */}


        {/* Dashboard */}

        {pagina === 'dashboard' && (
          <Dashboard />
        )}


        {/* Eventos */}

        {pagina === 'eventos' && (
          <Eventos />
        )}


        {/* Fornecedores */}

        {pagina === 'fornecedores' && (
          <Fornecedores />
        )}


        {/* Agenda */}

        {pagina === 'agenda' && (
          <Agenda />
        )}

      </div>

      )}

    </div>

  )

}


// =====================================================
// EXPORTAÇÃO
// =====================================================

export default App