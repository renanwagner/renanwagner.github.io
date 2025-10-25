/*
==========================================
  ONGCONNECT - TEMPLATES
  Sistema de templates JavaScript para renderização dinâmica
==========================================
*/

const Templates = {
    cache: {},
    
    /**
     * Renderizar template
     */
    renderizar(nome, dados = {}) {
        const template = this[nome];
        
        if (!template) {
            console.error(`Template "${nome}" não encontrado`);
            return '';
        }
        
        return template(dados);
    },
    
    /**
     * Template: Home
     */
    home(dados) {
        const { titulo, subtitulo, projetos } = dados;
        
        return `
            <section class="hero" style="background: linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(138, 43, 226, 0.1) 100%); padding: var(--espaco-4xl) 0;">
                <div class="container">
                    <h2 style="font-size: var(--fonte-3xl); margin-bottom: var(--espaco-base);">${titulo}</h2>
                    <p style="font-size: var(--fonte-xl); margin-bottom: var(--espaco-2xl); color: var(--cor-cinza-700);">${subtitulo}</p>
                    <div class="hero-botoes" style="display: flex; gap: var(--espaco-base); flex-wrap: wrap; justify-content: center;">
                        <a href="#projetos" class="btn btn-primario" style="font-size: var(--fonte-lg); padding: var(--espaco-base) var(--espaco-2xl);">Ver Projetos</a>
                        <a href="#cadastro" class="btn btn-secundario" style="font-size: var(--fonte-lg); padding: var(--espaco-base) var(--espaco-2xl);">Cadastrar ONG</a>
                    </div>
                </div>
            </section>
            
            <section class="projetos-destaque" style="padding: var(--espaco-4xl) 0;">
                <div class="container">
                    <h2 style="text-align: center; margin-bottom: var(--espaco-2xl); color: var(--cor-primaria);">⭐ Projetos em Destaque</h2>
                    <div class="projetos-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--espaco-xl); margin-bottom: var(--espaco-2xl);">
                        ${projetos.map(p => this.cardProjeto(p)).join('')}
                    </div>
                    <div style="text-align: center;">
                        <a href="#projetos" class="btn btn-primario" style="font-size: var(--fonte-lg);">Ver Todos os Projetos →</a>
                    </div>
                </div>
            </section>
            
            <section class="como-funciona" style="background: var(--cor-cinza-50); padding: var(--espaco-4xl) 0;">
                <div class="container">
                    <h2 style="text-align: center; margin-bottom: var(--espaco-2xl); color: var(--cor-primaria);">Como Funciona</h2>
                    <div class="cards-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--espaco-xl);">
                        ${this.cardComoFunciona('1', '📝 Cadastre-se', 'Crie sua conta gratuitamente')}
                        ${this.cardComoFunciona('2', '🔍 Escolha um Projeto', 'Navegue pelos projetos disponíveis')}
                        ${this.cardComoFunciona('3', '🤝 Faça a Diferença', 'Inscreva-se e comece a voluntariar')}
                    </div>
                </div>
            </section>
            
            <section class="estatisticas" style="background: var(--gradiente-primario); color: var(--cor-branco); padding: var(--espaco-4xl) 0;">
                <div class="container">
                    <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--espaco-xl); text-align: center;">
                        ${this.estatistica('500+', 'ONGs Cadastradas')}
                        ${this.estatistica('10.000+', 'Voluntários Ativos')}
                        ${this.estatistica('1.000+', 'Projetos Realizados')}
                        ${this.estatistica('50+', 'Cidades Atendidas')}
                    </div>
                </div>
            </section>
        `;
    },
    
    /**
     * Template: Projetos
     */
    projetos(dados) {
        const { projetos, total } = dados;
        
        return `
            <section class="projetos-pagina" style="padding: var(--espaco-3xl) 0;">
                <div class="container">
                    <div class="projetos-header" style="text-align: center; margin-bottom: var(--espaco-2xl);">
                        <h1 style="color: var(--cor-primaria); margin-bottom: var(--espaco-base);">🎯 Projetos Disponíveis</h1>
                        <p id="projetos-contador" style="color: var(--cor-cinza-600); font-size: var(--fonte-lg);">${total} projeto(s) encontrado(s)</p>
                    </div>
                    
                    <div class="projetos-controles" style="margin-bottom: var(--espaco-2xl);">
                        <div class="busca-container" style="margin-bottom: var(--espaco-lg);">
                            <input type="text" 
                                   id="busca-projetos" 
                                   class="form-control" 
                                   placeholder="🔍 Buscar projetos...">
                        </div>
                        
                        <div class="filtros-container" style="display: flex; flex-wrap: wrap; gap: var(--espaco-sm); margin-bottom: var(--espaco-lg); justify-content: center;">
                            <button class="filtro-categoria ativo" data-categoria="todos">Todos</button>
                            <button class="filtro-categoria" data-categoria="alimentacao">🍽️ Alimentação</button>
                            <button class="filtro-categoria" data-categoria="educacao">📚 Educação</button>
                            <button class="filtro-categoria" data-categoria="saude">🏥 Saúde</button>
                            <button class="filtro-categoria" data-categoria="meio-ambiente">🌳 Meio Ambiente</button>
                            <button class="filtro-categoria" data-categoria="cultura">🎭 Cultura</button>
                            <button class="filtro-categoria" data-categoria="esporte">⚽ Esporte</button>
                            <button class="filtro-categoria" data-categoria="animais">🐾 Animais</button>
                        </div>
                        
                        <div style="display: flex; gap: var(--espaco-base); flex-wrap: wrap; justify-content: center; align-items: center;">
                            <div class="ordenacao-container" style="display: flex; align-items: center; gap: var(--espaco-sm);">
                                <label for="ordenacao-projetos" style="font-weight: var(--peso-medio);">Ordenar por:</label>
                                <select id="ordenacao-projetos" class="form-control">
                                    <option value="recentes">Mais Recentes</option>
                                    <option value="antigos">Mais Antigos</option>
                                    <option value="alfabetica">Ordem Alfabética</option>
                                    <option value="vagas">Mais Vagas</option>
                                </select>
                            </div>
                            
                            <button id="ver-favoritos" class="btn btn-secundario">
                                ❤️ Meus Favoritos
                            </button>
                        </div>
                    </div>
                    
                    <div id="projetos-grid" class="projetos-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--espaco-xl);">
                        ${projetos.map(p => Projetos.renderizarCard(p)).join('')}
                    </div>
                </div>
            </section>
        `;
    },
    
    /**
     * Template: Cadastro
     */
    cadastro(dados) {
        const { titulo, descricao } = dados;
        
        return `
            <section class="cadastro-pagina" style="padding: var(--espaco-3xl) 0; background: linear-gradient(135deg, rgba(74, 144, 226, 0.05) 0%, rgba(138, 43, 226, 0.05) 100%);">
                <div class="container">
                    <div class="cadastro-layout" style="display: grid; grid-template-columns: 1fr; gap: var(--espaco-3xl); max-width: 1200px; margin: 0 auto;">
                        <div class="cadastro-info" style="background: var(--cor-branco); padding: var(--espaco-2xl); border-radius: var(--raio-lg); box-shadow: var(--sombra-md);">
                            <h1 style="color: var(--cor-primaria); margin-bottom: var(--espaco-base);">📋 ${titulo}</h1>
                            <p style="margin-bottom: var(--espaco-xl); color: var(--cor-cinza-700); line-height: 1.6;">${descricao}</p>
                            
                            <div class="beneficios" style="background: var(--cor-azul-claro); padding: var(--espaco-lg); border-radius: var(--raio-md); margin-bottom: var(--espaco-lg);">
                                <h3 style="color: var(--cor-primaria); margin-bottom: var(--espaco-base);">✨ Benefícios de Cadastrar sua ONG:</h3>
                                <ul style="list-style: none; padding: 0;">
                                    <li style="margin-bottom: var(--espaco-sm); padding-left: var(--espaco-base); position: relative;">
                                        <span style="position: absolute; left: 0;">✓</span> Visibilidade para milhares de voluntários
                                    </li>
                                    <li style="margin-bottom: var(--espaco-sm); padding-left: var(--espaco-base); position: relative;">
                                        <span style="position: absolute; left: 0;">✓</span> Gerenciamento fácil de projetos
                                    </li>
                                    <li style="margin-bottom: var(--espaco-sm); padding-left: var(--espaco-base); position: relative;">
                                        <span style="position: absolute; left: 0;">✓</span> Comunicação direta com interessados
                                    </li>
                                    <li style="margin-bottom: var(--espaco-sm); padding-left: var(--espaco-base); position: relative;">
                                        <span style="position: absolute; left: 0;">✓</span> Relatórios e estatísticas
                                    </li>
                                    <li style="padding-left: var(--espaco-base); position: relative;">
                                        <span style="position: absolute; left: 0;">✓</span> Suporte dedicado
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="alert alert-info" style="background: var(--cor-azul-claro); border-left: 4px solid var(--cor-primaria); padding: var(--espaco-base); border-radius: var(--raio-sm);">
                                <strong>ℹ️ Importante:</strong> Todos os campos marcados com <span style="color: var(--cor-erro); font-weight: var(--peso-bold);">*</span> são obrigatórios.
                            </div>
                        </div>
                        
                        <div class="formulario-container">
                            ${this.formularioCadastro()}
                        </div>
                    </div>
                </div>
            </section>
        `;
    },
    
    /**
     * Template: Sobre
     */
    sobre(dados) {
        const { titulo, missao, valores } = dados;
        
        return `
            <section class="sobre-pagina" style="padding: var(--espaco-4xl) 0;">
                <div class="container">
                    <div class="sobre-hero" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--espaco-3xl); align-items: center; margin-bottom: var(--espaco-4xl);">
                        <div class="sobre-texto">
                            <h1 style="color: var(--cor-primaria); margin-bottom: var(--espaco-base);">${titulo}</h1>
                            <p class="lead" style="font-size: var(--fonte-xl); line-height: 1.6; color: var(--cor-cinza-700);">Conectando pessoas que querem fazer a diferença com organizações que transformam vidas.</p>
                        </div>
                        <div class="sobre-imagem">
                            <img src="imagens/sobre-ongconnect.jpg" 
                                 alt="Sobre ONGConnect"
                                 onerror="this.src='imagens/galeria-1.jpg'"
                                 style="width: 100%; border-radius: var(--raio-lg); box-shadow: var(--sombra-lg);">
                        </div>
                    </div>
                    
                    <div class="sobre-missao" style="background: var(--cor-cinza-50); padding: var(--espaco-3xl); border-radius: var(--raio-lg); margin-bottom: var(--espaco-3xl); text-align: center;">
                        <h2 style="color: var(--cor-primaria); margin-bottom: var(--espaco-base);">🎯 Nossa Missão</h2>
                        <p style="font-size: var(--fonte-lg); line-height: 1.8; color: var(--cor-cinza-700);">${missao}</p>
                    </div>
                    
                    <div class="sobre-valores">
                        <h2 style="text-align: center; color: var(--cor-primaria); margin-bottom: var(--espaco-2xl);">💎 Nossos Valores</h2>
                        <div class="valores-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--espaco-xl);">
                            ${valores.map(v => `
                                <div class="valor-item" style="background: var(--cor-branco); padding: var(--espaco-xl); border-radius: var(--raio-md); box-shadow: var(--sombra-md); text-align: center; transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-8px)'" onmouseout="this.style.transform='translateY(0)'">
                                    <h3 style="color: var(--cor-primaria); font-size: var(--fonte-xl);">${v}</h3>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `;
    },
    
    /**
     * Template: Card de Projeto (simplificado para home)
     */
    cardProjeto(projeto) {
        return `
            <div class="card" onclick="Projetos.verDetalhes(${projeto.id})" style="cursor: pointer; transition: all 0.3s ease; overflow: hidden; border-radius: var(--raio-md); box-shadow: var(--sombra-sm);" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='var(--sombra-lg)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--sombra-sm)'">
                <div class="card-imagem" style="position: relative; overflow: hidden; height: 200px;">
                    <img src="${projeto.imagem}" 
                         alt="${projeto.titulo}"
                         onerror="this.src='imagens/galeria-1.jpg'"
                         style="width: 100%; height: 100%; object-fit: cover;">
                    ${projeto.destaque ? '<span class="badge badge-destaque" style="position: absolute; top: 10px; right: 10px; background: var(--cor-aviso); color: var(--cor-cinza-900); padding: var(--espaco-xs) var(--espaco-sm); border-radius: var(--raio-pill); font-size: var(--fonte-xs); font-weight: var(--peso-bold);">⭐ Destaque</span>' : ''}
                </div>
                <div class="card-conteudo" style="padding: var(--espaco-lg);">
                    <span class="badge badge-primario" style="font-size: var(--fonte-xs); margin-bottom: var(--espaco-sm);">${Projetos.formatarCategoria(projeto.categoria)}</span>
                    <h3 style="margin-bottom: var(--espaco-sm); color: var(--cor-primaria);">${projeto.titulo}</h3>
                    <p style="color: var(--cor-cinza-600); margin-bottom: var(--espaco-base); line-height: 1.6;">${projeto.descricao.substring(0, 100)}...</p>
                    <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center; padding-top: var(--espaco-base); border-top: 1px solid var(--cor-cinza-200);">
                        <span style="font-size: var(--fonte-sm); color: var(--cor-cinza-600);">📍 ${projeto.local}</span>
                        <span style="font-size: var(--fonte-sm); font-weight: var(--peso-bold); color: var(--cor-primaria);">👥 ${projeto.vagas} vagas</span>
                    </div>
                </div>
            </div>
        `;
    },
    
    /**
     * Template: Card Como Funciona
     */
    cardComoFunciona(numero, titulo, descricao) {
        return `
            <div class="card" style="background: var(--cor-branco); padding: var(--espaco-2xl); border-radius: var(--raio-lg); box-shadow: var(--sombra-md); text-align: center; transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-8px)'" onmouseout="this.style.transform='translateY(0)'">
                <div class="card-numero" style="width: 60px; height: 60px; background: var(--gradiente-primario); color: var(--cor-branco); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: var(--fonte-2xl); font-weight: var(--peso-bold); margin: 0 auto var(--espaco-lg);">${numero}</div>
                <h3 style="margin-bottom: var(--espaco-sm); color: var(--cor-primaria);">${titulo}</h3>
                <p style="color: var(--cor-cinza-600); line-height: 1.6;">${descricao}</p>
            </div>
        `;
    },
    
    /**
     * Template: Estatística
     */
    estatistica(numero, texto) {
        return `
            <div class="stat-item">
                <div class="stat-numero" style="font-size: var(--fonte-3xl); font-weight: var(--peso-bold); margin-bottom: var(--espaco-sm);">${numero}</div>
                <div class="stat-texto" style="font-size: var(--fonte-lg); opacity: 0.9;">${texto}</div>
            </div>
        `;
    },
    
    /**
     * Template: Formulário de Cadastro
     */
    formularioCadastro() {
        return `
            <form id="form-cadastro-ong" data-validacao novalidate style="background: var(--cor-branco); padding: var(--espaco-2xl); border-radius: var(--raio-lg); box-shadow: var(--sombra-md);">
                <div class="form-sucesso" id="mensagem-sucesso" style="display: none;">
                    <strong>✅ Sucesso!</strong> Cadastro realizado com sucesso!
                </div>
                
                <h2 style="color: var(--cor-primaria); margin-bottom: var(--espaco-lg);">🏢 Dados da ONG</h2>
                
                <div class="form-group">
                    <label for="nome-ong">Nome da ONG <span class="obrigatorio">*</span></label>
                    <input type="text" 
                           id="nome-ong" 
                           name="nome-ong"
                           class="form-control" 
                           placeholder="Digite o nome da ONG"
                           required
                           minlength="3"
                           maxlength="100">
                    <span class="erro-mensagem">Este campo é obrigatório (mínimo 3 caracteres)</span>
                </div>
                
                <div class="form-group">
                    <label for="cnpj">CNPJ <span class="obrigatorio">*</span></label>
                    <input type="text" 
                           id="cnpj" 
                           name="cnpj"
                           class="form-control" 
                           data-validacao="cnpj"
                           placeholder="00.000.000/0000-00"
                           required>
                    <span class="erro-mensagem">Digite um CNPJ válido</span>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="email">E-mail <span class="obrigatorio">*</span></label>
                        <input type="email" 
                               id="email" 
                               name="email"
                               class="form-control" 
                               data-validacao="email"
                               placeholder="contato@ong.org.br"
                               required>
                        <span class="erro-mensagem">Digite um e-mail válido</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="telefone">Telefone <span class="obrigatorio">*</span></label>
                        <input type="tel" 
                               id="telefone" 
                               name="telefone"
                               class="form-control" 
                               data-validacao="telefone"
                               placeholder="(00) 00000-0000"
                               required>
                        <span class="erro-mensagem">Digite um telefone válido</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="descricao">Descrição da ONG <span class="obrigatorio">*</span></label>
                    <textarea id="descricao" 
                              name="descricao"
                              class="form-control" 
                              rows="5"
                              placeholder="Descreva a missão e atividades da sua ONG"
                              required
                              minlength="50"
                              maxlength="500"></textarea>
                    <span class="erro-mensagem">Mínimo de 50 caracteres</span>
                    <small class="text-muted">Mínimo 50, máximo 500 caracteres</small>
                </div>
                
                <div class="form-group">
                    <label for="area-atuacao">Área de Atuação <span class="obrigatorio">*</span></label>
                    <select id="area-atuacao" 
                            name="area-atuacao"
                            class="form-control" 
                            required>
                        <option value="">Selecione uma área</option>
                        <option value="alimentacao">🍽️ Alimentação</option>
                        <option value="educacao">📚 Educação</option>
                        <option value="saude">🏥 Saúde</option>
                        <option value="meio-ambiente">🌳 Meio Ambiente</option>
                        <option value="cultura">🎭 Cultura</option>
                        <option value="esporte">⚽ Esporte</option>
                        <option value="tecnologia">💻 Tecnologia</option>
                        <option value="animais">🐾 Proteção Animal</option>
                        <option value="assistencia-social">🤝 Assistência Social</option>
                    </select>
                    <span class="erro-mensagem">Selecione uma área de atuação</span>
                </div>
                
                <h3 style="color: var(--cor-primaria); margin: var(--espaco-xl) 0 var(--espaco-lg);">📍 Endereço</h3>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="cep">CEP <span class="obrigatorio">*</span></label>
                        <input type="text" 
                               id="cep" 
                               name="cep"
                               class="form-control" 
                               data-validacao="cep"
                               placeholder="00000-000"
                               required>
                        <span class="erro-mensagem">Digite um CEP válido</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="estado">Estado <span class="obrigatorio">*</span></label>
                        <select id="estado" 
                                name="estado"
                                class="form-control" 
                                required>
                            <option value="">Selecione</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                        <span class="erro-mensagem">Selecione um estado</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="cidade">Cidade <span class="obrigatorio">*</span></label>
                    <input type="text" 
                           id="cidade" 
                           name="cidade"
                           class="form-control" 
                           placeholder="Digite a cidade"
                           required
                           minlength="2">
                    <span class="erro-mensagem">Digite o nome da cidade</span>
                </div>
                
                <div class="form-group">
                    <label for="logradouro">Logradouro <span class="obrigatorio">*</span></label>
                    <input type="text" 
                           id="logradouro" 
                           name="logradouro"
                           class="form-control" 
                           placeholder="Rua, avenida, etc."
                           required>
                    <span class="erro-mensagem">Digite o logradouro</span>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="numero">Número <span class="obrigatorio">*</span></label>
                        <input type="text" 
                               id="numero" 
                               name="numero"
                               class="form-control" 
                               placeholder="123"
                               required>
                        <span class="erro-mensagem">Digite o número</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="complemento">Complemento</label>
                        <input type="text" 
                               id="complemento" 
                               name="complemento"
                               class="form-control" 
                               placeholder="Sala, bloco, etc.">
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="bairro">Bairro <span class="obrigatorio">*</span></label>
                    <input type="text" 
                           id="bairro" 
                           name="bairro"
                           class="form-control" 
                           placeholder="Digite o bairro"
                           required>
                    <span class="erro-mensagem">Digite o bairro</span>
                </div>
                
                <h3 style="color: var(--cor-primaria); margin: var(--espaco-xl) 0 var(--espaco-lg);">🌐 Informações Adicionais</h3>
                
                <div class="form-group">
                    <label for="site">Site da ONG</label>
                    <input type="url" 
                           id="site" 
                           name="site"
                           class="form-control" 
                           data-validacao="url"
                           placeholder="https://www.suaong.org.br">
                    <span class="erro-mensagem">Digite uma URL válida</span>
                </div>
                
                <div class="form-group">
                    <label for="facebook">Facebook</label>
                    <input type="url" 
                           id="facebook" 
                           name="facebook"
                           class="form-control" 
                           placeholder="https://facebook.com/suaong">
                </div>
                
                <div class="form-group">
                    <label for="instagram">Instagram</label>
                    <input type="text" 
                           id="instagram" 
                           name="instagram"
                           class="form-control" 
                           placeholder="@suaong">
                </div>
                
                <div class="form-group">
                    <div class="form-check">
                        <input type="checkbox" 
                               id="aceite-termos" 
                               name="aceite-termos"
                               required>
                        <label for="aceite-termos">
                            Aceito os <a href="#termos" target="_blank">termos de uso</a> e a 
                            <a href="#privacidade" target="_blank">política de privacidade</a> 
                            <span class="obrigatorio">*</span>
                        </label>
                    </div>
                    <span class="erro-mensagem">Você deve aceitar os termos</span>
                </div>
                
                <div class="form-group">
                    <div class="form-check">
                        <input type="checkbox" 
                               id="aceite-newsletter" 
                               name="aceite-newsletter">
                        <label for="aceite-newsletter">
                            📧 Desejo receber novidades e atualizações por e-mail
                        </label>
                    </div>
                </div>
                
                <div class="form-buttons" style="display: flex; gap: var(--espaco-base); margin-top: var(--espaco-2xl);">
                    <button type="reset" class="btn btn-reset" style="flex: 1;">🔄 Limpar Formulário</button>
                    <button type="submit" class="btn btn-submit" style="flex: 2;">✅ Cadastrar ONG</button>
                </div>
            </form>
        `;
    }
};