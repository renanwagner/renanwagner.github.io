/*
==========================================
  ONGCONNECT - MAIN
  Arquivo principal de inicialização
==========================================
*/

// Constantes globais
const APP_CONFIG = {
    nome: 'ONGConnect',
    versao: '1.0.0',
    apiUrl: '/api',
    debug: true
};

// Estado global da aplicação
const AppState = {
    usuarioLogado: null,
    paginaAtual: 'home',
    projetosFavoritos: [],
    filtrosAtivos: {},
    modalAberto: null
};

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log(`${APP_CONFIG.nome} v${APP_CONFIG.versao} - Iniciando...`);
    
    inicializarAplicacao();
});

/**
 * Função principal de inicialização
 */
function inicializarAplicacao() {
    try {
        // Carregar dados do localStorage
        carregarDadosStorage();
        
        // Inicializar componentes
        inicializarMenu();
        inicializarSPA();
        inicializarFormularios();
        inicializarProjetos();
        inicializarModals();
        inicializarToasts();
        
        // Carregar página inicial
        const paginaInicial = obterPaginaAtual();
        navegarPara(paginaInicial);
        
        // Event listeners globais
        configurarEventListenersGlobais();
        
        console.log('✅ Aplicação inicializada com sucesso!');
        
    } catch (erro) {
        console.error('❌ Erro ao inicializar aplicação:', erro);
        mostrarToast('Erro ao carregar aplicação', 'erro');
    }
}

/**
 * Carregar dados persistidos
 */
function carregarDadosStorage() {
    AppState.usuarioLogado = Storage.obter('usuario');
    AppState.projetosFavoritos = Storage.obter('favoritos') || [];
    
    if (AppState.usuarioLogado) {
        console.log(`👤 Usuário logado: ${AppState.usuarioLogado.nome}`);
    }
}

/**
 * Obter página atual da URL
 */
function obterPaginaAtual() {
    const hash = window.location.hash.slice(1) || 'home';
    return hash;
}

/**
 * Configurar event listeners globais
 */
function configurarEventListenersGlobais() {
    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && !href.includes('modal')) {
                e.preventDefault();
                const elemento = document.querySelector(href);
                if (elemento) {
                    elemento.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Detectar mudanças na URL (navegação)
    window.addEventListener('hashchange', () => {
        const novaPagina = obterPaginaAtual();
        navegarPara(novaPagina);
    });
    
    // Detectar tecla ESC para fechar modais
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && AppState.modalAberto) {
            fecharModal(AppState.modalAberto);
        }
    });
    
    // Animação ao scroll (revelar elementos)
    if ('IntersectionObserver' in window) {
        configurarObservadorScroll();
    }
}

/**
 * Configurar IntersectionObserver para animações
 */
function configurarObservadorScroll() {
    const observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
                observador.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar cards e seções
    document.querySelectorAll('.card, section').forEach(elemento => {
        elemento.classList.add('fade-in-element');
        observador.observe(elemento);
    });
}

/**
 * Função utilitária para debounce
 */
function debounce(funcao, delay = 300) {
    let timeout;
    return function executarFuncao(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => funcao.apply(this, args), delay);
    };
}

/**
 * Função utilitária para throttle
 */
function throttle(funcao, limite = 100) {
    let emEspera = false;
    return function executarFuncao(...args) {
        if (!emEspera) {
            funcao.apply(this, args);
            emEspera = true;
            setTimeout(() => emEspera = false, limite);
        }
    };
}

/**
 * Log condicional (apenas se debug ativado)
 */
function log(...args) {
    if (APP_CONFIG.debug) {
        console.log('[ONGConnect]', ...args);
    }
}

// Exportar para uso global
window.AppState = AppState;
window.APP_CONFIG = APP_CONFIG;
window.log = log;