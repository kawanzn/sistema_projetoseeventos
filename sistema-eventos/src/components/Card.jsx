// Cria o componente Card e recebe informações através das props
function Card(props) {

  // Retorna a estrutura visual do card
  return (
    <div className="card">

      {/* Mostra o título recebido pelo componente */}
      <h3>{props.titulo}</h3>

      {/* Mostra o valor recebido pelo componente */}
      <span>{props.valor}</span>

    </div>
  )
}

// Permite utilizar o Card em outros arquivos
export default Card