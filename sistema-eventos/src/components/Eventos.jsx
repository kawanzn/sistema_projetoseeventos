// Importa o useState do React
// Ele permite guardar informações que mudam durante o uso da página
import { useState } from 'react'


// Componente responsável pela página de Eventos
function Eventos() {

  // =====================================================
  // CONTROLE DO FORMULÁRIO
  // =====================================================

  // Controla se o formulário está aberto ou fechado
  const [mostrarFormulario, setMostrarFormulario] = useState(false)


  // =====================================================
  // DADOS DIGITADOS NO FORMULÁRIO
  // =====================================================

  // Guarda o nome do evento
  const [nomeEvento, setNomeEvento] = useState('')

  // Guarda o local do evento
  const [localEvento, setLocalEvento] = useState('')

  // Guarda a data principal do evento
  const [dataEvento, setDataEvento] = useState('')

  // Guarda a data de montagem
  const [dataMontagem, setDataMontagem] = useState('')

  // Guarda a data de desmontagem
  const [dataDesmontagem, setDataDesmontagem] = useState('')


  // =====================================================
  // LISTA DE EVENTOS
  // =====================================================

  // Guarda todos os eventos cadastrados
  //
  // Começa como um array vazio []
  // porque ainda não existe nenhum evento cadastrado
  const [eventos, setEventos] = useState([])


  // =====================================================
  // FUNÇÃO PARA CADASTRAR EVENTO
  // =====================================================

  function cadastrarEvento() {

    // Verifica se os campos principais foram preenchidos
    if (nomeEvento === '' || localEvento === '' || dataEvento === '') {
      alert('Preencha nome, local e data do evento.')
      return
    }


    // Cria um objeto com todas as informações do novo evento
    const novoEvento = {

      // Date.now() gera um número único que usaremos como ID
      id: Date.now(),

      nome: nomeEvento,
      local: localEvento,
      data: dataEvento,
      montagem: dataMontagem,
      desmontagem: dataDesmontagem
    }


    // Adiciona o novo evento à lista de eventos
    //
    // ...eventos mantém tudo que já existia
    // novoEvento adiciona o novo item
    setEventos([...eventos, novoEvento])


    // =====================================================
    // LIMPA OS CAMPOS DEPOIS DO CADASTRO
    // =====================================================

    setNomeEvento('')
    setLocalEvento('')
    setDataEvento('')
    setDataMontagem('')
    setDataDesmontagem('')


    // Fecha o formulário depois de cadastrar
    setMostrarFormulario(false)
  }


  // =====================================================
  // INTERFACE DA PÁGINA
  // =====================================================

  return (
    <main className="conteudo">

      {/* Título principal */}
      <h1>Eventos</h1>

      {/* Descrição da página */}
      <p>Gerencie os eventos cadastrados no sistema.</p>


      {/* =================================================
          BOTÃO NOVO EVENTO
          ================================================= */}

      <button
        className="botao-novo-evento"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        + Novo Evento
      </button>


      {/* =================================================
          FORMULÁRIO
          ================================================= */}

      {mostrarFormulario && (

        <div className="formulario-evento">

          <h2>Novo Evento</h2>


          {/* Nome do evento */}
          <label htmlFor="nomeEvento">
            Nome do evento
          </label>

          <input
            type="text"
            id="nomeEvento"
            placeholder="Ex: Formatura Couni"
            value={nomeEvento}
            onChange={(evento) => setNomeEvento(evento.target.value)}
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
            onChange={(evento) => setLocalEvento(evento.target.value)}
          />


          {/* Data do evento */}
          <label htmlFor="dataEvento">
            Data do evento
          </label>

          <input
            type="date"
            id="dataEvento"
            value={dataEvento}
            onChange={(evento) => setDataEvento(evento.target.value)}
          />


          {/* Data de montagem */}
          <label htmlFor="dataMontagem">
            Data de montagem
          </label>

          <input
            type="date"
            id="dataMontagem"
            value={dataMontagem}
            onChange={(evento) => setDataMontagem(evento.target.value)}
          />


          {/* Data de desmontagem */}
          <label htmlFor="dataDesmontagem">
            Data de desmontagem
          </label>

          <input
            type="date"
            id="dataDesmontagem"
            value={dataDesmontagem}
            onChange={(evento) => setDataDesmontagem(evento.target.value)}
          />


          {/* Ao clicar, executa a função cadastrarEvento */}
          <button
            className="botao-cadastrar-evento"
            onClick={cadastrarEvento}
          >
            Cadastrar Evento
          </button>

        </div>
      )}


      {/* =================================================
          LISTA DE EVENTOS CADASTRADOS
          ================================================= */}

      <div className="lista-eventos">

        <h2>Eventos cadastrados</h2>


        {/* 
          Se não existir nenhum evento,
          mostramos uma mensagem.
        */}
        {eventos.length === 0 && (
          <p>Nenhum evento cadastrado.</p>
        )}


        {/* 
          map percorre todos os eventos cadastrados.

          Para cada evento existente,
          ele cria um card na tela.
        */}
        {eventos.map((evento) => (

          <div
            className="evento-item"
            key={evento.id}
          >

            {/* Nome do evento */}
            <h3>{evento.nome}</h3>

            {/* Local */}
            <p>
              <strong>Local:</strong> {evento.local}
            </p>

            {/* Data */}
            <p>
              <strong>Data:</strong> {evento.data}
            </p>

            {/* Montagem */}
            <p>
              <strong>Montagem:</strong> {evento.montagem || 'Não informada'}
            </p>

            {/* Desmontagem */}
            <p>
              <strong>Desmontagem:</strong> {evento.desmontagem || 'Não informada'}
            </p>

          </div>

        ))}

      </div>

    </main>
  )
}


// Exporta o componente
export default Eventos