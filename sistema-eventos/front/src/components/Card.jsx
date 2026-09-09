// =====================================================
// COMPONENTE CARD
// =====================================================

// O componente recebe três props:
//
// titulo = nome da informação
// valor = número mostrado
// cor = cor utilizada como destaque
// icone = pequeno símbolo visual
function Card({ titulo, valor, cor, icone }) {

  return (

    <div
      className="card-dashboard"

      // Criamos uma variável CSS personalizada.
      //
      // Isso permite que cada card tenha
      // uma cor diferente.
      style={{ '--cor-card': cor }}
    >

      {/* Parte superior do card */}
      <div className="card-topo">

        {/* Título */}
        <span className="card-titulo">
          {titulo}
        </span>


        {/* Ícone */}
        <div className="card-icone">
          {icone}
        </div>

      </div>


      {/* Número principal */}
      <strong className="card-valor">
        {valor}
      </strong>


      {/* Texto auxiliar */}
      <span className="card-legenda">
        Total registrado
      </span>

    </div>
  )
}


// Exporta o Card
export default Card