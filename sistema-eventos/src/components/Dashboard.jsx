// Importa o componente Card para utilizarmos dentro do Dashboard
import Card from './Card.jsx'

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

        {/* Mostra a quantidade de eventos ativos */}
        <Card titulo="Eventos Ativos" valor="4" />

        {/* Mostra a quantidade de próximos eventos */}
        <Card titulo="Próximos Eventos" valor="3" />

        {/* Mostra a quantidade de pendências */}
        <Card titulo="Pendências" valor="2" />

        {/* Mostra a quantidade de fornecedores cadastrados */}
        <Card titulo="Fornecedores" valor="8" />

      </div>

    </main>
  )
}

// Exporta o componente para poder utilizá-lo em outros arquivos
export default Dashboard