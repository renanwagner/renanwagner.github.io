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
        imagem: 'imagens/galeria-1.jpg',
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
        imagem: 'imagens/projeto-educacao.jpg',
        tags: ['educação', 'crianças', 'ensino'],
        data: '2024-01-20',
        destaque: true
    },
    {
        id: 3,
        titulo: 'Proteção ao Meio Ambiente',
        descricao: 'Plantio de árvores e recuperação de áreas degradadas.',
        categoria: 'meio-ambiente',
        ong: 'Verde Vida',
        local: 'Curitiba, PR',
        vagas: 25,
        imagem: 'imagens/projeto-ambiente.jpg',
        tags: ['meio ambiente', 'sustentabilidade', 'árvores'],
        data: '2024-02-01',
        destaque: true
    },
    {
        id: 4,
        titulo: 'Cultura e Arte',
        descricao: 'Oficinas de arte e cultura para jovens em situação de risco.',
        categoria: 'cultura',
        ong: 'Arte Viva',
        local: 'Recife, PE',
        vagas: 18,
        imagem: 'imagens/projeto-cultura.jpg',
        tags: ['cultura', 'arte', 'juventude'],
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
        imagem: 'imagens/projeto-saude.jpg',
        tags: ['saúde', 'prevenção', 'comunidade'],
        data: '2024-02-15',
        destaque: false
    },
    {
        id: 6,
        titulo: 'Direitos Humanos',
        descricao: 'Apoio jurídico e social para comunidades vulneráveis.',
        categoria: 'assistencia-social',
        ong: 'Justiça Social',
        local: 'São Paulo, SP',
        vagas: 10,
        imagem: 'imagens/projeto-direitos.jpg',
        tags: ['direitos', 'justiça', 'apoio'],
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
        imagem: 'imagens/projeto-tech.jpg',
        tags: ['tecnologia', 'inclusão', 'educação'],
        data: '2024-03-01',
        destaque: false
    },
    {
        id: 8,
        titulo: 'Galeria Comunitária',
        descricao: 'Exposições de arte e cultura produzidas pela comunidade local.',
        categoria: 'cultura',
        ong: 'Galeria Aberta',
        local: 'Brasília, DF',
        vagas: 20,
        imagem: 'imagens/galeria-2.jpg',
        tags: ['arte', 'cultura', 'comunidade'],
        data: '2024-03-05',
        destaque: false
    },
    {
        id: 9,
        titulo: 'Arte e Transformação',
        descricao: 'Projetos artísticos para desenvolvimento social e cultural.',
        categoria: 'cultura',
        ong: 'Arte Transforma',
        local: 'Fortaleza, CE',
        vagas: 16,
        imagem: 'imagens/galeria-3.jpg',
        tags: ['arte', 'cultura', 'transformação'],
        data: '2024-03-10',
        destaque: false
    },
    {
        id: 10,
        titulo: 'Espaço Cultural',
        descricao: 'Centro cultural comunitário com atividades diversas.',
        categoria: 'cultura',
        ong: 'Cultura Viva',
        local: 'Belo Horizonte, MG',
        vagas: 22,
        imagem: 'imagens/galeria-4.jpg',
        tags: ['cultura', 'arte', 'comunidade'],
        data: '2024-03-15',
        destaque: false
    },
    {
        id: 11,
        titulo: 'Mostra Cultural',
        descricao: 'Festival de arte e cultura com apresentações e oficinas.',
        categoria: 'cultura',
        ong: 'Festival Cultural',
        local: 'Rio de Janeiro, RJ',
        vagas: 30,
        imagem: 'imagens/galeria-5.jpg',
        tags: ['festival', 'cultura', 'arte'],
        data: '2024-03-20',
        destaque: false
    },
    {
        id: 12,
        titulo: 'Expressão Artística',
        descricao: 'Workshops de diferentes expressões artísticas para todas as idades.',
        categoria: 'cultura',
        ong: 'Arte Para Todos',
        local: 'Manaus, AM',
        vagas: 18,
        imagem: 'imagens/galeria-6.jpg',
        tags: ['arte', 'workshops', 'cultura'],
        data: '2024-03-25',
        destaque: false
    },
    {
        id: 13,
        titulo: 'Voluntariado em Ação',
        descricao: 'Múltiplas frentes de atuação social em diversas comunidades.',
        categoria: 'assistencia-social',
        ong: 'Ação Comunitária',
        local: 'Todo Brasil',
        vagas: 50,
        imagem: 'imagens/voluntario-1.jpg',
        tags: ['voluntariado', 'comunidade', 'ação social'],
        data: '2024-04-01',
        destaque: false
    },
    {
        id: 14,
        titulo: 'Transformação pela Solidariedade',
        descricao: 'Projetos integrados de educação, cultura e desenvolvimento social.',
        categoria: 'assistencia-social',
        ong: 'Transformar',
        local: 'São Paulo, SP',
        vagas: 35,
        imagem: 'imagens/voluntario-2.jpg',
        tags: ['transformação', 'solidariedade', 'desenvolvimento'],
        data: '2024-04-05',
        destaque: false
    },
    {
        id: 15,
        titulo: 'Comunidade Unida',
        descricao: 'Fortalecimento de vínculos comunitários e desenvolvimento local através do voluntariado.',
        categoria: 'assistencia-social',
        ong: 'União Comunitária',
        local: 'Nacional',
        vagas: 40,
        imagem: 'imagens/voluntario-3.jpg',
        tags: ['comunidade', 'união', 'voluntariado'],
        data: '2024-04-10',
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
                <div class="sem-resultados" style="grid-column: 1/-1; text-align: center; padding: var(--espaco-3xl);">
                    <p style="font-size: var(--fonte-xl); color: var(--cor-cinza-600); margin-bottom: var(--espaco-lg);">
                        Nenhum projeto encontrado.
                    </p>
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
                <div class="card-imagem" style="position: relative; overflow: hidden;">
                    <img src="${projeto.imagem}" 
                         alt="${projeto.titulo}"
                         onerror="this.src='imagens/galeria-1.jpg'"
                         style="width: 100%; height: 250px; object-fit: cover;">
                    <button class="btn-favorito ${ehFavorito ? 'ativo' : ''}" 
                            onclick="Projetos.toggleFavorito(${projeto.id})"
                            aria-label="Adicionar aos favoritos"
                            style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.15); transition: all 0.3s ease;">
                        ${ehFavorito ? '❤️' : '🤍'}
                    </button>
                    ${projeto.destaque ? '<span class="badge badge-destaque" style="position: absolute; top: 10px; left: 10px; background: var(--cor-aviso); color: var(--cor-cinza-900); padding: var(--espaco-xs) var(--espaco-sm); border-radius: var(--raio-pill); font-size: var(--fonte-xs); font-weight: var(--peso-bold);">⭐ Destaque</span>' : ''}
                </div>
                <div class="card-conteudo" style="padding: var(--espaco-lg);">
                    <span class="card-categoria badge badge-primario" style="margin-bottom: var(--espaco-sm);">${this.formatarCategoria(projeto.categoria)}</span>
                    <h3 class="card-titulo" style="margin-bottom: var(--espaco-sm); color: var(--cor-primaria);">${projeto.titulo}</h3>
                    <p class="card-descricao" style="margin-bottom: var(--espaco-base); color: var(--cor-cinza-600); line-height: 1.6;">${projeto.descricao}</p>
                    <div class="card-info" style="margin: var(--espaco-base) 0; padding: var(--espaco-base); background: var(--cor-cinza-50); border-radius: var(--raio-sm);">
                        <div style="margin-bottom: var(--espaco-xs); font-size: var(--fonte-sm);">
                            <strong>🏢 ONG:</strong> ${projeto.ong}
                        </div>
                        <div style="margin-bottom: var(--espaco-xs); font-size: var(--fonte-sm);">
                            <strong>📍 Local:</strong> ${projeto.local}
                        </div>
                        <div style="font-size: var(--fonte-sm);">
                            <strong>👥 Vagas:</strong> ${projeto.vagas} disponíveis
                        </div>
                    </div>
                    <div class="card-tags" style="display: flex; flex-wrap: wrap; gap: var(--espaco-xs); margin: var(--espaco-base) 0;">
                        ${projeto.tags.map(tag => `<span class="tag" style="background: var(--cor-cinza-100); padding: var(--espaco-xs) var(--espaco-sm); border-radius: var(--raio-sm); font-size: var(--fonte-xs);">#${tag}</span>`).join('')}
                    </div>
                    <div class="card-acoes" style="display: flex; gap: var(--espaco-sm); margin-top: var(--espaco-lg);">
                        <button class="btn btn-primario" onclick="Projetos.verDetalhes(${projeto.id})" style="flex: 1;">
                            Ver Detalhes
                        </button>
                        <button class="btn btn-secundario" onclick="Projetos.inscrever(${projeto.id})" style="flex: 1;">
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
            'alimentacao': '🍽️ Alimentação',
            'educacao': '📚 Educação',
            'saude': '🏥 Saúde',
            'meio-ambiente': '🌳 Meio Ambiente',
            'cultura': '🎭 Cultura',
            'esporte': '⚽ Esporte',
            'tecnologia': '💻 Tecnologia',
            'animais': '🐾 Animais',
            'assistencia-social': '🤝 Assistência Social'
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
                    <img src="${projeto.imagem}" 
                         alt="${projeto.titulo}" 
                         class="projeto-imagem-destaque"
                         onerror="this.src='imagens/galeria-1.jpg'"
                         style="width: 100%; height: 400px; object-fit: cover; border-radius: var(--raio-md); margin-bottom: var(--espaco-lg);">
                    
                    <div class="projeto-meta" style="display: flex; flex-wrap: wrap; gap: var(--espaco-base); margin-bottom: var(--espaco-lg); padding: var(--espaco-base); background: var(--cor-cinza-50); border-radius: var(--raio-md);">
                        <span class="badge badge-primario">${this.formatarCategoria(projeto.categoria)}</span>
                        <span><strong>🏢 ONG:</strong> ${projeto.ong}</span>
                        <span><strong>📍 Local:</strong> ${projeto.local}</span>
                        <span><strong>👥 Vagas:</strong> ${projeto.vagas}</span>
                    </div>
                    
                    <h4 style="margin-bottom: var(--espaco-sm); color: var(--cor-primaria);">📋 Descrição</h4>
                    <p style="margin-bottom: var(--espaco-lg); line-height: 1.8; color: var(--cor-cinza-700);">${projeto.descricao}</p>
                    
                    <h4 style="margin-bottom: var(--espaco-sm); color: var(--cor-primaria);">🏷️ Tags</h4>
                    <div class="card-tags" style="display: flex; flex-wrap: wrap; gap: var(--espaco-xs); margin-bottom: var(--espaco-lg);">
                        ${projeto.tags.map(tag => `<span class="tag" style="background: var(--cor-azul-claro); color: var(--cor-primaria); padding: var(--espaco-xs) var(--espaco-sm); border-radius: var(--raio-sm);">#${tag}</span>`).join('')}
                    </div>
                    
                    <div style="background: var(--cor-azul-claro); padding: var(--espaco-lg); border-radius: var(--raio-md); border-left: 4px solid var(--cor-primaria);">
                        <h4 style="margin-bottom: var(--espaco-sm); color: var(--cor-primaria);">✨ Como Participar</h4>
                        <p style="line-height: 1.6; color: var(--cor-cinza-700);">Para participar deste projeto, clique no botão "Inscrever-se" abaixo. Você receberá mais informações sobre como contribuir e fazer a diferença na vida de muitas pessoas!</p>
                    </div>
                </div>
            `,
            botoes: [
                {
                    texto: '✅ Inscrever-se',
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
        
        toastSucesso(`Inscrição realizada com sucesso em "${projeto.titulo}"! 🎉`);
        
        log(`✅ Inscrito no projeto: ${projeto.titulo}`);
    },
    
    /**
     * Atualizar contador de projetos
     */
    atualizarContador() {
        const contador = document.getElementById('projetos-contador');
        if (contador) {
            const texto = this.projetosAtuais.length === 1 
                ? '1 projeto encontrado' 
                : `${this.projetosAtuais.length} projetos encontrados`;
            contador.textContent = texto;
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
        
        // Resetar select de ordenação
        const selectOrdenacao = document.getElementById('ordenacao-projetos');
        if (selectOrdenacao) {
            selectOrdenacao.value = 'recentes';
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
                this.style.transition = 'transform 0.3s ease';
                this.style.boxShadow = 'var(--sombra-lg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--sombra-sm)';
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

function obterTodosProjetos() {
    return Projetos.obterTodos();
}

function obterProjetosDestaque(limite) {
    return Projetos.obterDestaques(limite);
}

function inicializarFiltrosProjetos() {
    document.querySelectorAll('.filtro-categoria').forEach(botao => {
        botao.addEventListener('click', function() {
            const categoria = this.getAttribute('data-categoria');
            
            document.querySelectorAll('.filtro-categoria').forEach(btn => {
                btn.classList.remove('ativo');
            });
            this.classList.add('ativo');
            
            Projetos.filtrarPorCategoria(categoria);
        });
    });
    
    const selectOrdenacao = document.getElementById('ordenacao-projetos');
    if (selectOrdenacao) {
        selectOrdenacao.addEventListener('change', function() {
            Projetos.ordenar(this.value);
        });
    }
    
    log('✅ Filtros de projetos inicializados');
}

function inicializarBuscaProjetos() {
    const campoBusca = document.getElementById('busca-projetos');
    
    if (!campoBusca) {
        return;
    }
    
    campoBusca.addEventListener('input', debounce(function() {
        Projetos.buscar(this.value);
    }, 500));
    
    campoBusca.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            Projetos.buscar(this.value);
        }
    });
    
    log('✅ Busca de projetos inicializada');
}

function inicializarFavoritos() {
    AppState.projetosFavoritos = Favoritos.obterTodos();
    
    const botaoFavoritos = document.getElementById('ver-favoritos');
    if (botaoFavoritos) {
        botaoFavoritos.addEventListener('click', function() {
            mostrarFavoritos();
        });
    }
    
    log('✅ Sistema de favoritos inicializado');
}

function mostrarFavoritos() {
    const favoritos = Favoritos.obterTodos();
    
    if (favoritos.length === 0) {
        toastInfo('Você ainda não tem projetos favoritos 💙');
        return;
    }
    
    const projetosFavoritos = favoritos
        .map(id => Projetos.obterPorId(id))
        .filter(p => p !== undefined);
    
    const conteudoModal = `
        <div class="favoritos-lista">
            <p style="margin-bottom: var(--espaco-lg); font-size: var(--fonte-lg);">
                ❤️ Você tem ${projetosFavoritos.length} projeto(s) favorito(s):
            </p>
            ${projetosFavoritos.map(projeto => `
                <div class="favorito-item" style="display: flex; align-items: center; gap: var(--espaco-base); padding: var(--espaco-base); border: 2px solid var(--cor-cinza-200); border-radius: var(--raio-md); margin-bottom: var(--espaco-base); transition: all 0.3s ease;" onmouseover="this.style.borderColor='var(--cor-primaria)'; this.style.boxShadow='var(--sombra-md)';" onmouseout="this.style.borderColor='var(--cor-cinza-200)'; this.style.boxShadow='none';">
                    <img src="${projeto.imagem}" 
                         alt="${projeto.titulo}"
                         onerror="this.src='imagens/galeria-1.jpg'"
                         style="width: 100px; height: 100px; object-fit: cover; border-radius: var(--raio-sm); flex-shrink: 0;">
                    <div class="favorito-info" style="flex: 1;">
                        <h4 style="margin-bottom: var(--espaco-xs); color: var(--cor-primaria);">${projeto.titulo}</h4>
                        <p style="color: var(--cor-cinza-600); font-size: var(--fonte-sm); margin-bottom: var(--espaco-xs);">
                            🏢 ${projeto.ong}
                        </p>
                        <p style="color: var(--cor-cinza-600); font-size: var(--fonte-sm);">
                            📍 ${projeto.local} • 👥 ${projeto.vagas} vagas
                        </p>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: var(--espaco-xs);">
                        <button class="btn btn-primario" onclick="Projetos.verDetalhes(${projeto.id}); fecharModal('modal-favoritos')" style="white-space: nowrap;">
                            Ver Detalhes
                        </button>
                        <button class="btn btn-secundario" onclick="Projetos.toggleFavorito(${projeto.id}); setTimeout(() => mostrarFavoritos(), 300);" style="white-space: nowrap;">
                            💔 Remover
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    const modalId = Modals.criar({
        id: 'modal-favoritos',
        titulo: '❤️ Meus Projetos Favoritos',
        conteudo: conteudoModal,
        tamanho: 'grande',
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

function inicializarCardsHome() {
    log('✅ Cards da home inicializados');
}

function inicializarAnimacoes() {
    log('✅ Animações inicializadas');
}