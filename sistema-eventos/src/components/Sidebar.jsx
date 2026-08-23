// =====================================================
// COMPONENTE DE ÍCONES
// =====================================================
//
// Em vez de utilizar símbolos do teclado,
// criamos pequenos ícones SVG.
//
// SVG é um formato vetorial.
// Isso significa que os ícones continuam bonitos
// mesmo quando aumentamos ou diminuímos seu tamanho.

function Icone({ tipo }) {

  // ===================================================
  // DASHBOARD
  // ===================================================

  if (tipo === 'dashboard') {

    return (

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >

        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="2"
        />

        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="2"
        />

        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="2"
        />

        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="2"
        />

      </svg>

    )

  }


  // ===================================================
  // EVENTOS
  // ===================================================

  if (tipo === 'eventos') {

    return (

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >

        <path
          d="M7 3v3M17 3v3M4 9h16"
        />

        <rect
          x="3"
          y="5"
          width="18"
          height="16"
          rx="3"
        />

        <path
          d="M8 13h3M13 13h3M8 17h3"
        />

      </svg>

    )

  }


  // ===================================================
  // FORNECEDORES
  // ===================================================

  if (tipo === 'fornecedores') {

    return (

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >

        <path
          d="M4 21V7l8-4 8 4v14"
        />

        <path
          d="M8 21v-6h8v6"
        />

        <path
          d="M8 9h.01M12 9h.01M16 9h.01"
        />

        <path
          d="M8 12h.01M12 12h.01M16 12h.01"
        />

      </svg>

    )

  }


  // ===================================================
  // AGENDA
  // ===================================================

  if (tipo === 'agenda') {

    return (

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >

        <rect
          x="3"
          y="5"
          width="18"
          height="16"
          rx="3"
        />

        <path
          d="M7 3v4M17 3v4M3 10h18"
        />

        <path
          d="M8 14h2M12 14h2M16 14h1M8 17h2M12 17h2"
        />

      </svg>

    )

  }


  return null

}


// =====================================================
// COMPONENTE SIDEBAR
// =====================================================
//
// Recebe:
//
// pagina:
// página atualmente selecionada.
//
// setPagina:
// função responsável por trocar a página.
//
// aberta:
// informa se o menu está aberto no celular.
//
// onFechar:
// fecha a Sidebar no celular.

function Sidebar({
  pagina,
  setPagina,
  aberta,
  onFechar
}) {


  // ===================================================
  // ITENS DO MENU
  // ===================================================
  //
  // Centralizamos os itens dentro de uma lista.
  //
  // Isso deixa nosso código menor e facilita
  // adicionar novas páginas futuramente.

  const itensMenu = [

    {
      id: 'dashboard',
      nome: 'Dashboard',
      descricao: 'Visão geral'
    },

    {
      id: 'eventos',
      nome: 'Eventos',
      descricao: 'Gerenciamento'
    },

    {
      id: 'fornecedores',
      nome: 'Fornecedores',
      descricao: 'Parceiros'
    },

    {
      id: 'agenda',
      nome: 'Agenda',
      descricao: 'Calendário'
    }

  ]


  // ===================================================
  // PARTE VISUAL
  // ===================================================

  return (

    <aside
      className={
        aberta
          ? 'sidebar sidebar-aberta'
          : 'sidebar'
      }
    >


      {/* =================================================
          IDENTIDADE DO SISTEMA
          ================================================= */}

      <div className="sidebar-cabecalho">

        <div className="sidebar-logo">


          {/* ===============================================
              LOGOTIPO
              =============================================== */}

          <div className="logo-icone">

            <span>
              PE
            </span>

          </div>


          {/* ===============================================
              NOME
              =============================================== */}

          <div className="sidebar-logo-texto">

            <h2>
              Projetos
            </h2>

            <span>
              Gestão de Eventos
            </span>

          </div>

        </div>


        {/* ===============================================
            BOTÃO FECHAR NO CELULAR
            =============================================== */}

        <button
          type="button"
          className="sidebar-fechar"
          onClick={onFechar}
          aria-label="Fechar menu"
        >

          ×

        </button>

      </div>


      {/* =================================================
          IDENTIFICADOR
          ================================================= */}

      <div className="sidebar-workspace">

        <div className="workspace-icone">
          P
        </div>

        <div>

          <span>
            WORKSPACE
          </span>

          <strong>
            Projetos & Eventos
          </strong>

        </div>

      </div>


      {/* =================================================
          TÍTULO DO MENU
          ================================================= */}

      <p className="menu-titulo">
        MENU PRINCIPAL
      </p>


      {/* =================================================
          NAVEGAÇÃO
          ================================================= */}

      <nav>

        {itensMenu.map((item) => {


          // Verificamos se esse item corresponde
          // à página atualmente aberta.
          const estaAtivo = pagina === item.id


          return (

            <button
              key={item.id}
              type="button"
              className={
                estaAtivo
                  ? 'menu-item ativo'
                  : 'menu-item'
              }
              onClick={() => setPagina(item.id)}
            >


              {/* =========================================
                  ÍCONE
                  ========================================= */}

              <span className="menu-icone">

                <Icone tipo={item.id} />

              </span>


              {/* =========================================
                  TEXTOS
                  ========================================= */}

              <span className="menu-textos">

                <strong>
                  {item.nome}
                </strong>

                <small>
                  {item.descricao}
                </small>

              </span>


              {/* =========================================
                  INDICADOR DA PÁGINA ATIVA
                  ========================================= */}

              {estaAtivo && (

                <span className="menu-indicador" />

              )}

            </button>

          )

        })}

      </nav>


      {/* =================================================
          RODAPÉ
          ================================================= */}

      <div className="sidebar-rodape">

        <div className="sidebar-rodape-status">

          <span className="rodape-status-ponto" />

          <span>
            Sistema operacional
          </span>

        </div>

        <small>
          Projetos & Eventos
        </small>

      </div>

    </aside>

  )

}


// =====================================================
// EXPORTAÇÃO
// =====================================================

export default Sidebar