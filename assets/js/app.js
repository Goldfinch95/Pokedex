
const imgPokemon = document.getElementById("img__pokemon");
const spanPokemonNumber = document.getElementById("span__pokemon-number");
const spanPokemonName = document.getElementById("span__pokemon-name");
const formSearchPokemon = document.getElementById("form__search-pokemon");
const inputSearchPokemon = document.getElementById("input__search-pokemon");
const btnPreviousPokemon = document.getElementById("button__previous-pokemon");
const btnNextPokemon = document.getElementById("button__next-pokemon");
const infoDataType = document.getElementById("info__data-type");
const infoDataHeight = document.getElementById("info__data-height");
const infoDataWeight = document.getElementById("info__data-weight");
const infoDataHp = document.getElementById("info__data-hp");
const infoDataAttack = document.getElementById("info__data-attack");
const infoDataDefense = document.getElementById("info__data-defense");
const infoDataSpecialAttack = document.getElementById("info__data-special-attack");
const infoDataSpecialDefense = document.getElementById("info__data-special-defense");
const infoDataSpeed = document.getElementById("info__data-speed");
const PokemonNotFound = document.getElementById("img__pokemon-not-Found");

const firstPokemon = 1;
const lastPokemon = 151;
let actualPokemon = 0;

//conectar la api
const connectPokeapi = async (pokemon)=>{
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIresponse.status == 200){
    const data = await APIresponse.json();
    return data
    }
    else{
        console.log('la API no esta funcionando');
    }
}

//mostrar información e imagen del pokemon

const DisplayPokemonInfo = async (pokemon)=>{
    spanPokemonName.innerHTML = "Loading...";
    const pokemonData = await connectPokeapi(pokemon);
    if(pokemonData){
    imgPokemon.style.display = "block";
    spanPokemonName.innerHTML = pokemonData.name;
    spanPokemonNumber.innerHTML = pokemonData.id;
    infoDataType.innerHTML = `Type: ${pokemonData.types[1] ? pokemonData.types[0].type.name + '/' + pokemonData.types[1].type.name : pokemonData.types[0].type.name}`
    infoDataHeight.innerHTML = `${pokemonData.height / 10} m`
    infoDataWeight.innerHTML = `${pokemonData.weight / 10} kg`
    infoDataHp.innerHTML = `${pokemonData.stats[0].base_stat} ♡`
    infoDataAttack.innerHTML = `${pokemonData.stats[1].base_stat} ATK`
    infoDataDefense.innerHTML = `${pokemonData.stats[2].base_stat} DEF`
    infoDataSpecialAttack.innerHTML =`${pokemonData.stats[3].base_stat} ATK SPC`
    infoDataSpecialDefense.innerHTML =`${pokemonData.stats[4].base_stat} DEF SPC`
    infoDataSpeed.innerHTML = `${pokemonData.stats[5].base_stat} MPH`
    PokemonNotFound.style.display = "none";
    imgPokemon.src = pokemonData["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    actualPokemon = pokemonData.id;
    if(pokemonData.id > 151){
        PokemonNotFound.style.display = "flex";
        imgPokemon.style.display = "none";
        spanPokemonName.innerHTML = "Not Found";
        infoDataType.innerHTML = "Not Found";
        spanPokemonNumber.innerHTML = "";
        infoDataHeight.innerHTML = "";
        infoDataWeight.innerHTML = "";
        infoDataHp.innerHTML = "";
        infoDataAttack.innerHTML = "";
        infoDataDefense.innerHTML = "";
        infoDataSpecialAttack.innerHTML ="";
        infoDataSpecialDefense.innerHTML ="";
        infoDataSpeed.innerHTML = "";
    }
    }
    else{
        PokemonNotFound.style.display = "flex";
        imgPokemon.style.display = "none";
        spanPokemonName.innerHTML = "Not Found";
        infoDataType.innerHTML = "Not Found";
        spanPokemonNumber.innerHTML = "";
        infoDataHeight.innerHTML = "";
        infoDataWeight.innerHTML = "";
        infoDataHp.innerHTML = "";
        infoDataAttack.innerHTML = "";
        infoDataDefense.innerHTML = "";
        infoDataSpecialAttack.innerHTML ="";
        infoDataSpecialDefense.innerHTML ="";
        infoDataSpeed.innerHTML = "";
    }
}

// retroceder

const previousPokemon = () => {
    actualPokemon--;
    if(actualPokemon < firstPokemon){
        actualPokemon = lastPokemon;
    }
    return actualPokemon
}

// avanzar

const nextPokemon = ()=>{
    actualPokemon++;
    if(actualPokemon > lastPokemon){
        actualPokemon = firstPokemon
    }
    return actualPokemon
}

formSearchPokemon.addEventListener("submit", (e)=>{
    e.preventDefault();
    DisplayPokemonInfo(inputSearchPokemon.value.toLowerCase());
    inputSearchPokemon.value = "";
})

btnPreviousPokemon.addEventListener("click", ()=>{
    const searchPokemon = previousPokemon();
    DisplayPokemonInfo(searchPokemon)
})

btnNextPokemon.addEventListener("click", ()=>{
    const searchPokemon = nextPokemon();
    DisplayPokemonInfo(searchPokemon);
})
