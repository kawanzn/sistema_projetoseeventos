// Cria o componente Sidebar
// Recebe setPagina através das props
function Sidebar({ setPagina }) {

  // Retorna a estrutura da barra lateral
  return (
    <aside className="sidebar">

      {/* Título da barra lateral */}
      <h2>Eventos</h2>

      {/* Menu de navegação */}
      <nav>

        {/* Abre a tela do Dashboard */}
        <button onClick={() => setPagina('dashboard')}>
          Dashboard
        </button>

        {/* Abre a tela de Eventos */}
        <button onClick={() => setPagina('eventos')}>
          Eventos
        </button>

        {/* Ainda vamos programar essa tela */}
        <button>
          Fornecedores
        </button>

        {/* Ainda vamos programar essa tela */}
        <button>
          Agenda
        </button>

      </nav>

    </aside>
  )
}

// Exporta a Sidebar para ser utilizada no App.jsx
export default Sidebar