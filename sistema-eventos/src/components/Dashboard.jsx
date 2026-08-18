// =====================================================
// IMPORTAÇÕES
// =====================================================

import Card from './Card.jsx'


// =====================================================
// COMPONENTE DASHBOARD
// =====================================================

function Dashboard() {

  return (
    <main className="conteudo">

      {/* =================================================
          CABEÇALHO DA PÁGINA
          ================================================= */}

      <div className="cabecalho-pagina">

        <div>
          <span className="pagina-tag">
            VISÃO GERAL
          </span>

          <h1>Dashboard</h1>

          <p>
            Acompanhe rapidamente as principais
            informações do setor.
          </p>
        </div>

      </div>


      {/* =================================================
          CARDS
          ================================================= */}

      <div className="cards">

        {/* Eventos atualmente ativos */}
        <Card
          titulo="Eventos Ativos"
          valor="4"
          cor="#2563eb"
          icone="◆"
        />


        {/* Eventos que acontecerão em breve */}
        <Card
          titulo="Próximos Eventos"
          valor="3"
          cor="#7c3aed"
          icone="◷"
        />


        {/* Pendências do setor */}
        <Card
          titulo="Pendências"
          valor="2"
          cor="#ea580c"
          icone="!"
        />


        {/* Quantidade de fornecedores */}
        <Card
          titulo="Fornecedores"
          valor="2"
          cor="#16a34a"
          icone="▣"
        />

      </div>


      {/* =================================================
          ÁREA INFORMATIVA
          ================================================= */}

      <div className="painel-informativo">

        <div className="painel-titulo">

          <div>
            <span className="pagina-tag">
              ACOMPANHAMENTO
            </span>

            <h2>Resumo do setor</h2>
          </div>

        </div>


        {/* Pequenas informações de acompanhamento */}
        <div className="resumo-grid">

          <div className="resumo-item">
            <span>Próxima montagem</span>
            <strong>24/08/2026</strong>
          </div>


          <div className="resumo-item">
            <span>Eventos neste mês</span>
            <strong>4 eventos</strong>
          </div>


          <div className="resumo-item">
            <span>Situação geral</span>

            <strong className="status-ok">
              Tudo em andamento
            </strong>
          </div>

        </div>

      </div>

    </main>
  )
}


// Exporta o Dashboard
export default Dashboard