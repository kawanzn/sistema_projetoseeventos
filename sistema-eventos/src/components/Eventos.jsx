// Cria o componente responsável pela tela de Eventos
function Eventos() {

  // Retorna o conteúdo que será exibido na página
  return (
    <main className="conteudo">

      {/* Título da página */}
      <h1>Eventos</h1>

      {/* Descrição da página */}
      <p>Gerencie os eventos cadastrados no sistema.</p>

      {/* Botão que futuramente abrirá o formulário de cadastro */}
      <button className="botao-novo-evento">
        + Novo Evento
      </button>

    </main>
  )
}

// Exporta o componente para podermos utilizá-lo em outros arquivos
export default Eventos