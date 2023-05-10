const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
let offset = 0;
const limit = 10;
const maxRecords = 1281;

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}" onclick="getPokemonInfo(${pokemon.number})">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="details">
            <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img class="image" src="${pokemon.photo}" alt="Imagem do pokemón ${pokemon.name}">
        </div>
    </li>
    `
}

function loadPokemonItems(offset, limit) {
    pokemonApi.getPokemons(offset, limit).then((pokemons=[]) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    })
}

loadPokemonItems(offset, limit)
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qteRecordNextPage = offset + limit
    if (qteRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit); 
    }
})

