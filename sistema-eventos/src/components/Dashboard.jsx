// Cria o componente Dashboard
function Dashboard() {

  // Retorna o conteúdo que será exibido no Dashboard
  return (
    <main className="conteudo">

      {/* Título da página */}
      <h1>Dashboard</h1>

      {/* Pequena descrição da página */}
      <p>Visão geral dos projetos e eventos do setor.</p>


      {/* Área que vai armazenar os cards do Dashboard */}
      <div className="cards">

        {/* Primeiro card: mostra a quantidade de eventos ativos */}
        <div className="card">

          {/* Nome da informação */}
          <h3>Eventos Ativos</h3>

          {/* Quantidade de eventos - valor temporário */}
          <span>4</span>

        </div>

      </div>

    </main>
  )
}

// Exporta o componente para poder utilizá-lo em outros arquivos
export default Dashboard