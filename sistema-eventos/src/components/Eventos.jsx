// =====================================================
// IMPORTAÇÕES
// =====================================================
//
// useState:
// Guarda informações que podem mudar na tela.
//
// useEffect:
// Executa uma ação quando o componente é carregado.
import { useState, useEffect } from 'react'


// =====================================================
// ENDEREÇO DA API
// =====================================================
//
// Colocamos a URL em uma constante para não precisar
// repetir o endereço várias vezes no código.
//
// IMPORTANTE:
// A rota correta dos eventos é /api/eventos.
const API_URL = 'https://api-eventos-95z8.onrender.com/api/eventos'


// =====================================================
// COMPONENTE EVENTOS
// =====================================================
function Eventos() {

  // =====================================================
  // CONTROLE DO FORMULÁRIO
  // =====================================================

  // Controla se o formulário será exibido ou escondido.
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

  // Data de montagem.
  const [dataMontagem, setDataMontagem] = useState('')

  // Data de desmontagem.
  const [dataDesmontagem, setDataDesmontagem] = useState('')

  const [responsavel, setResponsavel] = useState('')

  const [observacoes, setObservacoes] = useState('')


  // =====================================================
  // LISTA DE EVENTOS
  // =====================================================
  //
  // Guarda todos os eventos recebidos do back-end.
  //
  // Começa como [] porque inicialmente não temos eventos.
  const [eventos, setEventos] = useState([])


  // =====================================================
  // EVENTO EM EDIÇÃO
  // =====================================================
  //
  // Quando for null, significa que estamos cadastrando
  // um evento novo.
  //
  // Quando tiver um ID, significa que estamos editando.
  const [eventoEditandoId, setEventoEditandoId] = useState(null)


  // =====================================================
  // CARREGAMENTO
  // =====================================================
  //
  // Serve para mostrar que estamos esperando a API.
  const [carregando, setCarregando] = useState(true)


  // =====================================================
  // ERRO
  // =====================================================
  //
  // Guarda uma mensagem caso aconteça algum problema
  // na comunicação com o back-end.
  const [erro, setErro] = useState('')


  // =====================================================
  // BUSCAR EVENTOS
  // =====================================================
  //
  // Essa função busca todos os eventos cadastrados
  // no banco de dados.
  async function buscarEventos() {

    try {

      // Inicia o carregamento.
      setCarregando(true)

      // Limpa erros anteriores.
      setErro('')


      // Faz uma requisição GET para:
      //
      // https://api-eventos-95z8.onrender.com/api/eventos
      const resposta = await fetch(API_URL)


      // Verifica se a API respondeu corretamente.
      //
      // Se receber 404, 500 etc.,
      // interrompemos a função.
      if (!resposta.ok) {
        throw new Error(
          `Erro ao buscar eventos. Status: ${resposta.status}`
        )
      }


      // Converte a resposta da API para JSON.
      const dados = await resposta.json()


      // =====================================================
      // PROTEÇÃO IMPORTANTE
      // =====================================================
      //
      // O .map() só funciona em arrays.
      //
      // Por isso verificamos se "dados" realmente é uma lista.
      //
      // Isso evita novamente o erro:
      //
      // eventos.map is not a function
      if (Array.isArray(dados)) {

        setEventos(dados)

      } else {

        // Se a API devolver um objeto em vez de uma lista,
        // mostramos no console para facilitar o diagnóstico.
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

      // Mostra o erro completo no console.
      console.error(
        'Erro ao buscar eventos da API:',
        erroDaRequisicao
      )


      // Mostra uma mensagem para o usuário.
      setErro(
        'Não foi possível carregar os eventos.'
      )

    } finally {

      // A busca terminou, tendo dado certo ou errado.
      setCarregando(false)
    }
  }


  // =====================================================
  // BUSCA INICIAL
  // =====================================================
  //
  // Quando a página Eventos abrir, buscamos os eventos.
  //
  // O [] faz o useEffect executar apenas uma vez.
  useEffect(() => {

    buscarEventos()

  }, [])


  // =====================================================
  // SALVAR EVENTO
  // =====================================================
  //
  // Essa função serve tanto para cadastrar quanto,
  // futuramente, editar um evento.
  async function salvarEvento() {

    // -----------------------------------------------------
    // VALIDAÇÃO
    // -----------------------------------------------------
    //
    // Nome, local e data são obrigatórios.
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
    // OBJETO QUE SERÁ ENVIADO PARA O BACK-END
    // =====================================================
    const payload = {

      nome: nomeEvento,

      local: localEvento,

      dataEvento: dataEvento,

      // Caso esteja vazio, enviamos null.
      dataMontagem: dataMontagem || null,

      // Caso esteja vazio, enviamos null.
      dataDesmontagem: dataDesmontagem || null,

      // Todo novo evento começa como solicitado.
      status: 'SOLICITADO',

      responsavel: responsavel,

      observacoes: observacoes
    }


    // =====================================================
    // EDIÇÃO
    // =====================================================
    //
    // Por enquanto sua edição continua apenas na tela,
    // porque ainda vamos criar/conferir o PUT no back-end.
    if (eventoEditandoId !== null) {

      const eventosAtualizados = eventos.map((evento) => {

        // Encontramos o evento que está sendo editado.
        if (evento.id === eventoEditandoId) {

          // Mantemos os dados antigos e substituímos
          // pelos dados atuais do formulário.
          return {
            ...evento,
            ...payload
          }
        }

        return evento
      })


      // Atualiza a lista na tela.
      setEventos(eventosAtualizados)


      // Limpa o formulário.
      limparCampos()

      return
    }


    // =====================================================
    // CADASTRO DE NOVO EVENTO
    // =====================================================
    //
    // Se não estamos editando, fazemos um POST.
    try {

      const resposta = await fetch('https://api-eventos-95z8.onrender.com/api/eventos', {

        // POST significa cadastrar/criar.
        method: 'POST',

        headers: {

          // Informamos que estamos enviando JSON.
          'Content-Type': 'application/json'
        },

        // Converte o objeto JavaScript para JSON.
        body: JSON.stringify(payload)
      })


      // Verifica se o cadastro deu certo.
      if (!resposta.ok) {

        throw new Error(
          `Erro ao salvar evento. Status: ${resposta.status}`
        )
      }


      // O back-end devolve o evento salvo,
      // normalmente já com o ID criado pelo banco.
      const dadoSalvoNoBanco = await resposta.json()


      // =====================================================
      // ATUALIZA A TELA
      // =====================================================
      //
      // Pegamos os eventos que já existiam e adicionamos
      // o novo evento ao final da lista.
      setEventos((eventosAtuais) => [
        ...eventosAtuais,
        dadoSalvoNoBanco
      ])


      // Limpa e fecha o formulário.
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
  //
  // Volta o formulário para o estado inicial.
  function limparCampos() {

    setNomeEvento('')

    setLocalEvento('')

    setDataEvento('')

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
  //
  // IMPORTANTE:
  // Por enquanto isso remove somente da tela.
  //
  // Depois vamos conectar com DELETE no Spring Boot
  // para apagar também do banco.
  function excluirEvento(id) {

    const novaLista = eventos.filter(
      (evento) => evento.id !== id
    )

    setEventos(novaLista)
  }


  // =====================================================
  // EDITAR EVENTO
  // =====================================================
  //
  // Coloca os dados do evento dentro do formulário
  // para que o usuário possa alterar.
  function editarEvento(evento) {

    setNomeEvento(evento.nome || '')

    setLocalEvento(evento.local || '')

    setDataEvento(evento.dataEvento || '')

    setDataMontagem(evento.dataMontagem || '')

    setDataDesmontagem(evento.dataDesmontagem || '')

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

          // Primeiro limpamos os dados de uma possível
          // edição anterior.
          limparCampos()

          // Depois mostramos o formulário.
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

          {/* RESPONSÁVEL PELO EVENTO (DUDU OU VIP) */}
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


        {/* Mostra enquanto a API responde */}
        {carregando && (

          <p>
            Carregando eventos...
          </p>

        )}


        {/* Mostra caso aconteça algum erro */}
        {!carregando && erro && (

          <p>
            {erro}
          </p>

        )}


        {/* Só mostra "nenhum evento" depois
            que a busca terminar e não houver erro. */}
        {!carregando &&
          !erro &&
          eventos.length === 0 && (

            <p>
              Nenhum evento cadastrado.
            </p>

        )}


        {/* =================================================
            CARDS DOS EVENTOS
            =================================================

            Array.isArray(eventos) é uma segurança extra.

            Assim o React nunca tentará executar .map()
            em algo que não seja uma lista.
        */}
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
//
// Permite utilizar o componente Eventos
// nas rotas da aplicação.
export default Eventos