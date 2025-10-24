/*
==========================================
  ONGCONNECT - SPA (Single Page Application)
  Sistema de navegação sem recarregar página
==========================================
*/

const SPA = {
    rotas: {
        'home': {
            titulo: 'Home - ONGConnect',
            template: 'homeTemplate',
            carregar: carregarHome
        },
        'projetos': {
            titulo: 'Projetos - ONGConnect',
            template: 'projetosTemplate',
            carregar: carregarProjetos
        },
        'cadastro': {
            titulo: 'Cadastro - ONGConnect',
            template: 'cadastroTemplate',
            carregar: carregarCadastro
        },
        'sobre': {
            titulo: 'Sobre - ONGConnect',
            template: 'sobreTemplate',
            carregar: carregarSobre
        }
    },
    
    containerPrincipal: null,
    rotaAtual: null
};

/**
 * Inicializar sistema SPA
 */
function inicializarSPA() {
    SPA.containerPrincipal = document.getElementById('app-container') || document.querySelector('main');
    
    if (!SPA.containerPrincipal) {
        console.error('Container principal não encontrado!');
        return;
    }
    
    log('✅ SPA inicializado');
}

/**
 * Navegar para uma página/rota
 */
function navegarPara(rota, salvarHistorico = true) {
    log(`Navegando para: ${rota}`);
    
    // Verificar se a rota existe
    if (!SPA.rotas[rota]) {
        console.warn(`Rota "${rota}" não encontrada, redirecionando para home`);
        rota = 'home';
    }
    
    const rotaConfig = SPA.rotas[rota];
    
    // Atualizar título da página
    document.title = rotaConfig.titulo;
    
    // Atualizar estado
    SPA.rotaAtual = rota;
    AppState.paginaAtual = rota;
    
    // Atualizar URL sem recarregar
    if (salvarHistorico) {
        window.history.pushState({ rota }, rotaConfig.titulo, `#${rota}`);
    }
    
    // Atualizar menu ativo
    atualizarMenuAtivo(rota);
    
    // Carregar conteúdo da rota
    if (rotaConfig.carregar) {
        rotaConfig.carregar();
    }
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Atualizar menu com item ativo
 */
function atualizarMenuAtivo(rotaAtiva) {
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(rotaAtiva)) {
            link.classList.add('ativo');
        } else {
            link.classList.remove('ativo');
        }
    });
}

/**
 * Carregar página Home
 */
function carregarHome() {
    log('Carregando página Home');
    
    const conteudo = Templates.renderizar('home', {
        titulo: 'Conectando ONGs e Voluntários',
        subtitulo: 'Transforme vidas através do voluntariado',
        projetos: obterProjetosDestaque(3)
    });
    
    if (SPA.containerPrincipal) {
        SPA.containerPrincipal.innerHTML = conteudo;
        
        // Reinicializar componentes específicos da página
        inicializarCardsHome();
        inicializarAnimacoes();
    }
}

/**
 * Carregar página Projetos
 */
function carregarProjetos() {
    log('Carregando página Projetos');
    
    const todosProjetos = obterTodosProjetos();
    
    const conteudo = Templates.renderizar('projetos', {
        projetos: todosProjetos,
        total: todosProjetos.length
    });
    
    if (SPA.containerPrincipal) {
        SPA.containerPrincipal.innerHTML = conteudo;
        
        // Inicializar funcionalidades de projetos
        inicializarFiltrosProjetos();
        inicializarBuscaProjetos();
        inicializarFavoritos();
    }
}

/**
 * Carregar página Cadastro
 */
function carregarCadastro() {
    log('Carregando página Cadastro');
    
    const conteudo = Templates.renderizar('cadastro', {
        titulo: 'Cadastre sua ONG',
        descricao: 'Preencha os dados abaixo para cadastrar sua organização'
    });
    
    if (SPA.containerPrincipal) {
        SPA.containerPrincipal.innerHTML = conteudo;
        
        // Inicializar validação de formulário
        inicializarValidacaoFormulario();
        inicializarMascaras();
    }
}

/**
 * Carregar página Sobre
 */
function carregarSobre() {
    log('Carregando página Sobre');
    
    const conteudo = Templates.renderizar('sobre', {
        titulo: 'Sobre o ONGConnect',
        missao: 'Conectar organizações e voluntários',
        valores: ['Transparência', 'Impacto Social', 'Colaboração']
    });
    
    if (SPA.containerPrincipal) {
        SPA.containerPrincipal.innerHTML = conteudo;
    }
}

/**
 * Voltar para página anterior
 */
function voltarPagina() {
    window.history.back();
}

/**
 * Avançar para próxima página
 */
function avancarPagina() {
    window.history.forward();
}

// Listener para botões de navegação do navegador
window.addEventListener('popstate', (evento) => {
    if (evento.state && evento.state.rota) {
        navegarPara(evento.state.rota, false);
    }
});