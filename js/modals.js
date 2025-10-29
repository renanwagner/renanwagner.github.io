/*
==========================================
  ONGCONNECT - MODALS E TOASTS
  Sistema de modais e notificações toast
  ACESSÍVEL WCAG 2.1 AA
==========================================
*/

const Modals = {
    modaisAtivos: [],
    elementosFocaveis: [],
    elementoAnterior: null, // NOVO: Salvar elemento com foco antes do modal
    
    /**
     * Inicializar sistema de modais
     */
    inicializar() {
        // Configurar botões que abrem modais
        document.querySelectorAll('[data-modal]').forEach(botao => {
            botao.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = botao.getAttribute('data-modal');
                this.abrir(modalId);
            });
            
            // ACESSIBILIDADE: Adicionar ARIA se não existir
            if (!botao.getAttribute('aria-label') && !botao.textContent.trim()) {
                botao.setAttribute('aria-label', 'Abrir modal');
            }
        });
        
        // Configurar botões de fechar
        document.querySelectorAll('.modal-close, [data-fechar-modal]').forEach(botao => {
            botao.addEventListener('click', () => {
                const modal = botao.closest('.modal-overlay');
                if (modal) {
                    this.fechar(modal.id);
                }
            });
            
            // ACESSIBILIDADE: Adicionar ARIA
            botao.setAttribute('aria-label', 'Fechar modal');
        });
        
        // Fechar ao clicar no overlay
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.fechar(overlay.id);
                }
            });
            
            // ACESSIBILIDADE: Configurar ARIA
            this.configurarARIAModal(overlay);
        });
        
        // NOVO: Trap focus em modais abertos
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && AppState.modalAberto) {
                this.gerenciarFocoModal(e);
            }
        });
        
        log('✅ Sistema de modais inicializado (acessível)');
    },
    
    /**
     * NOVO: Configurar ARIA em modal
     */
    configurarARIAModal(modal) {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-hidden', 'true');
        
        // Adicionar label se tiver título
        const titulo = modal.querySelector('.modal-title, h2, h3');
        if (titulo) {
            const tituloId = titulo.id || `modal-title-${Date.now()}`;
            titulo.id = tituloId;
            modal.setAttribute('aria-labelledby', tituloId);
        }
    },
    
    /**
     * NOVO: Gerenciar foco dentro do modal (trap focus)
     */
    gerenciarFocoModal(evento) {
        const modal = document.getElementById(AppState.modalAberto);
        if (!modal) return;
        
        // Atualizar elementos focáveis
        this.elementosFocaveis = Array.from(
            modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        );
        
        if (this.elementosFocaveis.length === 0) return;
        
        const primeiroElemento = this.elementosFocaveis[0];
        const ultimoElemento = this.elementosFocaveis[this.elementosFocaveis.length - 1];
        
        // Voltando do primeiro elemento
        if (evento.shiftKey && document.activeElement === primeiroElemento) {
            evento.preventDefault();
            ultimoElemento.focus();
        }
        // Avançando do último elemento
        else if (!evento.shiftKey && document.activeElement === ultimoElemento) {
            evento.preventDefault();
            primeiroElemento.focus();
        }
    },
    
    /**
     * Abrir modal
     */
    abrir(modalId) {
        const modal = document.getElementById(modalId);
        
        if (!modal) {
            console.error(`Modal "${modalId}" não encontrado`);
            return;
        }
        
        // NOVO: Salvar elemento com foco atual
        this.elementoAnterior = document.activeElement;
        
        modal.classList.add('ativo');
        document.body.style.overflow = 'hidden';
        
        // ACESSIBILIDADE: Atualizar ARIA
        modal.setAttribute('aria-hidden', 'false');
        
        this.modaisAtivos.push(modalId);
        AppState.modalAberto = modalId;
        
        log(`📦 Modal aberto: ${modalId}`);
        
        // ACESSIBILIDADE: Focar no primeiro elemento interativo
        setTimeout(() => {
            const primeiroInput = modal.querySelector('input, button, textarea, select, [tabindex="0"]');
            if (primeiroInput) {
                primeiroInput.focus();
            }
        }, 100);
        
        // ACESSIBILIDADE: Anunciar para leitores de tela
        if (window.anunciarParaLeitoresDeTela) {
            const titulo = modal.querySelector('.modal-title, h2, h3')?.textContent;
            anunciarParaLeitoresDeTela(`Modal aberto: ${titulo || modalId}`);
        }
    },
    
    /**
     * Fechar modal
     */
    fechar(modalId) {
        const modal = document.getElementById(modalId);
        
        if (!modal) {
            return;
        }
        
        modal.classList.remove('ativo');
        
        // ACESSIBILIDADE: Atualizar ARIA
        modal.setAttribute('aria-hidden', 'true');
        
        // Remover da lista de modais ativos
        this.modaisAtivos = this.modaisAtivos.filter(id => id !== modalId);
        
        // Se não há mais modais, restaurar scroll
        if (this.modaisAtivos.length === 0) {
            document.body.style.overflow = '';
            AppState.modalAberto = null;
            
            // NOVO: Restaurar foco ao elemento anterior
            if (this.elementoAnterior && this.elementoAnterior.focus) {
                this.elementoAnterior.focus();
            }
        } else {
            AppState.modalAberto = this.modaisAtivos[this.modaisAtivos.length - 1];
        }
        
        // ACESSIBILIDADE: Anunciar para leitores de tela
        if (window.anunciarParaLeitoresDeTela) {
            anunciarParaLeitoresDeTela('Modal fechado');
        }
        
        log(`📦 Modal fechado: ${modalId}`);
    },
    
    /**
     * Criar modal dinamicamente
     */
    criar(config) {
        const {
            id,
            titulo,
            conteudo,
            botoes = [],
            tamanho = 'medio'
        } = config;
        
        const tituloId = `${id}-title`;
        
        const modalHTML = `
            <div class="modal-overlay modal-${tamanho}" 
                 id="${id}" 
                 role="dialog" 
                 aria-modal="true" 
                 aria-labelledby="${tituloId}"
                 aria-hidden="true">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="${tituloId}">${titulo}</h3>
                        <button class="modal-close" 
                                aria-label="Fechar modal" 
                                title="Fechar (ESC)">×</button>
                    </div>
                    <div class="modal-body">
                        ${conteudo}
                    </div>
                    ${botoes.length > 0 ? `
                        <div class="modal-footer">
                            ${botoes.map((botao, index) => `
                                <button class="btn ${botao.classe || 'btn-secundario'}" 
                                        onclick="${botao.acao || 'fecharModal(\'' + id + '\')'}}"
                                        ${index === 0 ? 'autofocus' : ''}>
                                    ${botao.texto}
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Adicionar ao body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Configurar eventos
        const modal = document.getElementById(id);
        
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.fechar(id);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.fechar(id);
            }
        });
        
        return id;
    }
};

/**
 * Funções globais de modal
 */
function inicializarModals() {
    Modals.inicializar();
}

function abrirModal(modalId) {
    Modals.abrir(modalId);
}

function fecharModal(modalId) {
    Modals.fechar(modalId);
}

/**
 * Sistema de Toasts (Notificações)
 */
const Toasts = {
    container: null,
    toastsAtivos: [],
    duracaoPadrao: 4000,
    
    /**
     * Inicializar sistema de toasts
     */
    inicializar() {
        // Criar container se não existir
        if (!document.querySelector('.toast-container')) {
            const container = document.createElement('div');
            container.className = 'toast-container';
            // ACESSIBILIDADE: Adicionar ARIA
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-atomic', 'false');
            container.setAttribute('role', 'status');
            document.body.appendChild(container);
        }
        
        this.container = document.querySelector('.toast-container');
        log('✅ Sistema de toasts inicializado (acessível)');
    },
    
    /**
     * Mostrar toast
     */
    mostrar(mensagem, tipo = 'info', duracao = this.duracaoPadrao) {
        const id = 'toast_' + Date.now();
        
        const icones = {
            sucesso: '✓',
            erro: '✕',
            aviso: '⚠',
            info: 'ℹ'
        };
        
        const rolesARIA = {
            erro: 'alert',
            aviso: 'alert',
            sucesso: 'status',
            info: 'status'
        };
        
        const toastHTML = `
            <div class="toast toast-${tipo}" 
                 id="${id}"
                 role="${rolesARIA[tipo] || 'status'}"
                 aria-live="${tipo === 'erro' ? 'assertive' : 'polite'}">
                <div class="toast-icon" aria-hidden="true">${icones[tipo] || icones.info}</div>
                <div class="toast-content">
                    <div class="toast-message">${mensagem}</div>
                </div>
                <button class="toast-close" 
                        onclick="Toasts.fechar('${id}')"
                        aria-label="Fechar notificação">×</button>
            </div>
        `;
        
        this.container.insertAdjacentHTML('beforeend', toastHTML);
        
        const toast = document.getElementById(id);
        this.toastsAtivos.push(id);
        
        // Animar entrada
        setTimeout(() => toast.classList.add('visivel'), 10);
        
        // ACESSIBILIDADE: Anunciar para leitores de tela
        if (window.anunciarParaLeitoresDeTela) {
            anunciarParaLeitoresDeTela(mensagem, tipo === 'erro' ? 'assertive' : 'polite');
        }
        
        // Auto-fechar
        if (duracao > 0) {
            setTimeout(() => this.fechar(id), duracao);
        }
        
        log(`🔔 Toast mostrado: ${tipo} - ${mensagem}`);
        
        return id;
    },
    
    /**
     * Fechar toast
     */
    fechar(toastId) {
        const toast = document.getElementById(toastId);
        
        if (!toast) {
            return;
        }
        
        toast.classList.add('saindo');
        
        setTimeout(() => {
            toast.remove();
            this.toastsAtivos = this.toastsAtivos.filter(id => id !== toastId);
        }, 300);
    },
    
    /**
     * Fechar todos os toasts
     */
    fecharTodos() {
        this.toastsAtivos.forEach(id => this.fechar(id));
    }
};

/**
 * Função global de toast
 */
function inicializarToasts() {
    Toasts.inicializar();
}

function mostrarToast(mensagem, tipo = 'info', duracao = 4000) {
    return Toasts.mostrar(mensagem, tipo, duracao);
}

/**
 * Atalhos para tipos de toast
 */
function toastSucesso(mensagem, duracao) {
    return mostrarToast(mensagem, 'sucesso', duracao);
}

function toastErro(mensagem, duracao) {
    return mostrarToast(mensagem, 'erro', duracao);
}

function toastAviso(mensagem, duracao) {
    return mostrarToast(mensagem, 'aviso', duracao);
}

function toastInfo(mensagem, duracao) {
    return mostrarToast(mensagem, 'info', duracao);
}