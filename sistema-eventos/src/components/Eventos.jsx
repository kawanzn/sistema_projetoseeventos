// =====================================================
// IMPORTAÇÕES
// =====================================================

// Importa o useState do React
// Ele permite guardar informações que podem mudar na tela
import { useState } from 'react'


// =====================================================
// COMPONENTE EVENTOS
// =====================================================

function Eventos() {

  // =====================================================
  // CONTROLE DO FORMULÁRIO
  // =====================================================

  // Controla se o formulário aparece ou não
  const [mostrarFormulario, setMostrarFormulario] = useState(false)


  // =====================================================
  // CAMPOS DO FORMULÁRIO
  // =====================================================

  const [nomeEvento, setNomeEvento] = useState('')
  const [localEvento, setLocalEvento] = useState('')
  const [dataEvento, setDataEvento] = useState('')
  const [dataMontagem, setDataMontagem] = useState('')
  const [dataDesmontagem, setDataDesmontagem] = useState('')


  // =====================================================
  // LISTA DE EVENTOS
  // =====================================================

  // Guarda todos os eventos cadastrados
  const [eventos, setEventos] = useState([])


  // =====================================================
  // CONTROLE DE EDIÇÃO
  // =====================================================

  // Guarda o ID do evento que está sendo editado
  //
  // null significa:
  // nenhum evento está sendo editado
  const [eventoEditandoId, setEventoEditandoId] = useState(null)


  // =====================================================
  // FUNÇÃO PARA CADASTRAR OU SALVAR UMA EDIÇÃO
  // =====================================================

  function salvarEvento() {

    // Verifica se os campos obrigatórios foram preenchidos
    if (
      nomeEvento === '' ||
      localEvento === '' ||
      dataEvento === ''
    ) {
      alert('Preencha nome, local e data do evento.')
      return
    }


    // =====================================================
    // SE ESTIVER EDITANDO
    // =====================================================

    if (eventoEditandoId !== null) {

      // map percorre todos os eventos
      //
      // Quando encontrar o evento que possui
      // o mesmo ID que eventoEditandoId,
      // substitui seus dados pelos novos valores
      const eventosAtualizados = eventos.map((evento) => {

        if (evento.id === eventoEditandoId) {

          return {
            ...evento,
            nome: nomeEvento,
            local: localEvento,
            data: dataEvento,
            montagem: dataMontagem,
            desmontagem: dataDesmontagem
          }

        }

        // Se não for o evento que estamos editando,
        // mantém ele exatamente como estava
        return evento
      })


      // Atualiza a lista
      setEventos(eventosAtualizados)


      // Sai do modo de edição
      setEventoEditandoId(null)

    } else {

      // =====================================================
      // SE FOR UM NOVO EVENTO
      // =====================================================

      const novoEvento = {
        id: Date.now(),
        nome: nomeEvento,
        local: localEvento,
        data: dataEvento,
        montagem: dataMontagem,
        desmontagem: dataDesmontagem
      }


      // Adiciona o novo evento na lista
      setEventos([
        ...eventos,
        novoEvento
      ])
    }


    // =====================================================
    // LIMPA OS CAMPOS
    // =====================================================

    setNomeEvento('')
    setLocalEvento('')
    setDataEvento('')
    setDataMontagem('')
    setDataDesmontagem('')


    // Fecha o formulário
    setMostrarFormulario(false)
  }


  // =====================================================
  // FUNÇÃO PARA EXCLUIR
  // =====================================================

  function excluirEvento(id) {

    // Cria uma nova lista sem o evento selecionado
    const novaLista = eventos.filter(
      (evento) => evento.id !== id
    )

    setEventos(novaLista)
  }


  // =====================================================
  // FUNÇÃO PARA EDITAR
  // =====================================================

  function editarEvento(evento) {

    // Coloca os dados atuais do evento
    // dentro dos campos do formulário
    setNomeEvento(evento.nome)
    setLocalEvento(evento.local)
    setDataEvento(evento.data)
    setDataMontagem(evento.montagem)
    setDataDesmontagem(evento.desmontagem)


    // Guarda qual evento está sendo editado
    setEventoEditandoId(evento.id)


    // Abre o formulário
    setMostrarFormulario(true)
  }


  // =====================================================
  // INTERFACE
  // =====================================================

  return (
    <main className="conteudo">

      {/* Título */}
      <h1>Eventos</h1>

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

          // Limpa os campos para garantir
          // que estamos criando um evento novo
          setNomeEvento('')
          setLocalEvento('')
          setDataEvento('')
          setDataMontagem('')
          setDataDesmontagem('')

          // Remove qualquer edição anterior
          setEventoEditandoId(null)

          // Abre ou fecha o formulário
          setMostrarFormulario(!mostrarFormulario)
        }}
      >
        + Novo Evento
      </button>


      {/* =================================================
          FORMULÁRIO
          ================================================= */}

      {mostrarFormulario && (

        <div className="formulario-evento">

          {/* 
            O título muda dependendo
            se estamos criando ou editando
          */}
          <h2>
            {eventoEditandoId !== null
              ? 'Editar Evento'
              : 'Novo Evento'}
          </h2>


          {/* Nome */}
          <label htmlFor="nomeEvento">
            Nome do evento
          </label>

          <input
            type="text"
            id="nomeEvento"
            placeholder="Ex: Formatura Couni"
            value={nomeEvento}
            onChange={(evento) =>
              setNomeEvento(evento.target.value)
            }
          />


          {/* Local */}
          <label htmlFor="localEvento">
            Local do evento
          </label>

          <input
            type="text"
            id="localEvento"
            placeholder="Ex: Centro de Eventos"
            value={localEvento}
            onChange={(evento) =>
              setLocalEvento(evento.target.value)
            }
          />


          {/* Data */}
          <label htmlFor="dataEvento">
            Data do evento
          </label>

          <input
            type="date"
            id="dataEvento"
            value={dataEvento}
            onChange={(evento) =>
              setDataEvento(evento.target.value)
            }
          />


          {/* Montagem */}
          <label htmlFor="dataMontagem">
            Data de montagem
          </label>

          <input
            type="date"
            id="dataMontagem"
            value={dataMontagem}
            onChange={(evento) =>
              setDataMontagem(evento.target.value)
            }
          />


          {/* Desmontagem */}
          <label htmlFor="dataDesmontagem">
            Data de desmontagem
          </label>

          <input
            type="date"
            id="dataDesmontagem"
            value={dataDesmontagem}
            onChange={(evento) =>
              setDataDesmontagem(evento.target.value)
            }
          />


          {/* =================================================
              BOTÃO SALVAR
              ================================================= */}

          <button
            className="botao-cadastrar-evento"
            onClick={salvarEvento}
          >
            {/* 
              O texto também muda dependendo
              se estamos cadastrando ou editando
            */}
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

        <h2>Eventos cadastrados</h2>


        {/* Caso não existam eventos */}
        {eventos.length === 0 && (
          <p>Nenhum evento cadastrado.</p>
        )}


        {/* Percorre todos os eventos */}
        {eventos.map((evento) => (

          <div
            className="evento-item"
            key={evento.id}
          >

            {/* Nome */}
            <h3>{evento.nome}</h3>


            {/* Local */}
            <p>
              <strong>Local:</strong>{' '}
              {evento.local}
            </p>


            {/* Data */}
            <p>
              <strong>Data:</strong>{' '}
              {evento.data}
            </p>


            {/* Montagem */}
            <p>
              <strong>Montagem:</strong>{' '}
              {evento.montagem || 'Não informada'}
            </p>


            {/* Desmontagem */}
            <p>
              <strong>Desmontagem:</strong>{' '}
              {evento.desmontagem || 'Não informada'}
            </p>


            {/* =================================================
                AÇÕES
                ================================================= */}

            <div className="acoes-evento">

              {/* Botão editar */}
              <button
                className="botao-editar"
                onClick={() => editarEvento(evento)}
              >
                Editar
              </button>


              {/* Botão excluir */}
              <button
                className="botao-excluir"
                onClick={() => excluirEvento(evento.id)}
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