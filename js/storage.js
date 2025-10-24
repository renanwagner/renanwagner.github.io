/*
==========================================
  ONGCONNECT - STORAGE
  Sistema de gerenciamento de localStorage e sessionStorage
==========================================
*/

const Storage = {
    prefixo: 'ongconnect_',
    
    /**
     * Salvar dados no localStorage
     */
    salvar(chave, valor) {
        try {
            const chaveCompleta = this.prefixo + chave;
            const valorString = JSON.stringify(valor);
            localStorage.setItem(chaveCompleta, valorString);
            log(`💾 Salvou: ${chave}`);
            return true;
        } catch (erro) {
            console.error('Erro ao salvar no localStorage:', erro);
            return false;
        }
    },
    
    /**
     * Obter dados do localStorage
     */
    obter(chave) {
        try {
            const chaveCompleta = this.prefixo + chave;
            const valorString = localStorage.getItem(chaveCompleta);
            
            if (valorString === null) {
                return null;
            }
            
            return JSON.parse(valorString);
        } catch (erro) {
            console.error('Erro ao obter do localStorage:', erro);
            return null;
        }
    },
    
    /**
     * Remover item do localStorage
     */
    remover(chave) {
        try {
            const chaveCompleta = this.prefixo + chave;
            localStorage.removeItem(chaveCompleta);
            log(`🗑️ Removeu: ${chave}`);
            return true;
        } catch (erro) {
            console.error('Erro ao remover do localStorage:', erro);
            return false;
        }
    },
    
    /**
     * Limpar todos os dados do localStorage
     */
    limparTudo() {
        try {
            const chaves = Object.keys(localStorage);
            chaves.forEach(chave => {
                if (chave.startsWith(this.prefixo)) {
                    localStorage.removeItem(chave);
                }
            });
            log('🗑️ LocalStorage limpo');
            return true;
        } catch (erro) {
            console.error('Erro ao limpar localStorage:', erro);
            return false;
        }
    },
    
    /**
     * Verificar se existe uma chave
     */
    existe(chave) {
        const chaveCompleta = this.prefixo + chave;
        return localStorage.getItem(chaveCompleta) !== null;
    },
    
    /**
     * Obter todas as chaves armazenadas
     */
    obterTodasChaves() {
        const chaves = Object.keys(localStorage);
        return chaves
            .filter(chave => chave.startsWith(this.prefixo))
            .map(chave => chave.replace(this.prefixo, ''));
    },
    
    /**
     * Salvar dados na sessão (sessionStorage)
     */
    salvarSessao(chave, valor) {
        try {
            const chaveCompleta = this.prefixo + chave;
            const valorString = JSON.stringify(valor);
            sessionStorage.setItem(chaveCompleta, valorString);
            log(`💾 Salvou na sessão: ${chave}`);
            return true;
        } catch (erro) {
            console.error('Erro ao salvar no sessionStorage:', erro);
            return false;
        }
    },
    
    /**
     * Obter dados da sessão
     */
    obterSessao(chave) {
        try {
            const chaveCompleta = this.prefixo + chave;
            const valorString = sessionStorage.getItem(chaveCompleta);
            
            if (valorString === null) {
                return null;
            }
            
            return JSON.parse(valorString);
        } catch (erro) {
            console.error('Erro ao obter do sessionStorage:', erro);
            return null;
        }
    },
    
    /**
     * Remover item da sessão
     */
    removerSessao(chave) {
        try {
            const chaveCompleta = this.prefixo + chave;
            sessionStorage.removeItem(chaveCompleta);
            return true;
        } catch (erro) {
            console.error('Erro ao remover do sessionStorage:', erro);
            return false;
        }
    }
};

/**
 * Sistema de Favoritos
 */
const Favoritos = {
    chave: 'favoritos',
    
    /**
     * Obter todos os favoritos
     */
    obterTodos() {
        return Storage.obter(this.chave) || [];
    },
    
    /**
     * Adicionar projeto aos favoritos
     */
    adicionar(projetoId) {
        const favoritos = this.obterTodos();
        
        if (!favoritos.includes(projetoId)) {
            favoritos.push(projetoId);
            Storage.salvar(this.chave, favoritos);
            AppState.projetosFavoritos = favoritos;
            log(`⭐ Adicionou aos favoritos: ${projetoId}`);
            return true;
        }
        
        return false;
    },
    
    /**
     * Remover projeto dos favoritos
     */
    remover(projetoId) {
        let favoritos = this.obterTodos();
        favoritos = favoritos.filter(id => id !== projetoId);
        Storage.salvar(this.chave, favoritos);
        AppState.projetosFavoritos = favoritos;
        log(`💔 Removeu dos favoritos: ${projetoId}`);
        return true;
    },
    
    /**
     * Verificar se projeto está nos favoritos
     */
    ehFavorito(projetoId) {
        const favoritos = this.obterTodos();
        return favoritos.includes(projetoId);
    },
    
    /**
     * Alternar favorito (adicionar se não existe, remover se existe)
     */
    alternar(projetoId) {
        if (this.ehFavorito(projetoId)) {
            this.remover(projetoId);
            return false;
        } else {
            this.adicionar(projetoId);
            return true;
        }
    },
    
    /**
     * Limpar todos os favoritos
     */
    limpar() {
        Storage.remover(this.chave);
        AppState.projetosFavoritos = [];
        log('🗑️ Favoritos limpos');
    }
};

/**
 * Sistema de Preferências do Usuário
 */
const Preferencias = {
    chave: 'preferencias',
    
    padroes: {
        tema: 'claro',
        notificacoes: true,
        idioma: 'pt-BR',
        itemsPorPagina: 9
    },
    
    /**
     * Obter todas as preferências
     */
    obterTodas() {
        const salvas = Storage.obter(this.chave);
        return { ...this.padroes, ...salvas };
    },
    
    /**
     * Obter preferência específica
     */
    obter(chave) {
        const preferencias = this.obterTodas();
        return preferencias[chave];
    },
    
    /**
     * Salvar preferência
     */
    salvar(chave, valor) {
        const preferencias = this.obterTodas();
        preferencias[chave] = valor;
        Storage.salvar(this.chave, preferencias);
        log(`⚙️ Preferência salva: ${chave} = ${valor}`);
    },
    
    /**
     * Salvar múltiplas preferências
     */
    salvarVarias(objeto) {
        const preferencias = this.obterTodas();
        Object.assign(preferencias, objeto);
        Storage.salvar(this.chave, preferencias);
    },
    
    /**
     * Resetar para padrões
     */
    resetar() {
        Storage.salvar(this.chave, this.padroes);
        log('⚙️ Preferências resetadas');
    }
};

/**
 * Sistema de Histórico de Navegação
 */
const Historico = {
    chave: 'historico',
    limite: 50,
    
    /**
     * Adicionar item ao histórico
     */
    adicionar(tipo, dados) {
        const historico = this.obter();
        
        const item = {
            tipo,
            dados,
            timestamp: Date.now(),
            data: new Date().toISOString()
        };
        
        historico.unshift(item);
        
        // Limitar tamanho do histórico
        if (historico.length > this.limite) {
            historico.splice(this.limite);
        }
        
        Storage.salvar(this.chave, historico);
    },
    
    /**
     * Obter histórico completo
     */
    obter() {
        return Storage.obter(this.chave) || [];
    },
    
    /**
     * Obter histórico por tipo
     */
    obterPorTipo(tipo) {
        const historico = this.obter();
        return historico.filter(item => item.tipo === tipo);
    },
    
    /**
     * Limpar histórico
     */
    limpar() {
        Storage.remover(this.chave);
        log('🗑️ Histórico limpo');
    }
};

/**
 * Sistema de Cache
 */
const Cache = {
    prefixo: 'cache_',
    tempoExpiracao: 3600000, // 1 hora em milissegundos
    
    /**
     * Salvar no cache com timestamp
     */
    salvar(chave, dados, tempoExpiracao = this.tempoExpiracao) {
        const item = {
            dados,
            timestamp: Date.now(),
            expira: Date.now() + tempoExpiracao
        };
        
        Storage.salvar(this.prefixo + chave, item);
    },
    
    /**
     * Obter do cache (se não expirou)
     */
    obter(chave) {
        const item = Storage.obter(this.prefixo + chave);
        
        if (!item) {
            return null;
        }
        
        // Verificar se expirou
        if (Date.now() > item.expira) {
            this.remover(chave);
            return null;
        }
        
        return item.dados;
    },
    
    /**
     * Remover do cache
     */
    remover(chave) {
        Storage.remover(this.prefixo + chave);
    },
    
    /**
     * Limpar cache expirado
     */
    limparExpirado() {
        const chaves = Storage.obterTodasChaves();
        const chavesCache = chaves.filter(c => c.startsWith(this.prefixo));
        
        let removidos = 0;
        chavesCache.forEach(chave => {
            const item = Storage.obter(chave);
            if (item && Date.now() > item.expira) {
                Storage.remover(chave);
                removidos++;
            }
        });
        
        if (removidos > 0) {
            log(`🗑️ Cache limpo: ${removidos} itens expirados`);
        }
    },
    
    /**
     * Limpar todo o cache
     */
    limparTudo() {
        const chaves = Storage.obterTodasChaves();
        const chavesCache = chaves.filter(c => c.startsWith(this.prefixo));
        
        chavesCache.forEach(chave => {
            Storage.remover(chave);
        });
        
        log('🗑️ Todo o cache limpo');
    }
};

// Limpar cache expirado ao carregar
Cache.limparExpirado();