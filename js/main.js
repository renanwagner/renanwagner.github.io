/*
==========================================
  ONGCONNECT - MAIN
  Arquivo principal de inicialização
  Versão: 1.0.0
  Acessibilidade: WCAG 2.1 AA
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
    modalAberto: null,
    tema: 'light' // NOVO: Controle de tema
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
        
        // NOVO: Inicializar tema (modo escuro)
        inicializarTema();
        
        // Inicializar componentes
        inicializarMenu();
        inicializarSPA();
        inicializarFormularios();
        inicializarProjetos();
        inicializarModals();
        inicializarToasts();
        
        // NOVO: Inicializar acessibilidade
        inicializarAcessibilidade();
        
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
    AppState.tema = Storage.obter('tema') || 'light'; // NOVO: Carregar tema salvo
    
    if (AppState.usuarioLogado) {
        console.log(`👤 Usuário logado: ${AppState.usuarioLogado.nome}`);
    }
}

/**
 * NOVO: Inicializar sistema de tema (modo escuro)
 */
function inicializarTema() {
    // Aplicar tema salvo
    aplicarTema(AppState.tema);
    
    // Criar botão de toggle se não existir
    const botaoTema = document.getElementById('toggle-tema');
    if (botaoTema) {
        // Atualizar ícone do botão
        atualizarIconeTema(botaoTema, AppState.tema);
        
        // Evento de clique
        botaoTema.addEventListener('click', alternarTema);
        
        // ACESSIBILIDADE: Permitir ativar com Enter/Space
        botaoTema.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                alternarTema();
            }
        });
    }
    
    log('✅ Tema inicializado:', AppState.tema);
}

/**
 * NOVO: Alternar entre tema claro e escuro
 */
function alternarTema() {
    const novoTema = AppState.tema === 'light' ? 'dark' : 'light';
    AppState.tema = novoTema;
    
    aplicarTema(novoTema);
    Storage.salvar('tema', novoTema);
    
    // Atualizar botão
    const botaoTema = document.getElementById('toggle-tema');
    if (botaoTema) {
        atualizarIconeTema(botaoTema, novoTema);
    }
    
    // Notificar usuário (para leitores de tela)
    anunciarParaLeitoresDeTela(`Tema ${novoTema === 'dark' ? 'escuro' : 'claro'} ativado`);
    
    log('🎨 Tema alterado para:', novoTema);
}

/**
 * NOVO: Aplicar tema no documento
 */
function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
}

/**
 * NOVO: Atualizar ícone do botão de tema
 */
function atualizarIconeTema(botao, tema) {
    const icone = botao.querySelector('i') || botao;
    
    if (tema === 'dark') {
        icone.innerHTML = '☀️'; // Sol para modo claro
        botao.setAttribute('aria-label', 'Ativar modo claro');
        botao.setAttribute('title', 'Ativar modo claro');
    } else {
        icone.innerHTML = '🌙'; // Lua para modo escuro
        botao.setAttribute('aria-label', 'Ativar modo escuro');
        botao.setAttribute('title', 'Ativar modo escuro');
    }
}

/**
 * NOVO: Inicializar recursos de acessibilidade
 */
function inicializarAcessibilidade() {
    // 1. Adicionar skip link se não existir
    adicionarSkipLink();
    
    // 2. Garantir que todos os links e botões são acessíveis via teclado
    configurarNavegacaoTeclado();
    
    // 3. Adicionar feedback de foco visível
    adicionarEstilosFoco();
    
    // 4. Configurar anúncios para leitores de tela
    criarLiveRegion();
    
    log('♿ Acessibilidade inicializada');
}

/**
 * NOVO: Adicionar link para pular para conteúdo principal
 */
function adicionarSkipLink() {
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Pular para o conteúdo principal';
        skipLink.setAttribute('tabindex', '0');
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Garantir que o main content tem ID
        const mainContent = document.querySelector('main');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
    }
}

/**
 * NOVO: Configurar navegação por teclado
 */
function configurarNavegacaoTeclado() {
    // Garantir que todos os elementos interativos sejam focáveis
    const elementosInterativos = document.querySelectorAll(
        'button, a, input, select, textarea, [role="button"], [tabindex]'
    );
    
    elementosInterativos.forEach(elemento => {
        // Adicionar tabindex se não tiver
        if (!elemento.hasAttribute('tabindex') && 
            elemento.getAttribute('tabindex') !== '-1') {
            elemento.setAttribute('tabindex', '0');
        }
        
        // ACESSIBILIDADE: Permitir ativar links/botões com Enter
        if (elemento.hasAttribute('onclick') && 
            !elemento.hasAttribute('data-keyboard-configured')) {
            
            elemento.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    elemento.click();
                }
            });
            
            elemento.setAttribute('data-keyboard-configured', 'true');
        }
    });
    
    log('⌨️ Navegação por teclado configurada');
}

/**
 * NOVO: Adicionar estilos de foco visível
 */
function adicionarEstilosFoco() {
    // Criar tag <style> se não existir
    let estiloFoco = document.getElementById('estilo-foco-acessibilidade');
    
    if (!estiloFoco) {
        estiloFoco = document.createElement('style');
        estiloFoco.id = 'estilo-foco-acessibilidade';
        estiloFoco.textContent = `
            /* Foco visível para navegação por teclado */
            *:focus {
                outline: 3px solid var(--cor-primaria, #007bff);
                outline-offset: 2px;
            }
            
            /* Remover outline apenas para mouse */
            *:focus:not(:focus-visible) {
                outline: none;
            }
            
            /* Skip link */
            .skip-link {
                position: absolute;
                top: -40px;
                left: 0;
                background: var(--cor-primaria, #007bff);
                color: white;
                padding: 8px 16px;
                text-decoration: none;
                z-index: 10000;
                border-radius: 0 0 4px 0;
                font-weight: bold;
            }
            
            .skip-link:focus {
                top: 0;
            }
        `;
        document.head.appendChild(estiloFoco);
    }
}

/**
 * NOVO: Criar região para anúncios de leitores de tela
 */
function criarLiveRegion() {
    if (!document.getElementById('live-region')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(liveRegion);
    }
}

/**
 * NOVO: Anunciar mensagem para leitores de tela
 */
function anunciarParaLeitoresDeTela(mensagem, urgencia = 'polite') {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
        liveRegion.setAttribute('aria-live', urgencia); // 'polite' ou 'assertive'
        liveRegion.textContent = mensagem;
        
        // Limpar após 3 segundos
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 3000);
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
    // Scroll suave para âncoras (MELHORADO)
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
                    
                    // ACESSIBILIDADE: Dar foco ao elemento
                    setTimeout(() => {
                        elemento.setAttribute('tabindex', '-1');
                        elemento.focus();
                    }, 500);
                }
            }
        });
    });
    
    // Detectar mudanças na URL (navegação)
    window.addEventListener('hashchange', () => {
        const novaPagina = obterPaginaAtual();
        navegarPara(novaPagina);
        
        // ACESSIBILIDADE: Anunciar mudança de página
        anunciarParaLeitoresDeTela(`Navegou para ${novaPagina}`);
    });
    
    // Detectar tecla ESC para fechar modais (MELHORADO)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && AppState.modalAberto) {
            fecharModal(AppState.modalAberto);
            anunciarParaLeitoresDeTela('Modal fechado');
        }
    });
    
    // NOVO: Detectar tecla Tab para mostrar foco (trap focus em modais)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && AppState.modalAberto) {
            gerenciarFocoModal(e);
        }
    });
    
    // Animação ao scroll (revelar elementos)
    if ('IntersectionObserver' in window) {
        configurarObservadorScroll();
    }
    
    // NOVO: Detectar preferência de movimento reduzido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduce-motion');
        log('♿ Movimento reduzido ativado (preferência do sistema)');
    }
}

/**
 * NOVO: Gerenciar foco dentro de modal (trap focus)
 */
function gerenciarFocoModal(evento) {
    const modal = document.getElementById(AppState.modalAberto);
    if (!modal) return;
    
    const elementosFocaveis = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (elementosFocaveis.length === 0) return;
    
    const primeiroElemento = elementosFocaveis[0];
    const ultimoElemento = elementosFocaveis[elementosFocaveis.length - 1];
    
    // Se Tab + Shift (voltando) e está no primeiro elemento
    if (evento.shiftKey && document.activeElement === primeiroElemento) {
        evento.preventDefault();
        ultimoElemento.focus();
    }
    // Se Tab (avançando) e está no último elemento
    else if (!evento.shiftKey && document.activeElement === ultimoElemento) {
        evento.preventDefault();
        primeiroElemento.focus();
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
window.anunciarParaLeitoresDeTela = anunciarParaLeitoresDeTela; // NOVO: Exportar função