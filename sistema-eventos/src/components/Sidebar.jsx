// =====================================================
// COMPONENTE SIDEBAR
// =====================================================

// Recebe:
//
// pagina = página atualmente selecionada
// setPagina = função usada para trocar de página
function Sidebar({ pagina, setPagina }) {

  return (
    <aside className="sidebar">

      {/* =================================================
          IDENTIDADE DO SISTEMA
          ================================================= */}

      <div className="sidebar-logo">

        {/* Ícone simples feito sem biblioteca externa */}
        <div className="logo-icone">
          PE
        </div>

        <div>
          <h2>Projetos</h2>
          <span>Eventos</span>
        </div>

      </div>


      {/* Texto pequeno antes do menu */}
      <p className="menu-titulo">
        MENU PRINCIPAL
      </p>


      {/* =================================================
          NAVEGAÇÃO
          ================================================= */}

      <nav>

        {/* DASHBOARD */}
        <button
          className={
            pagina === 'dashboard'
              ? 'menu-item ativo'
              : 'menu-item'
          }
          onClick={() => setPagina('dashboard')}
        >
          <span className="menu-icone">▦</span>
          Dashboard
        </button>


        {/* EVENTOS */}
        <button
          className={
            pagina === 'eventos'
              ? 'menu-item ativo'
              : 'menu-item'
          }
          onClick={() => setPagina('eventos')}
        >
          <span className="menu-icone">◆</span>
          Eventos
        </button>


        {/* FORNECEDORES */}
        <button
          className={
            pagina === 'fornecedores'
              ? 'menu-item ativo'
              : 'menu-item'
          }
          onClick={() => setPagina('fornecedores')}
        >
          <span className="menu-icone">▣</span>
          Fornecedores
        </button>


        {/* AGENDA */}
        <button
          className={
            pagina === 'agenda'
              ? 'menu-item ativo'
              : 'menu-item'
          }
          onClick={() => setPagina('agenda')}
        >
          <span className="menu-icone">▤</span>
          Agenda
        </button>

      </nav>


      {/* =================================================
          RODAPÉ DA SIDEBAR
          ================================================= */}

      <div className="sidebar-rodape">
        <span>Sistema interno</span>
        <small>Projetos & Eventos</small>
      </div>

    </aside>
  )
}


// Exporta o componente
export default Sidebar