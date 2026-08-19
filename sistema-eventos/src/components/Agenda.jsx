import { useEffect, useState } from 'react'

function Agenda() {

  // Guarda os eventos recebidos do back-end
  const [eventos, setEventos] = useState([])

  // Executa quando a tela Agenda é aberta
  useEffect(() => {

    // Busca todos os eventos cadastrados no back-end
    fetch('http://localhost:8080/api/eventos')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setEventos(dados)
      })
      .catch((erro) => {
        console.error('Erro ao buscar eventos:', erro)
      })

  }, [])

  return (
    <main className="conteudo">

      <h1>Agenda</h1>

      <p>
        Acompanhe os eventos cadastrados no sistema.
      </p>

      {eventos.length === 0 && (
        <p>Nenhum evento encontrado.</p>
      )}

      {eventos.map((evento) => (
        <div key={evento.id}>
          <h3>{evento.nome}</h3>

          <p>
            <strong>Data:</strong> {evento.dataEvento}
          </p>

          <p>
            <strong>Local:</strong> {evento.local}
          </p>
        </div>
      ))}

    </main>
  )
}

export default Agenda