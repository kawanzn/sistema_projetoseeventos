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
//
// Esse arquivo vai cuidar da aparência da Agenda,
// principalmente dos cards dos eventos.
import './Agenda.css'

function Agenda() {

  // =========================================================
  // LISTA DE EVENTOS
  // =========================================================
  //
  // Aqui vamos guardar os eventos recebidos do back-end.
  //
  // Começa como um array vazio porque, no início,
  // ainda não carregamos nenhum evento.
  const [eventos, setEventos] = useState([])

  // =========================================================
  // CARREGAMENTO
  // =========================================================
  //
  // Essa variável informa se ainda estamos esperando
  // uma resposta do back-end.
  //
  // Começa como true porque a página já vai tentar
  // buscar os eventos assim que abrir.
  const [carregando, setCarregando] = useState(true)

  // =========================================================
  // ERRO
  // =========================================================
  //
  // Aqui guardamos uma mensagem caso aconteça algum
  // problema ao buscar os eventos.
  const [erro, setErro] = useState('')

  // =========================================================
  // FUNÇÃO PARA BUSCAR OS EVENTOS
  // =========================================================
  //
  // Essa função conversa com nossa API feita em Spring Boot.
  //
  // O "async" permite usar "await" dentro da função.
  const buscarEventos = async () => {

    try {

      // Informamos que uma busca começou.
      setCarregando(true)

      // Limpamos qualquer erro anterior.
      setErro('')

      // =====================================================
      // REQUISIÇÃO PARA O BACK-END
      // =====================================================
      //
      // O fetch faz uma requisição HTTP.
      //
      // Estamos acessando nosso Spring Boot na porta 8080.
      //
      // Essa rota deve retornar todos os eventos cadastrados.
      const resposta = await fetch(
        'http://localhost:8080/api/eventos'
      )

      // =====================================================
      // VERIFICA SE A REQUISIÇÃO DEU CERTO
      // =====================================================
      //
      // resposta.ok será true quando a resposta HTTP
      // estiver dentro da faixa de sucesso.
      //
      // Exemplo:
      // 200 = deu certo.
      //
      // Se não der certo, lançamos um erro.
      if (!resposta.ok) {
        throw new Error('Erro ao buscar eventos')
      }

      // =====================================================
      // CONVERTE A RESPOSTA PARA JSON
      // =====================================================
      //
      // O Spring Boot envia os dados em JSON.
      //
      // Aqui transformamos esse JSON em dados que o
      // JavaScript consegue utilizar.
      const dados = await resposta.json()

      // =====================================================
      // SALVA OS EVENTOS
      // =====================================================
      //
      // Colocamos os eventos recebidos dentro do estado.
      //
      // Quando setEventos é executado, o React atualiza
      // automaticamente a página.
      setEventos(dados)

    } catch (erroDaRequisicao) {

      // =====================================================
      // TRATAMENTO DE ERRO
      // =====================================================
      //
      // Se o back-end estiver desligado, a rota estiver
      // errada ou acontecer outro problema, caímos aqui.
      console.error(
        'Erro ao buscar eventos:',
        erroDaRequisicao
      )

      // Mensagem que será mostrada na tela.
      setErro(
        'Não foi possível carregar os eventos.'
      )

    } finally {

      // =====================================================
      // FINAL DA BUSCA
      // =====================================================
      //
      // O finally acontece tanto quando dá certo
      // quanto quando dá errado.
      //
      // Aqui informamos que a busca terminou.
      setCarregando(false)
    }
  }

  // =========================================================
  // CARREGAMENTO INICIAL DA PÁGINA
  // =========================================================
  //
  // O useEffect é executado quando a Agenda aparece.
  //
  // O [] significa que essa ação deve acontecer
  // somente uma vez ao carregar o componente.
  useEffect(() => {
    buscarEventos()
  }, [])

  // =========================================================
  // PARTE VISUAL DA PÁGINA
  // =========================================================
  return (
    <main className="conteudo">

      {/* Título da página */}
      <h1>
        Agenda
      </h1>

      {/* Descrição da página */}
      <p>
        Acompanhe os eventos cadastrados no sistema.
      </p>

      {/* ===================================================
          CARREGANDO
          ===================================================

          Essa mensagem aparece enquanto estamos
          esperando o back-end responder.
      */}
      {carregando && (
        <p>
          Carregando eventos...
        </p>
      )}

      {/* ===================================================
          ERRO
          ===================================================

          Caso exista algum erro, mostramos a mensagem
          guardada dentro da variável "erro".
      */}
      {!carregando && erro && (
        <p>
          {erro}
        </p>
      )}

      {/* ===================================================
          NENHUM EVENTO
          ===================================================

          Essa mensagem aparece somente quando:

          - terminou de carregar;
          - não aconteceu erro;
          - não existem eventos cadastrados.
      */}
      {!carregando && !erro && eventos.length === 0 && (
        <p>
          Nenhum evento encontrado.
        </p>
      )}

      {/* ===================================================
          LISTA DOS EVENTOS
          ===================================================

          O map percorre todos os eventos recebidos
          do back-end.

          Para cada evento, criamos um card.
      */}
      {!carregando && !erro && eventos.map((evento) => (

        <div
          key={evento.id}
          className="evento-card"
        >

          {/* Nome do evento */}
          <h3>
            {evento.nome}
          </h3>

          {/* Data do evento */}
          <p>
            <strong>Data:</strong>{' '}
            {evento.dataEvento}
          </p>

          {/* Local do evento */}
          <p>
            <strong>Local:</strong>{' '}
            {evento.local}
          </p>

        </div>
      ))}

    </main>
  )
}

// ===========================================================
// EXPORTAÇÃO
// ===========================================================
//
// Permite que o componente Agenda seja utilizado
// pelo restante da aplicação.
export default Agenda