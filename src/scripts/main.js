document.addEventListener('DOMContentLoaded', () => {
    const api = new PokeAPI();

    window.pokeAPI = api;
    window.pokemonManager = new PokemonManager(api);
});
