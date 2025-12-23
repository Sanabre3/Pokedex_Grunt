console.log('pokemon.js carregado');

constructor(api) {
    if (!api || typeof api.fetchPokemon !== 'function') {
        throw new Error('PokemonManager precisa receber uma instância válida de PokeAPI');
    }

    this.api = api;

    this.currentPage = 1;
    this.pokemonsPerPage = 20;
    this.currentPokemons = [];
    this.allTypes = [];
    this.filteredPokemons = [];

    this.init();
}

async init() {
    await this.loadTypes();
    await this.loadPokemons();
    this.setupEventListeners();
    }
    
    async loadTypes() {
        try {
            this.allTypes = await this.api.fetchPokemonTypes();
            this.populateTypeFilter();
        } catch (error) {
            console.error('Erro ao carregar tipos:', error);
        }
    }
    
    populateTypeFilter() {
        const typeFilter = document.getElementById('type-filter');
        if (!typeFilter) return;
        this.allTypes.forEach(type => {
      const option = document.createElement('option');
      option.value = type.name;
      option.textContent = this.capitalizeFirst(type.name);
      typeFilter.appendChild(option);
    });
  }
  
  async loadPokemons(page = 1) {
      this.showLoading();
      
      const offset = (page - 1) * this.pokemonsPerPage;
      const data = await this.api.fetchPokemonList(this.pokemonsPerPage, offset);
      
      // buscar detalhes completos de cada Pokémon
      const detailedPokemons = await Promise.all(
  data.results.map(item => this.api.fetchPokemon(item.name))
);

this.currentPokemons = detailedPokemons;
this.filteredPokemons = [...this.currentPokemons];

this.renderPokemonGrid();
this.updatePagination(page, data.count);
}
renderPokemonGrid() {
    const grid = document.getElementById('pokemon-grid');
    if (!grid) return;
    const loading = document.getElementById('loading');
    
    if (loading) loading.remove();
    grid.innerHTML = '';
    
    this.filteredPokemons.forEach(pokemon => {
      const card = this.createPokemonCard(pokemon);
      grid.appendChild(card);
    });
  }
  
  createPokemonCard(pokemon) {
      const card = document.createElement('div');
      card.className = 'pokemon-card';
      card.dataset.pokemonId = pokemon.id;

      const types = (pokemon.types || []).map(type =>
      `<span class="type type-${type.type.name}">${this.capitalizeFirst(type.type.name)}</span>`
    ).join('');

    const isFavorite = window.favoritesManager?.isFavorite
    ? window.favoritesManager.isFavorite(pokemon.id)
      : false;
      
      card.innerHTML = `
      <div class="card-header">
      <span class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</span>
      <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-pokemon-id="${pokemon.id}">
      ${isFavorite ? '⭐' : '☆'}
      </button>
      </div>
      <div class="pokemon-image">
      <img src="${(pokemon.sprites?.other?.['official-artwork']?.front_default) || pokemon.sprites?.front_default || ''}"
      alt="${pokemon.name}" loading="lazy">
      </div>
      <div class="pokemon-info">
      <h3 class="pokemon-name">${this.capitalizeFirst(pokemon.name)}</h3>
      <div class="pokemon-types">${types}</div>
      <div class="pokemon-stats">
      <div class="stat"><span class="stat-name">HP</span><span class="stat-value">${pokemon.stats?.[0]?.base_stat ?? '-'}</span></div>
      <div class="stat"><span class="stat-name">ATK</span><span class="stat-value">${pokemon.stats?.[1]?.base_stat ?? '-'}</span></div>
      <div class="stat"><span class="stat-name">DEF</span><span class="stat-value">${pokemon.stats?.[2]?.base_stat ?? '-'}</span></div>
        </div>
        </div>
        `;

        // click no card abre detalhes (exceto se clicar no favorite)
        card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('favorite-btn')) {
          this.showPokemonDetails(pokemon);
        }
    });

    const favoriteBtn = card.querySelector('.favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.favoritesManager?.toggleFavorite) {
            window.favoritesManager.toggleFavorite(pokemon.id);
            this.updateFavoriteButton(favoriteBtn, pokemon.id);
        }
    });
    }
    
    return card;
}

async showPokemonDetails(pokemon) {
    const modal = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    if (!modal || !modalContent) return;
    
    try {
        const species = await this.api.fetchPokemonSpecies(pokemon.id);
        modalContent.innerHTML = this.createDetailedView(pokemon, species);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } catch (err) {
        console.error('Erro ao buscar detalhes:', err);
        this.showError('Não foi possível carregar os detalhes.');
    }
}

createDetailedView(pokemon, species) {
    const types = (pokemon.types || []).map(type =>
      `<span class="type type-${type.type.name}">${this.capitalizeFirst(type.type.name)}</span>`
    ).join('');

    const abilities = (pokemon.abilities || []).map(a => this.capitalizeFirst(a.ability.name)).join(', ');
    
    const description = species?.flavor_text_entries
    ?.find(entry => entry.language.name === 'en')?.flavor_text
    ?.replace(/\f/g, ' ') || 'Descrição não disponível';
    
    return `
    <div class="pokemon-detail">
        <div class="detail-header">
          <div class="pokemon-image-large">
          <img src="${pokemon.sprites?.other?.['official-artwork']?.front_default || ''}" alt="${pokemon.name}">
          </div>
          <div class="pokemon-basic-info">
          <h2>${this.capitalizeFirst(pokemon.name)}</h2>
          <p class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</p>
          <div class="pokemon-types">${types}</div>
          <p class="pokemon-description">${description}</p>
          </div>
          </div>
          
          <div class="detail-tabs">
          <button class="tab-btn active" data-tab="stats">Estatísticas</button>
          <button class="tab-btn" data-tab="abilities">Habilidades</button>
          <button class="tab-btn" data-tab="moves">Movimentos</button>
          </div>
          
          <div class="tab-content">
          <div class="tab-panel active" data-panel="stats">
          <div class="stats-grid">
          ${ (pokemon.stats || []).map(stat => `
            <div class="stat-bar">
            <div class="stat-info">
            <span class="stat-name">${this.formatStatName(stat.stat.name)}</span>
            <span class="stat-value">${stat.base_stat}</span>
            </div>
            <div class="stat-progress">
            <div class="stat-fill" style="width: ${(stat.base_stat / 255) * 100}%"></div>
            </div>
            </div>
            `).join('') }
            </div>
            <div class="pokemon-measurements">
            <div class="measurement"><span class="label">Altura:</span><span class="value">${pokemon.height/10}m</span></div>
            <div class="measurement"><span class="label">Peso:</span><span class="value">${pokemon.weight/10}kg</span></div>
            </div>
            </div>
            
            <div class="tab-panel" data-panel="abilities">
            <div class="abilities-list"><p><strong>Habilidades:</strong> ${abilities}</p></div>
            </div>
            
            <div class="tab-panel" data-panel="moves">
            <div class="moves-list">
            ${(pokemon.moves || []).slice(0,10).map(move => `<span class="move-tag">${this.capitalizeFirst(move.move.name)}</span>`).join('')}
            </div>
            </div>
            </div>
            </div>
            `;
  }
  
  setupEventListeners() {
    // Busca
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchBtn) searchBtn.addEventListener('click', () => this.performSearch());
    if (searchInput) searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.performSearch();
    });

    // Filtros
    const typeFilter = document.getElementById('type-filter');
    if (typeFilter) typeFilter.addEventListener('change', (e) => this.filterByType(e.target.value));

    const generationFilter = document.getElementById('generation-filter');
    if (generationFilter) generationFilter.addEventListener('change', (e) => this.filterByGeneration(e.target.value));
    
    // Paginação
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (this.currentPage > 1) {
          this.currentPage--;
          this.loadPokemons(this.currentPage);
        }
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      this.currentPage++;
      this.loadPokemons(this.currentPage);
    });

    // Modal close - usa arrow pra manter 'this'
    const modalClose = document.getElementById('modal-close');
    if (modalClose) modalClose.addEventListener('click', () => this.closeModal());
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
      if (e.target.id === 'modal-overlay') this.closeModal();
    });

    // Tabs do modal (delegação)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            this.switchTab(e.target.dataset.tab);
        }
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      localStorage.setItem('pokedex-theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('pokedex-theme');
    if (savedTheme === 'dark') document.body.classList.add('dark-theme');
}

async performSearch() {
    const query = (document.getElementById('search-input')?.value || '').trim();
    
    if (!query) {
        this.filteredPokemons = [...this.currentPokemons];
        this.renderPokemonGrid();
        return;
    }
    
    this.showLoading();
    
    try {
        let pokemon;
        if (isNaN(query)) {
            pokemon = await this.api.fetchPokemon(query.toLowerCase());
        } else {
            pokemon = await this.api.fetchPokemon(parseInt(query));
        }
        this.filteredPokemons = pokemon ? [pokemon] : [];
      this.renderPokemonGrid();
    } catch (error) {
        this.showError(`Pokémon "${query}" não encontrado.`);
        this.filteredPokemons = [];
        this.renderPokemonGrid();
    } finally {
        this.hideLoading();
    }
}

filterByType(type) {
    if (!type) {
        this.filteredPokemons = [...this.currentPokemons];
    } else {
        this.filteredPokemons = this.currentPokemons.filter(pokemon =>
            (pokemon.types || []).some(pokemonType => pokemonType.type.name === type)
        );
    }
    this.renderPokemonGrid();
}

filterByGeneration(generation) {
    if (!generation) {
        this.filteredPokemons = [...this.currentPokemons];
        this.renderPokemonGrid();
        return;
    }
    
    const ranges = {
        '1': [1, 151],
        '2': [152, 251],
        '3': [252, 386]
    };
    
    const [min, max] = ranges[generation] || [1, 151];
    this.filteredPokemons = this.currentPokemons.filter(pokemon => pokemon.id >= min && pokemon.id <= max);
    this.renderPokemonGrid();
}

switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

    const tabBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const tabPanel = document.querySelector(`[data-panel="${tabName}"]`);
    if (tabBtn) tabBtn.classList.add('active');
    if (tabPanel) tabPanel.classList.add('active');
}

closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

updateFavoriteButton(btn, pokemonId) {
    const isFavorite = window.favoritesManager?.isFavorite ? window.favoritesManager.isFavorite(pokemonId) : false;
    if (!btn) return;
    btn.classList.toggle('active', isFavorite);
    btn.textContent = isFavorite ? '⭐' : '☆';
}

updatePagination(currentPage, totalCount) {
    const totalPages = Math.max(1, Math.ceil((totalCount || 0) / this.pokemonsPerPage));
    const prev = document.getElementById('prev-btn');
    const next = document.getElementById('next-btn');
    const info = document.getElementById('page-info');
    
    if (prev) prev.disabled = currentPage === 1;
    if (next) next.disabled = currentPage === totalPages;
    if (info) info.textContent = `Página ${currentPage} de ${totalPages}`;
}

showLoading() {
    const grid = document.getElementById('pokemon-grid');
    if (!grid) return;
    grid.innerHTML = `
    <div class="loading" id="loading">
    <div class="pokeball-loading"></div>
    <p>Carregando Pokémons...</p>
    </div>
    `;
}

hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) loading.remove();
}

showError(message) {
    const grid = document.getElementById('pokemon-grid');
    if (!grid) return;
    grid.innerHTML = `
    <div class="error-message">
    <h3>😔 Oops!</h3>
    <p>${message}</p>
    <button id="retry-btn" class="retry-btn">Tentar Novamente</button>
    </div>
    `;
    
    const retry = document.getElementById('retry-btn');
    if (retry) retry.addEventListener('click', () => this.loadPokemons());
}

capitalizeFirst(str = '') {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

  formatStatName(statName) {
      const statNames = {
          'hp': 'HP',
          'attack': 'Ataque',
          'defense': 'Defesa',
          'special-attack': 'At. Esp.',
          'special-defense': 'Def. Esp.',
          'speed': 'Velocidade'
        };
        return statNames[statName] || statName;
    }

}