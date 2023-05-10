const pokemonApi = {};

function convertPokemonApiDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetail.id;
    pokemon.name = pokemonDetail.name;
    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;
    return pokemon;
}

pokemonApi.getPokemonDetail = async (pokemon) => {
    const response = await fetch(pokemon.url);
    const pokemonDetail = await response.json();
    return convertPokemonApiDetailToPokemon(pokemonDetail);
}

pokemonApi.getPokemons = async (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const jsonBody = await response.json();
        const pokemons = jsonBody.results;
        const detailRequests = pokemons.map(pokemonApi.getPokemonDetail);
        const PokemonsDetails = await Promise.all(detailRequests);
        return PokemonsDetails;
    } catch (error) {
        return console.error(error);
    }
}

