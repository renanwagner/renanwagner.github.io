/*
==========================================
  ONGCONNECT - VALIDAÇÃO DE FORMULÁRIOS
  Sistema completo de validação com feedback visual
==========================================
*/

const Validacao = {
    regras: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        telefone: /^\(?[1-9]{2}\)?\s?9?[0-9]{4}-?[0-9]{4}$/,
        cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        cnpj: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
        cep: /^\d{5}-?\d{3}$/,
        url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    },
    
    mensagens: {
        required: 'Este campo é obrigatório',
        email: 'Digite um e-mail válido',
        telefone: 'Digite um telefone válido (XX) XXXXX-XXXX',
        cpf: 'Digite um CPF válido: 000.000.000-00',
        cnpj: 'Digite um CNPJ válido: 00.000.000/0000-00',
        cep: 'Digite um CEP válido: 00000-000',
        url: 'Digite uma URL válida',
        minLength: 'Mínimo de {min} caracteres',
        maxLength: 'Máximo de {max} caracteres',
        min: 'Valor mínimo: {min}',
        max: 'Valor máximo: {max}',
        match: 'Os campos não coincidem'
    }
};

/**
 * Inicializar validação de formulários
 */
function inicializarValidacaoFormulario() {
    const formularios = document.querySelectorAll('form[data-validacao]');
    
    formularios.forEach(form => {
        // Validação em tempo real
        form.querySelectorAll('input, textarea, select').forEach(campo => {
            // Validar ao sair do campo
            campo.addEventListener('blur', () => validarCampo(campo));
            
            // Validar enquanto digita (com debounce)
            campo.addEventListener('input', debounce(() => {
                if (campo.classList.contains('foi-validado')) {
                    validarCampo(campo);
                }
            }, 500));
        });
        
        // Validar ao submeter
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            validarFormulario(form);
        });
    });
    
    log('✅ Validação de formulários inicializada');
}

/**
 * Validar um campo individual
 */
function validarCampo(campo) {
    campo.classList.add('foi-validado');
    
    const valor = campo.value.trim();
    const tipo = campo.getAttribute('data-validacao') || campo.type;
    const obrigatorio = campo.hasAttribute('required');
    
    // Limpar erros anteriores
    removerErro(campo);
    
    // Verificar se é obrigatório e está vazio
    if (obrigatorio && !valor) {
        mostrarErro(campo, Validacao.mensagens.required);
        return false;
    }
    
    // Se vazio e não obrigatório, é válido
    if (!valor && !obrigatorio) {
        marcarValido(campo);
        return true;
    }
    
    // Validações específicas por tipo
    let valido = true;
    let mensagemErro = '';
    
    switch (tipo) {
        case 'email':
            valido = Validacao.regras.email.test(valor);
            mensagemErro = Validacao.mensagens.email;
            break;
            
        case 'telefone':
            valido = Validacao.regras.telefone.test(valor);
            mensagemErro = Validacao.mensagens.telefone;
            break;
            
        case 'cpf':
            valido = validarCPF(valor);
            mensagemErro = Validacao.mensagens.cpf;
            break;
            
        case 'cnpj':
            valido = validarCNPJ(valor);
            mensagemErro = Validacao.mensagens.cnpj;
            break;
            
        case 'cep':
            valido = Validacao.regras.cep.test(valor);
            mensagemErro = Validacao.mensagens.cep;
            if (valido) buscarCEP(valor, campo);
            break;
            
        case 'url':
            valido = Validacao.regras.url.test(valor);
            mensagemErro = Validacao.mensagens.url;
            break;
    }
    
    // Validar tamanho mínimo
    const minLength = campo.getAttribute('minlength');
    if (minLength && valor.length < minLength) {
        valido = false;
        mensagemErro = Validacao.mensagens.minLength.replace('{min}', minLength);
    }
    
    // Validar tamanho máximo
    const maxLength = campo.getAttribute('maxlength');
    if (maxLength && valor.length > maxLength) {
        valido = false;
        mensagemErro = Validacao.mensagens.maxLength.replace('{max}', maxLength);
    }
    
    // Validar valor mínimo (para números)
    const min = campo.getAttribute('min');
    if (min && parseFloat(valor) < parseFloat(min)) {
        valido = false;
        mensagemErro = Validacao.mensagens.min.replace('{min}', min);
    }
    
    // Validar valor máximo (para números)
    const max = campo.getAttribute('max');
    if (max && parseFloat(valor) > parseFloat(max)) {
        valido = false;
        mensagemErro = Validacao.mensagens.max.replace('{max}', max);
    }
    
    // Validar confirmação (ex: confirmar senha)
    const confirmar = campo.getAttribute('data-confirmar');
    if (confirmar) {
        const campoOriginal = document.getElementById(confirmar);
        if (campoOriginal && valor !== campoOriginal.value) {
            valido = false;
            mensagemErro = Validacao.mensagens.match;
        }
    }
    
    if (valido) {
        marcarValido(campo);
    } else {
        mostrarErro(campo, mensagemErro);
    }
    
    return valido;
}

/**
 * Validar formulário completo
 */
function validarFormulario(form) {
    let formularioValido = true;
    const campos = form.querySelectorAll('input, textarea, select');
    
    // Validar todos os campos
    campos.forEach(campo => {
        const campoValido = validarCampo(campo);
        if (!campoValido) {
            formularioValido = false;
        }
    });
    
    if (formularioValido) {
        log('✅ Formulário válido!');
        processarFormulario(form);
    } else {
        log('❌ Formulário inválido');
        mostrarToast('Por favor, corrija os erros no formulário', 'erro');
        
        // Focar no primeiro campo com erro
        const primeiroErro = form.querySelector('.invalido');
        if (primeiroErro) {
            primeiroErro.focus();
            primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    return formularioValido;
}

/**
 * Mostrar erro em um campo
 */
function mostrarErro(campo, mensagem) {
    campo.classList.remove('valido');
    campo.classList.add('invalido');
    
    // Criar ou atualizar mensagem de erro
    let mensagemErro = campo.parentElement.querySelector('.erro-mensagem');
    
    if (!mensagemErro) {
        mensagemErro = document.createElement('span');
        mensagemErro.className = 'erro-mensagem';
        campo.parentElement.appendChild(mensagemErro);
    }
    
    mensagemErro.textContent = mensagem;
    mensagemErro.style.display = 'block';
}

/**
 * Marcar campo como válido
 */
function marcarValido(campo) {
    campo.classList.remove('invalido');
    campo.classList.add('valido');
    removerErro(campo);
}

/**
 * Remover mensagem de erro
 */
function removerErro(campo) {
    const mensagemErro = campo.parentElement.querySelector('.erro-mensagem');
    if (mensagemErro) {
        mensagemErro.style.display = 'none';
    }
}

/**
 * Validar CPF
 */
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }
    
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

/**
 * Validar CNPJ
 */
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, '');
    
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
        return false;
    }
    
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;
    
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;
    
    return true;
}

/**
 * Buscar CEP na API ViaCEP
 */
async function buscarCEP(cep, campoOrigem) {
    cep = cep.replace(/[^\d]/g, '');
    
    if (cep.length !== 8) return;
    
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();
        
        if (dados.erro) {
            mostrarToast('CEP não encontrado', 'aviso');
            return;
        }
        
        // Preencher campos automaticamente
        preencherEnderecoCEP(dados);
        mostrarToast('CEP encontrado!', 'sucesso');
        
    } catch (erro) {
        console.error('Erro ao buscar CEP:', erro);
    }
}

/**
 * Preencher campos de endereço com dados do CEP
 */
function preencherEnderecoCEP(dados) {
    const campos = {
        'logradouro': dados.logradouro,
        'bairro': dados.bairro,
        'cidade': dados.localidade,
        'estado': dados.uf
    };
    
    Object.entries(campos).forEach(([id, valor]) => {
        const campo = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
        if (campo && valor) {
            campo.value = valor;
            marcarValido(campo);
        }
    });
}

/**
 * Processar formulário válido
 */
function processarFormulario(form) {
    const formId = form.id;
    const dados = new FormData(form);
    const objeto = Object.fromEntries(dados.entries());
    
    log('Processando formulário:', formId, objeto);
    
    // Mostrar loading no botão
    const botaoSubmit = form.querySelector('button[type="submit"]');
    if (botaoSubmit) {
        botaoSubmit.classList.add('loading');
        botaoSubmit.disabled = true;
    }
    
    // Simular envio (substituir por chamada real à API)
    setTimeout(() => {
        // Salvar no localStorage
        Storage.salvar(`form_${formId}`, objeto);
        
        // Remover loading
        if (botaoSubmit) {
            botaoSubmit.classList.remove('loading');
            botaoSubmit.disabled = false;
        }
        
        // Mostrar sucesso
        mostrarToast('Formulário enviado com sucesso!', 'sucesso');
        
        // Limpar formulário
        form.reset();
        form.querySelectorAll('.valido, .invalido, .foi-validado').forEach(campo => {
            campo.classList.remove('valido', 'invalido', 'foi-validado');
        });
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
            navegarPara('projetos');
        }, 2000);
        
    }, 1500);
}

/**
 * Inicializar máscaras de input
 */
function inicializarMascaras() {
    // Máscara de telefone
    document.querySelectorAll('input[data-validacao="telefone"]').forEach(campo => {
        campo.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
            valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = valor;
        });
    });
    
    // Máscara de CPF
    document.querySelectorAll('input[data-validacao="cpf"]').forEach(campo => {
        campo.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = valor;
        });
    });
    
    // Máscara de CNPJ
    document.querySelectorAll('input[data-validacao="cnpj"]').forEach(campo => {
        campo.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
            valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
            valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
            e.target.value = valor;
        });
    });
    
    // Máscara de CEP
    document.querySelectorAll('input[data-validacao="cep"]').forEach(campo => {
        campo.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = valor;
        });
    });
    
    log('✅ Máscaras de input inicializadas');
}