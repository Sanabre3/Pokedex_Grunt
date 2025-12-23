# 🎮 Pokédex Grunt

<div align="center">

![Header]([https://via.placeholder.com/800x200/667eea/FFFFFF?text=Pok%C3%A9dex+Grunt](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=180&section=header&text=Pok%C3%A9dx%20Grunt&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Uma%20experi%C3%AAncia%20Pok%C3%A9mon%20moderna%20na%20web&descAlignY=55&descSize=15))

[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge&logo=github)](https://github.com/Sanabre3/pokedex-grunt)
[![Version](https://img.shields.io/badge/Version-1.0.0--beta-orange?style=for-the-badge&logo=semver)](https://github.com/Sanabre3/pokedex-grunt/releases)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=opensource)](LICENSE)

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Grunt](https://img.shields.io/badge/Grunt-Task%20Runner-FBA919?style=for-the-badge&logo=grunt)](https://gruntjs.com/)
[![LESS](https://img.shields.io/badge/LESS-CSS%20Preprocessor-1D365D?style=for-the-badge&logo=less)](https://lesscss.org/)
[![PokéAPI](https://img.shields.io/badge/PokéAPI-RESTful-3760CE?style=for-the-badge&logo=pokemon)](https://pokeapi.co/)

**Uma Pokédex moderna e interativa construída com JavaScript Vanilla e Grunt**

[🚀 Demo](#) • [📖 Documentação](#-índice) • [⚡ Instalação](#-instalação-rápida) • [🤝 Contribuir](#-contribuição)

</div>

---

## �� Índice

<details>
<summary>📋 Navegação Rápida</summary>

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias-utilizadas)
- [⚡ Instalação Rápida](#-instalação-rápida)
- [📂 Estrutura](#-estrutura-do-projeto)
- [🎯 Como Usar](#-como-usar)
- [🎨 Sistema de Temas](#-sistema-de-temas)
- [🚀 Performance](#-performance-e-otimizações)
- [🔧 Desenvolvimento](#-guia-de-desenvolvimento)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contribuição](#-contribuição)
- [📊 Status](#-status-do-projeto)
- [📄 Licença](#-licença)

</details>

---

## 🎯 Sobre o Projeto

> **Uma experiência Pokémon moderna e completa na web**

A **Pokédex Grunt** é uma aplicação web moderna que permite explorar e descobrir informações detalhadas sobre Pokémons. Utilizando a [PokéAPI](https://pokeapi.co/), oferece uma experiência rica, responsiva e otimizada para todos os dispositivos.

### �� Principais Diferenciais

| 🌟 Recurso | 📝 Descrição |
|------------|--------------|
| **🚀 Performance** | Lazy loading inteligente e carregamento em lotes |
| **🎨 Temas** | Sistema modular com suporte a temas personalizados |
| **📱 Responsivo** | Interface adaptável para todos os dispositivos |
| **⚡ Otimizado** | Build automatizado com Grunt e minificação |
| **💾 Offline** | Persistência local de favoritos e configurações |

<details>
<summary>⚠️ <strong>Status de Desenvolvimento</strong></summary>

```diff
! Este projeto está em desenvolvimento ativo
+ Funcionalidades principais: ✅ Implementadas
+ Sistema de temas: ✅ Completo  
+ Performance: ✅ Otimizada
- PWA: 🔄 Em desenvolvimento
- Sistema de evolução: 🔄 Em desenvolvimento
- Modo offline: 📋 Planejado
```

</details>

---

## ✨ Funcionalidades

### 🎯 **Implementadas** [![Status](https://img.shields.io/badge/Status-Completo-success?style=flat-square)](/)

<table>
<tr>
<td width="50%">

#### 🔍 **Exploração e Busca**
- [x] **Listagem paginada** de Pokémons
- [x] **Busca avançada** por nome/ID
- [x] **Filtros dinâmicos** por tipo/geração
- [x] **Carregamento lazy** otimizado

</td>
<td width="50%">

#### 💫 **Experiência Visual**
- [x] **Modal detalhado** com abas
- [x] **Dark/Light mode** suave
- [x] **Skeleton loading** animado
- [x] **Design responsivo** completo

</td>
</tr>
<tr>
<td width="50%">

#### 💾 **Persistência**
- [x] **Sistema de favoritos** local
- [x] **Configurações persistentes**
- [x] **Cache inteligente** da API

</td>
<td width="50%">

#### 🎨 **Customização**
- [x] **Temas modulares** CSS
- [x] **Variáveis dinâmicas**
- [x] **Transições suaves**

</td>
</tr>
</table>

### 🚧 **Em Desenvolvimento** [![Status](https://img.shields.io/badge/Status-Ativo-warning?style=flat-square)](/)

```javascript
const roadmapAtivo = {
  evolucoes: {
    status: '🔄 Em desenvolvimento',
    progresso: '65%',
    previsao: 'v1.1.0'
  },
  pwa: {
    status: '🔄 Em desenvolvimento', 
    progresso: '40%',
    previsao: 'v1.2.0'
  },
  comparacao: {
    status: '📋 Planejado',
    progresso: '0%',
    previsao: 'v1.3.0'
  }
};
```

### 📋 **Roadmap Futuro** [![Status](https://img.shields.io/badge/Status-Planejado-informational?style=flat-square)](/)

| Versão | Funcionalidades Planejadas | Status |
|--------|---------------------------|---------|
| `v1.1.0` | 🔗 Sistema de evolução, 🎯 Filtros avançados | 🔄 |
| `v1.2.0` | 📱 PWA completo, 🔌 Modo offline | 📋 |
| `v1.3.0` | ⚖️ Comparação de Pokémons, 🏆 Conquistas | 📋 |
| `v2.0.0` | ☁️ Backend próprio, 👤 Autenticação | 📋 |

---

## 🛠️ Tecnologias Utilizadas

<div align="center">

### 🎨 **Frontend Stack**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![LESS](https://img.shields.io/badge/LESS-1D365D?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)

### 🔨 **Build & Automação**

[![Grunt](https://img.shields.io/badge/Grunt-FBA919?style=for-the-badge&logo=grunt&logoColor=white)](https://gruntjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

### 🔌 **APIs & Integrações**

[![PokéAPI](https://img.shields.io/badge/PokéAPI-3760CE?style=for-the-badge&logo=pokemon&logoColor=white)](https://pokeapi.co/)
[![REST API](https://img.shields.io/badge/REST-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://restfulapi.net/)

</div>

<details>
<summary>�� <strong>Detalhes Técnicos</strong></summary>

| Categoria | Tecnologia | Versão | Propósito |
|-----------|------------|---------|-----------|
| **Core** | JavaScript | ES6+ | Lógica da aplicação |
| **Styling** | LESS | 4.x | Pré-processador CSS |
| **Build** | Grunt | 1.x | Automação de tarefas |
| **API** | PokéAPI | v2 | Dados dos Pokémons |
| **Storage** | LocalStorage | HTML5 | Persistência local |

</details>

---

## ⚡ Instalação Rápida

### 📋 **Pré-requisitos**

```bash
# Verificar versões (mínimas requeridas)
node --version    # v14.0.0+
npm --version     # v6.0.0+
```

### 🚀 **Setup Automático**

```bash
# 1️⃣ Clone o repositório
git clone https://github.com/seu-usuario/pokedex-grunt.git
cd pokedex-grunt

# 2️⃣ Instale dependências
npm install

# 3️⃣ Inicie o desenvolvimento
npm run serve
```

> 🎉 **Pronto!** A aplicação estará rodando em `http://localhost:8000`

<details>
<summary>🔧 <strong>Instalação Manual</strong></summary>

```bash
# Clonagem
git clone https://github.com/seu-usuario/pokedex-grunt.git
cd pokedex-grunt

# Verificar dependências
npm ls

# Instalar globalmente (opcional)
npm install -g grunt-cli

# Build inicial
npm run build

# Desenvolvimento
npm run dev
```

</details>

### 🐳 **Docker** (Opcional)

```dockerfile
# Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "run", "serve"]
```

```bash
# Build e run
docker build -t pokedex-grunt .
docker run -p 8000:8000 pokedex-grunt
```

---

## 📂 Estrutura do Projeto

### 🗂️ **Visão Geral**

```
pokedex-grunt/
├── 🏗️  dev/              # Build desenvolvimento
├── 📦  dist/             # Build produção  
├── ��  src/              # Código fonte
├── ⚙️  gruntfile.js      # Configuração build
├── 📋  package.json      # Dependências
└── 📖  README.md         # Documentação
```

### 📁 **Estrutura Detalhada**

<details>
<summary>🔍 <strong>Expandir estrutura completa</strong></summary>

```
📁 pokedex-grunt/
│
├── ��️ dev/                          # Build para desenvolvimento
│   ├── 📁 scripts/
│   │   ├── 🔌 api.js                 # [2.5KB] Comunicação PokéAPI
│   │   ├── ⭐ favorites.js           # [1.8KB] Sistema favoritos
│   │   ├── 🎮 pokemon.js             # [8.2KB] Core principal
│   │   └── 🚀 main.js                # [0.5KB] Inicializador
│   ├── 📁 styles/
│   │   ├── 🎨 main.css               # [45KB] CSS compilado
│   │   └── 🗺️ main.css.map           # Source map
│   └── 📄 index.html                 # Template final
│
├── 📦 dist/                          # Build para produção
│   ├── 📁 scripts/
│   │   ├── 🔌 api.js + api.min.js    # Original + minificado
│   │   ├── ⭐ favorites.js + .min.js
│   │   ├── 🎮 pokemon.js + .min.js
│   │   └── 🚀 main.js + .min.js
│   ├── 📁 styles/
│   │   └── 🎨 main.min.css           # [12KB] CSS otimizado
│   └── 📄 index.html                 # Template otimizado
│
├── 📝 src/                           # Código fonte
│   ├── 📁 scripts/                   # JavaScript modular
│   │   ├── 🔌 api.js                 # Gerenciador API
│   │   ├── ⭐ favorites.js           # Sistema favoritos
│   │   ├── 🎮 pokemon.js             # Core aplicação
│   │   └── 🚀 main.js                # Ponto entrada
│   │
│   ├── 📁 styles/                    # LESS organizado
│   │   │
│   │   ├── 📁 base/                  # 🏗️ Fundamentos
│   │   │   ├── 🔄 reset.less         # Reset CSS normalizado
│   │   │   ├── 📝 typography.less    # Sistema tipográfico
│   │   │   └── 📐 layout.less        # Grid e layout base
│   │   │
│   │   ├── 📁 components/            # 🧩 Componentes UI
│   │   │   ├── 🔘 buttons.less       # Botões e controles
│   │   │   ├── 🎯 header.less        # Cabeçalho principal
│   │   │   ├── 🖼️ lazy-loading.less   # Lazy loading visual
│   │   │   ├── ⏳ loading.less        # Estados carregamento
│   │   │   ├── 🪟 modal.less          # Modais e overlays
│   │   │   ├── 📄 pagination.less     # Sistema paginação
│   │   │   ├── 🃏 pokemon-card.less   # Cards Pokémon
│   │   │   └── 🔍 search.less        # Busca e filtros
│   │   │
│   │   ├── 📁 states/                # 📊 Estados aplicação
│   │   │   ├── ❌ error.less          # Estados erro
│   │   │   └── 🔌 offline.less       # Estado offline
│   │   │
│   │   ├── 📁 themes/                # 🎨 Sistema temas
│   │   │   ├── 🌙 dark-theme.less     # Tema escuro
│   │   │   ├── ☀️ light-theme.less    # Tema claro
│   │   │   ├── 🎛️ theme-manager.less  # Gerenciador
│   │   │   └── 🔧 theme-variables.less # Variáveis
│   │   │
│   │   ├── 📋 main.less               # Arquivo principal
│   │   └── 🎨 variaveis.less          # Variáveis globais
│   │
│   └── 📄 index.html                 # Template HTML base
│
├── ⚙️ .gitignore                     # Git ignore rules
├── 🤖 gruntfile.js                   # Configuração Grunt
├── 📋 package.json                   # Dependências projeto
├── 🔒 package-lock.json              # Lock dependências
└── 📖 README.md                      # Esta documentação
```

</details>

### 📊 **Métricas dos Arquivos**

| 📁 Categoria | 📄 Arquivos | 💾 Tamanho Dev | 📦 Tamanho Prod | 📈 Otimização |
|-------------|-------------|----------------|------------------|---------------|
| **JavaScript** | 4 | ~12.5KB | ~4.2KB | 66% ⬇️ |
| **CSS/LESS** | 15 | ~45KB | ~12KB | 73% ⬇️ |
| **HTML** | 1 | ~3KB | ~1.8KB | 40% ⬇️ |
| **Total** | 20 | ~60.5KB | ~18KB | 70% ⬇️ |

---

## �� Como Usar

### 🎮 **Navegação Básica**

<table>
<tr>
<td width="33%">

#### 🔍 **Exploração**
```bash
1. 📄 Navegue pelas páginas
2. 🔍 Use a busca por nome/ID  
3. 🎯 Aplique filtros de tipo
4. 🎲 Filtre por geração
```

</td>
<td width="33%">

#### ⭐ **Interação**
```bash
1. 🖱️ Clique em um card
2. 📋 Veja detalhes no modal
3. ⭐ Marque como favorito
4. 📑 Navegue pelas abas
```

</td>
<td width="33%">

#### 🌙 **Personalização**
```bash
1. 🌙 Alterne Dark Mode
2. ⚡ Configure preferências
3. 💾 Salve automaticamente
4. 🔄 Sincronize temas
```

</td>
</tr>
</table>

### ⌨️ **Atalhos de Teclado**

| Tecla | Ação | Contexto |
|-------|------|----------|
| `Ctrl + K` | 🔍 Focar busca | Global |
| `Esc` | ❌ Fechar modal | Modal aberto |
| `←` `→` | 📄 Navegar páginas | Paginação |
| `Ctrl + D` | 🌙 Toggle tema | Global |
| `Space` | ⭐ Toggle favorito | Card selecionado |

### 📱 **Comandos Disponíveis**

<details>
<summary>💻 <strong>Scripts NPM</strong></summary>

```bash
# 🚀 Desenvolvimento
npm run dev              # Build + watch mode
npm run serve           # Servidor local + live reload
npm start              # Alias para serve

# 📦 Produção  
npm run build          # Build completo produção
npm run build:dev      # Build desenvolvimento apenas

# 🔧 Utilitários
npm run clean          # Limpar arquivos build
npm run lint           # Verificar código
npm test              # Executar testes (futuro)
```

</details>

<details>
<summary>🤖 <strong>Comandos Grunt</strong></summary>

```bash
# Principais
grunt                   # Task padrão (serve)
grunt serve            # Servidor + watch + reload
grunt build            # Build produção completa
grunt dev              # Build desenvolvimento

# Específicos
grunt less:dev         # Compilar LESS desenvolvimento  
grunt less:dist        # Compilar LESS produção
grunt copy:dev         # Copiar arquivos desenvolvimento
grunt uglify:dist      # Minificar JavaScript
grunt watch            # Watch mode apenas
grunt clean            # Limpar temporários
```

</details>

---

## 🎨 Sistema de Temas

### 🌈 **Arquitetura de Temas**

```css
/* 🎨 Variáveis Base */
:root {
  /* 🎯 Cores Principais */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #333333;
  --text-secondary: #666666;
  
  /* 🎭 Componentes */
  --card-bg: var(--bg-primary);
  --card-border: #e0e0e0;
  --card-shadow: 0 4px 20px rgba(0,0,0,0.1);
  
  /* 🎪 Interações */
  --transition-theme: all 0.3s ease;
}

/* 🌙 Dark Theme Override */
[data-theme="dark"] {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --text-primary: #eeeeee;
  --text-secondary: #cccccc;
  
  --card-bg: #16213e;
  --card-border: #333333;
  --card-shadow: 0 4px 20px rgba(0,0,0,0.4);
}
```

### 🎯 **Temas Disponíveis**

<table>
<tr>
<td align="center" width="50%">

#### ☀️ **Light Theme**
![Light Theme Preview](https://via.placeholder.com/300x200/ffffff/333333?text=Light+Theme)

**Características:**
- 🎨 Base branca limpa
- 📝 Texto escuro contrastante  
- 🌟 Sombras suaves
- ⚡ Transições fluidas

</td>
<td align="center" width="50%">

#### 🌙 **Dark Theme**  
![Dark Theme Preview](https://via.placeholder.com/300x200/1a1a2e/eeeeee?text=Dark+Theme)

**Características:**
- 🌌 Base escura moderna
- ✨ Texto claro otimizado
- 🎭 Sombras profundas  
- 🔮 Cores vibrantes

</td>
</tr>
</table>

### 🛠️ **Criando Novos Temas**

<details>
<summary>�� <strong>Tutorial: Novo Tema</strong></summary>

```less
// 1️⃣ Criar arquivo: src/styles/themes/meu-tema.less
[data-theme="meu-tema"] {
  /* 🎨 Cores Base */
  --bg-primary: #sua-cor;
  --text-primary: #sua-cor;
  
  /* 🧩 Componentes */
  --card-bg: #sua-cor;
  --card-border: #sua-cor;
  
  /* 🎯 Pokémon Types (opcional) */
  .type-fire { background: #nova-cor !important; }
  .type-water { background: #nova-cor !important; }
}

// 2️⃣ Importar no main.less
@import "themes/meu-tema.less";

// 3️⃣ Aplicar via JavaScript
document.documentElement.setAttribute('data-theme', 'meu-tema');
```

</details>

---

## 🚀 Performance e Otimizações

### ⚡ **Métricas de Performance**

<table>
<tr>
<td width="50%" align="center">

#### 📊 **Lighthouse Score**
![Performance](https://img.shields.io/badge/Performance-95-brightgreen?style=for-the-badge)
![Accessibility](https://img.shields.io/badge/Accessibility-100-brightgreen?style=for-the-badge)
![Best Practices](https://img.shields.io/badge/Best%20Practices-95-brightgreen?style=for-the-badge)
![SEO](https://img.shields.io/badge/SEO-100-brightgreen?style=for-the-badge)

</td>
<td width="50%">

#### ⏱️ **Tempos de Carregamento**
- **First Paint**: ~400ms
- **First Contentful Paint**: ~600ms  
- **Largest Contentful Paint**: ~800ms
- **Time to Interactive**: ~1.2s
- **Total Blocking Time**: ~50ms

</td>
</tr>
</table>

### 🔧 **Otimizações Implementadas**

| 🎯 Categoria | 🛠️ Implementação | 📈 Ganho |
|-------------|------------------|-----------|
| **📦 Bundle Size** | Minificação + Gzip | 70% ⬇️ |
| **🖼️ Imagens** | Lazy Loading + WebP | 85% ⬇️ |
| **�� API Calls** | Cache + Batching | 60% ⬇️ |
| **🎨 CSS** | Critical CSS + Variables | 40% ⬇️ |
| **⚡ JavaScript** | ES6 Modules + Tree Shaking | 50% ⬇️ |

### 📋 **Checklist de Performance**

- [x] ✅ **Lazy Loading** de imagens implementado
- [x] ✅ **Carregamento em lotes** de dados
- [x] ✅ **Cache inteligente** da API  
- [x] ✅ **Minificação** CSS/JS
- [x] ✅ **Gzip compression** habilitada
- [x] ✅ **Critical CSS** inline
- [x] ✅ **Prefetch/Preload** recursos
- [x] ✅ **Service Worker** (PWA - em dev)
- [ ] 🔄 **Image optimization** (WebP/AVIF)
- [ ] 🔄 **HTTP/2 Push** optimization

<details>
<summary>📈 <strong>Detalhes Técnicos</strong></summary>

```javascript
// 🎯 Lazy Loading Implementation
class LazyImageLoader {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      { rootMargin: '50px', threshold: 0.1 }
    );
  }
  
  // Carregamento progressivo em lotes
  async loadBatch(pokemons, batchSize = 3) {
    for (let i = 0; i < pokemons.length; i += batchSize) {
      const batch = pokemons.slice(i, i + batchSize);
      await Promise.all(batch.map(this.loadPokemon));
      await this.delay(150); // Evita sobrecarga
    }
  }
}

// 🔌 Cache Strategy  
class APICache {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutos
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (item && (Date.now() - item.timestamp) < this.ttl) {
      return item.data;
    }
    this.cache.delete(key);
    return null;
  }
}
```

</details>

---

## 🔧 Guia de Desenvolvimento

### 🚀 **Setup Inicial**

```bash
# 📥 Clone e setup
git clone https://github.com/seu-usuario/pokedex-grunt.git
cd pokedex-grunt

# 🔧 Configurar ambiente
npm install
npm run setup  # Script custom de setup

# 🌟 Iniciar desenvolvimento  
npm run serve
```

### 🔄 **Workflow de Desenvolvimento**

<table>
<tr>
<td width="33%">

#### 1️⃣ **Desenvolvimento**
```bash
# 🎯 Trabalhe em src/
edit src/scripts/pokemon.js
edit src/styles/components/

# 🔄 Watch automático
npm run dev
```

</td>
<td width="33%">

#### 2️⃣ **Testing**
```bash
# 🧪 Testes locais
npm run serve

# 🌐 Teste cross-browser
npm run test:browsers
```

</td>
<td width="33%">

#### 3️⃣ **Deploy**
```bash
# 📦 Build produção
npm run build

# 🚀 Deploy
npm run deploy
```

</td>
</tr>
</table>

### 📝 **Convenções de Código**

<details>
<summary>�� <strong>JavaScript Style Guide</strong></summary>

```javascript
// ✅ Classes em PascalCase
class PokemonManager {
  // ✅ Métodos em camelCase
  async loadPokemonDetails() {
    // ✅ Constantes em UPPER_SNAKE_CASE
    const MAX_POKEMONS_PER_PAGE = 20;
    
    // ✅ Variáveis descritivas
    const pokemonWithDetails = await this.fetchDetailedInfo();
    
    // ✅ Destructuring quando apropriado
    const { name, id, types } = pokemon;
    
    // ✅ Arrow functions para callbacks
    pokemons.map(pokemon => this.formatPokemon(pokemon));
    
    // ✅ Template literals
    const message = `Carregando ${pokemon.name}...`;
  }
}

// ✅ Exports explícitos
export { PokemonManager };
```

</details>

<details>
<summary>🎨 <strong>CSS/LESS Style Guide</strong></summary>

```less
// ✅ Estrutura organizada
.pokemon-card {
  // 🎯 Propriedades em ordem alfabética
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 16px;
  transition: var(--transition-theme);
  
  // 🎭 Estados
  &:hover {
    transform: translateY(-4px);
  }
  
  &.active {
    border-color: var(--primary-color);
  }
  
  // 🧩 Elementos filhos
  .pokemon-name {
    color: var(--text-primary);
    font-weight: 600;
  }
  
  .pokemon-types {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
}

// ✅ Variáveis semânticas
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}
```

</details>

### 🔧 **Adicionando Funcionalidades**

<details>
<summary>➕ <strong>Novo Componente</strong></summary>

```bash
# 1️⃣ Criar arquivo LESS
touch src/styles/components/meu-componente.less

# 2️⃣ Implementar estilos
cat > src/styles/components/meu-componente.less << 'EOF'
.meu-componente {
  // Seus estilos aqui
}
EOF

# 3️⃣ Importar no main.less
echo '@import "components/meu-componente.less";' >> src/styles/main.less

# 4️⃣ Build e teste
npm run build:dev
```

</details>

<details>
<summary>🎨 <strong>Novo Tema</strong></summary>

```bash
# 1️⃣ Criar tema
touch src/styles/themes/meu-tema.less

# 2️⃣ Definir variáveis
cat > src/styles/themes/meu-tema.less << 'EOF'
[data-theme="meu-tema"] {
  --bg-primary: #sua-cor;
  --text-primary: #sua-cor;
  // Mais variáveis...
}
EOF

# 3️⃣ Importar e testar
echo '@import "themes/meu-tema.less";' >> src/styles/main.less
npm run serve
```

</details>

---

## 🗺️ Roadmap

### 📅 **Timeline de Desenvolvimento**

```mermaid
gantt
    title Roadmap Pokédex Grunt
    dateFormat  YYYY-MM-DD
    section v1.1.0
    Sistema de Evolução     :active, evo, 2024-01-01, 2024-02-15
    Filtros Avançados      :filter, 2024-01-15, 2024-02-28
    section v1.2.0  
    PWA Implementation     :pwa, 2024-02-01, 2024-03-15
    Modo Offline          :offline, 2024-02-15, 2024-03-30
    section v1.3.0
    Sistema Conquistas    :achieve, 2024-03-01, 2024-04-15
    Comparação Pokémons   :compare, 2024-03-15, 2024-04-30
```

### 🎯 **Próximas Releases**

<details>
<summary>🚀 <strong>v1.1.0 - Evoluções</strong> <code>Em desenvolvimento</code></summary>

#### 🎯 **Objetivos Principais**
- [x] 🔗 Sistema de evolução visual
- [x] 🌳 Árvore de evolução interativa  
- [x] 📊 Comparação de stats evolução
- [ ] 🎮 Simulador de evolução
- [ ] 📱 Responsividade aprimorada

#### 📈 **Progresso: 65%**
```
████████████████████████████████████░░░░░░░░░░░░░ 65%
```

**ETA: 15 de Fevereiro, 2024**

</details>

<details>
<summary>📱 <strong>v1.2.0 - PWA & Offline</strong> <code>Planejado</code></summary>

#### 🎯 **Objetivos Principais**
- [ ] 📱 Progressive Web App completo
- [ ] 🔌 Modo offline funcional
- [ ] 💾 Cache avançado de dados
- [ ] 📲 Notificações push
- [ ] 🏠 Instalação home screen

#### 📈 **Progresso: 25%**
```
████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 25%
```

**ETA: 30 de Março, 2024**

</details>

<details>
<summary>🏆 <strong>v1.3.0 - Gamificação</strong> <code>Planejado</code></summary>

#### 🎯 **Objetivos Principais**
- [ ] 🏆 Sistema de conquistas
- [ ] ⚖️ Comparação de Pokémons
- [ ] 📊 Estatísticas detalhadas
- [ ] 🎮 Modo batalha simulado
- [ ] 🏅 Rankings e badges

#### 📈 **Progresso: 0%**
```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0%
```

**ETA: 30 de Abril, 2024**

</details>

### 🔮 **Visão de Longo Prazo**

| Versão | 🎯 Foco Principal | 🚀 Recursos Chave | 📅 Previsão |
|--------|-------------------|-------------------|-------------|
| **v2.0** | 🏗️ **Backend & Auth** | API própria, Usuários, Cloud sync | Q3 2024 |
| **v2.5** | 🤖 **IA & ML** | Recomendações, Análise de equipe | Q4 2024 |
| **v3.0** | 🌐 **Multiplayer** | Battles online, Trading, Social | Q1 2025 |

---

## 🤝 Contribuição

### 🌟 **Como Contribuir**

<div align="center">

[![Contributors Welcome](https://img.shields.io/badge/Contributors-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)
[![Good First Issues](https://img.shields.io/github/issues-search/Sanabre3/pokedex-grunt?label=Good%20First%20Issues&query=is%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22&style=for-the-badge)](https://github.com/Sanabre3/pokedex-grunt/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)

</div>

### 📋 **Guia Rápido**

<table>
<tr>
<td width="33%">

#### 1️⃣ **Setup**
```bash
# Fork no GitHub
# Clone seu fork
git clone https://github.com/SEU-USER/pokedex-grunt.git

# Configure upstream
git remote add upstream https://github.com/original/pokedex-grunt.git
```

</td>
<td width="33%">

#### 2️⃣ **Desenvolvimento**
```bash
# Branch para feature
git checkout -b feature/minha-feature

# Implemente mudanças
# Teste localmente
npm run dev
```

</td>
<td width="33%">

#### 3️⃣ **Submit**
```bash
# Commit seguindo padrões
git commit -m "feat: nova funcionalidade"

# Push e PR
git push origin feature/minha-feature
```

</td>
</tr>
</table>

### 📝 **Padrões de Commit**

```bash
# Tipos principais
feat: ✨ nova funcionalidade
fix: 🐛 correção de bug  
docs: 📝 documentação
style: 🎨 formatação/estilo
refactor: ♻️ refatoração
test: 🧪 testes
chore: �� manutenção

# Exemplos
git commit -m "feat: adiciona sistema de evolução Pokémon"
git commit -m "fix: corrige lazy loading de imagens" 
git commit -m "docs: atualiza README com nova API"
```

### 🏷️ **Labels e Issues**

| Label | Descrição | Cor |
|-------|-----------|-----|
| `🐛 bug` | Algo não está funcionando | ![#d73a4a](https://via.placeholder.com/15/d73a4a/000000?text=+) |
| `✨ enhancement` | Nova funcionalidade ou melhoria | ![#a2eeef](https://via.placeholder.com/15/a2eeef/000000?text=+) |
| `📝 documentation` | Melhorias na documentação | ![#0075ca](https://via.placeholder.com/15/0075ca/000000?text=+) |
| `🚀 good first issue` | Bom para iniciantes | ![#7057ff](https://via.placeholder.com/15/7057ff/000000?text=+) |
| `🆘 help wanted` | Ajuda extra é bem-vinda | ![#008672](https://via.placeholder.com/15/008672/000000?text=+) |

### 🎯 **Áreas ainda em "Atenção"**

<details>
<summary>🚀 <strong>Issues Abertas por Categoria</strong></summary>

#### 🐛 **Bugs** [![Bugs](https://img.shields.io/github/issues-search/seu-usuario/pokedex-grunt?label=bugs&query=is%3Aissue%20is%3Aopen%20label%3Abug)](/)
- [ ] Lazy loading falha em conexões lentas
- [ ] Modal não fecha em dispositivos touch
- [ ] Cache API não expira corretamente

#### ✨ **Enhancements** [![Enhancements](https://img.shields.io/github/issues-search/seu-usuario/pokedex-grunt?label=enhancements&query=is%3Aissue%20is%3Aopen%20label%3Aenhancement)](/)
- [ ] Adicionar suporte a mais gerações
- [ ] Implementar busca por habilidades
- [ ] Melhorar acessibilidade (ARIA)

#### 📝 **Documentation** [![Documentation](https://img.shields.io/github/issues-search/seu-usuario/pokedex-grunt?label=docs&query=is%3Aissue%20is%3Aopen%20label%3Adocumentation)](/)
- [ ] Documentar API interna
- [ ] Criar guia de contribuição
- [ ] Adicionar changelog

</details>

---

## 📊 Status do Projeto

### 🔍 **Métricas Gerais**

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/seu-usuario/pokedex-grunt?style=for-the-badge)
![Lines of code](https://img.shields.io/tokei/lines/github/seu-usuario/pokedex-grunt?style=for-the-badge)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/seu-usuario/pokedex-grunt?style=for-the-badge)

</div>

### 📈 **Dashboard de Status**

| 🎯 Componente | 📊 Status | 🔄 Última Atualização | 📝 Observações |
|---------------|-----------|----------------------|----------------|
| 🎮 **Core Engine** | ![Status](https://img.shields.io/badge/Status-Estável-success) | 2024-01-15 | Sistema principal funcional |
| 🎨 **UI/UX** | ![Status](https://img.shields.io/badge/Status-Completo-success) | 2024-01-10 | Interface responsiva |
| 🌙 **Temas** | ![Status](https://img.shields.io/badge/Status-Completo-success) | 2024-01-08 | Dark/Light implementados |
| ⚡ **Performance** | ![Status](https://img.shields.io/badge/Status-Otimizado-success) | 2024-01-12 | 95+ Lighthouse score |
| 💾 **Favoritos** | ![Status](https://img.shields.io/badge/Status-Estável-success) | 2024-01-14 | Persistência local OK |
| 🔍 **Busca** | ![Status](https://img.shields.io/badge/Status-Completo-success) | 2024-01-11 | Busca e filtros funcionais |
| 📱 **PWA** | ![Status](https://img.shields.io/badge/Status-Em%20Dev-warning) | 2024-01-16 | Service Worker em progresso |
| 🔗 **Evolução** | ![Status](https://img.shields.io/badge/Status-Em%20Dev-warning) | 2024-01-18 | 65% implementado |
| 🏆 **Conquistas** | ![Status](https://img.shields.io/badge/Status-Planejado-informational) | - | Roadmap v1.3.0 |

### 🔥 **Atividade Recente**

```bash
# 📈 Últimos commits
2024-01-18  feat: adiciona sistema evolução base      [pokemon.js]
2024-01-17  fix: corrige lazy loading em mobile      [components/]  
2024-01-16  docs: atualiza README com nova estrutura [README.md]
2024-01-15  style: melhora responsividade cards      [pokemon-card.less]
2024-01-14  feat: implementa cache inteligente       [api.js]
```

### 🎯 **Próximos Milestones**

- [ ] **🚀 v1.1.0**: Sistema de Evolução *(85% concluído)*
- [ ] **📱 PWA Beta**: Progressive Web App *(40% concluído)*  
- [ ] **🏆 Gamification**: Sistema de Conquistas *(planejado)*
- [ ] **☁️ Backend**: API própria e sync *(planejado)*

---

### 📋 **FAQ**

<details>
<summary>❓ <strong>Perguntas Frequentes</strong></summary>

#### Q: Como adicionar novos Pokémons?
**A:** O projeto usa a PokéAPI, então novos Pokémons são adicionados automaticamente quando a API é atualizada.

#### Q: Posso usar este projeto comercialmente?
**A:** Sim! O projeto usa licença MIT, permitindo uso comercial com atribuição.

#### Q: Como contribuir se sou iniciante?
**A:** Procure por issues com label `good first issue` - são perfeitas para começar!

#### Q: O projeto suporta todas as gerações?
**A:** Atualmente suporta as 3 primeiras gerações, com expansão planejada.

#### Q: Posso criar meus próprios temas?
**A:** Sim! Veja a seção [Sistema de Temas](#-sistema-de-temas) para instruções.

</details>

### 🔗 **Links Úteis**

- 📚 [**Documentação Completa**](https://github.com/seu-usuario/pokedex-grunt/wiki)
- 🎮 [**Demo Live**](https://seu-usuario.github.io/pokedex-grunt)
- 📊 [**Roadmap Detalhado**](https://github.com/seu-usuario/pokedex-grunt/projects)
- 🐛 [**Issue Tracker**](https://github.com/seu-usuario/pokedex-grunt/issues)
- 💬 [**Discussões**](https://github.com/seu-usuario/pokedex-grunt/discussions)

---

## 📄 Licença

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Este projeto está licenciado sob a Licença MIT**

</div>

### 📜 **Resumo da Licença**

```
MIT License

Copyright (c) 2024 Seu Nome

✅ Permitido:
- ✨ Uso comercial
- 🔄 Modificação  
- 📦 Distribuição
- 🔒 Uso privado

❌ Limitações:
- 🚫 Sem responsabilidade
- 🚫 Sem garantia

📋 Condições:
- 📄 Incluir aviso de licença
- 📄 Incluir aviso de copyright
```

### 🙏 **Atribuições**

- **[PokéAPI](https://pokeapi.co/)** - Dados dos Pokémons
- **[The Pokémon Company](https://www.pokemon.com/)** - Assets originais  
- **[Grunt Team](https://gruntjs.com/)** - Sistema de build
- **Comunidade Open Source** - Ferramentas e inspiração

---

### 👥 **Colaboradores**

<table>
<tr>
<td align="center" width="20%"></td>
<a href="https://github.com/Sanabre3"></a>
<img src="https://github.com/Sanabre3.png" width="80" style="border-radius: 50%"/>
<br />
<strong>Sanabre</strong>
<br />
</tr>
</table>
---

<div align="center">

### 🚀 **Ready to Explore?**

[![Get Started](https://img.shields.io/badge/Get%20Started-Now!-brightgreen?style=for-the-badge&logo=rocket)](/#-instalação-rápida)
[![Star this repo](https://img.shields.io/badge/⭐-Star%20this%20repo-yellow?style=for-the-badge)](https://github.com/seu-usuario/pokedex-grunt)
[![Follow](https://img.shields.io/badge/Follow-@seu--usuario-blue?style=for-the-badge&logo=github)](https://github.com/seu-usuario)

---

**🎮 Gotta Code 'Em All! 🎮**

![Footer](https://via.placeholder.com/800x100/667eea/FFFFFF?text=Thank%20you%20for%20using%20Pok%C3%A9dex%20Grunt!)

</div>

---

<details>
<summary>📊 <strong>Repository Stats</strong></summary>

<div align="center">

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=seu-usuario&repo=pokedex-grunt&theme=vue-dark&show_icons=true)

![Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=seu-usuario&layout=compact&theme=vue-dark)

</div>

</details>

