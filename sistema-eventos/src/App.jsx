// Importa o arquivo CSS responsável pelos estilos
import './App.css'

// Importa o componente da barra lateral
import Sidebar from './components/Sidebar.jsx'

// Importa o componente da tela Dashboard
import Dashboard from './components/Dashboard.jsx'


// Componente principal da aplicação
function App() {

  // Retorna os elementos que aparecerão na tela
  return (
    <div className="app">

      {/* Exibe nossa barra lateral */}
      <Sidebar />

      {/* Exibe o conteúdo do Dashboard */}
      <Dashboard />

    </div>
  )
}

// Exporta o componente App para ser utilizado pelo React
export default App