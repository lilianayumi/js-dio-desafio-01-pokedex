const number = parseInt(localStorage.getItem('pokemonNumber'))
const pokemonProfile = document.getElementById('pokemonProfile');

function convertApiToProfile(profileDetail, specieDetail, evolutionDetail, genderDetail) {
  const profile = new Profile();
  profile.number = profileDetail.id;
  profile.name = profileDetail.name;
  const types = profileDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  profile.types = types;
  profile.type = type;
  profile.photo = profileDetail.sprites.other.dream_world.front_default;
  profile.height = (profileDetail.height) / 10;
  profile.weight = (profileDetail.weight) / 10;
  const abilities = profileDetail.abilities.map((abilities) => abilities.ability.name);
  const [ability] = abilities;
  profile.abilities = abilities;
  profile.ability = ability;
  profile.base_experience = profileDetail.base_experience;
  const stats = profileDetail.stats.map((stats) => stats.stat.name);
  const [stat] = stats;
  profile.stats = stats;
  profile.stat = stat;
  const base_stats = profileDetail.stats.map((base_stats) => base_stats.base_stat);
  const [base_stat] = base_stats;
  profile.base_stats = base_stats;
  profile.base_stat = base_stat;
  const bars_width = base_stats.map(base_stat => (base_stat / 255) * 100);
  const [bar_width] = bars_width;
  profile.bars_width = bars_width
  profile.bar_width = bar_width;
  profile.specie = specieDetail.genera.find(genera => genera.language.name === 'en').genus.slice(0, -8);
  const egg_groups = specieDetail.egg_groups.map((egg_groups) => egg_groups.name);
  const [egg_group] = egg_groups;
  profile.egg_groups = egg_groups;
  profile.egg_group = egg_group;
  const evolution = evolutionDetail.map(evolution => evolution.image);
  const [evolution_image] = evolution;
  profile.evolution = evolution;
  profile.evolution_image = evolution_image;
  profile.gender = genderDetail;
  return profile;
}

const getPokemonProfile = async (number) => {
  const urlProfile = `https://pokeapi.co/api/v2/pokemon/${number}/`;
  const response = await fetch(urlProfile);
  const profile = await response.json();
  return profile;
}

const getPokemonSpecie = async (number) => {
  const urlSpecie = `https://pokeapi.co/api/v2/pokemon-species/${number}`;
  const response = await fetch(urlSpecie);
  const specie = await response.json();
  return specie;
}

const getPokemonEvolution = async (number) => {
  const specie = await getPokemonSpecie(number);
  const urlEvolution = specie.evolution_chain.url;
  const response = await fetch(urlEvolution);
  const evolution = await response.json();
  const evolutionChain = [];
  let evolutionDetails = evolution.chain;
  do {
    const evolutionName = evolutionDetails.species.name;
    const evolutionUrl = `https://pokeapi.co/api/v2/pokemon/${evolutionName}/`;
    const response = await fetch(evolutionUrl)
    const data = await response.json();
    const evolutionImage = data.sprites.other.dream_world.front_default;
    evolutionChain.push({ image: evolutionImage });
    evolutionDetails = evolutionDetails.evolves_to[0];
  } while (evolutionDetails != undefined);
  return evolutionChain;
}

async function getPokemonGender(number) {
  const data = await getPokemonSpecie(number);
  const genderRate = data.gender_rate;
  let gender = "Genderless";
  if (genderRate === -1) {
    gender = "Genderless";
  } else if (genderRate === 0) {
    gender = `<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Venus_symbol_%28fixed_width%29.svg/90px-Venus_symbol_%28fixed_width%29.svg.png'>`;
  } else if (genderRate === 8) {
    gender = `<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Male_symbol_%28fixed_width%29.svg/90px-Male_symbol_%28fixed_width%29.svg.png'>`;
  } else {
    const femaleRatio = 12.5 * genderRate;
    const maleRatio = 100 - femaleRatio;
    gender = `<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Male_symbol_%28fixed_width%29.svg/90px-Male_symbol_%28fixed_width%29.svg.png'> ${maleRatio}% / <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Venus_symbol_%28fixed_width%29.svg/90px-Venus_symbol_%28fixed_width%29.svg.png'> ${femaleRatio}%`;
  }
  return gender;
}

const getProfile = async (number) => {
  try {
    const [profile, specie, evolution, gender] = await Promise.all([getPokemonProfile(number), getPokemonSpecie(number), getPokemonEvolution(number), getPokemonGender(number)]);
    return convertApiToProfile(profile, specie, evolution, gender);
  }
  catch (error) {
    return console.error(error);
  }
}






