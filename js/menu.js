/*
==========================================
  ONGCONNECT - MENU
  Sistema de menu hambúrguer e navegação
==========================================
*/

const Menu = {
    menuToggle: null,
    menuMobile: null,
    menuOverlay: null,
    menuAberto: false,
    
    /**
     * Inicializar menu
     */
    inicializar() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.menuMobile = document.querySelector('.mobile-menu');
        this.menuOverlay = document.querySelector('.menu-overlay');
        
        if (!this.menuToggle || !this.menuMobile) {
            log('⚠️ Elementos do menu não encontrados');
            return;
        }
        
        this.configurarEventListeners();
        log('✅ Menu inicializado');
    },
    
    /**
     * Configurar event listeners do menu
     */
    configurarEventListeners() {
        // Toggle do menu hambúrguer
        this.menuToggle.addEventListener('click', () => {
            this.alternar();
        });
        
        // Fechar menu ao clicar no overlay
        if (this.menuOverlay) {
            this.menuOverlay.addEventListener('click', () => {
                this.fechar();
            });
        }
        
        // Fechar menu ao clicar em links
        this.menuMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.fechar();
            });
        });
        
        // Fechar menu com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.menuAberto) {
                this.fechar();
            }
        });
        
        // Fechar menu ao redimensionar para desktop
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth >= 768 && this.menuAberto) {
                this.fechar();
            }
        }, 250));
    },
    
    /**
     * Alternar menu (abrir/fechar)
     */
    alternar() {
        if (this.menuAberto) {
            this.fechar();
        } else {
            this.abrir();
        }
    },
    
    /**
     * Abrir menu
     */
    abrir() {
        this.menuToggle.classList.add('ativo');
        this.menuMobile.classList.add('ativo');
        
        if (this.menuOverlay) {
            this.menuOverlay.classList.add('ativo');
        }
        
        // Prevenir scroll no body
        document.body.style.overflow = 'hidden';
        
        this.menuAberto = true;
        log('📱 Menu aberto');
    },
    
    /**
     * Fechar menu
     */
    fechar() {
        this.menuToggle.classList.remove('ativo');
        this.menuMobile.classList.remove('ativo');
        
        if (this.menuOverlay) {
            this.menuOverlay.classList.remove('ativo');
        }
        
        // Restaurar scroll no body
        document.body.style.overflow = '';
        
        this.menuAberto = false;
        log('📱 Menu fechado');
    }
};

/**
 * Inicializar menu
 */
function inicializarMenu() {
    Menu.inicializar();
}

/**
 * Sistema de Header Fixo ao Scroll
 */
const HeaderScroll = {
    header: null,
    ultimaPosicao: 0,
    scrollThreshold: 100,
    
    inicializar() {
        this.header = document.querySelector('header');
        
        if (!this.header) {
            return;
        }
        
        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
        }, 100));
        
        log('✅ Header scroll inicializado');
    },
    
    handleScroll() {
        const posicaoAtual = window.pageYOffset;
        
        // Adicionar classe 'scrolled' após scroll
        if (posicaoAtual > this.scrollThreshold) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
        
        // Esconder header ao scrollar para baixo, mostrar ao scrollar para cima
        if (posicaoAtual > this.ultimaPosicao && posicaoAtual > this.scrollThreshold) {
            this.header.style.transform = 'translateY(-100%)';
        } else {
            this.header.style.transform = 'translateY(0)';
        }
        
        this.ultimaPosicao = posicaoAtual;
    }
};

// Inicializar header scroll
HeaderScroll.inicializar();