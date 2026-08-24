// ===========================================================
// IMPORTAÇÕES DO REACT
// ===========================================================
//
// useState:
// Guarda informações que podem mudar durante o uso da página.
//
// useEffect:
// Executa uma ação quando o componente é carregado.

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
  // Guarda os eventos recebidos do back-end.

  const [eventos, setEventos] = useState([])


  // =========================================================
  // CARREGAMENTO
  // =========================================================

  const [carregando, setCarregando] = useState(true)


  // =========================================================
  // ERRO
  // =========================================================

  const [erro, setErro] = useState('')


  // =========================================================
  // BUSCAR EVENTOS
  // =========================================================

  const buscarEventos = async () => {

    try {

      // Inicia o carregamento.
      setCarregando(true)

      // Limpa possíveis erros anteriores.
      setErro('')


      // =====================================================
      // REQUISIÇÃO PARA O BACK-END
      // =====================================================

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


      // Salva os eventos recebidos.
      setEventos(dados)

    } catch (erroDaRequisicao) {

      console.error(
        'Erro ao buscar eventos:',
        erroDaRequisicao
      )


      // Mensagem mostrada para o usuário.
      setErro(
        'Não foi possível carregar os eventos.'
      )

    } finally {

      // Finaliza o carregamento.
      setCarregando(false)

    }

  }


  // =========================================================
  // CARREGAMENTO INICIAL
  // =========================================================

  useEffect(() => {

    buscarEventos()

  }, [])


  // =========================================================
  // CONVERTER DATA
  // =========================================================
  //
  // Exemplo:
  //
  // 2026-09-12
  //
  // vira um objeto Date do JavaScript.

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
  // PEGAR DIA
  // =========================================================

  const pegarDia = (dataEvento) => {

    const data = converterData(dataEvento)

    return String(data.getDate()).padStart(2, '0')

  }


  // =========================================================
  // PEGAR MÊS
  // =========================================================

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
  // PEGAR DIA DA SEMANA
  // =========================================================
  //
  // Essa informação aparece como detalhe no card.
  //
  // Exemplo:
  //
  // SEGUNDA-FEIRA

  const pegarDiaSemana = (dataEvento) => {

    const data = converterData(dataEvento)

    return data
      .toLocaleDateString(
        'pt-BR',
        {
          weekday: 'long'
        }
      )
      .toUpperCase()

  }


  // =========================================================
  // DATA DE HOJE
  // =========================================================

  const hoje = new Date()

  hoje.setHours(0, 0, 0, 0)


  // =========================================================
  // DESCOBRIR SITUAÇÃO DO EVENTO
  // =========================================================

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
  // Mantemos a mesma lógica:
  // os eventos são ordenados pela data.

  const eventosOrdenados = [...eventos].sort(
    (eventoA, eventoB) => {

      const dataA = converterData(eventoA.dataEvento)

      const dataB = converterData(eventoB.dataEvento)

      return dataA - dataB

    }
  )


  // =========================================================
  // PRÓXIMOS EVENTOS
  // =========================================================

  const proximosEventos = eventos.filter((evento) => {

    const data = converterData(evento.dataEvento)

    return data >= hoje

  })


  // =========================================================
  // EVENTOS FINALIZADOS
  // =========================================================
  //
  // Criamos este contador apenas para enriquecer
  // visualmente o resumo da agenda.

  const eventosFinalizados = eventos.filter((evento) => {

    const data = converterData(evento.dataEvento)

    return data < hoje

  })


  // =========================================================
  // PARTE VISUAL
  // =========================================================

  return (

    <main className="conteudo agenda-page">


      {/* ===================================================
          CABEÇALHO
          =================================================== */}

      <section className="agenda-cabecalho">

        <div className="agenda-titulo-area">

          <span className="pagina-tag">
            CALENDÁRIO
          </span>

          <h1>
            Agenda
          </h1>

          <p>
            Visualize e acompanhe os eventos cadastrados
            no sistema.
          </p>

        </div>


        {/* =================================================
            RESUMO DA AGENDA
            ================================================= */}

        {!carregando && !erro && (

          <div className="agenda-resumos">


            {/* Próximos eventos */}

            <div className="agenda-resumo agenda-resumo-destaque">

              <div className="agenda-resumo-icone">

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M8 2v3M16 2v3M3.5 9h17M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                  />
                </svg>

              </div>

              <div>

                <span>
                  Próximos
                </span>

                <strong>
                  {proximosEventos.length}
                </strong>

              </div>

            </div>


            {/* Total de eventos */}

            <div className="agenda-resumo">

              <span>
                Total
              </span>

              <strong>
                {eventos.length}
              </strong>

            </div>


            {/* Eventos finalizados */}

            <div className="agenda-resumo">

              <span>
                Finalizados
              </span>

              <strong>
                {eventosFinalizados.length}
              </strong>

            </div>

          </div>

        )}

      </section>


      {/* ===================================================
          CABEÇALHO DA LISTA
          =================================================== */}

      {!carregando && !erro && eventos.length > 0 && (

        <div className="agenda-lista-cabecalho">

          <div>

            <h2>
              Eventos cadastrados
            </h2>

            <p>
              Todos os compromissos organizados por data.
            </p>

          </div>

          <span className="agenda-quantidade">

            {eventos.length}

            {eventos.length === 1
              ? ' evento'
              : ' eventos'}

          </span>

        </div>

      )}


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

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M8 2v3M16 2v3M3.5 9h17M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
              />
            </svg>

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
          LISTA DOS EVENTOS
          =================================================== */}

      {!carregando && !erro && eventos.length > 0 && (

        <div className="agenda-grid">

          {eventosOrdenados.map((evento) => {


            // Descobre a situação atual do evento.

            const situacao = descobrirSituacao(
              evento.dataEvento
            )


            return (

              <article
                key={evento.id}
                className={`evento-card ${situacao.classe}-card`}
              >


                {/* =========================================
                    DATA DO EVENTO
                    ========================================= */}

                <div className="evento-data">

                  <span className="evento-dia">
                    {pegarDia(evento.dataEvento)}
                  </span>

                  <span className="evento-mes">
                    {pegarMes(evento.dataEvento)}
                  </span>

                </div>


                {/* =========================================
                    CONTEÚDO PRINCIPAL
                    ========================================= */}

                <div className="evento-conteudo">


                  {/* Parte superior */}

                  <div className="evento-card-topo">

                    <div className="evento-titulo">

                      <span className="evento-dia-semana">

                        {pegarDiaSemana(
                          evento.dataEvento
                        )}

                      </span>

                      <h3>
                        {evento.nome}
                      </h3>

                    </div>


                    {/* Status */}

                    <span
                      className={`evento-status ${situacao.classe}`}
                    >

                      <span className="evento-status-ponto" />

                      {situacao.texto}

                    </span>

                  </div>


                  {/* =======================================
                      INFORMAÇÕES DO EVENTO
                      ======================================= */}

                  <div className="evento-informacoes">


                    {/* DATA */}

                    <div className="evento-info">

                      <div className="evento-info-icone">

                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="8"
                          />

                          <path
                            d="M12 7v5l3 2"
                          />
                        </svg>

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


                    {/* DIVISOR */}

                    <div className="evento-info-divisor" />


                    {/* LOCAL */}

                    <div className="evento-info">

                      <div className="evento-info-icone">

                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                          />

                          <circle
                            cx="12"
                            cy="10"
                            r="2.5"
                          />
                        </svg>

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