// Importa o useState da biblioteca React
// useState serve para guardar informações que podem mudar durante o uso da página
import { useState } from 'react'


// Cria o componente Eventos
// Esse componente representa toda a tela de gerenciamento de eventos
function Eventos() {

  // =====================================================
  // ESTADOS DA PÁGINA
  // =====================================================

  // Controla se o formulário de "Novo Evento" aparece ou não
  //
  // mostrarFormulario = guarda o valor atual
  // setMostrarFormulario = função usada para alterar esse valor
  //
  // false = formulário fechado
  // true = formulário aberto
  const [mostrarFormulario, setMostrarFormulario] = useState(false)


  // Guarda o nome digitado pelo usuário
  // Começa com '' porque inicialmente o campo está vazio
  const [nomeEvento, setNomeEvento] = useState('')


  // Guarda o local digitado pelo usuário
  const [localEvento, setLocalEvento] = useState('')


  // Guarda a data em que o evento acontecerá
  const [dataEvento, setDataEvento] = useState('')


  // Guarda a data em que será feita a montagem do evento
  const [dataMontagem, setDataMontagem] = useState('')


  // Guarda a data em que será feita a desmontagem do evento
  const [dataDesmontagem, setDataDesmontagem] = useState('')


  // =====================================================
  // CONTEÚDO QUE APARECE NA TELA
  // =====================================================

  return (
    <main className="conteudo">

      {/* Título principal da página */}
      <h1>Eventos</h1>


      {/* Pequena descrição da função dessa página */}
      <p>Gerencie os eventos cadastrados no sistema.</p>


      {/* =====================================================
          BOTÃO NOVO EVENTO
          ===================================================== */}

      {/* 
        Quando o usuário clicar nesse botão,
        setMostrarFormulario altera o estado.

        O sinal ! significa "inverter".

        Se mostrarFormulario for false:
        !false = true

        Se mostrarFormulario for true:
        !true = false

        Portanto, o mesmo botão abre e fecha o formulário.
      */}
      <button
        className="botao-novo-evento"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        + Novo Evento
      </button>


      {/* =====================================================
          FORMULÁRIO DE NOVO EVENTO
          ===================================================== */}

      {/* 
        O && significa que o formulário abaixo
        só será exibido quando mostrarFormulario for true.

        Se for false, o React não mostra essa parte.
      */}
      {mostrarFormulario && (

        <div className="formulario-evento">

          {/* Título da área de cadastro */}
          <h2>Novo Evento</h2>


          {/* =================================================
              CAMPO: NOME DO EVENTO
              ================================================= */}

          {/* 
            O label informa ao usuário o que deve ser
            preenchido no campo abaixo.
          */}
          <label htmlFor="nomeEvento">
            Nome do evento
          </label>

          {/* 
            Input de texto para digitar o nome.

            value={nomeEvento}
            mostra o valor que está guardado no estado.

            onChange
            é executado sempre que o usuário digita algo.

            evento.target.value
            representa exatamente o texto que está
            dentro do input naquele momento.
          */}
          <input
            type="text"
            id="nomeEvento"
            placeholder="Ex: Formatura Couni"
            value={nomeEvento}
            onChange={(evento) => setNomeEvento(evento.target.value)}
          />


          {/* =================================================
              CAMPO: LOCAL DO EVENTO
              ================================================= */}

          <label htmlFor="localEvento">
            Local do evento
          </label>

          {/* Campo para informar onde o evento acontecerá */}
          <input
            type="text"
            id="localEvento"
            placeholder="Ex: Centro de Eventos"
            value={localEvento}
            onChange={(evento) => setLocalEvento(evento.target.value)}
          />


          {/* =================================================
              CAMPO: DATA DO EVENTO
              ================================================= */}

          <label htmlFor="dataEvento">
            Data do evento
          </label>

          {/* 
            type="date" faz o navegador mostrar
            um campo próprio para selecionar datas.
          */}
          <input
            type="date"
            id="dataEvento"
            value={dataEvento}
            onChange={(evento) => setDataEvento(evento.target.value)}
          />


          {/* =================================================
              CAMPO: DATA DE MONTAGEM
              ================================================= */}

          <label htmlFor="dataMontagem">
            Data de montagem
          </label>

          {/* 
            Guarda a data em que a equipe começará
            a montagem da estrutura do evento.
          */}
          <input
            type="date"
            id="dataMontagem"
            value={dataMontagem}
            onChange={(evento) => setDataMontagem(evento.target.value)}
          />


          {/* =================================================
              CAMPO: DATA DE DESMONTAGEM
              ================================================= */}

          <label htmlFor="dataDesmontagem">
            Data de desmontagem
          </label>

          {/* 
            Guarda a data prevista para desmontar
            a estrutura depois do evento.
          */}
          <input
            type="date"
            id="dataDesmontagem"
            value={dataDesmontagem}
            onChange={(evento) => setDataDesmontagem(evento.target.value)}
          />

        </div>
      )}

    </main>
  )
}


// Exporta o componente Eventos
// Isso permite importar esse componente no App.jsx
export default Eventos