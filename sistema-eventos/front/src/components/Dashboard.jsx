// =====================================================
// IMPORTAÇÕES
// =====================================================

// useEffect:
// Executa uma ação quando o componente é carregado.
//
// useState:
// Guarda informações que podem mudar durante o uso da página.
import { useEffect, useState } from 'react'

// Componente responsável pelos cards do Dashboard.
import Card from './Card.jsx'


// =====================================================
// COMPONENTE DASHBOARD
// =====================================================

function Dashboard() {

  // ===================================================
  // ESTADO DOS EVENTOS
  // ===================================================
  //
  // Aqui guardamos todos os eventos recebidos
  // da nossa API Spring Boot.
  const [eventos, setEventos] = useState([])


  // ===================================================
  // ESTADO DE CARREGAMENTO
  // ===================================================
  //
  // Começa como true porque, assim que o Dashboard
  // abrir, vamos buscar os eventos no back-end.
  const [carregando, setCarregando] = useState(true)


  // ===================================================
  // ESTADO DE ERRO
  // ===================================================
  //
  // Caso aconteça algum problema na comunicação
  // com o back-end, guardamos uma mensagem aqui.
  const [erro, setErro] = useState('')


  // ===================================================
  // BUSCAR EVENTOS NO BACK-END
  // ===================================================
  //
  // Essa função é muito parecida com a que já usamos
  // dentro da Agenda.
  //
  // Assim, tanto a Agenda quanto o Dashboard utilizam
  // os dados reais cadastrados no banco.
  const buscarEventos = async () => {

    try {

      // Informa que a busca começou.
      setCarregando(true)

      // Limpa possíveis erros anteriores.
      setErro('')


      // =================================================
      // REQUISIÇÃO PARA A API
      // =================================================

      const resposta = await fetch(
        'https://api-eventos-95z8.onrender.com/api/eventos'
      )


      // =================================================
      // VERIFICA SE A REQUISIÇÃO DEU CERTO
      // =================================================

      if (!resposta.ok) {
        throw new Error('Erro ao buscar eventos')
      }


      // =================================================
      // CONVERTE A RESPOSTA PARA JSON
      // =================================================

      const dados = await resposta.json()


      // =================================================
      // GUARDA OS EVENTOS NO ESTADO
      // =================================================

      setEventos(dados)

    } catch (erroDaRequisicao) {

      console.error(
        'Erro ao carregar Dashboard:',
        erroDaRequisicao
      )

      setErro(
        'Não foi possível carregar os dados do Dashboard.'
      )

    } finally {

      // A busca terminou, tendo dado certo ou errado.
      setCarregando(false)

    }

  }


  // ===================================================
  // CARREGA OS EVENTOS QUANDO O DASHBOARD ABRE
  // ===================================================

  useEffect(() => {

    buscarEventos()

  }, [])


  // ===================================================
  // DATA DE HOJE
  // ===================================================
  //
  // Criamos uma data representando o dia atual.
  //
  // Depois zeramos hora, minuto e segundo para que
  // a comparação considere apenas a DATA.
  const hoje = new Date()

  hoje.setHours(0, 0, 0, 0)


  // ===================================================
  // FUNÇÃO PARA CONVERTER A DATA DO BANCO
  // ===================================================
  //
  // O back-end envia algo parecido com:
  //
  // 2026-09-12
  //
  // Acrescentamos T00:00:00 para o JavaScript
  // interpretar a data corretamente no horário local.
  const converterData = (dataEvento) => {

    return new Date(`${dataEvento}T00:00:00`)

  }


  // ===================================================
  // QUANTIDADE TOTAL DE EVENTOS
  // ===================================================
  //
  // eventos.length representa quantos eventos
  // existem atualmente no banco.
  const totalEventos = eventos.length


  // ===================================================
  // PRÓXIMOS EVENTOS
  // ===================================================
  //
  // filter cria uma nova lista somente com eventos
  // cuja data seja igual ou posterior ao dia de hoje.
  const proximosEventos = eventos.filter((evento) => {

    const dataDoEvento = converterData(evento.dataEvento)

    return dataDoEvento >= hoje

  })


  // ===================================================
  // EVENTOS DO MÊS ATUAL
  // ===================================================
  //
  // Aqui verificamos se o mês E o ano do evento
  // são iguais ao mês e ao ano atuais.
  const eventosNesteMes = eventos.filter((evento) => {

    const dataDoEvento = converterData(evento.dataEvento)

    return (
      dataDoEvento.getMonth() === hoje.getMonth() &&
      dataDoEvento.getFullYear() === hoje.getFullYear()
    )

  })


  // ===================================================
  // DESCOBRIR O PRÓXIMO EVENTO
  // ===================================================
  //
  // Primeiro copiamos a lista com [...proximosEventos].
  //
  // Fazemos isso porque sort altera o array original
  // e não queremos modificar nossos dados.
  //
  // Depois ordenamos pela data, da menor para a maior.
  const eventosOrdenados = [...proximosEventos].sort(
    (eventoA, eventoB) => {

      const dataA = converterData(eventoA.dataEvento)
      const dataB = converterData(eventoB.dataEvento)

      return dataA - dataB

    }
  )


  // O primeiro evento da lista ordenada
  // será o evento mais próximo.
  const proximoEvento = eventosOrdenados[0]


  // ===================================================
  // FORMATAR DATA
  // ===================================================
  //
  // Transforma:
  //
  // 2026-09-12
  //
  // em:
  //
  // 12/09/2026
  const formatarData = (dataEvento) => {

    if (!dataEvento) {
      return 'Nenhum evento'
    }

    const data = converterData(dataEvento)

    return data.toLocaleDateString('pt-BR')

  }


  // ===================================================
  // DEFINIÇÃO DOS VALORES DOS CARDS
  // ===================================================
  //
  // Enquanto os dados estão sendo carregados,
  // mostramos "..." nos cards.
  //
  // Depois mostramos o número real.
  const valorTotalEventos =
    carregando ? '...' : totalEventos

  const valorProximosEventos =
    carregando ? '...' : proximosEventos.length

  const valorEventosMes =
    carregando ? '...' : eventosNesteMes.length


  // ===================================================
  // PARTE VISUAL
  // ===================================================

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

          <h1>
            Dashboard
          </h1>

          <p>
            Acompanhe rapidamente as principais
            informações do setor.
          </p>

        </div>

      </div>


      {/* =================================================
          MENSAGEM DE ERRO
          =================================================
          
          Caso o back-end esteja indisponível,
          mostramos uma mensagem no Dashboard.
      */}

      {erro && (

        <p className="mensagem-erro">

          {erro}

        </p>

      )}


      {/* =================================================
          CARDS DO DASHBOARD
          ================================================= */}

      <div className="cards">


        {/* ===============================================
            TOTAL DE EVENTOS

            Agora esse número vem do banco de dados.
        */}

        <Card

          titulo="Eventos Cadastrados"

          valor={valorTotalEventos}

          cor="#2563eb"

          icone="◆"

        />


        {/* ===============================================
            PRÓXIMOS EVENTOS

            Conta somente eventos de hoje para frente.
        */}

        <Card

          titulo="Próximos Eventos"

          valor={valorProximosEventos}

          cor="#7c3aed"

          icone="◷"

        />


        {/* ===============================================
            EVENTOS DO MÊS

            Calculado automaticamente pelo mês atual.
        */}

        <Card

          titulo="Eventos neste mês"

          valor={valorEventosMes}

          cor="#ea580c"

          icone="▣"

        />


        {/* ===============================================
            PRÓXIMO EVENTO

            Aqui mostramos a data do evento mais próximo.
        */}

        <Card

          titulo="Próximo Evento"

          valor={
            carregando
              ? '...'
              : proximoEvento
                ? formatarData(proximoEvento.dataEvento)
                : '-'
          }

          cor="#16a34a"

          icone="◈"

        />

      </div>


      {/* =================================================
          PAINEL INFORMATIVO
          ================================================= */}

      <div className="painel-informativo">

        <div className="painel-titulo">

          <div>

            <span className="pagina-tag">
              ACOMPANHAMENTO
            </span>

            <h2>
              Resumo do setor
            </h2>

          </div>

        </div>


        {/* =================================================
            RESUMO DOS EVENTOS
            ================================================= */}

        <div className="resumo-grid">


          {/* ===============================================
              NOME DO PRÓXIMO EVENTO
          */}

          <div className="resumo-item">

            <span>
              Próximo evento
            </span>

            <strong>

              {carregando
                ? 'Carregando...'
                : proximoEvento
                  ? proximoEvento.nome
                  : 'Nenhum evento agendado'
              }

            </strong>

          </div>


          {/* ===============================================
              DATA DO PRÓXIMO EVENTO
          */}

          <div className="resumo-item">

            <span>
              Data
            </span>

            <strong>

              {carregando
                ? 'Carregando...'
                : proximoEvento
                  ? formatarData(proximoEvento.dataEvento)
                  : '-'
              }

            </strong>

          </div>


          {/* ===============================================
              LOCAL DO PRÓXIMO EVENTO
          */}

          <div className="resumo-item">

            <span>
              Local
            </span>

            <strong className="status-ok">

              {carregando
                ? 'Carregando...'
                : proximoEvento
                  ? proximoEvento.local
                  : 'Sem evento agendado'
              }

            </strong>

          </div>

        </div>

      </div>

    </main>

  )

}


// =====================================================
// EXPORTAÇÃO
// =====================================================
//
// Permite utilizar o Dashboard em outras partes
// da aplicação.

export default Dashboard