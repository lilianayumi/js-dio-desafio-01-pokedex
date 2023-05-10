function convertPokemonProfileToHtml(profile) {
    return `
        <div class="pokemon ${profile.type}">
            <div class="header">
                <a id="backButton" type="button" href="index.html">↩</a>
                <div class="like">♡</div>
            </div>
            <div class="details">
                <div class="name">${profile.name}</div>
                <div class="number">#${profile.number}</div>
                <ol class="types">
                ${profile.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img class="image" src="${profile.photo}" alt="Imagem do pokemón ${profile.name}">
            </div>
            <div class="profile">
                <div class="titles">
                    <button id="aboutButton" class="line" type="button" onclick="scrollTable('left')">About</button>
                    <button id="statsButton" type="button" onclick="scrollTable('right')">Base Stats</button>
                </div>
                <div id="table" class="table">
                    <div class="table-about">
                        <div class="item">
                            <ol>
                                <li>Specie</li>
                                <li>Height</li>
                                <li>Weight</li>
                                <li>Abilities</li>
                                <li>Experience</li>
                                <li>Gender</li>
                                <li>Egg Groups</li>
                                <li>Evolution</li>
                            </ol>
                        </div>
                        <div class="info">
                            <ol>
                                <li>${profile.specie}</li>
                                <li>${profile.height}m</li>
                                <li>${profile.weight}kg</li>
                                <li>
                                    <ol class="abilities">
                                        ${profile.abilities.map((ability) => `<li>${ability}</li>`).join(',')}
                                    </ol>
                                </li>
                                <li>${profile.base_experience}</li>
                                <li class="gender">${profile.gender}</li>
                                <li>
                                    <ol class="egg-groups">
                                        ${profile.egg_groups.map((egg_group) => `<li>${egg_group}</li>`).join(',')}
                                    </ol>
                                </li>
                                <li>
                                    <ol class="evolution">
                                        ${profile.evolution.map((evolution_image) => `<li><img class="evolution" src="${evolution_image}" alt="Imagem do pokemón"></li>`).join('->')}
                                    </ol>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div class="table-stats">
                        <ol class="stats">
                            ${profile.stats.map((stat) => `<li class="${stat}">${stat}</li>`).join('')}
                        </ol>
                        <ol class="stats">
                            ${profile.base_stats.map((base_stat) => `<li class="${base_stat}">${base_stat}</li>`).join('')}
                        </ol>
                        <ol class="stats" id="stats">
                            ${profile.bars_width.map((bar_width) => `<li class="bar"><div class="progress ${profile.type}" style="width: ${bar_width}%;"></div></li>`).join('')}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    `
}

getProfile(number).then((pokemon) => {
    pokemonProfile.innerHTML = convertPokemonProfileToHtml(pokemon)
})

function scrollTable(direction) {
    const table = document.querySelector("#table");
    const width = table.getBoundingClientRect().width;
    const firstButton = document.querySelector("#aboutButton");
    const secondButton = document.querySelector("#statsButton");

    if (direction === 'right') {
        firstButton.classList.remove('line');
        secondButton.classList.add('line');
        table.scrollLeft += width;
    } else if (direction === 'left') {
        firstButton.classList.add('line');
        secondButton.classList.remove('line');
        table.scrollLeft -= width;
    }
}