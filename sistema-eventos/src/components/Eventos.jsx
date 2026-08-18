// =====================================================
// IMPORTAÇÕES
// =====================================================
import { useState, useEffect } from 'react'

// =====================================================
// COMPONENTE EVENTOS
// =====================================================
function Eventos() {

  // =====================================================
  // CONTROLE DO FORMULÁRIO E ESTADOS
  // =====================================================
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nomeEvento, setNomeEvento] = useState('')
  const [localEvento, setLocalEvento] = useState('')
  const [dataEvento, setDataEvento] = useState('')
  const [dataMontagem, setDataMontagem] = useState('')
  const [dataDesmontagem, setDataDesmontagem] = useState('')
  const [eventos, setEventos] = useState([])
  const [eventoEditandoId, setEventoEditandoId] = useState(null)


  // =====================================================
  // BUSCA INICIAL (GET) - LÊ DO BANCO DE DADOS
  // =====================================================
  useEffect(() => {
    fetch('http://localhost:8080/api/eventos')
      .then(resposta => resposta.json())
      .then(dados => setEventos(dados))
      .catch(erro => console.error("Erro ao buscar eventos da API:", erro));
  }, []);


  // =====================================================
  // FUNÇÃO PARA CADASTRAR OU SALVAR UMA EDIÇÃO
  // =====================================================
  function salvarEvento() {
    if (nomeEvento === '' || localEvento === '' || dataEvento === '') {
      alert('Preencha nome, local e data do evento.')
      return
    }

    const payload = {
      nome: nomeEvento,
      local: localEvento,
      dataEvento: dataEvento,
      dataMontagem: dataMontagem || null,
      dataDesmontagem: dataDesmontagem || null,
      status: "SOLICITADO" 
    }

    // =====================================================
    // SE ESTIVER EDITANDO (MANTIDO OFFLINE POR ENQUANTO)
    // =====================================================
    if (eventoEditandoId !== null) {
      const eventosAtualizados = eventos.map((evento) => {
        if (evento.id === eventoEditandoId) {
          return { ...evento, ...payload }
        }
        return evento
      })
      setEventos(eventosAtualizados)
      limparCampos()

    } else {
      // =====================================================
      // SE FOR UM NOVO EVENTO (POST) - SALVA NO BANCO
      // =====================================================
      fetch('http://localhost:8080/api/eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(resposta => {
        if (!resposta.ok) throw new Error("Erro ao salvar no banco de dados");
        return resposta.json();
      })
      .then(dadoSalvoNoBanco => {
        // Adiciona o evento retornado pela API (com o ID real) na tela
        setEventos([...eventos, dadoSalvoNoBanco])
        limparCampos()
      })
      .catch(erro => alert(erro.message));
    }
  }

  // =====================================================
  // FUNÇÕES AUXILIARES E DE AÇÕES
  // =====================================================
  function limparCampos() {
    setNomeEvento('')
    setLocalEvento('')
    setDataEvento('')
    setDataMontagem('')
    setDataDesmontagem('')
    setEventoEditandoId(null)
    setMostrarFormulario(false)
  }

  function excluirEvento(id) {
    // ATENÇÃO: Ainda está offline. Precisa criar a rota DELETE no Java depois.
    const novaLista = eventos.filter((evento) => evento.id !== id)
    setEventos(novaLista)
  }

  function editarEvento(evento) {
    setNomeEvento(evento.nome)
    setLocalEvento(evento.local)
    setDataEvento(evento.dataEvento)
    setDataMontagem(evento.dataMontagem || '')
    setDataDesmontagem(evento.dataDesmontagem || '')
    setEventoEditandoId(evento.id)
    setMostrarFormulario(true)
  }

  // =====================================================
  // INTERFACE (HTML/JSX)
  // =====================================================
  return (
    <main className="conteudo">
      <h1>Eventos</h1>
      <p>Gerencie os eventos cadastrados no sistema.</p>

      <button
        className="botao-novo-evento"
        onClick={() => {
          limparCampos()
          setMostrarFormulario(!mostrarFormulario)
        }}
      >
        + Novo Evento
      </button>

      {mostrarFormulario && (
        <div className="formulario-evento">
          <h2>{eventoEditandoId !== null ? 'Editar Evento' : 'Novo Evento'}</h2>

          <label htmlFor="nomeEvento">Nome do evento</label>
          <input type="text" id="nomeEvento" placeholder="Ex: Formatura Couni" value={nomeEvento} onChange={(e) => setNomeEvento(e.target.value)} />

          <label htmlFor="localEvento">Local do evento</label>
          <input type="text" id="localEvento" placeholder="Ex: Centro de Eventos" value={localEvento} onChange={(e) => setLocalEvento(e.target.value)} />

          <label htmlFor="dataEvento">Data do evento</label>
          <input type="date" id="dataEvento" value={dataEvento} onChange={(e) => setDataEvento(e.target.value)} />

          <label htmlFor="dataMontagem">Data de montagem</label>
          <input type="date" id="dataMontagem" value={dataMontagem} onChange={(e) => setDataMontagem(e.target.value)} />

          <label htmlFor="dataDesmontagem">Data de desmontagem</label>
          <input type="date" id="dataDesmontagem" value={dataDesmontagem} onChange={(e) => setDataDesmontagem(e.target.value)} />

          <button className="botao-cadastrar-evento" onClick={salvarEvento}>
            {eventoEditandoId !== null ? 'Salvar Alterações' : 'Cadastrar Evento'}
          </button>
        </div>
      )}

      <div className="lista-eventos">
        <h2>Eventos cadastrados</h2>

        {eventos.length === 0 && (
          <p>Nenhum evento cadastrado ou carregando do banco...</p>
        )}

        {eventos.map((evento) => (
          <div className="evento-item" key={evento.id}>
            <h3>{evento.nome}</h3>
            
            <p><strong>Local:</strong> {evento.local}</p>
            <p><strong>Data:</strong> {evento.dataEvento}</p>
            <p><strong>Montagem:</strong> {evento.dataMontagem || 'Não informada'}</p>
            <p><strong>Desmontagem:</strong> {evento.dataDesmontagem || 'Não informada'}</p>

            <div className="acoes-evento">
              <button className="botao-editar" onClick={() => editarEvento(evento)}>Editar</button>
              <button className="botao-excluir" onClick={() => excluirEvento(evento.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Eventos