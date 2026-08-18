// Cria o componente Sidebar
// Recebe a função setPagina através das props
function Sidebar({ setPagina }) {

  // Retorna a estrutura da barra lateral
  return (
    <aside className="sidebar">

      {/* Título da barra lateral */}
      <h2>Eventos</h2>

      {/* Menu de navegação */}
      <nav>

        {/* Ao clicar, troca a página para o Dashboard */}
        <button onClick={() => setPagina('dashboard')}>
          Dashboard
        </button>

        {/* Ao clicar, troca a página para Eventos */}
        <button onClick={() => setPagina('eventos')}>
          Eventos
        </button>

        {/* Ainda não vamos programar esses dois */}
        <button>Fornecedores</button>
        <button>Agenda</button>

      </nav>

    </aside>
  )
}

// Exporta o componente Sidebar
export default Sidebar