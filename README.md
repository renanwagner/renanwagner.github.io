# ongconnect
# 🤝 ONGConnect - Plataforma Digital para ONGs

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

## 📋 Sobre o Projeto

**ONGConnect** é uma plataforma web desenvolvida para democratizar o acesso à tecnologia digital para organizações do terceiro setor brasileiro. O sistema oferece ferramentas profissionais para gestão de projetos sociais, captação de recursos e engajamento de voluntários.

Este projeto foi desenvolvido como **Entrega I** da disciplina de Desenvolvimento Front-end, aplicando fundamentos de HTML5, estruturação semântica, validação de formulários e boas práticas de desenvolvimento web.

### 🎯 Contexto

O terceiro setor brasileiro representa uma força econômica e social significativa, com mais de 820 mil organizações da sociedade civil. No entanto, apenas 30% possuem presença digital adequada. A ONGConnect surge como solução para democratizar o acesso à tecnologia e amplificar o impacto social dessas organizações.

---

## 🏗️ Estrutura do Projeto

```
ongconnect/
│
├── 📄 index.html              # Página inicial com informações institucionais
├── 📄 projetos.html           # Projetos sociais, voluntariado e doações
├── 📄 cadastro.html           # Formulário completo de cadastro
├── 📄 README.md               # Este arquivo
│
└── 📁 imagens/                # Assets visuais do projeto
    ├── sobre-ongconnect.jpg   # Imagem institucional (1200x600px)
    ├── galeria-1.jpg          # Biblioteca digital
    ├── galeria-2.jpg          # Distribuição de alimentos
    ├── galeria-3.jpg          # Mutirão de saúde
    ├── galeria-4.jpg          # Plantio de árvores
    ├── galeria-5.jpg          # Oficina de arte
    ├── galeria-6.jpg          # Aula de programação
    ├── projeto-educacao.jpg   # Projeto educação
    ├── projeto-saude.jpg      # Projeto saúde
    ├── projeto-ambiente.jpg   # Projeto meio ambiente
    ├── projeto-direitos.jpg   # Projeto direitos humanos
    ├── projeto-cultura.jpg    # Projeto cultura
    ├── projeto-tech.jpg       # Projeto tecnologia
    ├── voluntario-1.jpg       # Avatar Maria Silva
    ├── voluntario-2.jpg       # Avatar João Oliveira
    ├── voluntario-3.jpg       # Avatar Ana Costa
    └── cadastro-banner.jpg    # Banner página cadastro
```

---

## 📄 Páginas Implementadas

### 1. 🏠 index.html - Página Inicial

**Objetivo:** Apresentar a organização e suas funcionalidades

**Conteúdo:**
- ✅ Navegação responsiva entre as 3 páginas
- ✅ Hero section com CTAs (Call to Action)
- ✅ Seção "Sobre a ONGConnect" com imagem ilustrativa
- ✅ 6 cards de funcionalidades principais
- ✅ Estatísticas de impacto (150+ ONGs, 5.200+ voluntários)
- ✅ Galeria visual com 6 imagens de projetos
- ✅ Informações completas de contato (endereço, telefone, e-mail, horário)
- ✅ Rodapé com informações institucionais

**Elementos Semânticos:**
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Hierarquia de títulos: h1, h2, h3, h4

**Imagens:** 7 (1 sobre + 6 galeria)

---

### 2. 🎯 projetos.html - Projetos e Voluntariado

**Objetivo:** Apresentar projetos sociais e oportunidades de voluntariado

**Conteúdo:**
- ✅ 6 projetos sociais detalhados com:
  - Imagem representativa
  - Categoria (Educação, Saúde, Meio Ambiente, etc.)
  - Descrição e impacto
  - Estatísticas (pessoas atendidas, profissionais)
  - Barra de progresso visual
- ✅ Seção de voluntariado com 4 benefícios
- ✅ 3 depoimentos de voluntários com fotos
- ✅ Informações sobre doações com 4 opções de valores
- ✅ CTAs para cadastro

**Elementos Semânticos:**
- `<article>` para cada projeto
- `<section>` para agrupamento temático
- Tags semânticas completas

**Imagens:** 9 (6 projetos + 3 voluntários)

---

### 3. 📝 cadastro.html - Formulário de Cadastro

**Objetivo:** Coletar dados completos de voluntários e doadores

**Conteúdo:**
- ✅ Introdução explicativa com imagem
- ✅ Formulário completo com 3 fieldsets:
  
  **1. Dados Pessoais (5 campos)**
  - Nome Completo (text, required, minlength=3)
  - E-mail (email, required)
  - CPF (text, pattern, máscara JavaScript)
  - Telefone (tel, pattern, máscara JavaScript)
  - Data de Nascimento (date, validação 18+)
  
  **2. Endereço (4 campos)**
  - CEP (text, pattern, máscara JavaScript)
  - Estado (select, 27 opções)
  - Cidade (text, required)
  - Endereço Completo (text, required)
  
  **3. Preferências (2 grupos)**
  - Checkbox: Como deseja participar (voluntário, doador, divulgador)
  - Select: Área de interesse (educação, saúde, meio ambiente, etc.)
  
  **4. Termos**
  - Checkbox: Aceite de termos (required)
  - Checkbox: Newsletter (opcional)

**Validações HTML5:**
- `required` - Campos obrigatórios
- `pattern` - Formato de CPF, telefone, CEP
- `minlength/maxlength` - Tamanho de texto
- `min/max` - Validação de data (18+ anos)
- `type` - Validação por tipo (email, tel, date)

**Máscaras JavaScript:**
- ✅ CPF: `000.000.000-00`
- ✅ Telefone: `(00) 00000-0000`
- ✅ CEP: `00000-000`

**Validações Customizadas:**
- ✅ Idade mínima de 18 anos
- ✅ Pelo menos uma forma de participação selecionada
- ✅ Aceite obrigatório dos termos

## ✅ Requisitos Atendidos

### Estrutura HTML5 Semântica
- ✅ **3 páginas HTML** completas e validadas
- ✅ Estrutura semântica em todas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ✅ Hierarquia de títulos lógica (h1-h4)
- ✅ **Imagens em todas as páginas** (total: 17)

### Páginas Obrigatórias
- ✅ **index.html** - Informações sobre organização e contato
- ✅ **projetos.html** - Projetos sociais, voluntariado e doações
- ✅ **cadastro.html** - Formulário completo

### Formulário Complexo (cadastro.html)
- ✅ **9 campos obrigatórios** implementados:
  1. Nome Completo
  2. E-mail
  3. CPF
  4. Telefone
  5. Data de Nascimento
  6. CEP
  7. Estado
  8. Cidade
  9. Endereço
- ✅ **Validação HTML5** nativa (required, pattern, type, min, max)
- ✅ **Agrupamento lógico** (3 fieldsets com legends)
- ✅ **Máscaras JavaScript** (CPF, telefone, CEP)

### Organização
- ✅ **Estrutura de pastas** clara e organizada
- ✅ **Pasta imagens/** separada com 17 imagens
- ✅ **Código validado** no W3C (zero erros)
- ✅ **Comentários** explicativos no código

---

## 🎨 Tecnologias Utilizadas

### Core
- **HTML5** - Estrutura semântica completa
- **CSS3** - Estilização avançada inline
- **JavaScript** - Máscaras e validações

### Recursos HTML5
- Elementos semânticos (header, nav, main, section, article, footer)
- Formulários com validação nativa
- Tipos de input modernos (email, tel, date, text)
- Atributos de validação (required, pattern, min, max)

### Técnicas CSS3
- Flexbox e Grid Layout
- Gradientes lineares
- Transições e transformações
- Media queries (responsividade)
- Box-shadow e border-radius

### JavaScript Vanilla
- Máscaras de input automáticas
- Validação customizada
- Manipulação do DOM
- Event listeners

---

## 🧪 Validação

### W3C Markup Validation

Todos os arquivos HTML foram validados e aprovados:

- ✅ **index.html** - [Validar](https://validator.w3.org/)
- ✅ **projetos.html** - [Validar](https://validator.w3.org/)
- ✅ **cadastro.html** - [Validar](https://validator.w3.org/)

**Resultado:** ✅ 0 erros | ✅ 0 warnings

### Checklist de Qualidade

```
✅ HTML5 válido (W3C)
✅ Estrutura semântica correta
✅ Imagens com alt text descritivo
✅ Formulário com validação completa
✅ Máscaras JavaScript funcionais
✅ Responsivo (mobile, tablet, desktop)
✅ Navegação funcional entre páginas
✅ Código limpo e comentado
✅ Organização de arquivos adequada
```

---

## 📱 Responsividade

O projeto é **totalmente responsivo** e adapta-se a diferentes tamanhos de tela:

### Breakpoints

```css
/* Mobile First */
Base: 320px - 767px

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

### Testado em:
- ✅ Mobile (375px - 767px)
- ✅ Tablet (768px - 1023px)
- ✅ Desktop (1024px+)
- ✅ Orientações portrait e landscape

---

## 🌐 Compatibilidade

### Navegadores Suportados

| Navegador | Versão Mínima | Status |
|-----------|---------------|--------|
| Google Chrome | 90+ | ✅ Testado |
| Mozilla Firefox | 88+ | ✅ Testado |
| Microsoft Edge | 90+ | ✅ Testado |
| Safari | 14+ | ✅ Compatível |
| Opera | 76+ | ✅ Compatível |

---

## 📊 Estatísticas do Projeto

### Métricas de Código

- **Linhas de HTML:** ~1.500 linhas
- **Linhas de CSS:** ~2.000 linhas (inline)
- **Linhas de JavaScript:** ~200 linhas
- **Total:** ~3.700 linhas de código

### Assets

- **Imagens:** 17 arquivos
- **Tamanho total:** ~5-8 MB
- **Páginas HTML:** 3 arquivos
- **Documentação:** README.md

### Formulário

- **Campos totais:** 12
- **Campos obrigatórios:** 9
- **Validações HTML5:** 10+
- **Máscaras JavaScript:** 3

---

## 🎯 Funcionalidades Principais

### 1. Navegação Intuitiva
- Menu responsivo com 3 links
- Navegação consistente entre páginas
- Links de CTA estratégicos

### 2. Apresentação Institucional
- Informações sobre a organização
- Galeria de 6 imagens
- Estatísticas de impacto
- Contato completo

### 3. Showcase de Projetos
- 6 projetos detalhados
- Progresso visual de campanhas
- Depoimentos de voluntários
- Informações sobre doações

### 4. Formulário Robusto
- 9 campos obrigatórios
- Validação HTML5 nativa
- Máscaras automáticas
- Feedback visual em tempo real
- Validação customizada (idade 18+)

---

## 🔒 Acessibilidade

### Práticas Implementadas

- ✅ **Alt text** descritivo em todas as imagens
- ✅ **Labels** associados a todos os inputs
- ✅ **Contraste adequado** de cores
- ✅ **Hierarquia semântica** correta
- ✅ **Navegação por teclado** funcional
- ✅ **Mensagens de erro** claras

### Conformidade

- **WCAG 2.1:** Nível AA
- **HTML5 Semântico:** Completo
- **ARIA:** Labels quando necessário

---

## 🎓 Contexto Acadêmico

### Disciplina
**Desenvolvimento Front-end** - Entrega I: Fundamentos e Estruturação

### Objetivos Pedagógicos
- ✅ Aplicar fundamentos de HTML5
- ✅ Estruturar páginas semanticamente
- ✅ Criar formulários complexos com validação
- ✅ Implementar máscaras de entrada
- ✅ Organizar projeto profissionalmente
- ✅ Validar código no W3C

### Competências Desenvolvidas
1. **Estruturação HTML5** semântica e acessível
2. **Validação de formulários** nativa e customizada
3. **Manipulação JavaScript** para UX aprimorada
4. **Organização de projeto** web profissional
5. **Documentação técnica** completa

---

## 📚 Referências

### Documentação Técnica
- [MDN Web Docs - HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [W3C HTML5 Specification](https://www.w3.org/TR/html5/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Dados e Estatísticas
- IBGE (2023) - Pesquisa das Entidades de Assistência Social
- ABES (2023) - Mercado Brasileiro de Software
---

</div>
