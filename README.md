# 🎮 Pokédex Grunt

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=180&section=header&text=Pok%C3%A9dex%20Grunt&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Uma%20Pok%C3%A9dex%20moderna%20com%20Grunt%2C%20Pok%C3%A9API%20e%20checkout%20em%20teste&descAlignY=55&descSize=15" alt="Pokédex Grunt Header"/>

[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge&logo=github)](https://github.com/Sanabre3/pokedex-grunt)
[![Version](https://img.shields.io/badge/Version-1.0.0--beta-orange?style=for-the-badge&logo=semver)](https://github.com/Sanabre3/pokedex-grunt/releases)
[![Build](https://img.shields.io/badge/Build-Grunt-FBA919?style=for-the-badge&logo=grunt&logoColor=white)](https://gruntjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![LESS](https://img.shields.io/badge/LESS-Modular-1D365D?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)

**Uma Pokédex interativa construída com JavaScript Vanilla, Grunt e PokéAPI**

[📖 Documentação Completa](docs/DOCUMENTACAO.md) • [⚡ Instalação](#-instalação-rápida) • [✨ Funcionalidades](#-funcionalidades) • [🛠️ Estrutura](#-estrutura-do-projeto)

</div>

---

## 🛠️ Índice

<details>
<summary>📋 Navegação Rápida</summary>

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias-utilizadas)
- [⚡ Instalação Rápida](#-instalação-rápida)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🎮 Como Usar](#-como-usar)
- [🧪 Checkout de Teste](#-checkout-de-teste)
- [🔧 Scripts Disponíveis](#-scripts-disponíveis)
- [📚 Documentação](#-documentação)
- [🗺️ Roadmap](#️-roadmap)

</details>

---

## 🎯 Sobre o Projeto

> **Uma experiência Pokémon moderna com foco em interface, performance e organização de build**

A **Pokédex Grunt** é uma aplicação web que consome a [PokéAPI](https://pokeapi.co/) para listar Pokémons, buscar por nome ou ID, filtrar resultados, abrir detalhes em modal, salvar favoritos localmente e testar um fluxo de compra com Google Pay em ambiente `TEST`.

---

## 🖼️ Preview em Breve

<div align="center">

> Screenshots e GIFs serão adicionados em breve.

### 🌟 Fluxos que já estão implementados

- Listagem paginada de Pokémons
- Busca por nome ou ID
- Filtros por tipo e geração
- Modal com detalhes completos
- Favoritos com persistência local
- Alternância entre tema claro e escuro
- Compra com Google Pay em modo teste

</div>

### 🛠️ Principais Diferenciais

| 🌟 Recurso | 📝 Descrição |
|------------|--------------|
| **🚀 Performance** | Lazy loading de imagens e carregamento progressivo de detalhes |
| **🎨 Temas** | Alternância entre tema claro e escuro com persistência |
| **💾 Persistência** | Favoritos, tema e compras de teste salvos no navegador |
| **⚡ Build automatizado** | Pipeline com Grunt para desenvolvimento e produção |
| **🛒 Checkout experimental** | Fluxo de compra por Pokémon com Google Pay em modo teste |

<details>
<summary>⚠️ <strong>Status Atual</strong></summary>

```diff
! Projeto em evolução contínua
+ Listagem, filtros, modal e favoritos: ✅ Implementados
+ Sistema de temas e estilos modulares: ✅ Implementados
+ Checkout de compra em modo TEST: ✅ Implementado
- Integração de pagamento em produção: 🔄 Pendente
- Testes automatizados: 📋 Não implementados
```

</details>

---

## ✨ Funcionalidades

### 🎯 **Implementadas**

<table>
<tr>
<td width="50%">

#### 🔍 **Exploração**
- [x] Listagem paginada de Pokémons
- [x] Busca por nome ou ID
- [x] Filtro por tipo
- [x] Filtro por geração

</td>
<td width="50%">

#### 💫 **Experiência Visual**
- [x] Modal com detalhes do Pokémon
- [x] Abas de estatísticas, habilidades e movimentos
- [x] Skeleton loading e lazy loading
- [x] Interface responsiva

</td>
</tr>
<tr>
<td width="50%">

#### 💾 **Persistência Local**
- [x] Favoritos com `localStorage`
- [x] Tema persistido
- [x] Registro de compras simuladas
- [x] Cache simples da PokéAPI

</td>
<td width="50%">

#### 🛒 **Compra por Pokémon**
- [x] Preço dinâmico por card
- [x] Botão `Comprar` em cada Pokémon
- [x] Checkout no modal com Google Pay `TEST`
- [x] Feedback de status da compra

</td>
</tr>
</table>

### 🧪 **Fluxo Atual de Compra**

```javascript
const compraTeste = {
  ambiente: 'TEST',
  provedor: 'Google Pay API for Web',
  tokenizacao: 'PAYMENT_GATEWAY',
  gateway: 'example',
  persistencia: 'localStorage',
  objetivo: 'validar a jornada de compra por Pokemon'
};
```

---

## 🛠️ Tecnologias Utilizadas

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![LESS](https://img.shields.io/badge/LESS-1D365D?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)
[![Grunt](https://img.shields.io/badge/Grunt-FBA919?style=for-the-badge&logo=grunt&logoColor=white)](https://gruntjs.com/)
[![PokéAPI](https://img.shields.io/badge/Pok%C3%A9API-3760CE?style=for-the-badge&logo=pokemon&logoColor=white)](https://pokeapi.co/)
[![Google Pay](https://img.shields.io/badge/Google%20Pay-TEST-5F6368?style=for-the-badge&logo=googlepay&logoColor=white)](https://developers.google.com/pay/api)

</div>

<details>
<summary>🛠️ <strong>Detalhes Técnicos</strong></summary>

| Categoria | Tecnologia | Papel no projeto |
|-----------|------------|------------------|
| **Core** | JavaScript ES6+ | Lógica da aplicação |
| **Build** | Grunt | Compilação, cópia, replace, minificação |
| **Estilos** | LESS | Organização modular dos estilos |
| **API de dados** | PokéAPI | Dados de Pokémons, tipos e espécies |
| **Pagamento** | Google Pay Web API | Fluxo de compra em ambiente de teste |
| **Persistência** | LocalStorage | Tema, favoritos e compras |

</details>

---

## ⚡ Instalação Rápida

### 📋 **Pré-requisitos**

```bash
node --version
npm --version
```

### 🚀 **Setup**

```bash
git clone https://github.com/seu-usuario/pokedex-grunt.git
cd pokedex-grunt
npm install
npm run dev
```

> O comando `npm run dev` executa a task padrão do Grunt, que faz build de desenvolvimento, sobe o servidor local e ativa o watch.

### 🔧 **Alternativa com Grunt CLI**

```bash
npm install
npx grunt serve
```

---

## 📂 Estrutura do Projeto

### 🗂️ **Visão Geral**

```text
pokedex-grunt/
├── dev/              # Build de desenvolvimento
├── dist/             # Build de produção
├── src/              # Código-fonte
├── docs/             # Documentação complementar
├── gruntfile.js      # Pipeline de build
├── package.json      # Scripts e dependências
└── README.md         # Apresentação do projeto
```

### 📁 **Módulos Principais**

| Arquivo | Responsabilidade |
|---------|------------------|
| `src/scripts/api.js` | Consumo e cache da PokéAPI |
| `src/scripts/pokemon.js` | Renderização, modal, filtros, paginação e preços |
| `src/scripts/favorites.js` | Favoritos via `localStorage` |
| `src/scripts/purchase.js` | Google Pay `TEST` e persistência de compras |
| `src/scripts/main.js` | Inicialização global da aplicação |
| `src/styles/main.less` | Entrada principal dos estilos LESS |
| `gruntfile.js` | Build dev/dist e processamento de assets |

---

## 🎮 Como Usar

### 🔍 **Fluxo principal**

1. Abra a aplicação no navegador.
2. Navegue entre as páginas da lista.
3. Use busca por nome ou ID.
4. Aplique filtros por tipo e geração.
5. Clique em um card para abrir o modal.
6. Favorite Pokémons pela estrela no topo do card.
7. Use o botão `Comprar` para abrir o checkout de teste.

### ⭐ **Favoritos**

- O botão `Favoritos` alterna a grade entre lista geral e favoritos salvos.
- Os favoritos são persistidos no navegador do usuário.

### 🌙 **Tema**

- O botão no cabeçalho alterna entre tema claro e escuro.
- A escolha é salva em `localStorage`.

---

## 🧪 Checkout de Teste

### 💳 **Como funciona**

O projeto inclui um fluxo experimental de compra por Pokémon com a Google Pay API Web em ambiente `TEST`.

```javascript
const googlePayConfig = {
  environment: 'TEST',
  merchantName: 'Pokedex Grunt Store',
  currencyCode: 'BRL',
  countryCode: 'BR',
  gateway: 'example'
};
```

### ✅ **O que esse fluxo cobre**

- Exibição de preço no card
- Bloco de compra no modal
- Verificação de disponibilidade do Google Pay
- Abertura do `loadPaymentData()`
- Feedback visual de sucesso, cancelamento ou erro
- Persistência local das compras simuladas

### ⚠️ **Limitações importantes**

- A integração atual é apenas para teste.
- O gateway configurado é `example`.
- Não existe processamento real no backend.
- Para produção, será necessário substituir merchant e gateway por dados válidos.

---

## 🔧 Scripts Disponíveis

### 📦 **NPM Scripts Reais**

```bash
npm run dev      # Executa a task padrão do Grunt
npm run build    # Gera o build de produção
npm run watch    # Observa mudanças em src/
```

### 🤖 **Tasks do Grunt**

```bash
grunt            # default: build:dev + connect + watch
grunt dev        # build:dev + watch
grunt serve      # build:dev + connect + watch
grunt build      # build de produção
```

---

## 📚 Documentação

### 📖 **Guia Completo**

Para uma documentação mais detalhada de arquitetura, módulos, build, integração e próximos passos, consulte:

- [docs/DOCUMENTACAO.md](docs/DOCUMENTACAO.md)

---

## 🗺️ Roadmap

| Versão | Objetivo | Status |
|--------|----------|--------|
| `v1.1.0` | Melhorar arquitetura dos componentes e estados | 🔄 |
| `v1.2.0` | Evoluir experiência mobile e offline | 📋 |
| `v1.3.0` | Comparação entre Pokémons e mais filtros | 📋 |
| `v2.0.0` | Backend real e checkout produtivo | 📋 |

---

## 📄 Licença

Projeto sob licença `ISC`, conforme definido em `package.json`.

---

## 🤝 Contribuição

```bash
# 1. Faça um fork
# 2. Crie uma branch
# 3. Implemente sua melhoria
# 4. Rode o fluxo de desenvolvimento
# 5. Abra um pull request
```

Contribuições são bem-vindas especialmente em:

- refino visual da interface
- testes automatizados
- melhorias no fluxo de compra
- robustez do build e da documentação
