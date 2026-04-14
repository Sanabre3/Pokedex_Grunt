document.addEventListener('DOMContentLoaded', () => {
    const api = new PokeAPI();

    window.pokeAPI = api;
    window.favoritesManager = new FavoritesManager();
    window.purchaseManager = new PurchaseManager();
    window.pokemonManager = new PokemonManager(api);
});
