//TODO: buscar la manera en que muestre hasta el pokemon 151(mew). luego de pasar a mew, que vuelva al pokemon 1 (bulbasaur).

const imgPokemon = document.getElementById("img__pokemon");
const spanPokemonNumber = document.getElementById("span__pokemon-number");
const spanPokemonName = document.getElementById("span__pokemon-name");
const formSearchPokemon = document.getElementById("form__search-pokemon");
const inputSearchPokemon = document.getElementById("input__search-pokemon");
const btnPreviousPokemon = document.getElementById("button__previous-pokemon");
const btnNextPokemon = document.getElementById("button__next-pokemon");

let searchPokemon = 1;

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

//mostrar pokemon

const DisplayPokemonInfo = async (pokemon)=>{
    spanPokemonName.innerHTML = "Cargando...";
    const pokemonData = await connectPokeapi(pokemon);
    if(pokemonData){
    imgPokemon.style.display = "block";
    spanPokemonName.innerHTML = pokemonData.name;
    spanPokemonNumber.innerHTML = pokemonData.id;
    imgPokemon.src = pokemonData["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    searchPokemon = pokemonData.id;
    }
    else{
        imgPokemon.style.display = "none";
        spanPokemonName.innerHTML = "No encontrado";
        spanPokemonNumber.innerHTML = "";
    }
}

// retroceder

const previousPokemon = () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        return searchPokemon
    }
}

// avanzar

const nextPokemon = ()=>{
    searchPokemon += 1;
    return searchPokemon
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

DisplayPokemonInfo(searchPokemon)