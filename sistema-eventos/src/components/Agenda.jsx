// ===========================================================
// IMPORTAÇÕES DO REACT
// ===========================================================
//
// useState:
// Guarda informações que podem mudar durante o uso da página.
//
// useEffect:
// Permite executar uma ação quando o componente é carregado.

import { useEffect, useState } from 'react'


// ===========================================================
// CSS DA PÁGINA
// ===========================================================

import './Agenda.css'


// ===========================================================
// COMPONENTE AGENDA
// ===========================================================

function Agenda() {


  // =========================================================
  // LISTA DE EVENTOS
  // =========================================================
  //
  // Aqui armazenamos todos os eventos recebidos
  // do back-end.

  const [eventos, setEventos] = useState([])


  // =========================================================
  // CARREGAMENTO
  // =========================================================
  //
  // Enquanto estivermos buscando os dados no back-end,
  // carregando ficará como true.

  const [carregando, setCarregando] = useState(true)


  // =========================================================
  // ERRO
  // =========================================================
  //
  // Caso aconteça algum erro na comunicação com a API,
  // guardamos a mensagem aqui.

  const [erro, setErro] = useState('')


  // =========================================================
  // FUNÇÃO PARA BUSCAR OS EVENTOS
  // =========================================================

  const buscarEventos = async () => {

    try {

      // Começamos uma nova busca.
      setCarregando(true)

      // Limpamos possíveis erros anteriores.
      setErro('')


      // =====================================================
      // REQUISIÇÃO PARA O BACK-END
      // =====================================================
      //
      // Fazemos uma requisição GET para nossa API
      // feita com Spring Boot.

      const resposta = await fetch(
        'https://api-eventos-95z8.onrender.com/api/eventos'
      )


      // =====================================================
      // VERIFICAÇÃO DA RESPOSTA
      // =====================================================

      if (!resposta.ok) {

        throw new Error('Erro ao buscar eventos')

      }


      // =====================================================
      // CONVERSÃO PARA JSON
      // =====================================================

      const dados = await resposta.json()


      // =====================================================
      // SALVA OS EVENTOS
      // =====================================================

      setEventos(dados)

    } catch (erroDaRequisicao) {


      // Mostra o erro no console para facilitar
      // durante o desenvolvimento.

      console.error(
        'Erro ao buscar eventos:',
        erroDaRequisicao
      )


      // Mensagem que aparecerá para o usuário.

      setErro(
        'Não foi possível carregar os eventos.'
      )

    } finally {


      // A busca terminou, independentemente
      // de ter dado certo ou errado.

      setCarregando(false)

    }

  }


  // =========================================================
  // CARREGAMENTO INICIAL
  // =========================================================
  //
  // Quando a página Agenda for aberta,
  // buscamos automaticamente os eventos.

  useEffect(() => {

    buscarEventos()

  }, [])


  // =========================================================
  // CONVERTER DATA
  // =========================================================
  //
  // O banco normalmente envia:
  //
  // 2026-09-12
  //
  // Transformamos isso em um objeto Date do JavaScript.

  const converterData = (dataEvento) => {

    return new Date(`${dataEvento}T00:00:00`)

  }


  // =========================================================
  // FORMATAR DATA COMPLETA
  // =========================================================
  //
  // Exemplo:
  //
  // 2026-09-12
  //
  // vira:
  //
  // 12 de setembro de 2026

  const formatarDataCompleta = (dataEvento) => {

    const data = converterData(dataEvento)

    return data.toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    )

  }


  // =========================================================
  // PEGAR APENAS O DIA
  // =========================================================
  //
  // Exemplo:
  //
  // 12/09/2026
  //
  // retorna:
  //
  // 12

  const pegarDia = (dataEvento) => {

    const data = converterData(dataEvento)

    return String(data.getDate()).padStart(2, '0')

  }


  // =========================================================
  // PEGAR O MÊS
  // =========================================================
  //
  // Retorna o mês abreviado.
  //
  // Exemplo:
  //
  // setembro -> SET

  const pegarMes = (dataEvento) => {

    const data = converterData(dataEvento)

    return data
      .toLocaleDateString(
        'pt-BR',
        {
          month: 'short'
        }
      )
      .replace('.', '')
      .toUpperCase()

  }


  // =========================================================
  // DATA DE HOJE
  // =========================================================
  //
  // Zeramos horas, minutos e segundos porque queremos
  // comparar somente os dias.

  const hoje = new Date()

  hoje.setHours(0, 0, 0, 0)


  // =========================================================
  // DESCOBRIR SITUAÇÃO DO EVENTO
  // =========================================================
  //
  // Essa função informa se o evento:
  //
  // - acontece hoje;
  // - ainda vai acontecer;
  // - já aconteceu.

  const descobrirSituacao = (dataEvento) => {

    const data = converterData(dataEvento)


    // Evento acontecendo hoje.

    if (data.getTime() === hoje.getTime()) {

      return {
        texto: 'Hoje',
        classe: 'status-hoje'
      }

    }


    // Evento futuro.

    if (data > hoje) {

      return {
        texto: 'Próximo',
        classe: 'status-proximo'
      }

    }


    // Evento passado.

    return {
      texto: 'Finalizado',
      classe: 'status-finalizado'
    }

  }


  // =========================================================
  // ORDENAR EVENTOS
  // =========================================================
  //
  // Criamos uma cópia da lista usando [...]
  // para não modificar diretamente o estado do React.
  //
  // Os eventos mais próximos aparecem primeiro.

  const eventosOrdenados = [...eventos].sort(
    (eventoA, eventoB) => {

      const dataA = converterData(eventoA.dataEvento)

      const dataB = converterData(eventoB.dataEvento)


      return dataA - dataB

    }
  )


  // =========================================================
  // CONTAR PRÓXIMOS EVENTOS
  // =========================================================

  const proximosEventos = eventos.filter((evento) => {

    const data = converterData(evento.dataEvento)

    return data >= hoje

  })


  // =========================================================
  // PARTE VISUAL
  // =========================================================

  return (

    <main className="conteudo agenda-page">


      {/* ===================================================
          CABEÇALHO
          =================================================== */}

      <div className="agenda-cabecalho">

        <div>

          <span className="pagina-tag">
            CALENDÁRIO
          </span>

          <h1>
            Agenda
          </h1>

          <p>
            Acompanhe os próximos eventos cadastrados
            no sistema.
          </p>

        </div>


        {/* =================================================
            CONTADOR DE EVENTOS
            ================================================= */}

        {!carregando && !erro && (

          <div className="agenda-resumo">

            <span>
              Próximos eventos
            </span>

            <strong>
              {proximosEventos.length}
            </strong>

          </div>

        )}

      </div>


      {/* ===================================================
          CARREGAMENTO
          =================================================== */}

      {carregando && (

        <div className="agenda-mensagem">

          <div className="agenda-loading" />

          <div>

            <strong>
              Carregando agenda
            </strong>

            <p>
              Buscando os eventos cadastrados...
            </p>

          </div>

        </div>

      )}


      {/* ===================================================
          ERRO
          =================================================== */}

      {!carregando && erro && (

        <div className="agenda-mensagem agenda-erro">

          <div className="agenda-mensagem-icone">
            !
          </div>

          <div>

            <strong>
              Não foi possível carregar a agenda
            </strong>

            <p>
              {erro}
            </p>

          </div>

        </div>

      )}


      {/* ===================================================
          NENHUM EVENTO
          =================================================== */}

      {!carregando && !erro && eventos.length === 0 && (

        <div className="agenda-vazia">

          <div className="agenda-vazia-icone">
            ◷
          </div>

          <h2>
            Nenhum evento por aqui
          </h2>

          <p>
            Quando um evento for cadastrado,
            ele aparecerá automaticamente na agenda.
          </p>

        </div>

      )}


      {/* ===================================================
          LISTA DE EVENTOS
          =================================================== */}

      {!carregando && !erro && eventos.length > 0 && (

        <div className="agenda-grid">

          {eventosOrdenados.map((evento) => {


            // Descobrimos a situação deste evento.
            const situacao = descobrirSituacao(
              evento.dataEvento
            )


            return (

              <article
                key={evento.id}
                className="evento-card"
              >


                {/* =========================================
                    PARTE SUPERIOR DO CARD
                    ========================================= */}

                <div className="evento-card-topo">


                  {/* =======================================
                      BLOCO COM DIA E MÊS
                      ======================================= */}

                  <div className="evento-data">

                    <span className="evento-dia">
                      {pegarDia(evento.dataEvento)}
                    </span>

                    <span className="evento-mes">
                      {pegarMes(evento.dataEvento)}
                    </span>

                  </div>


                  {/* =======================================
                      STATUS
                      ======================================= */}

                  <span
                    className={`evento-status ${situacao.classe}`}
                  >

                    {situacao.texto}

                  </span>

                </div>


                {/* =========================================
                    NOME DO EVENTO
                    ========================================= */}

                <div className="evento-conteudo">

                  <span className="evento-label">
                    EVENTO
                  </span>

                  <h3>
                    {evento.nome}
                  </h3>


                  {/* =======================================
                      INFORMAÇÕES
                      ======================================= */}

                  <div className="evento-informacoes">


                    {/* DATA */}

                    <div className="evento-info">

                      <div className="evento-info-icone">
                        ◷
                      </div>

                      <div>

                        <span>
                          Data
                        </span>

                        <strong>
                          {formatarDataCompleta(
                            evento.dataEvento
                          )}
                        </strong>

                      </div>

                    </div>


                    {/* LOCAL */}

                    <div className="evento-info">

                      <div className="evento-info-icone">
                        ◇
                      </div>

                      <div>

                        <span>
                          Local
                        </span>

                        <strong>
                          {evento.local}
                        </strong>

                      </div>

                    </div>

                  </div>

                </div>

              </article>

            )

          })}

        </div>

      )}

    </main>

  )

}


// ===========================================================
// EXPORTAÇÃO
// ===========================================================

export default Agenda