class PokeAPI {
    constructor() {
        this.baseURL = 'https://pokeapi.co/api/v2/';
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
    }

    // Método para limpar cache antigo
    clearExpiredCache() {
        const now = Date.now();
        for (const [key, value] of this.cache.entries()) {
            if (value.timestamp && now - value.timestamp > this.cacheTimeout) {
                this.cache.delete(key);
            }
        }
    }

    // Busca lista de Pokémons com limite e offset opcional
    async fetchPokemonList(limit = 20, offset = 0) {
        // Limpa cache antigo (se usar cache para lista)
        this.clearExpiredCache();

        // Tenta obter do cache
        const cacheKey = `pokemon-list-${limit}-${offset}`;
        const cached = this.cache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
            return cached.data;
        }

        // Monta a URL com limit/offset
        const url = `${this.baseURL}pokemon?limit=${limit}&offset=${offset}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro ao buscar lista de Pokémons: ${response.status}`);
            }
            const data = await response.json();
            // Salva no cache
            this.cache.set(cacheKey, { data, timestamp: Date.now() });
            return data;
        } catch (error) {
            console.error('Erro ao buscar lista de Pokémons:', error);
            throw error;
        }
    }
}
