# 📘 Documentação da Pokédex Grunt

<div align="center">

## 🧭 Guia Técnico do Projeto

**Arquitetura, módulos, build, integração com APIs e operação do fluxo de compra em teste**

</div>

---

## 🛠️ Índice

- [🎯 Visão Geral](#-visão-geral)
- [🏗️ Arquitetura](#️-arquitetura)
- [📂 Estrutura de Pastas](#-estrutura-de-pastas)
- [🔌 Camada de Dados](#-camada-de-dados)
- [🎮 Camada de Interface](#-camada-de-interface)
- [🛒 Fluxo de Compra em Teste](#-fluxo-de-compra-em-teste)
- [🎨 Sistema de Estilos](#-sistema-de-estilos)
- [⚙️ Build com Grunt](#️-build-com-grunt)
- [💾 Persistência Local](#-persistência-local)
- [🚀 Como Executar](#-como-executar)
- [🧪 Limitações Atuais](#-limitações-atuais)
- [📌 Próximos Passos](#-próximos-passos)

---

## 🎯 Visão Geral

A **Pokédex Grunt** é uma aplicação frontend baseada em HTML, JavaScript Vanilla e LESS. O projeto consome a PokéAPI para exibir Pokémons e utiliza Grunt para preparar os artefatos de desenvolvimento e produção.

Além da navegação padrão da Pokédex, o projeto também implementa:

- busca por nome ou ID
- filtros por tipo e geração
- modal com detalhes do Pokémon
- favoritos persistidos localmente
- tema escuro/claro
- compra experimental via Google Pay em ambiente `TEST`

---

## 🏗️ Arquitetura

### 🧱 Organização por responsabilidades

O projeto é organizado de forma simples e direta:

| Camada | Arquivos | Responsabilidade |
|--------|----------|------------------|
| **Bootstrap** | `main.js` | Instancia os gerenciadores globais |
| **Dados** | `api.js` | Busca dados da PokéAPI e aplica cache |
| **Domínio/UI** | `pokemon.js` | Lista, filtros, modal, paginação e compra |
| **Persistência local** | `favorites.js`, `purchase.js` | Salva favoritos e compras |
| **Estilo** | `src/styles/**` | Componentização visual via LESS |
| **Build** | `gruntfile.js` | Gera `dev/` e `dist/` |

### 🌐 Objetos globais utilizados

Durante a inicialização, os seguintes objetos são disponibilizados em `window`:

```javascript
window.pokeAPI
window.favoritesManager
window.purchaseManager
window.pokemonManager
```

Essa decisão simplifica a comunicação entre módulos em um projeto sem bundler.

---

## 📂 Estrutura de Pastas

```text
src/
├── index.html
├── scripts/
│   ├── api.js
│   ├── favorites.js
│   ├── main.js
│   ├── pokemon.js
│   └── purchase.js
└── styles/
    ├── main.less
    ├── variaveis.less
    ├── base/
    ├── components/
    ├── states/
    └── themes/
```

### 📦 Saídas do build

| Pasta | Finalidade |
|-------|------------|
| `dev/` | Build voltado para desenvolvimento |
| `dist/` | Build minificado para produção |

---

## 🔌 Camada de Dados

### `src/scripts/api.js`

Responsável por encapsular o acesso à PokéAPI.

#### Métodos principais

| Método | Papel |
|--------|-------|
| `fetchPokemonList(limit, offset)` | Lista paginada |
| `fetchPokemon(identifier)` | Busca por ID, nome ou URL |
| `fetchPokemonTypes()` | Carrega tipos disponíveis |
| `fetchPokemonSpecies(id)` | Busca descrição da espécie |

### 🧠 Cache local em memória

O arquivo usa um `Map` para evitar requisições repetidas em curto prazo.

```javascript
this.cache = new Map();
this.cacheTimeout = 5 * 60 * 1000;
```

Esse cache cobre especialmente:

- listas paginadas
- espécies de Pokémons

---

## 🎮 Camada de Interface

### `src/scripts/pokemon.js`

Esse é o módulo principal da aplicação. Ele gerencia:

- paginação
- carregamento inicial
- busca
- filtros
- renderização dos cards
- modal de detalhes
- cálculo de preço
- acionamento do checkout

### 📄 Fluxo de listagem

```text
DOMContentLoaded
→ PokemonManager.init()
→ loadTypes()
→ loadPokemons()
→ renderPokemonGrid()
→ loadPokemonDetailsLazy()
```

### 🃏 Cards de Pokémon

Cada card exibe:

- ID
- nome
- imagem
- tipos
- estatísticas resumidas
- estrela de favorito
- preço calculado
- botão `Comprar`

### 🪟 Modal

Ao clicar no card, o modal abre com:

- imagem maior
- tipos
- descrição da espécie
- bloco de compra
- abas de estatísticas, habilidades e movimentos

---

## 🛒 Fluxo de Compra em Teste

### `src/scripts/purchase.js`

O módulo `PurchaseManager` encapsula a integração com Google Pay Web API em ambiente `TEST`.

### 🔄 Sequência atual

```text
Usuário clica em Comprar
→ modal abre
→ PurchaseManager.renderPurchaseButton()
→ Google Pay é validado com isReadyToPay()
→ botão do Google Pay é renderizado
→ loadPaymentData() é chamado
→ compra simulada é salva no localStorage
```

### ⚙️ Configuração atual

```javascript
{
  environment: 'TEST',
  merchantName: 'Pokedex Grunt Store',
  tokenizationSpecification: {
    type: 'PAYMENT_GATEWAY',
    parameters: {
      gateway: 'example',
      gatewayMerchantId: 'exampleGatewayMerchantId'
    }
  }
}
```

### ✅ O que é validado

- disponibilidade do Google Pay no navegador/perfil
- criação do botão oficial do Google Pay
- abertura da folha de pagamento
- tratamento de cancelamento
- feedback de sucesso ou erro

### ⚠️ O que ainda não existe

- backend de pagamento
- confirmação real de transação
- integração produtiva com gateway válido
- painel de histórico de compras na interface

---

## 🎨 Sistema de Estilos

### Organização do LESS

| Pasta | Papel |
|-------|-------|
| `base/` | Reset, tipografia e layout |
| `components/` | Cards, botões, modal, paginação, busca |
| `states/` | Estados de erro e offline |
| `themes/` | Tema claro e escuro |

### Entrada principal

O arquivo `src/styles/main.less` importa todos os módulos de estilo usados pela aplicação.

### Temas

O projeto usa variáveis CSS e classes no `body` para alternar o tema. A persistência é feita via `localStorage`.

---

## ⚙️ Build com Grunt

### Tarefas configuradas

| Task | Papel |
|------|-------|
| `less` | Compila LESS |
| `copy` | Copia scripts para `dev/` e `dist/` |
| `replace` | Injeta caminhos corretos no HTML |
| `uglify` | Minifica JavaScript |
| `htmlmin` | Minifica HTML |
| `clean` | Remove temporários |
| `watch` | Observa mudanças em arquivos-fonte |
| `connect` | Sobe servidor local |

### Fluxos principais

```bash
npm run dev
npm run build
npm run watch
```

### Equivalência com Grunt

```bash
grunt
grunt build
grunt watch
grunt serve
```

---

## 💾 Persistência Local

O projeto usa `localStorage` para três conjuntos principais de dados:

| Chave | Conteúdo |
|-------|----------|
| `pokedex-theme` | Tema selecionado |
| `pokedex-favorites` | Lista de favoritos |
| `pokedex-purchases` | Compras simuladas |

### Observação

Esses dados são locais ao navegador e não são compartilhados entre dispositivos.

---

## 🚀 Como Executar

### Desenvolvimento

```bash
npm install
npm run dev
```

### Produção

```bash
npm install
npm run build
```

### Endereço local esperado

```text
http://localhost:8000
```

---

## 🧪 Limitações Atuais

### Técnicas

- Sem testes automatizados
- Sem bundler moderno
- Comunicação entre módulos feita por objetos globais
- Parte da documentação anterior estava desatualizada e foi corrigida

### Funcionais

- Sem backend próprio
- Sem autenticação
- Sem sincronização remota de favoritos
- Checkout ainda restrito ao ambiente de teste

---

## 📌 Próximos Passos

### Curto prazo

- adicionar testes básicos para os módulos JS
- melhorar o tratamento de erro de rede
- exibir histórico visual de compras
- documentar o processo de produção do Google Pay

### Médio prazo

- integrar backend para pagamento real
- organizar melhor os estados da aplicação
- adicionar suporte offline mais robusto
- ampliar acessibilidade e navegação por teclado

---

## 📎 Referências

- [PokéAPI](https://pokeapi.co/)
- [Grunt](https://gruntjs.com/)
- [LESS](https://lesscss.org/)
- [Google Pay API for Web](https://developers.google.com/pay/api/web/overview)