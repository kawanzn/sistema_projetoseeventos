// =====================================================
// IMPORTAÇÕES
// =====================================================

// Importa o useState do React.
//
// O useState permite guardar informações que podem
// mudar enquanto o usuário utiliza o sistema.
//
// Vamos usar ele para:
// 1. guardar a lista de fornecedores;
// 2. abrir e fechar o formulário;
// 3. guardar o nome digitado;
// 4. guardar o serviço digitado.
import { useState } from 'react'


// =====================================================
// COMPONENTE FORNECEDORES
// =====================================================

// Esse componente representa toda a página
// de gerenciamento dos fornecedores.
function Fornecedores() {

  // =====================================================
  // LISTA DE FORNECEDORES
  // =====================================================

  // Guarda todos os fornecedores existentes.
  //
  // Diferente do que tínhamos antes, agora usamos
  // useState porque queremos permitir que novos
  // fornecedores sejam adicionados à lista.
  //
  // A lista já começa com os dois fornecedores
  // utilizados atualmente.
  const [fornecedores, setFornecedores] = useState([
    {
      id: 1,
      nome: 'Vip Tendas',
      servico: 'Estruturas, tendas e apoio para eventos'
    },

    {
      id: 2,
      nome: 'Dudu do Som',
      servico: 'Som e estrutura de áudio'
    }
  ])


  // =====================================================
  // CONTROLE DO FORMULÁRIO
  // =====================================================

  // Controla se o formulário aparece ou não.
  //
  // false = formulário fechado
  // true = formulário aberto
  const [mostrarFormulario, setMostrarFormulario] = useState(false)


  // =====================================================
  // CAMPOS DO FORMULÁRIO
  // =====================================================

  // Guarda o nome do fornecedor digitado pelo usuário.
  const [nomeFornecedor, setNomeFornecedor] = useState('')


  // Guarda o tipo de serviço prestado pelo fornecedor.
  const [servicoFornecedor, setServicoFornecedor] = useState('')


  // =====================================================
  // FUNÇÃO PARA CADASTRAR FORNECEDOR
  // =====================================================

  function cadastrarFornecedor() {

    // Primeiro fazemos uma validação simples.
    //
    // Se o nome OU o serviço estiver vazio,
    // o cadastro não será realizado.
    if (
      nomeFornecedor === '' ||
      servicoFornecedor === ''
    ) {

      // Mostra uma mensagem para o usuário.
      alert('Preencha o nome e o serviço do fornecedor.')

      // Encerra a função.
      return
    }


    // =====================================================
    // CRIA O NOVO FORNECEDOR
    // =====================================================

    // Criamos um objeto contendo os dados digitados.
    const novoFornecedor = {

      // Cria um ID temporário.
      //
      // Depois, quando conectarmos ao backend,
      // provavelmente o banco de dados será
      // responsável por gerar esse ID.
      id: Date.now(),

      // Nome informado no formulário.
      nome: nomeFornecedor,

      // Serviço informado no formulário.
      servico: servicoFornecedor
    }


    // =====================================================
    // ADICIONA NA LISTA
    // =====================================================

    // ...fornecedores mantém todos os fornecedores
    // que já estavam cadastrados.
    //
    // novoFornecedor adiciona o novo no final.
    setFornecedores([
      ...fornecedores,
      novoFornecedor
    ])


    // =====================================================
    // LIMPA O FORMULÁRIO
    // =====================================================

    // Depois de cadastrar, limpamos os campos.
    setNomeFornecedor('')
    setServicoFornecedor('')


    // Fecha o formulário.
    setMostrarFormulario(false)
  }


  // =====================================================
  // FUNÇÃO PARA EXCLUIR FORNECEDOR
  // =====================================================

  // Recebe o ID do fornecedor que será removido.
  function excluirFornecedor(id) {

    // filter cria uma nova lista.
    //
    // Mantemos todos os fornecedores cujo ID
    // seja DIFERENTE daquele que queremos excluir.
    const novaLista = fornecedores.filter(
      (fornecedor) => fornecedor.id !== id
    )


    // Atualiza a lista na tela.
    setFornecedores(novaLista)
  }


  // =====================================================
  // INTERFACE DA PÁGINA
  // =====================================================

  return (
    <main className="conteudo">

      {/* =================================================
          CABEÇALHO
          ================================================= */}

      {/* Título principal */}
      <h1>Fornecedores</h1>

      {/* Descrição da página */}
      <p>
        Gerencie os fornecedores utilizados nos eventos.
      </p>


      {/* =================================================
          BOTÃO NOVO FORNECEDOR
          ================================================= */}

      <button
        className="botao-novo-fornecedor"

        // Abre ou fecha o formulário.
        //
        // O ! inverte o valor:
        // false → true
        // true → false
        onClick={() =>
          setMostrarFormulario(!mostrarFormulario)
        }
      >
        + Novo Fornecedor
      </button>


      {/* =================================================
          FORMULÁRIO
          ================================================= */}

      {/* 
        O formulário só aparece quando
        mostrarFormulario for true.
      */}
      {mostrarFormulario && (

        <div className="formulario-fornecedor">

          {/* Título do formulário */}
          <h2>Novo Fornecedor</h2>


          {/* =================================================
              NOME DO FORNECEDOR
              ================================================= */}

          <label htmlFor="nomeFornecedor">
            Nome do fornecedor
          </label>

          <input
            type="text"
            id="nomeFornecedor"

            // Texto de exemplo dentro do campo.
            placeholder="Ex: Empresa de iluminação"

            // Valor guardado no estado.
            value={nomeFornecedor}

            // Toda vez que o usuário digitar,
            // atualizamos nomeFornecedor.
            onChange={(evento) =>
              setNomeFornecedor(evento.target.value)
            }
          />


          {/* =================================================
              SERVIÇO PRESTADO
              ================================================= */}

          <label htmlFor="servicoFornecedor">
            Serviço prestado
          </label>

          <input
            type="text"
            id="servicoFornecedor"

            placeholder="Ex: Iluminação e estrutura"

            value={servicoFornecedor}

            // Atualiza o serviço conforme
            // o usuário digita.
            onChange={(evento) =>
              setServicoFornecedor(evento.target.value)
            }
          />


          {/* =================================================
              BOTÃO CADASTRAR
              ================================================= */}

          <button
            className="botao-cadastrar-fornecedor"

            // Executa nossa função de cadastro.
            onClick={cadastrarFornecedor}
          >
            Cadastrar Fornecedor
          </button>

        </div>
      )}


      {/* =================================================
          LISTA DE FORNECEDORES
          ================================================= */}

      <div className="lista-fornecedores">

        <h2>Fornecedores cadastrados</h2>


        {/* 
          Caso todos os fornecedores sejam excluídos,
          mostramos essa mensagem.
        */}
        {fornecedores.length === 0 && (

          <p>
            Nenhum fornecedor cadastrado.
          </p>

        )}


        {/* 
          map percorre nossa lista.

          Para cada fornecedor existente,
          o React cria um card na tela.
        */}
        {fornecedores.map((fornecedor) => (

          <div
            className="fornecedor-item"

            // O React utiliza a key para identificar
            // cada item individualmente.
            key={fornecedor.id}
          >

            {/* Nome do fornecedor */}
            <h3>
              {fornecedor.nome}
            </h3>


            {/* Serviço prestado */}
            <p>
              <strong>Serviço:</strong>{' '}
              {fornecedor.servico}
            </p>


            {/* =================================================
                BOTÃO EXCLUIR
                ================================================= */}

            <button
              className="botao-excluir-fornecedor"

              // Passamos o ID deste fornecedor
              // para a função de exclusão.
              onClick={() =>
                excluirFornecedor(fornecedor.id)
              }
            >
              Excluir
            </button>

          </div>

        ))}

      </div>

    </main>
  )
}


// =====================================================
// EXPORTAÇÃO
// =====================================================

// Permite utilizar esse componente no App.jsx.
export default Fornecedores