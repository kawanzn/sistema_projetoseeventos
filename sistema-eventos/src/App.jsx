// Importa o CSS da aplicação
import './App.css'

// Importa o componente Sidebar
import Sidebar from './components/Sidebar.jsx'

// Cria o componente principal da aplicação
function App() {

  // Retorna o conteúdo que será exibido na tela
  return (
    <div className="app">

      {/* Exibe o componente Sidebar */}
      <Sidebar />

      {/* Área principal da página */}
      <main className="conteudo">

        {/* Título principal */}
        <h1>Sistema de Projetos e Eventos</h1>

        {/* Parágrafo de apresentação */}
        <p>Controle e organização dos eventos do setor.</p>

      </main>
    </div>
  )
}

// Exporta o App para poder ser utilizado em outro arquivo
export default App