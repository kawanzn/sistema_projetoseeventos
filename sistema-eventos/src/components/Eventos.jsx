// =====================================================
// IMPORTAÇÕES
// =====================================================

import { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'


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
  // RELATÓRIO EM PDF
  // =====================================================

  // Controla a exibição dos campos de período do relatório.
  const [mostrarRelatorio, setMostrarRelatorio] = useState(false)

  // Data inicial e final escolhidas pelo usuário.
  const [dataInicialRelatorio, setDataInicialRelatorio] = useState('')
  const [dataFinalRelatorio, setDataFinalRelatorio] = useState('')


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
  // GERAR RELATÓRIO EM PDF
  // =====================================================

  function gerarRelatorioPDF() {

    // Exige as duas datas antes de gerar o relatório.
    if (!dataInicialRelatorio || !dataFinalRelatorio) {
      alert('Informe a data inicial e a data final do relatório.')
      return
    }

    // Impede um período invertido.
    if (dataInicialRelatorio > dataFinalRelatorio) {
      alert('A data inicial não pode ser maior que a data final.')
      return
    }

    // Filtra somente os eventos dentro do período informado.
    const eventosDoPeriodo = eventos
      .filter((evento) =>
        evento.dataEvento >= dataInicialRelatorio &&
        evento.dataEvento <= dataFinalRelatorio
      )
      .sort((eventoA, eventoB) =>
        eventoA.dataEvento.localeCompare(eventoB.dataEvento)
      )

    if (eventosDoPeriodo.length === 0) {
      alert('Nenhum evento encontrado no período informado.')
      return
    }

    // Converte AAAA-MM-DD para DD/MM/AAAA sem alterar o fuso horário.
    function formatarDataRelatorio(data) {
      if (!data) return 'Não informada'
      const [ano, mes, dia] = data.split('-')
      return `${dia}/${mes}/${ano}`
    }

    // Cria o documento PDF em tamanho A4.
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const margemEsquerda = 15
    const margemDireita = 15
    const larguraUtil = 210 - margemEsquerda - margemDireita
    const limiteInferior = 280
    let y = 20

    // Cria uma nova página quando o conteúdo chega ao final da atual.
    function verificarNovaPagina(alturaNecessaria = 10) {
      if (y + alturaNecessaria > limiteInferior) {
        pdf.addPage()
        y = 20
      }
    }

    // Cabeçalho do relatório.
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(18)
    pdf.text('RELATÓRIO DE EVENTOS', margemEsquerda, y)

    y += 9
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(11)
    pdf.text(
      `Período: ${formatarDataRelatorio(dataInicialRelatorio)} a ${formatarDataRelatorio(dataFinalRelatorio)}`,
      margemEsquerda,
      y
    )

    y += 6
    pdf.text(
      `Total de eventos: ${eventosDoPeriodo.length}`,
      margemEsquerda,
      y
    )

    y += 10

    // Adiciona cada evento ao PDF.
    eventosDoPeriodo.forEach((evento, indice) => {
      verificarNovaPagina(45)

      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(13)
      pdf.text(`${indice + 1}. ${evento.nome || 'Evento sem nome'}`, margemEsquerda, y)
      y += 7

      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(10)

      const horario = evento.horaEvento
        ? evento.horaEvento.substring(0, 5)
        : 'Não informado'

      const linhas = [
        `Data: ${formatarDataRelatorio(evento.dataEvento)}`,
        `Horário: ${horario}`,
        `Local: ${evento.local || 'Não informado'}`,
        `Responsável: ${evento.responsavel || 'Não informado'}`,
        `Status: ${evento.status || 'Não informado'}`
      ]

      linhas.forEach((linha) => {
        verificarNovaPagina(6)
        pdf.text(linha, margemEsquerda, y)
        y += 5
      })

      // Observações podem ser grandes, então quebramos o texto em várias linhas.
      const observacoes = evento.observacoes || 'Sem observações'
      const textoObservacoes = pdf.splitTextToSize(
        `Observações: ${observacoes}`,
        larguraUtil
      )

      verificarNovaPagina(textoObservacoes.length * 5 + 4)
      pdf.text(textoObservacoes, margemEsquerda, y)
      y += textoObservacoes.length * 5 + 4

      // Linha divisória entre os eventos.
      pdf.line(margemEsquerda, y, 195, y)
      y += 7
    })

    // Nome do arquivo com o próprio período selecionado.
    const inicioArquivo = formatarDataRelatorio(dataInicialRelatorio).replaceAll('/', '-')
    const fimArquivo = formatarDataRelatorio(dataFinalRelatorio).replaceAll('/', '-')

    pdf.save(`relatorio-eventos-${inicioArquivo}-a-${fimArquivo}.pdf`)
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
          RELATÓRIO DE EVENTOS
          ================================================= */}

      <button
        className="botao-novo-evento"
        onClick={() =>
          setMostrarRelatorio((valorAtual) => !valorAtual)
        }
      >
        📄 Criar Relatório
      </button>


      {mostrarRelatorio && (

        <div className="formulario-evento">

          <h2>
            Relatório de Eventos
          </h2>

          <p>
            Selecione o período que deseja incluir no PDF.
          </p>

          {/* DATA INICIAL DO RELATÓRIO */}
          <label htmlFor="dataInicialRelatorio">
            Data inicial
          </label>

          <input
            type="date"
            id="dataInicialRelatorio"
            value={dataInicialRelatorio}
            onChange={(e) =>
              setDataInicialRelatorio(e.target.value)
            }
          />


          {/* DATA FINAL DO RELATÓRIO */}
          <label htmlFor="dataFinalRelatorio">
            Data final
          </label>

          <input
            type="date"
            id="dataFinalRelatorio"
            value={dataFinalRelatorio}
            onChange={(e) =>
              setDataFinalRelatorio(e.target.value)
            }
          />


          {/* GERA E BAIXA O PDF */}
          <button
            className="botao-cadastrar-evento"
            onClick={gerarRelatorioPDF}
          >
            Gerar PDF
          </button>

        </div>
      )}


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