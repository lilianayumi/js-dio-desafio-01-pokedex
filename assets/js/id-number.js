function getPokemonInfo(number) {
    const pokemonNumber = number;
    localStorage.setItem('pokemonNumber', pokemonNumber)
    window.location.href = 'profile-index.html'
}