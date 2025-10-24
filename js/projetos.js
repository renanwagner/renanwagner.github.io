/*
==========================================
  ONGCONNECT - PROJETOS
  Sistema de gerenciamento e exibição de projetos
==========================================
*/

// Dados dos projetos (simulação de banco de dados)
const PROJETOS_DB = [
    {
        id: 1,
        titulo: 'Alimentação Solidária',
        descricao: 'Distribuição de refeições para pessoas em situação de vulnerabilidade social.',
        categoria: 'alimentacao',
        ong: 'Instituto Solidário',
        local: 'São Paulo, SP',
        vagas: 15,
        imagem: 'imagens/projeto1.jpg',
        tags: ['alimentação', 'solidariedade', 'comunidade'],
        data: '2024-01-15',
        destaque: true
    },
    {
        id: 2,
        titulo: 'Educação para Todos',
        descricao: 'Aulas de reforço escolar para crianças de comunidades carentes.',
        categoria: 'educacao',
        ong: 'Educação Transforma',
        local: 'Rio de Janeiro, RJ',
        vagas: 20,
        imagem: 'imagens/projeto2.jpg',
        tags: ['educação', 'crianças', 'ensino'],
        data: '2024-01-20',
        destaque: true
    },
    {
        id: 3,
        titulo: 'Proteção Animal',
        descricao: 'Cuidados veterinários e adoção responsável de animais abandonados.',
        categoria: 'animais',
        ong: 'Amigos dos Animais',
        local: 'Belo Horizonte, MG',
        vagas: 10,
        imagem: 'imagens/projeto3.jpg',
        tags: ['animais', 'adoção', 'proteção'],
        data: '2024-02-01',
        destaque: true
    },
    {
        id: 4,
        titulo: 'Reflorestamento Urbano',
        descricao: 'Plantio de árvores nativas em áreas urbanas degradadas.',
        categoria: 'meio-ambiente',
        ong: 'Verde Vida',
        local: 'Curitiba, PR',
        vagas: 25,
        imagem: 'imagens/projeto4.jpg',
        tags: ['meio ambiente', 'sustentabilidade', 'árvores'],
        data: '2024-02-10',
        destaque: false
    },
    {
        id: 5,
        titulo: 'Saúde na Comunidade',
        descricao: 'Ações de prevenção e promoção da saúde em comunidades carentes.',
        categoria: 'saude',
        ong: 'Saúde para Todos',
        local: 'Salvador, BA',
        vagas: 12,
        imagem: 'imagens/projeto5.jpg',
        tags: ['saúde', 'prevenção', 'comunidade'],
        data: '2024-02-15',
        destaque: false
    },
    {
        id: 6,
        titulo: 'Cultura e Arte',
        descricao: 'Oficinas de arte e cultura para jovens em situação de risco.',
        categoria: 'cultura',
        ong: 'Arte Viva',
        local: 'Recife, PE',
        vagas: 18,
        imagem: 'imagens/projeto6.jpg',
        tags: ['cultura', 'arte', 'juventude'],
        data: '2024-02-20',
        destaque: false
    },
    {
        id: 7,
        titulo: 'Inclusão Digital',
        descricao: 'Ensino de informática básica para idosos e pessoas de baixa renda.',
        categoria: 'tecnologia',
        ong: 'Digital Inclusivo',
        local: 'Porto Alegre, RS',
        vagas: 15,
        imagem: 'imagens/projeto7.jpg',
        tags: ['tecnologia', 'inclusão', 'educação'],
        data: '2024-03-01',
        destaque: false
    },
    {
        id: 8,
        titulo: 'Esporte Cidadão',
        descricao: 'Atividades esportivas para crianças e adolescentes.',
        categoria: 'esporte',
        ong: 'Esporte e Vida',
        local: 'Brasília, DF',
        vagas: 30,
        imagem: 'imagens/projeto8.jpg',
        tags: ['esporte', 'crianças', 'saúde'],
        data: '2024-03-05',
        destaque: false
    },
    {
        id: 9,
        titulo: 'Apoio ao Idoso',
        descricao: 'Companhia e atividades recreativas para pessoas da terceira idade.',
        categoria: 'assistencia-social',
        ong: 'Idade Feliz',
        local: 'Fortaleza, CE',
        vagas: 8,
        imagem: 'imagens/projeto9.jpg',
        tags: ['idosos', 'companhia', 'cuidado'],
        data: '2024-03-10',
        destaque: false
    }
];

const Projetos = {
    projetosAtuais: [],
    filtroAtivo: 'todos',
    ordenacaoAtiva: 'recentes',
    buscaAtual: '',
    
    /**
     * Inicializar sistema de projetos
     */
    inicializar() {
        this.projetosAtuais = [...PROJETOS_DB];
        this.renderizar();
        log('✅ Sistema de projetos inicializado');
    },
    
    /**
     * Obter todos os projetos
     */
    obterTodos() {
        return [...PROJETOS_DB];
    },
    
    /**
     * Obter projeto por ID
     */
    obterPorId(id) {
        return PROJETOS_DB.find(p => p.id === parseInt(id));
    },
    
    /**
     * Obter projetos em destaque
     */
    obterDestaques(limite = 3) {
        return PROJETOS_DB
            .filter(p => p.destaque)
            .slice(0, limite);
    },
    
    /**
     * Filtrar projetos por categoria
     */
    filtrarPorCategoria(categoria) {
        this.filtroAtivo = categoria;
        
        if (categoria === 'todos') {
            this.projetosAtuais = [...PROJETOS_DB];
        } else {
            this.projetosAtuais = PROJETOS_DB.filter(p => p.categoria === categoria);
        }
        
        this.aplicarBuscaEOrdenacao();
        this.renderizar();
        
        log(`🔍 Filtrado por categoria: ${categoria}`);
    },
    
    /**
     * Buscar projetos por texto
     */
    buscar(texto) {
        this.buscaAtual = texto.toLowerCase();
        this.aplicarBuscaEOrdenacao();
        this.renderizar();
        
        log(`🔍 Busca: ${texto}`);
    },
    
    /**
     * Aplicar busca e ordenação
     */
    aplicarBuscaEOrdenacao() {
        let projetos = [...PROJETOS_DB];
        
        // Aplicar filtro de categoria
        if (this.filtroAtivo !== 'todos') {
            projetos = projetos.filter(p => p.categoria === this.filtroAtivo);
        }
        
        // Aplicar busca
        if (this.buscaAtual) {
            projetos = projetos.filter(p => {
                return p.titulo.toLowerCase().includes(this.buscaAtual) ||
                       p.descricao.toLowerCase().includes(this.buscaAtual) ||
                       p.ong.toLowerCase().includes(this.buscaAtual) ||
                       p.tags.some(tag => tag.toLowerCase().includes(this.buscaAtual));
            });
        }
        
        // Aplicar ordenação
        switch (this.ordenacaoAtiva) {
            case 'recentes':
                projetos.sort((a, b) => new Date(b.data) - new Date(a.data));
                break;
            case 'antigos':
                projetos.sort((a, b) => new Date(a.data) - new Date(b.data));
                break;
            case 'alfabetica':
                projetos.sort((a, b) => a.titulo.localeCompare(b.titulo));
                break;
            case 'vagas':
                projetos.sort((a, b) => b.vagas - a.vagas);
                break;
        }
        
        this.projetosAtuais = projetos;
    },
    
    /**
     * Ordenar projetos
     */
    ordenar(tipo) {
        this.ordenacaoAtiva = tipo;
        this.aplicarBuscaEOrdenacao();
        this.renderizar();
        
        log(`📊 Ordenado por: ${tipo}`);
    },
    
    /**
     * Renderizar projetos na página
     */
    renderizar() {
        const container = document.getElementById('projetos-grid') || 
                         document.querySelector('.projetos-grid');
        
        if (!container) {
            return;
        }
        
        // Mostrar mensagem se não houver projetos
        if (this.projetosAtuais.length === 0) {
            container.innerHTML = `
                <div class="sem-resultados">
                    <p>Nenhum projeto encontrado.</p>
                    <button class="btn btn-primario" onclick="Projetos.limparFiltros()">
                        Limpar Filtros
                    </button>
                </div>
            `;
            return;
        }
        
        // Renderizar cards dos projetos
        container.innerHTML = this.projetosAtuais.map(projeto => 
            this.renderizarCard(projeto)
        ).join('');
        
        // Atualizar contador
        this.atualizarContador();
        
        // Reinicializar event listeners
        this.configurarEventListeners();
    },
    
    /**
     * Renderizar card de projeto
     */
    renderizarCard(projeto) {
        const ehFavorito = Favoritos.ehFavorito(projeto.id);
        
        return `
            <div class="card projeto-card" data-projeto-id="${projeto.id}">
                <div class="card-imagem">
                    <img src="${projeto.imagem}" alt="${projeto.titulo}">
                    <button class="btn-favorito ${ehFavorito ? 'ativo' : ''}" 
                            onclick="Projetos.toggleFavorito(${projeto.id})"
                            aria-label="Adicionar aos favoritos">
                        ${ehFavorito ? '❤️' : '🤍'}
                    </button>
                    ${projeto.destaque ? '<span class="badge badge-destaque">Destaque</span>' : ''}
                </div>
                <div class="card-conteudo">
                    <span class="card-categoria badge badge-primario">${this.formatarCategoria(projeto.categoria)}</span>
                    <h3 class="card-titulo">${projeto.titulo}</h3>
                    <p class="card-descricao">${projeto.descricao}</p>
                    <div class="card-info">
                        <span class="info-item">
                            <strong>ONG:</strong> ${projeto.ong}
                        </span>
                        <span class="info-item">
                            <strong>Local:</strong> ${projeto.local}
                        </span>
                        <span class="info-item">
                            <strong>Vagas:</strong> ${projeto.vagas}
                        </span>
                    </div>
                    <div class="card-tags">
                        ${projeto.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="card-acoes">
                        <button class="btn btn-primario" onclick="Projetos.verDetalhes(${projeto.id})">
                            Ver Detalhes
                        </button>
                        <button class="btn btn-secundario" onclick="Projetos.inscrever(${projeto.id})">
                            Inscrever-se
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    /**
     * Formatar nome da categoria
     */
    formatarCategoria(categoria) {
        const categorias = {
            'alimentacao': 'Alimentação',
            'educacao': 'Educação',
            'saude': 'Saúde',
            'meio-ambiente': 'Meio Ambiente',
            'cultura': 'Cultura',
            'esporte': 'Esporte',
            'tecnologia': 'Tecnologia',
            'animais': 'Animais',
            'assistencia-social': 'Assistência Social'
        };
        
        return categorias[categoria] || categoria;
    },
    
    /**
     * Toggle favorito
     */
    toggleFavorito(projetoId) {
        const ehFavorito = Favoritos.alternar(projetoId);
        
        // Atualizar botão
        const botao = document.querySelector(`[data-projeto-id="${projetoId}"] .btn-favorito`);
        if (botao) {
            botao.innerHTML = ehFavorito ? '❤️' : '🤍';
            botao.classList.toggle('ativo', ehFavorito);
        }
        
        // Mostrar toast
        const projeto = this.obterPorId(projetoId);
        if (ehFavorito) {
            toastSucesso(`"${projeto.titulo}" adicionado aos favoritos!`);
        } else {
            toastInfo(`"${projeto.titulo}" removido dos favoritos`);
        }
        
        // Adicionar ao histórico
        Historico.adicionar('favorito', {
            acao: ehFavorito ? 'adicionado' : 'removido',
            projetoId: projetoId,
            projetoTitulo: projeto.titulo
        });
    },
    
    /**
     * Ver detalhes do projeto
     */
    verDetalhes(projetoId) {
        const projeto = this.obterPorId(projetoId);
        
        if (!projeto) {
            toastErro('Projeto não encontrado');
            return;
        }
        
        // Adicionar ao histórico
        Historico.adicionar('visualizacao', {
            projetoId: projetoId,
            projetoTitulo: projeto.titulo
        });
        
        // Criar modal com detalhes
        const modalId = Modals.criar({
            id: `modal-projeto-${projetoId}`,
            titulo: projeto.titulo,
            tamanho: 'grande',
            conteudo: `
                <div class="projeto-detalhes">
                    <img src="${projeto.imagem}" alt="${projeto.titulo}" class="projeto-imagem-destaque">
                    
                    <div class="projeto-meta">
                        <span class="badge badge-primario">${this.formatarCategoria(projeto.categoria)}</span>
                        <span class="info-item"><strong>ONG:</strong> ${projeto.ong}</span>
                        <span class="info-item"><strong>Local:</strong> ${projeto.local}</span>
                        <span class="info-item"><strong>Vagas:</strong> ${projeto.vagas}</span>
                    </div>
                    
                    <h4>Descrição</h4>
                    <p>${projeto.descricao}</p>
                    
                    <h4>Tags</h4>
                    <div class="card-tags">
                        ${projeto.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    
                    <h4>Como Participar</h4>
                    <p>Para participar deste projeto, clique no botão "Inscrever-se" abaixo. Você receberá mais informações sobre como contribuir e fazer a diferença!</p>
                </div>
            `,
            botoes: [
                {
                    texto: 'Inscrever-se',
                    classe: 'btn-primario',
                    acao: `Projetos.inscrever(${projetoId}); fecharModal('modal-projeto-${projetoId}')`
                },
                {
                    texto: 'Fechar',
                    classe: 'btn-secundario',
                    acao: `fecharModal('modal-projeto-${projetoId}')`
                }
            ]
        });
        
        abrirModal(modalId);
    },
    
    /**
     * Inscrever-se em projeto
     */
    inscrever(projetoId) {
        const projeto = this.obterPorId(projetoId);
        
        if (!projeto) {
            toastErro('Projeto não encontrado');
            return;
        }
        
        // Verificar se já está inscrito
        const inscricoes = Storage.obter('inscricoes') || [];
        
        if (inscricoes.includes(projetoId)) {
            toastAviso('Você já está inscrito neste projeto!');
            return;
        }
        
        // Adicionar inscrição
        inscricoes.push(projetoId);
        Storage.salvar('inscricoes', inscricoes);
        
        // Adicionar ao histórico
        Historico.adicionar('inscricao', {
            projetoId: projetoId,
            projetoTitulo: projeto.titulo,
            data: new Date().toISOString()
        });
        
        toastSucesso(`Inscrição realizada com sucesso em "${projeto.titulo}"!`);
        
        log(`✅ Inscrito no projeto: ${projeto.titulo}`);
    },
    
    /**
     * Atualizar contador de projetos
     */
    atualizarContador() {
        const contador = document.getElementById('projetos-contador');
        if (contador) {
            contador.textContent = `${this.projetosAtuais.length} projeto(s) encontrado(s)`;
        }
    },
    
    /**
     * Limpar todos os filtros
     */
    limparFiltros() {
        this.filtroAtivo = 'todos';
        this.buscaAtual = '';
        this.ordenacaoAtiva = 'recentes';
        this.projetosAtuais = [...PROJETOS_DB];
        
        // Limpar campos de busca
        const campoBusca = document.getElementById('busca-projetos');
        if (campoBusca) {
            campoBusca.value = '';
        }
        
        // Resetar filtros visuais
        document.querySelectorAll('.filtro-categoria').forEach(btn => {
            btn.classList.remove('ativo');
        });
        
        document.querySelector('[data-categoria="todos"]')?.classList.add('ativo');
        
        this.renderizar();
        toastInfo('Filtros limpos');
    },
    
    /**
     * Configurar event listeners
     */
    configurarEventListeners() {
        // Animação de hover nos cards
        document.querySelectorAll('.projeto-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
};

/**
 * Inicializar funcionalidades de projetos
 */
function inicializarProjetos() {
    Projetos.inicializar();
}

/**
 * Obter todos os projetos (função global)
 */
function obterTodosProjetos() {
    return Projetos.obterTodos();
}

/**
 * Obter projetos em destaque (função global)
 */
function obterProjetosDestaque(limite) {
    return Projetos.obterDestaques(limite);
}

/**
 * Inicializar filtros de projetos
 */
function inicializarFiltrosProjetos() {
    // Filtros de categoria
    document.querySelectorAll('.filtro-categoria').forEach(botao => {
        botao.addEventListener('click', function() {
            const categoria = this.getAttribute('data-categoria');
            
            // Atualizar visual dos botões
            document.querySelectorAll('.filtro-categoria').forEach(btn => {
                btn.classList.remove('ativo');
            });
            this.classList.add('ativo');
            
            // Aplicar filtro
            Projetos.filtrarPorCategoria(categoria);
        });
    });
    
    // Ordenação
    const selectOrdenacao = document.getElementById('ordenacao-projetos');
    if (selectOrdenacao) {
        selectOrdenacao.addEventListener('change', function() {
            Projetos.ordenar(this.value);
        });
    }
    
    log('✅ Filtros de projetos inicializados');
}

/**
 * Inicializar busca de projetos
 */
function inicializarBuscaProjetos() {
    const campoBusca = document.getElementById('busca-projetos');
    
    if (!campoBusca) {
        return;
    }
    
    // Busca com debounce
    campoBusca.addEventListener('input', debounce(function() {
        Projetos.buscar(this.value);
    }, 500));
    
    // Busca ao pressionar Enter
    campoBusca.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            Projetos.buscar(this.value);
        }
    });
    
    log('✅ Busca de projetos inicializada');
}

/**
 * Inicializar sistema de favoritos
 */
function inicializarFavoritos() {
    // Carregar favoritos do localStorage
    AppState.projetosFavoritos = Favoritos.obterTodos();
    
    // Botão para ver favoritos
    const botaoFavoritos = document.getElementById('ver-favoritos');
    if (botaoFavoritos) {
        botaoFavoritos.addEventListener('click', function() {
            mostrarFavoritos();
        });
    }
    
    log('✅ Sistema de favoritos inicializado');
}

/**
 * Mostrar projetos favoritos
 */
function mostrarFavoritos() {
    const favoritos = Favoritos.obterTodos();
    
    if (favoritos.length === 0) {
        toastInfo('Você ainda não tem projetos favoritos');
        return;
    }
    
    const projetosFavoritos = favoritos
        .map(id => Projetos.obterPorId(id))
        .filter(p => p !== undefined);
    
    const conteudoModal = `
        <div class="favoritos-lista">
            <p>Você tem ${projetosFavoritos.length} projeto(s) favorito(s):</p>
            ${projetosFavoritos.map(projeto => `
                <div class="favorito-item">
                    <img src="${projeto.imagem}" alt="${projeto.titulo}">
                    <div class="favorito-info">
                        <h4>${projeto.titulo}</h4>
                        <p>${projeto.ong} - ${projeto.local}</p>
                    </div>
                    <button class="btn btn-primario" onclick="Projetos.verDetalhes(${projeto.id}); fecharModal('modal-favoritos')">
                        Ver
                    </button>
                </div>
            `).join('')}
        </div>
    `;
    
    const modalId = Modals.criar({
        id: 'modal-favoritos',
        titulo: 'Meus Projetos Favoritos',
        conteudo: conteudoModal,
        botoes: [
            {
                texto: 'Fechar',
                classe: 'btn-secundario',
                acao: `fecharModal('modal-favoritos')`
            }
        ]
    });
    
    abrirModal(modalId);
}

/**
 * Inicializar componentes da home
 */
function inicializarCardsHome() {
    // Animações e interações específicas da página home
    log('✅ Cards da home inicializados');
}

/**
 * Inicializar animações gerais
 */
function inicializarAnimacoes() {
    // Animações de scroll reveal
    log('✅ Animações inicializadas');
}