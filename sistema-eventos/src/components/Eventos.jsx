// =====================================================
// IMPORTAÇÕES
// =====================================================

import { useState, useEffect } from 'react'


// =====================================================
// ENDEREÇO DA API
// =====================================================

const API_URL = 'https://api-eventos-95z8.onrender.com/api/eventos'


// =====================================================
// COMPONENTE EVENTOS
// =====================================================

function Eventos() {

  // =====================================================
  // CONTROLE DO FORMULÁRIO
  // =====================================================

  const [mostrarFormulario, setMostrarFormulario] = useState(false)


  // =====================================================
  // CAMPOS DO FORMULÁRIO
  // =====================================================

  // Nome do evento.
  const [nomeEvento, setNomeEvento] = useState('')

  // Local onde o evento acontecerá.
  const [localEvento, setLocalEvento] = useState('')

  // Data principal do evento.
  const [dataEvento, setDataEvento] = useState('')

  // NOVO:
  // Horário principal do evento.
  const [horaEvento, setHoraEvento] = useState('')

  // Data de montagem.
  const [dataMontagem, setDataMontagem] = useState('')

  // Data de desmontagem.
  const [dataDesmontagem, setDataDesmontagem] = useState('')

  // Responsável pelo evento.
  const [responsavel, setResponsavel] = useState('')

  // Observações adicionais.
  const [observacoes, setObservacoes] = useState('')


  // =====================================================
  // LISTA DE EVENTOS
  // =====================================================

  const [eventos, setEventos] = useState([])


  // =====================================================
  // EVENTO EM EDIÇÃO
  // =====================================================

  // null = novo evento.
  // ID preenchido = edição.
  const [eventoEditandoId, setEventoEditandoId] = useState(null)


  // =====================================================
  // CARREGAMENTO
  // =====================================================

  const [carregando, setCarregando] = useState(true)


  // =====================================================
  // ERRO
  // =====================================================

  const [erro, setErro] = useState('')


  // =====================================================
  // BUSCAR EVENTOS
  // =====================================================

  async function buscarEventos() {

    try {

      setCarregando(true)
      setErro('')

      const resposta = await fetch(API_URL)

      if (!resposta.ok) {
        throw new Error(
          `Erro ao buscar eventos. Status: ${resposta.status}`
        )
      }

      const dados = await resposta.json()

      // Proteção para garantir que a API retornou uma lista.
      if (Array.isArray(dados)) {

        setEventos(dados)

      } else {

        console.error(
          'A API não retornou uma lista de eventos:',
          dados
        )

        setEventos([])

        setErro(
          'A API respondeu, mas não retornou uma lista de eventos.'
        )
      }

    } catch (erroDaRequisicao) {

      console.error(
        'Erro ao buscar eventos da API:',
        erroDaRequisicao
      )

      setErro(
        'Não foi possível carregar os eventos.'
      )

    } finally {

      setCarregando(false)
    }
  }


  // =====================================================
  // BUSCA INICIAL
  // =====================================================

  useEffect(() => {

    buscarEventos()

  }, [])


  // =====================================================
  // SALVAR EVENTO
  // =====================================================

  // Utilizada tanto para cadastrar quanto para editar.
  async function salvarEvento() {

    // =====================================================
    // VALIDAÇÃO
    // =====================================================

    if (
      nomeEvento === '' ||
      localEvento === '' ||
      dataEvento === ''
    ) {

      alert(
        'Preencha nome, local e data do evento.'
      )

      return
    }


    // =====================================================
    // OBJETO ENVIADO PARA O BACK-END
    // =====================================================

    const payload = {

      nome: nomeEvento,

      local: localEvento,

      dataEvento: dataEvento,

      // NOVO:
      // Envia o horário para o campo LocalTime
      // que criamos na entidade Evento.java.
      //
      // Caso nenhum horário seja informado,
      // enviamos null.
      horaEvento: horaEvento || null,

      dataMontagem: dataMontagem || null,

      dataDesmontagem: dataDesmontagem || null,

      status: 'SOLICITADO',

      responsavel: responsavel,

      observacoes: observacoes
    }


    // =====================================================
    // EDITAR EVENTO
    // =====================================================

    if (eventoEditandoId !== null) {

      try {

        const resposta = await fetch(
          `${API_URL}/${eventoEditandoId}`,
          {
            method: 'PUT',

            headers: {
              'Content-Type': 'application/json'
            },

            body: JSON.stringify(payload)
          }
        )


        if (!resposta.ok) {

          throw new Error(
            `Erro ao atualizar evento. Status: ${resposta.status}`
          )
        }


        const eventoAtualizado = await resposta.json()


        // Substitui o evento antigo pelo atualizado na tela.
        setEventos((eventosAtuais) =>
          eventosAtuais.map((evento) =>
            evento.id === eventoEditandoId
              ? eventoAtualizado
              : evento
          )
        )


        limparCampos()


      } catch (erroAoAtualizar) {

        console.error(
          'Erro ao atualizar evento:',
          erroAoAtualizar
        )

        alert(
          'Não foi possível atualizar o evento.'
        )
      }

      return
    }


    // =====================================================
    // CADASTRAR NOVO EVENTO
    // =====================================================

    try {

      const resposta = await fetch(API_URL, {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(payload)
      })


      if (!resposta.ok) {

        throw new Error(
          `Erro ao salvar evento. Status: ${resposta.status}`
        )
      }


      const dadoSalvoNoBanco = await resposta.json()


      // Adiciona o novo evento na lista.
      setEventos((eventosAtuais) => [
        ...eventosAtuais,
        dadoSalvoNoBanco
      ])


      limparCampos()


    } catch (erroAoSalvar) {

      console.error(
        'Erro ao cadastrar evento:',
        erroAoSalvar
      )

      alert(
        'Não foi possível cadastrar o evento.'
      )
    }
  }


  // =====================================================
  // LIMPAR CAMPOS
  // =====================================================

  function limparCampos() {

    setNomeEvento('')

    setLocalEvento('')

    setDataEvento('')

    // NOVO:
    // Limpa também o horário.
    setHoraEvento('')

    setDataMontagem('')

    setDataDesmontagem('')

    setResponsavel('')

    setObservacoes('')

    setEventoEditandoId(null)

    setMostrarFormulario(false)
  }


  // =====================================================
  // EXCLUIR EVENTO
  // =====================================================

  async function excluirEvento(id) {

    try {

      const resposta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })

      if (!resposta.ok) {

        throw new Error(
          `Erro ao excluir. Status: ${resposta.status}`
        )
      }

      setEventos((eventosAtuais) =>
        eventosAtuais.filter(
          (evento) => evento.id !== id
        )
      )

    } catch (erro) {

      console.error(
        'Erro ao excluir evento:',
        erro
      )

      alert(
        'Não foi possível excluir o evento.'
      )
    }
  }


  // =====================================================
  // EDITAR EVENTO
  // =====================================================

  function editarEvento(evento) {

    setNomeEvento(evento.nome || '')

    setLocalEvento(evento.local || '')

    setDataEvento(evento.dataEvento || '')

    // NOVO:
    // Quando o usuário editar um evento,
    // o horário salvo também aparecerá no formulário.
    setHoraEvento(
      evento.horaEvento
        ? evento.horaEvento.substring(0, 5)
        : ''
    )

    setDataMontagem(evento.dataMontagem || '')

    setDataDesmontagem(evento.dataDesmontagem || '')

    setResponsavel(evento.responsavel || '')

    setObservacoes(evento.observacoes || '')

    setEventoEditandoId(evento.id)

    setMostrarFormulario(true)
  }


  // =====================================================
  // INTERFACE
  // =====================================================

  return (

    <main className="conteudo">

      {/* Título da página */}
      <h1>
        Eventos
      </h1>


      {/* Descrição */}
      <p>
        Gerencie os eventos cadastrados no sistema.
      </p>


      {/* =================================================
          BOTÃO NOVO EVENTO
          ================================================= */}

      <button
        className="botao-novo-evento"
        onClick={() => {

          // Limpa qualquer edição anterior.
          limparCampos()

          // Abre o formulário.
          setMostrarFormulario(true)
        }}
      >
        + Novo Evento
      </button>


      {/* =================================================
          FORMULÁRIO
          ================================================= */}

      {mostrarFormulario && (

        <div className="formulario-evento">

          <h2>
            {eventoEditandoId !== null
              ? 'Editar Evento'
              : 'Novo Evento'}
          </h2>


          {/* NOME */}
          <label htmlFor="nomeEvento">
            Nome do evento
          </label>

          <input
            type="text"
            id="nomeEvento"
            placeholder="Ex: Formatura Couni"
            value={nomeEvento}
            onChange={(e) =>
              setNomeEvento(e.target.value)
            }
          />


          {/* LOCAL */}
          <label htmlFor="localEvento">
            Local do evento
          </label>

          <input
            type="text"
            id="localEvento"
            placeholder="Ex: Centro de Eventos"
            value={localEvento}
            onChange={(e) =>
              setLocalEvento(e.target.value)
            }
          />


          {/* DATA DO EVENTO */}
          <label htmlFor="dataEvento">
            Data do evento
          </label>

          <input
            type="date"
            id="dataEvento"
            value={dataEvento}
            onChange={(e) =>
              setDataEvento(e.target.value)
            }
          />


          {/* =================================================
              HORÁRIO DO EVENTO - NOVO
              ================================================= */}

          <label htmlFor="horaEvento">
            Horário do evento
          </label>

          <input
            type="time"
            id="horaEvento"
            value={horaEvento}
            onChange={(e) =>
              setHoraEvento(e.target.value)
            }
          />


          {/* DATA DE MONTAGEM */}
          <label htmlFor="dataMontagem">
            Data de montagem
          </label>

          <input
            type="date"
            id="dataMontagem"
            value={dataMontagem}
            onChange={(e) =>
              setDataMontagem(e.target.value)
            }
          />


          {/* DATA DE DESMONTAGEM */}
          <label htmlFor="dataDesmontagem">
            Data de desmontagem
          </label>

          <input
            type="date"
            id="dataDesmontagem"
            value={dataDesmontagem}
            onChange={(e) =>
              setDataDesmontagem(e.target.value)
            }
          />


          {/* RESPONSÁVEL */}
          <label htmlFor="responsavel">
            Responsável
          </label>

          <input
            type="text"
            id="responsavel"
            value={responsavel}
            onChange={(e) =>
              setResponsavel(e.target.value)
            }
          />


          {/* OBSERVAÇÕES */}
          <label htmlFor="observacoes">
            Observações
          </label>

          <input
            type="text"
            id="observacoes"
            value={observacoes}
            onChange={(e) =>
              setObservacoes(e.target.value)
            }
          />


          {/* BOTÃO CADASTRAR / SALVAR */}
          <button
            className="botao-cadastrar-evento"
            onClick={salvarEvento}
          >

            {eventoEditandoId !== null
              ? 'Salvar Alterações'
              : 'Cadastrar Evento'}

          </button>

        </div>
      )}


      {/* =================================================
          LISTA DE EVENTOS
          ================================================= */}

      <div className="lista-eventos">

        <h2>
          Eventos cadastrados
        </h2>


        {/* Carregamento */}
        {carregando && (

          <p>
            Carregando eventos...
          </p>

        )}


        {/* Erro */}
        {!carregando && erro && (

          <p>
            {erro}
          </p>

        )}


        {/* Nenhum evento */}
        {!carregando &&
          !erro &&
          eventos.length === 0 && (

            <p>
              Nenhum evento cadastrado.
            </p>

          )}


        {/* =================================================
            CARDS DOS EVENTOS
            ================================================= */}

        {!carregando &&
          !erro &&
          Array.isArray(eventos) &&
          eventos.map((evento) => (

            <div
              className="evento-item"
              key={evento.id}
            >

              {/* Nome */}
              <h3>
                {evento.nome}
              </h3>


              {/* Local */}
              <p>
                <strong>Local:</strong>{' '}
                {evento.local}
              </p>


              {/* Data */}
              <p>
                <strong>Data:</strong>{' '}
                {evento.dataEvento}
              </p>


              {/* =================================================
                  HORÁRIO - NOVO
                  ================================================= */}

              <p>
                <strong>Horário:</strong>{' '}

                {evento.horaEvento
                  ? evento.horaEvento.substring(0, 5)
                  : 'Não informado'}
              </p>


              {/* Montagem */}
              <p>
                <strong>Montagem:</strong>{' '}

                {evento.dataMontagem ||
                  'Não informada'}
              </p>


              {/* Desmontagem */}
              <p>
                <strong>Desmontagem:</strong>{' '}

                {evento.dataDesmontagem ||
                  'Não informada'}
              </p>


              {/* =================================================
                  BOTÕES DE AÇÃO
                  ================================================= */}

              <div className="acoes-evento">

                <button
                  className="botao-editar"
                  onClick={() =>
                    editarEvento(evento)
                  }
                >
                  Editar
                </button>


                <button
                  className="botao-excluir"
                  onClick={() =>
                    excluirEvento(evento.id)
                  }
                >
                  Excluir
                </button>

              </div>

            </div>

          ))}

      </div>

    </main>
  )
}


// =====================================================
// EXPORTAÇÃO
// =====================================================

export default Eventos