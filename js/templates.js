/*
==========================================
  ONGCONNECT - DOM
  Utilitários para manipulação do DOM
==========================================
*/

const DOM = {
    /**
     * Selecionar elemento único
     */
    selecionar(seletor) {
        return document.querySelector(seletor);
    },
    
    /**
     * Selecionar múltiplos elementos
     */
    selecionarTodos(seletor) {
        return Array.from(document.querySelectorAll(seletor));
    },
    
    /**
     * Criar elemento
     */
    criar(tag, classes = [], atributos = {}) {
        const elemento = document.createElement(tag);
        
        if (classes.length > 0) {
            elemento.classList.add(...classes);
        }
        
        Object.entries(atributos).forEach(([chave, valor]) => {
            elemento.setAttribute(chave, valor);
        });
        
        return elemento;
    },
    
    /**
     * Adicionar classe(s)
     */
    adicionarClasse(elemento, ...classes) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            elemento.classList.add(...classes);
        }
    },
    
    /**
     * Remover classe(s)
     */
    removerClasse(elemento, ...classes) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            elemento.classList.remove(...classes);
        }
    },
    
    /**
     * Toggle classe
     */
    toggleClasse(elemento, classe) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            elemento.classList.toggle(classe);
        }
    },
    
    /**
     * Verificar se tem classe
     */
    temClasse(elemento, classe) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        return elemento ? elemento.classList.contains(classe) : false;
    },
    
    /**
     * Definir atributo
     */
    definirAtributo(elemento, atributo, valor) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            elemento.setAttribute(atributo, valor);
        }
    },
    
    /**
     * Obter atributo
     */
    obterAtributo(elemento, atributo) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        return elemento ? elemento.getAttribute(atributo) : null;
    },
    
    /**
     * Remover atributo
     */
    removerAtributo(elemento, atributo) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            elemento.removeAttribute(atributo);
        }
    },
    
    /**
     * Definir conteúdo HTML
     */
    definirHTML(elemento, html) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            elemento.innerHTML = html;
        }
    },
    
    /**
     * Definir conteúdo texto
     */
    definirTexto(elemento, texto) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            elemento.textContent = texto;
        }
    },
    
    /**
     * Obter conteúdo texto
     */
    obterTexto(elemento) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        return elemento ? elemento.textContent : '';
    },
    
    /**
     * Adicionar filho
     */
    adicionarFilho(pai, filho) {
        if (typeof pai === 'string') {
            pai = this.selecionar(pai);
        }
        
        if (pai && filho) {
            pai.appendChild(filho);
        }
    },
    
    /**
     * Remover elemento
     */
    remover(elemento) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento && elemento.parentNode) {
            elemento.parentNode.removeChild(elemento);
        }
    },
    
    /**
     * Limpar conteúdo
     */
    limpar(elemento) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            elemento.innerHTML = '';
        }
    },
    
    /**
     * Mostrar elemento
     */
    mostrar(elemento, display = 'block') {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            elemento.style.display = display;
        }
    },
    
    /**
     * Esconder elemento
     */
    esconder(elemento) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            elemento.style.display = 'none';
        }
    },
    
    /**
     * Toggle visibilidade
     */
    toggleVisibilidade(elemento, display = 'block') {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            if (elemento.style.display === 'none') {
                elemento.style.display = display;
            } else {
                elemento.style.display = 'none';
            }
        }
    },
    
    /**
     * Adicionar event listener
     */
    aoClicar(elemento, callback) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            elemento.addEventListener('click', callback);
        }
    },
    
    /**
     * Scroll suave para elemento
     */
    scrollPara(elemento, comportamento = 'smooth') {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (elemento) {
            elemento.scrollIntoView({ 
                behavior: comportamento,
                block: 'start'
            });
        }
    },
    
    /**
     * Obter posição do elemento
     */
    obterPosicao(elemento) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (!elemento) {
            return null;
        }
        
        const rect = elemento.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height
        };
    },
    
    /**
     * Verificar se elemento está visível na viewport
     */
    estaVisivel(elemento) {
        if (typeof elemento === 'string') {
            elemento = this.selecionar(elemento);
        }
        
        if (!elemento) {
            return false;
        }
        
        const rect = elemento.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};