// ===========================================================
// IMPORTAÇÕES
// ===========================================================

import { useEffect, useState } from 'react'

import './Agenda.css'


// ===========================================================
// COMPONENTE AGENDA
// ===========================================================

function Agenda() {


  // =========================================================
  // ESTADOS
  // =========================================================

  const [eventos, setEventos] = useState([])

  const [carregando, setCarregando] = useState(true)

  const [erro, setErro] = useState('')


  // =========================================================
  // BUSCAR EVENTOS
  // =========================================================

  const buscarEventos = async () => {

    try {

      setCarregando(true)

      setErro('')


      const resposta = await fetch(
        'https://api-eventos-95z8.onrender.com/api/eventos'
      )


      if (!resposta.ok) {

        throw new Error('Erro ao buscar eventos')

      }


      const dados = await resposta.json()


      setEventos(dados)

    } catch (erroDaRequisicao) {

      console.error(
        'Erro ao buscar eventos:',
        erroDaRequisicao
      )


      setErro(
        'Não foi possível carregar os eventos.'
      )

    } finally {

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

  const converterData = (dataEvento) => {

    return new Date(`${dataEvento}T00:00:00`)

  }


  // =========================================================
  // FORMATAR DATA COMPLETA
  // =========================================================

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


    return String(
      data.getDate()
    ).padStart(2, '0')

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

  const pegarDiaSemana = (dataEvento) => {

    const data = converterData(dataEvento)


    return data.toLocaleDateString(
      'pt-BR',
      {
        weekday: 'long'
      }
    )

  }


  // =========================================================
  // DATA DE HOJE
  // =========================================================

  const hoje = new Date()


  hoje.setHours(
    0,
    0,
    0,
    0
  )


  // =========================================================
  // STATUS DO EVENTO
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

  const eventosOrdenados = [...eventos].sort(
    (eventoA, eventoB) => {

      const dataA = converterData(
        eventoA.dataEvento
      )


      const dataB = converterData(
        eventoB.dataEvento
      )


      return dataA - dataB

    }
  )


  // =========================================================
  // CONTADORES
  // =========================================================

  const proximosEventos = eventos.filter(
    (evento) => {

      const data = converterData(
        evento.dataEvento
      )


      return data >= hoje

    }
  )


  const eventosFinalizados = eventos.filter(
    (evento) => {

      const data = converterData(
        evento.dataEvento
      )


      return data < hoje

    }
  )


  // =========================================================
  // PARTE VISUAL
  // =========================================================

  return (

    <main className="conteudo agenda-page">


      {/* ===================================================
          CABEÇALHO PRINCIPAL
          =================================================== */}

      <header className="agenda-header">

        <div className="agenda-header-texto">

          <span className="pagina-tag">
            CALENDÁRIO
          </span>

          <h1>
            Agenda
          </h1>

          <p>
            Acompanhe todos os eventos cadastrados
            e mantenha seus compromissos organizados.
          </p>

        </div>


        {/* =================================================
            RESUMO
            ================================================= */}

        {!carregando && !erro && (

          <div className="agenda-resumo">

            <div className="agenda-resumo-item">

              <span>
                Próximos
              </span>

              <strong>
                {proximosEventos.length}
              </strong>

            </div>


            <div className="agenda-resumo-divisor" />


            <div className="agenda-resumo-item">

              <span>
                Total
              </span>

              <strong>
                {eventos.length}
              </strong>

            </div>


            <div className="agenda-resumo-divisor" />


            <div className="agenda-resumo-item">

              <span>
                Finalizados
              </span>

              <strong>
                {eventosFinalizados.length}
              </strong>

            </div>

          </div>

        )}

      </header>


      {/* ===================================================
          CARREGAMENTO
          =================================================== */}

      {carregando && (

        <section className="agenda-feedback">

          <div className="agenda-loading" />

          <div>

            <strong>
              Carregando agenda
            </strong>

            <p>
              Buscando os eventos cadastrados...
            </p>

          </div>

        </section>

      )}


      {/* ===================================================
          ERRO
          =================================================== */}

      {!carregando && erro && (

        <section className="agenda-feedback agenda-feedback-erro">

          <div className="agenda-erro-icone">
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

        </section>

      )}


      {/* ===================================================
          AGENDA VAZIA
          =================================================== */}

      {!carregando &&
        !erro &&
        eventos.length === 0 && (

          <section className="agenda-vazia">

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
              Nenhum evento cadastrado
            </h2>

            <p>
              Quando novos eventos forem cadastrados,
              eles aparecerão aqui automaticamente.
            </p>

          </section>

        )}


      {/* ===================================================
          CONTEÚDO DA AGENDA
          =================================================== */}

      {!carregando &&
        !erro &&
        eventos.length > 0 && (

          <section className="agenda-container">


            {/* =================================================
                CABEÇALHO DA LISTA
                ================================================= */}

            <div className="agenda-lista-header">

              <div>

                <h2>
                  Eventos
                </h2>

                <p>
                  Organizados em ordem cronológica
                </p>

              </div>


              <span className="agenda-total-eventos">

                {eventos.length}

                {eventos.length === 1
                  ? ' evento'
                  : ' eventos'}

              </span>

            </div>


            {/* =================================================
                LISTA
                ================================================= */}

            <div className="agenda-lista">

              {eventosOrdenados.map(
                (evento) => {


                  const situacao =
                    descobrirSituacao(
                      evento.dataEvento
                    )


                  return (

                    <article
                      key={evento.id}
                      className="agenda-evento"
                    >


                      {/* =======================================
                          DATA
                          ======================================= */}

                      <div className="agenda-evento-data">

                        <span className="agenda-evento-dia">
                          {pegarDia(
                            evento.dataEvento
                          )}
                        </span>

                        <span className="agenda-evento-mes">
                          {pegarMes(
                            evento.dataEvento
                          )}
                        </span>

                      </div>


                      {/* =======================================
                          LINHA DA TIMELINE
                          ======================================= */}

                      <div className="agenda-timeline">

                        <span
                          className={
                            `agenda-timeline-ponto ${situacao.classe}`
                          }
                        />

                      </div>


                      {/* =======================================
                          CONTEÚDO
                          ======================================= */}

                      <div className="agenda-evento-conteudo">


                        {/* Título */}

                        <div className="agenda-evento-principal">

                          <div>

                            <span className="agenda-evento-semana">

                              {pegarDiaSemana(
                                evento.dataEvento
                              )}

                            </span>


                            <h3>
                              {evento.nome}
                            </h3>

                          </div>


                          <span
                            className={
                              `agenda-status ${situacao.classe}`
                            }
                          >

                            <span
                              className="agenda-status-ponto"
                            />

                            {situacao.texto}

                          </span>

                        </div>


                        {/* =====================================
                            INFORMAÇÕES
                            ===================================== */}

                        <div className="agenda-evento-detalhes">


                          {/* DATA */}

                          <div className="agenda-detalhe">

                            <div className="agenda-detalhe-icone">

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

                          <div className="agenda-detalhe">

                            <div className="agenda-detalhe-icone">

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

                }
              )}

            </div>

          </section>

        )}

    </main>

  )

}


// ===========================================================
// EXPORTAÇÃO
// ===========================================================

export default Agenda