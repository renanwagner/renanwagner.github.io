/*
==========================================
  ONGCONNECT - MENU
  Sistema de menu hambúrguer e navegação
  ACESSÍVEL WCAG 2.1 AA
==========================================
*/

const Menu = {
    menuToggle: null,
    menuMobile: null,
    menuOverlay: null,
    menuAberto: false,
    elementosFocaveis: [],
    
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
        
        // ACESSIBILIDADE: Configurar ARIA
        this.configurarARIA();
        
        this.configurarEventListeners();
        log('✅ Menu inicializado (acessível)');
    },
    
    /**
     * NOVO: Configurar atributos ARIA
     */
    configurarARIA() {
        // Botão hambúrguer
        this.menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.menuToggle.setAttribute('aria-controls', 'mobile-menu');
        
        // Menu mobile
        this.menuMobile.setAttribute('id', 'mobile-menu');
        this.menuMobile.setAttribute('role', 'navigation');
        this.menuMobile.setAttribute('aria-label', 'Menu principal');
        this.menuMobile.setAttribute('aria-hidden', 'true');
        
        // Overlay
        if (this.menuOverlay) {
            this.menuOverlay.setAttribute('aria-hidden', 'true');
        }
    },
    
    /**
     * Configurar event listeners do menu
     */
    configurarEventListeners() {
        // Toggle do menu hambúrguer
        this.menuToggle.addEventListener('click', () => {
            this.alternar();
        });
        
        // ACESSIBILIDADE: Ativar com Enter/Space
        this.menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.alternar();
            }
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
                this.menuToggle.focus(); // ACESSIBILIDADE: Retornar foco
            }
        });
        
        // NOVO: Trap focus no menu quando aberto
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.menuAberto) {
                this.gerenciarFoco(e);
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
     * NOVO: Gerenciar foco dentro do menu (trap focus)
     */
    gerenciarFoco(evento) {
        // Atualizar lista de elementos focáveis
        this.elementosFocaveis = Array.from(
            this.menuMobile.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            )
        );
        
        // Adicionar botão de fechar ao início
        this.elementosFocaveis.unshift(this.menuToggle);
        
        const primeiroElemento = this.elementosFocaveis[0];
        const ultimoElemento = this.elementosFocaveis[this.elementosFocaveis.length - 1];
        
        // Voltando (Shift + Tab) do primeiro elemento
        if (evento.shiftKey && document.activeElement === primeiroElemento) {
            evento.preventDefault();
            ultimoElemento.focus();
        }
        // Avançando (Tab) do último elemento
        else if (!evento.shiftKey && document.activeElement === ultimoElemento) {
            evento.preventDefault();
            primeiroElemento.focus();
        }
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
            this.menuOverlay.setAttribute('aria-hidden', 'false');
        }
        
        // ACESSIBILIDADE: Atualizar ARIA
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.menuToggle.setAttribute('aria-label', 'Fechar menu de navegação');
        this.menuMobile.setAttribute('aria-hidden', 'false');
        
        // Prevenir scroll no body
        document.body.style.overflow = 'hidden';
        
        // ACESSIBILIDADE: Focar no primeiro link do menu
        setTimeout(() => {
            const primeiroLink = this.menuMobile.querySelector('a');
            if (primeiroLink) {
                primeiroLink.focus();
            }
        }, 100);
        
        this.menuAberto = true;
        
        // ACESSIBILIDADE: Anunciar para leitores de tela
        if (window.anunciarParaLeitoresDeTela) {
            anunciarParaLeitoresDeTela('Menu aberto');
        }
        
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
            this.menuOverlay.setAttribute('aria-hidden', 'true');
        }
        
        // ACESSIBILIDADE: Atualizar ARIA
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
        this.menuMobile.setAttribute('aria-hidden', 'true');
        
        // Restaurar scroll no body
        document.body.style.overflow = '';
        
        this.menuAberto = false;
        
        // ACESSIBILIDADE: Anunciar para leitores de tela
        if (window.anunciarParaLeitoresDeTela) {
            anunciarParaLeitoresDeTela('Menu fechado');
        }
        
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
        
        // ACESSIBILIDADE: Adicionar role se não existir
        if (!this.header.getAttribute('role')) {
            this.header.setAttribute('role', 'banner');
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