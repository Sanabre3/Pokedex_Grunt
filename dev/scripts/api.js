class PokeAPI {
    constructor() {
        this.baseURL = 'https://pokeapi.co/api/v2/';
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
    }

    clearExpiredCache() {
        const now = Date.now();
        for (const [key, value] of this.cache.entries()) {
            if (value.timestamp && now - value.timestamp > this.cacheTimeout) {
                this.cache.delete(key);
            }
        }
    }

    async fetchPokemonList(limit = 20, offset = 0) {
        this.clearExpiredCache();
        const cacheKey = `pokemon-list-${limit}-${offset}`;
        const cached = this.cache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
            return cached.data;
        }

        const url = `${this.baseURL}pokemon?limit=${limit}&offset=${offset}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro ao buscar lista de Pokémons: ${response.status}`);
            }
            const data = await response.json();
            this.cache.set(cacheKey, { data, timestamp: Date.now() });
            return data;
        } catch (error) {
            console.error('Erro ao buscar lista de Pokémons:', error);
            throw error;
        }
    }

    async fetchPokemon(identifier) {
        const url = typeof identifier === 'string' && identifier.startsWith('http')
            ? identifier
            : `${this.baseURL}pokemon/${identifier}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar Pokémon');
        }
        return response.json();
    }

    async fetchPokemonTypes() {
        const response = await fetch(`${this.baseURL}type`);
        if (!response.ok) {
            throw new Error('Erro ao buscar tipos');
        }
        const data = await response.json();
        return data.results;
    }

    // ← MÉTODO FALTANTE ADICIONADO
    async fetchPokemonSpecies(id) {
        const cacheKey = `species-${id}`;
        const cached = this.cache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
            return cached.data;
        }

        const url = `${this.baseURL}pokemon-species/${id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro ao buscar espécie: ${response.status}`);
            }
            const data = await response.json();
            this.cache.set(cacheKey, { data, timestamp: Date.now() });
            return data;
        } catch (error) {
            console.error('Erro ao buscar espécie:', error);
            return null;
        }
    }
}