console.log("pokemon.js carregado");

// Classe para gerenciar lazy loading de imagens
class LazyImageLoader {
    constructor() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this), 
            {
                root: null,
                rootMargin: '50px',
                threshold: 0.1
            }
        );
        this.placeholderSvg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+';
    }

    observe(img) {
        if (!img.dataset.src) {
            img.dataset.src = img.src;
            img.src = this.placeholderSvg;
            img.classList.add('lazy-loading');
        }
        this.observer.observe(img);
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                this.loadImage(img);
            }
        });
    }

    loadImage(img) {
        const actualSrc = img.dataset.src;
        if (actualSrc && actualSrc !== this.placeholderSvg) {
            const tempImg = new Image();
            tempImg.onload = () => {
                img.src = actualSrc;
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-loaded');
                this.observer.unobserve(img);
            };
            tempImg.onerror = () => {
                img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-error');
                this.observer.unobserve(img);
            };
            tempImg.src = actualSrc;
        }
    }
}

class PokemonManager {
    constructor(api) {
        this.api = api;
        this.currentPage = 1;
        this.pokemonsPerPage = 20;
        this.lazyLoader = new LazyImageLoader();
        this.initTheme();
        this.init();
    }

    initTheme() {
        const savedTheme = localStorage.getItem("pokedex-theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-theme");
            this.updateThemeButton(true);
        } else {
            this.updateThemeButton(false);
        }
    }

    updateThemeButton(isDark) {
        const themeToggle = document.getElementById("theme-toggle");
        const themeText = themeToggle?.querySelector(".theme-text");
        
        if (themeText) {
            themeText.textContent = isDark ? "L I G H T" : "D A R K";
        }
        
        if (themeToggle) {
            themeToggle.classList.toggle("dark-active", isDark);
        }
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
            console.error("Erro ao carregar tipos:", error);
        }
    }

    populateTypeFilter() {
        const typeFilter = document.getElementById("type-filter");
        if (!typeFilter) return;
        this.allTypes.forEach((type) => {
            const option = document.createElement("option");
            option.value = type.name;
            option.textContent = this.capitalizeFirst(type.name);
            typeFilter.appendChild(option);
        });
    }

    async loadPokemons(page = 1) {
        this.showLoading(true);

        const offset = (page - 1) * this.pokemonsPerPage;
        const data = await this.api.fetchPokemonList(this.pokemonsPerPage, offset);

        this.currentPokemons = data.results.map((item, index) => {
            const pokemonId = offset + index + 1;
            return {
                id: pokemonId,
                name: item.name,
                price: this.calculatePokemonPrice(pokemonId),
                url: item.url,
                sprites: {
                    front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
                    other: {
                        "official-artwork": {
                            front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
                        }
                    }
                },
                types: [{ type: { name: 'loading' } }],
                stats: Array(6).fill({ base_stat: 0 }),
                loaded: false
            };
        });

        this.filteredPokemons = [...this.currentPokemons];
        this.renderPokemonGrid();
        this.updatePagination(page, data.count);
        this.loadPokemonDetailsLazy();
    }

    async loadPokemonDetailsLazy() {
        const batchSize = 3;
        const delay = 150;
        
        for (let i = 0; i < this.currentPokemons.length; i += batchSize) {
            const batch = this.currentPokemons.slice(i, i + batchSize);
            
            const promises = batch.map(async (pokemon) => {
                if (!pokemon.loaded) {
                    try {
                        const detailed = await this.api.fetchPokemon(pokemon.url);
                        return { index: this.currentPokemons.indexOf(pokemon), detailed };
                    } catch (error) {
                        console.error(`Erro ao carregar ${pokemon.name}:`, error);
                        return null;
                    }
                }
                return null;
            });

            const results = await Promise.all(promises);
            
            results.forEach(result => {
                if (result) {
                    this.currentPokemons[result.index] = { 
                        ...result.detailed, 
                        loaded: true,
                        price: this.calculatePokemonPrice(result.detailed.id)
                    };
                    this.updatePokemonCardInPlace(result.detailed, result.index);
                }
            });

            if (i + batchSize < this.currentPokemons.length) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    updatePokemonCardInPlace(pokemon, index) {
        const cards = document.querySelectorAll('.pokemon-card');
        const card = cards[index];
        
        if (!card) return;

        const typesContainer = card.querySelector('.pokemon-types');
        if (typesContainer) {
            const types = (pokemon.types || [])
                .map(type => `<span class="type type-${type.type.name}">${this.capitalizeFirst(type.type.name)}</span>`)
                .join("");
            typesContainer.innerHTML = types;
        }

        const statsContainer = card.querySelector('.pokemon-stats');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stat">
                    <span class="stat-name">HP</span>
                    <span class="stat-value">${pokemon.stats?.[0]?.base_stat ?? "-"}</span>
                </div>
                <div class="stat">
                    <span class="stat-name">ATK</span>
                    <span class="stat-value">${pokemon.stats?.[1]?.base_stat ?? "-"}</span>
                </div>
                <div class="stat">
                    <span class="stat-name">DEF</span>
                    <span class="stat-value">${pokemon.stats?.[2]?.base_stat ?? "-"}</span>
                </div>
            `;
        }

        const img = card.querySelector('.pokemon-img');
        if (img && pokemon.sprites?.other?.["official-artwork"]?.front_default) {
            img.dataset.src = pokemon.sprites.other["official-artwork"].front_default;
            this.lazyLoader.observe(img);
        }

        card.classList.add('details-loaded');
    }

    renderPokemonGrid() {
        const grid = document.getElementById("pokemon-grid");
        if (!grid) return;
        
        const loading = document.getElementById("loading");
        if (loading) loading.remove();
        
        grid.innerHTML = "";

        this.filteredPokemons.forEach((pokemon, index) => {
            const card = this.createPokemonCard(pokemon, index);
            grid.appendChild(card);
        });
    }

    ensurePokemonCommerceData(pokemon) {
        if (!pokemon) return pokemon;
        if (!pokemon.price) {
            pokemon.price = this.calculatePokemonPrice(pokemon.id);
        }
        return pokemon;
    }

    calculatePokemonPrice(pokemonId) {
        const normalizedId = Number(pokemonId) || 1;
        const basePrice = 14.9;
        const rarityFactor = ((normalizedId % 12) + 1) * 3.45;
        return Number((basePrice + rarityFactor).toFixed(2));
    }

    formatPrice(price) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price || 0);
    }

    findPokemonById(pokemonId) {
        const normalizedId = Number(pokemonId);
        const pokemonCollections = [this.filteredPokemons || [], this.currentPokemons || []];

        for (const collection of pokemonCollections) {
            const pokemon = collection.find((item) => item.id === normalizedId);
            if (pokemon) {
                return this.ensurePokemonCommerceData(pokemon);
            }
        }

        return null;
    }

    createPokemonCard(pokemon, index) {
        pokemon = this.ensurePokemonCommerceData(pokemon);
        const card = document.createElement("div");
        card.className = `pokemon-card ${pokemon.loaded ? 'details-loaded' : 'loading-details'}`;
        card.dataset.pokemonId = pokemon.id;

        const types = (pokemon.types || [])
            .map(type => {
                const typeName = type.type.name;
                return typeName === 'loading' 
                    ? '<span class="type type-loading">⚡</span>'
                    : `<span class="type type-${typeName}">${this.capitalizeFirst(typeName)}</span>`;
            })
            .join("");

        const isFavorite = window.favoritesManager?.isFavorite
            ? window.favoritesManager.isFavorite(pokemon.id)
            : false;

        card.innerHTML = `
            <div class="card-header">
                <span class="pokemon-id">#${pokemon.id.toString().padStart(3, "0")}</span>
                <button class="favorite-btn ${isFavorite ? "active" : ""}" data-pokemon-id="${pokemon.id}">
                    ${isFavorite ? "⭐" : "☆"}
                </button>
            </div>
            <div class="pokemon-image">
                <img 
                    src="${pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default || ''}"
                    alt="${pokemon.name}" 
                    class="pokemon-img"
                    loading="lazy">
            </div>
            <div class="pokemon-info">
                <h3 class="pokemon-name">${this.capitalizeFirst(pokemon.name)}</h3>
                <div class="pokemon-types">${types}</div>
                <div class="pokemon-stats">
                    <div class="stat">
                        <span class="stat-name">HP</span>
                        <span class="stat-value ${pokemon.loaded ? '' : 'loading-stat'}">${pokemon.stats?.[0]?.base_stat || "-"}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-name">ATK</span>
                        <span class="stat-value ${pokemon.loaded ? '' : 'loading-stat'}">${pokemon.stats?.[1]?.base_stat || "-"}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-name">DEF</span>
                        <span class="stat-value ${pokemon.loaded ? '' : 'loading-stat'}">${pokemon.stats?.[2]?.base_stat || "-"}</span>
                    </div>
                </div>
                <div class="pokemon-card-footer">
                    <span class="pokemon-price">${this.formatPrice(pokemon.price)}</span>
                    <button class="buy-btn" data-pokemon-id="${pokemon.id}">Comprar</button>
                </div>
            </div>
        `;

        const img = card.querySelector('.pokemon-img');
        if (img) {
            this.lazyLoader.observe(img);
        }

        card.addEventListener("click", (e) => {
            if (!e.target.classList.contains("favorite-btn")) {
                this.showPokemonDetails(pokemon);
            }
        });

        const favoriteBtn = card.querySelector(".favorite-btn");
        if (favoriteBtn) {
            favoriteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                window.favoritesManager.toggleFavorite(pokemon);
                this.updateFavoriteButton(favoriteBtn, pokemon.id);
            });
        }

        const buyBtn = card.querySelector(".buy-btn");
        if (buyBtn) {
            buyBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.showPokemonDetails(pokemon);
            });
        }

        return card;
    }

    async showPokemonDetails(pokemon) {
        pokemon = this.ensurePokemonCommerceData(pokemon);
        const modal = document.getElementById("modal-overlay");
        const modalContent = document.getElementById("modal-content");
        if (!modal || !modalContent) return;

        modalContent.innerHTML = this.createDetailedViewSkeleton(pokemon);
        modalContent.dataset.purchasePokemonId = String(pokemon.id);
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        window.purchaseManager?.renderPurchaseButton(pokemon, modalContent);
        this.loadModalDetailsLazy(pokemon, modalContent);
    }

    createDetailedViewSkeleton(pokemon) {
        const types = (pokemon.types || [])
            .filter(type => type.type.name !== 'loading')
            .map(type => `<span class="type type-${type.type.name}">${this.capitalizeFirst(type.type.name)}</span>`)
            .join("");

        return `
        <div class="pokemon-detail">
            <div class="detail-header">
                <div class="pokemon-image-large">
                    <img src="${pokemon.sprites?.other?.["official-artwork"]?.front_default || ""}" alt="${pokemon.name}">
                </div>
                <div class="pokemon-basic-info">
                    <h2>${this.capitalizeFirst(pokemon.name)}</h2>
                    <p class="pokemon-id">#${pokemon.id.toString().padStart(3, "0")}</p>
                    <div class="pokemon-types">${types}</div>
                    <div class="purchase-box">
                        <div class="purchase-summary">
                            <span class="purchase-label">Compra teste</span>
                            <strong>${this.formatPrice(pokemon.price)}</strong>
                        </div>
                        <div class="google-pay-container" data-google-pay-container></div>
                        <p class="purchase-note">Checkout em ambiente TEST do Google Pay para validar a jornada de compra.</p>
                        <div class="purchase-status" data-purchase-status></div>
                    </div>
                    <p class="pokemon-description loading-text">🔍 Carregando descrição...</p>
                </div>
            </div>
            
            <div class="detail-tabs">
                <button class="tab-btn active" data-tab="stats">Estatísticas</button>
                <button class="tab-btn" data-tab="abilities" disabled>Habilidades</button>
                <button class="tab-btn" data-tab="moves" disabled>Movimentos</button>
            </div>
            
            <div class="tab-content">
                <div class="tab-panel active" data-panel="stats">
                    ${this.createStatsPanel(pokemon)}
                </div>
                <div class="tab-panel" data-panel="abilities">
                    <div class="loading-skeleton">
                        <div class="skeleton-line"></div>
                        <div class="skeleton-line short"></div>
                    </div>
                </div>
                <div class="tab-panel" data-panel="moves">
                    <div class="loading-skeleton">
                        <div class="skeleton-grid">
                            ${Array(8).fill('<div class="skeleton-tag"></div>').join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    createStatsPanel(pokemon) {
        if (!pokemon.loaded || !pokemon.stats || pokemon.stats[0].base_stat === 0) {
            return `
                <div class="stats-skeleton">
                    ${Array(6).fill(`
                        <div class="stat-bar skeleton">
                            <div class="stat-info">
                                <span class="skeleton-text"></span>
                                <span class="skeleton-text short"></span>
                            </div>
                            <div class="stat-progress skeleton-progress"></div>
                        </div>
                    `).join('')}
                </div>
                <div class="pokemon-measurements">
                    <div class="measurement">
                        <span class="label">Altura:</span>
                        <span class="value">⏳</span>
                    </div>
                    <div class="measurement">
                        <span class="label">Peso:</span>
                        <span class="value">⏳</span>
                    </div>
                </div>
            `;
        }

        return `
            <div class="stats-grid">
                ${(pokemon.stats || [])
                    .map(stat => `
                        <div class="stat-bar">
                            <div class="stat-info">
                                <span class="stat-name">${this.formatStatName(stat.stat.name)}</span>
                                <span class="stat-value">${stat.base_stat}</span>
                            </div>
                            <div class="stat-progress">
                                <div class="stat-fill" style="width: ${(stat.base_stat / 255) * 100}%"></div>
                            </div>
                        </div>
                    `)
                    .join("")}
            </div>
            <div class="pokemon-measurements">
                <div class="measurement">
                    <span class="label">Altura:</span>
                    <span class="value">${pokemon.height / 10}m</span>
                </div>
                <div class="measurement">
                    <span class="label">Peso:</span>
                    <span class="value">${pokemon.weight / 10}kg</span>
                </div>
            </div>
        `;
    }

    async loadModalDetailsLazy(pokemon, modalContent) {
        try {
            if (!pokemon.loaded) {
                const detailedPokemon = await this.api.fetchPokemon(pokemon.url || pokemon.name);
                Object.assign(pokemon, detailedPokemon);
                pokemon.loaded = true;
            }

            const statsPanel = modalContent.querySelector('[data-panel="stats"]');
            if (statsPanel && pokemon.loaded) {
                statsPanel.innerHTML = this.createStatsPanel(pokemon);
            }

            const species = await this.api.fetchPokemonSpecies(pokemon.id);
            if (species) {
                this.updateModalDescription(modalContent, species);
            }

            this.enableTab(modalContent, 'abilities');
            this.updateAbilitiesPanel(modalContent, pokemon);
            this.enableTab(modalContent, 'moves');
            this.updateMovesPanel(modalContent, pokemon);

        } catch (error) {
            console.error('Erro ao carregar detalhes do modal:', error);
        }
    }

    updateModalDescription(modalContent, species) {
        const descElement = modalContent.querySelector('.pokemon-description');
        if (descElement) {
            const description = species?.flavor_text_entries
                ?.find(entry => entry.language.name === "en")
                ?.flavor_text?.replace(/\f/g, " ") || "Descrição não disponível";
            
            descElement.textContent = description;
            descElement.classList.remove('loading-text');
        }
    }

    enableTab(modalContent, tabName) {
        const tabBtn = modalContent.querySelector(`[data-tab="${tabName}"]`);
        if (tabBtn) {
            tabBtn.disabled = false;
            tabBtn.classList.add('loaded');
        }
    }

    updateAbilitiesPanel(modalContent, pokemon) {
        const abilitiesPanel = modalContent.querySelector('[data-panel="abilities"]');
        if (abilitiesPanel) {
            const abilities = (pokemon.abilities || [])
                .map(a => this.capitalizeFirst(a.ability.name))
                .join(", ");
            
            abilitiesPanel.innerHTML = `
                <div class="abilities-list">
                    <p><strong>Habilidades:</strong> ${abilities}</p>
                </div>
            `;
        }
    }

    updateMovesPanel(modalContent, pokemon) {
        const movesPanel = modalContent.querySelector('[data-panel="moves"]');
        if (movesPanel) {
            movesPanel.innerHTML = `
                <div class="moves-list">
                    ${(pokemon.moves || [])
                        .slice(0, 10)
                        .map(move => `<span class="move-tag">${this.capitalizeFirst(move.move.name)}</span>`)
                        .join("")}
                </div>
            `;
        }
    }

    setupEventListeners() {
        const searchInput = document.getElementById("search-input");
        const searchBtn = document.getElementById("search-btn");

        if (searchBtn)
            searchBtn.addEventListener("click", () => this.performSearch());
        if (searchInput)
            searchInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") this.performSearch();
            });

        const typeFilter = document.getElementById("type-filter");
        if (typeFilter)
            typeFilter.addEventListener("change", (e) =>
                this.filterByType(e.target.value)
            );

        const generationFilter = document.getElementById("generation-filter");
        if (generationFilter)
            generationFilter.addEventListener("change", (e) =>
                this.filterByGeneration(e.target.value)
            );

        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");
        if (prevBtn)
            prevBtn.addEventListener("click", () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.loadPokemons(this.currentPage);
                }
            });
        if (nextBtn)
            nextBtn.addEventListener("click", () => {
                this.currentPage++;
                this.loadPokemons(this.currentPage);
            });

        const modalClose = document.getElementById("modal-close");
        if (modalClose)
            modalClose.addEventListener("click", () => this.closeModal());
        const modalOverlay = document.getElementById("modal-overlay");
        if (modalOverlay)
            modalOverlay.addEventListener("click", (e) => {
                if (e.target.id === "modal-overlay") this.closeModal();
            });

        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("tab-btn")) {
                this.switchTab(e.target.dataset.tab);
            }
        });

        // DARK MODE TOGGLE
        const themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) {
            themeToggle.addEventListener("click", () => {
                const isDarkMode = document.body.classList.toggle("dark-theme");
                localStorage.setItem("pokedex-theme", isDarkMode ? "dark" : "light");
                this.updateThemeButton(isDarkMode);
                
                document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";
                setTimeout(() => {
                    document.body.style.transition = "";
                }, 300);
            });
        }
    }

    async performSearch() {
        const query = (document.getElementById("search-input")?.value || "").trim();

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
            pokemon = this.ensurePokemonCommerceData(pokemon);
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
            this.filteredPokemons = this.currentPokemons.filter((pokemon) =>
                (pokemon.types || []).some(
                    (pokemonType) => pokemonType.type.name === type
                )
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
            1: [1, 151],
            2: [152, 251],
            3: [252, 386],
        };

        const [min, max] = ranges[generation] || [1, 151];
        this.filteredPokemons = this.currentPokemons.filter(
            (pokemon) => pokemon.id >= min && pokemon.id <= max
        );
        this.renderPokemonGrid();
    }

    switchTab(tabName) {
        document
            .querySelectorAll(".tab-btn")
            .forEach((btn) => btn.classList.remove("active"));
        document
            .querySelectorAll(".tab-panel")
            .forEach((panel) => panel.classList.remove("active"));

        const tabBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const tabPanel = document.querySelector(`[data-panel="${tabName}"]`);
        if (tabBtn) tabBtn.classList.add("active");
        if (tabPanel) tabPanel.classList.add("active");
    }

    closeModal() {
        const overlay = document.getElementById("modal-overlay");
        if (overlay) overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    updateFavoriteButton(btn, pokemonId) {
        const isFavorite = window.favoritesManager?.isFavorite
            ? window.favoritesManager.isFavorite(pokemonId)
            : false;
        if (!btn) return;
        btn.classList.toggle("active", isFavorite);
        btn.textContent = isFavorite ? "⭐" : "☆";
    }

    updatePagination(currentPage, totalCount) {
        const totalPages = Math.max(
            1,
            Math.ceil((totalCount || 0) / this.pokemonsPerPage)
        );
        const prev = document.getElementById("prev-btn");
        const next = document.getElementById("next-btn");
        const info = document.getElementById("page-info");

        if (prev) prev.disabled = currentPage === 1;
        if (next) next.disabled = currentPage === totalPages;
        if (info) info.textContent = `Página ${currentPage} de ${totalPages}`;
    }

    showLoading(isInitial = false) {
        const grid = document.getElementById("pokemon-grid");
        if (!grid) return;
        
        if (isInitial || grid.children.length === 0) {
            grid.innerHTML = `
                <div class="loading" id="loading">
                    <div class="pokeball-loading"></div>
                    <p>Carregando Pokémons...</p>
                </div>
            `;
        } else {
            const skeletons = Array(this.pokemonsPerPage).fill(0).map(() => 
                '<div class="pokemon-card skeleton-card"></div>'
            ).join('');
            grid.innerHTML = skeletons;
        }
    }

    hideLoading() {
        const loading = document.getElementById("loading");
        if (loading) loading.remove();
    }

    showError(message) {
        const grid = document.getElementById("pokemon-grid");
        if (!grid) return;
        grid.innerHTML = `
        <div class="error-message">
        <h3>😔 Oops!</h3>
        <p>${message}</p>
        <button id="retry-btn" class="retry-btn">Tentar Novamente</button>
        </div>
        `;

        const retry = document.getElementById("retry-btn");
        if (retry) retry.addEventListener("click", () => this.loadPokemons());
    }

    capitalizeFirst(str = "") {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    formatStatName(statName) {
        const statNames = {
            hp: "HP",
            attack: "Ataque",
            defense: "Defesa",
            "special-attack": "At. Esp.",
            "special-defense": "Def. Esp.",
            speed: "Velocidade",
        };
        return statNames[statName] || statName;
    }

    goHome() {
        this.closeModal();
        document.body.classList.remove("showing-favorites");

        const searchInput = document.getElementById("search-input");
        const typeFilter = document.getElementById("type-filter");
        const generationFilter = document.getElementById("generation-filter");

        if (searchInput) searchInput.value = "";
        if (typeFilter) typeFilter.value = "";
        if (generationFilter) generationFilter.value = "";

        this.currentPage = 1;
        this.loadPokemons(1);

        const pagination = document.getElementById("pagination");
        if (pagination) pagination.style.display = "flex";

        if (window.favoritesManager?.updateFavoritesButton) {
            window.favoritesManager.updateFavoritesButton();
        }
    }
}