class FavoritesManager {
    constructor() {
        this.favorites = this.loadFavorites();
        this.init();
    }

    init() {
        this.updateFavoritesCount();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('favorites-toggle').addEventListener('click', () => {
            this.toggleFavoritesView();
        });
    }

    loadFavorites() {
        const saved = localStorage.getItem('pokedex-favorites');
        return saved ? JSON.parse(saved) : [];
    }

    saveFavorites() {
        localStorage.setItem('pokedex-favorites', JSON.stringify(this.favorites));
        this.updateFavoritesCount();
    }

    isFavorite(pokemonId) {
        return this.favorites.some(fav => fav.id === pokemonId);
    }

    toggleFavorite(pokemon) {
        const index = this.favorites.findIndex(fav => fav.id === pokemon.id);
        
        if (index === -1) {
            this.favorites.push({
                id: pokemon.id,
                name: pokemon.name,
                sprite: pokemon.sprites.front_default,
                types: pokemon.types
            });
        } else {
            this.favorites.splice(index, 1);
        }
        
        this.saveFavorites();
    }

    toggleFavoritesView() {
        const isShowingFavorites = document.body.classList.contains('showing-favorites');
        
        if (isShowingFavorites) {
            this.showAllPokemons();
        } else {
            this.showFavorites();
        }
    }

    showFavorites() {
        if (this.favorites.length === 0) {
            this.showNoFavoritesMessage();
            return;
        }

        document.body.classList.add('showing-favorites');
        const grid = document.getElementById('pokemon-grid');
        grid.innerHTML = '';
        
        this.favorites.forEach(async (favorite) => {
            try {
                const pokemon = await window.pokeAPI.fetchPokemon(favorite.id);
                const card = window.pokemonManager.createPokemonCard(pokemon);
                grid.appendChild(card);
            } catch (error) {
                console.error('Erro ao carregar favorito:', error);
            }
        });

        // Esconder paginação
        document.getElementById('pagination').style.display = 'none';
        
        // Atualizar botão
        document.getElementById('favorites-toggle').textContent = '🏠 Voltar';
    }

    showAllPokemons() {
        document.body.classList.remove('showing-favorites');
        window.pokemonManager.renderPokemonGrid();
        
        // Mostrar paginação
        document.getElementById('pagination').style.display = 'flex';
        
        // Atualizar botão
        this.updateFavoritesButton();
    }

    showNoFavoritesMessage() {
        const grid = document.getElementById('pokemon-grid');
        grid.innerHTML = `
            <div class="no-favorites">
                <h3>💫 Nenhum favorito ainda</h3>
                <p>Clique na estrela dos Pokémons para adicioná-los aos seus favoritos!</p>
                <button onclick="window.favoritesManager.showAllPokemons()" class="btn">
                    Explorar Pokémons
                </button>
            </div>
        `;
        
        document.body.classList.add('showing-favorites');
        document.getElementById('pagination').style.display = 'none';
        document.getElementById('favorites-toggle').textContent = '🏠 Voltar';
    }

    updateFavoritesCount() {
        document.getElementById('favorites-count').textContent = this.favorites.length;
    }

    updateFavoritesButton() {
        const btn = document.getElementById('favorites-toggle');
        btn.innerHTML = `⭐ Favoritos (<span id="favorites-count">${this.favorites.length}</span>)`;
    }
}