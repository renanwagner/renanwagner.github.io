/*
==========================================
  ONGCONNECT - MODALS E TOASTS
  Sistema de modais e notificações toast
==========================================
*/

const Modals = {
    modaisAtivos: [],
    
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
        });
        
        // Configurar botões de fechar
        document.querySelectorAll('.modal-close, [data-fechar-modal]').forEach(botao => {
            botao.addEventListener('click', () => {
                const modal = botao.closest('.modal-overlay');
                if (modal) {
                    this.fechar(modal.id);
                }
            });
        });
        
        // Fechar ao clicar no overlay
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.fechar(overlay.id);
                }
            });
        });
        
        log('✅ Sistema de modais inicializado');
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
        
        modal.classList.add('ativo');
        document.body.style.overflow = 'hidden';
        
        this.modaisAtivos.push(modalId);
        AppState.modalAberto = modalId;
        
        log(`📦 Modal aberto: ${modalId}`);
        
        // Focar no primeiro elemento interativo
        const primeiroInput = modal.querySelector('input, button, textarea, select');
        if (primeiroInput) {
            setTimeout(() => primeiroInput.focus(), 100);
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
        
        // Remover da lista de modais ativos
        this.modaisAtivos = this.modaisAtivos.filter(id => id !== modalId);
        
        // Se não há mais modais, restaurar scroll
        if (this.modaisAtivos.length === 0) {
            document.body.style.overflow = '';
            AppState.modalAberto = null;
        } else {
            AppState.modalAberto = this.modaisAtivos[this.modaisAtivos.length - 1];
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
        
        const modalHTML = `
            <div class="modal-overlay modal-${tamanho}" id="${id}">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">${titulo}</h3>
                        <button class="modal-close" aria-label="Fechar">×</button>
                    </div>
                    <div class="modal-body">
                        ${conteudo}
                    </div>
                    ${botoes.length > 0 ? `
                        <div class="modal-footer">
                            ${botoes.map(botao => `
                                <button class="btn ${botao.classe || 'btn-secundario'}" 
                                        onclick="${botao.acao || 'fecharModal(\'' + id + '\')'}">
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
            document.body.appendChild(container);
        }
        
        this.container = document.querySelector('.toast-container');
        log('✅ Sistema de toasts inicializado');
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
        
        const toastHTML = `
            <div class="toast toast-${tipo}" id="${id}">
                <div class="toast-icon">${icones[tipo] || icones.info}</div>
                <div class="toast-content">
                    <div class="toast-message">${mensagem}</div>
                </div>
                <button class="toast-close" onclick="Toasts.fechar('${id}')">×</button>
            </div>
        `;
        
        this.container.insertAdjacentHTML('beforeend', toastHTML);
        
        const toast = document.getElementById(id);
        this.toastsAtivos.push(id);
        
        // Animar entrada
        setTimeout(() => toast.classList.add('visivel'), 10);
        
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