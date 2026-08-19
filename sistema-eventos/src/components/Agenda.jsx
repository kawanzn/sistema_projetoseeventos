// Importamos recursos do React.
//
// useState:
// Guarda informações que podem mudar durante o uso da página.
//
// useEffect:
// Permite executar uma ação quando a página é carregada.
import { useEffect, useState } from 'react'


// Importamos o CSS específico da página Agenda.
//
// Esse arquivo será responsável pela aparência
// dos cards dos eventos.
// import './Agenda.css'


function Agenda() {

  // =========================================================
  // LISTA DE EVENTOS
  // =========================================================
  //
  // Aqui vamos guardar todos os eventos que forem
  // recebidos do nosso back-end.
  //
  // Começa como [] porque inicialmente não temos
  // nenhum evento carregado.
  const [eventos, setEventos] = useState([])


  // =========================================================
  // CARREGAMENTO
  // =========================================================
  //
  // Essa variável informa se ainda estamos esperando
  // uma resposta do back-end.
  //
  // Começa como true porque, quando a Agenda abrir,
  // vamos imediatamente buscar os eventos.
  const [carregando, setCarregando] = useState(true)


  // =========================================================
  // ERRO
  // =========================================================
  //
  // Aqui guardamos uma mensagem caso aconteça algum
  // problema durante a comunicação com o back-end.
  const [erro, setErro] = useState('')


  // =========================================================
  // FUNÇÃO PARA BUSCAR OS EVENTOS
  // =========================================================
  //
  // Essa função será responsável por conversar com
  // nossa API feita em Spring Boot.
  //
  // O "async" permite utilizar "await" dentro da função.
  const buscarEventos = async () => {

    try {

      // Informamos que uma busca está acontecendo.
      setCarregando(true)

      // Limpamos qualquer erro que possa ter acontecido
      // anteriormente.
      setErro('')


      // =====================================================
      // REQUISIÇÃO PARA O BACK-END
      // =====================================================
      //
      // O fetch faz uma requisição HTTP para nossa API.
      //
      // Estamos acessando:
      //
      // GET http://localhost:8080/api/eventos
      //
      // Essa rota deve retornar todos os eventos cadastrados.
      const resposta = await fetch(
        'http://localhost:8080/api/eventos'
      )


      // =====================================================
      // VERIFICA SE A REQUISIÇÃO DEU CERTO
      // =====================================================
      //
      // resposta.ok será true quando o servidor responder
      // corretamente.
      //
      // Caso aconteça algum erro, interrompemos a execução
      // e enviamos para o catch.
      if (!resposta.ok) {
        throw new Error('Erro ao buscar eventos')
      }


      // =====================================================
      // CONVERTE A RESPOSTA PARA JSON
      // =====================================================
      //
      // O Spring Boot envia os dados em JSON.
      //
      // Aqui transformamos a resposta em dados que o
      // JavaScript consegue utilizar.
      const dados = await resposta.json()


      // =====================================================
      // SALVA OS EVENTOS
      // =====================================================
      //
      // Colocamos os dados recebidos dentro de "eventos".
      //
      // Quando setEventos é executado, o React atualiza
      // automaticamente a tela.
      setEventos(dados)

    } catch (erroDaRequisicao) {

      // =====================================================
      // TRATAMENTO DE ERRO
      // =====================================================
      //
      // Caso o back-end esteja desligado, a rota esteja
      // errada ou aconteça outro problema, chegamos aqui.
      console.error(
        'Erro ao buscar eventos:',
        erroDaRequisicao
      )


      // Mensagem que será mostrada na página.
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
      // Portanto, aqui informamos que a busca terminou.
      setCarregando(false)
    }
  }


  // =========================================================
  // CARREGAMENTO INICIAL DA PÁGINA
  // =========================================================
  //
  // Quando o componente Agenda aparecer na tela,
  // executamos buscarEventos().
  //
  // O [] significa que esse efeito deve acontecer
  // somente uma vez quando a página abrir.
  useEffect(() => {

    buscarEventos()

  }, [])


  // =========================================================
  // PARTE VISUAL
  // =========================================================

  return (

    // Mantemos a classe "conteudo" que já existia
    // anteriormente no projeto.
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
          guardada na variável "erro".
      */}
      {erro && (

        <p>
          {erro}
        </p>

      )}


      {/* ===================================================
          NENHUM EVENTO
          ===================================================

          Essa mensagem só aparece quando:

          - terminou de carregar;
          - não aconteceu nenhum erro;
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

        // Cada evento recebe a classe "evento-card".
        //
        // A aparência dessa classe está definida
        // dentro do arquivo Agenda.css.
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