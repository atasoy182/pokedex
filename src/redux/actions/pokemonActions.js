import * as actionTypes from "./actionTypes";

export function getPokemonsSuccess(pokemons) {
  return { type: actionTypes.GET_POKEMONS_SUCCESS, payload: pokemons };
}

export function getPokemonsError(message) {
  return { type: actionTypes.GET_POKEMONS_ERROR, payload: message };
}

export function getPokemonsStart() {
  return { type: actionTypes.GET_POKEMONS_START };
}

export function getPokemons() {
  return function (dispatch) {
    const getPokeDetail = (pokemons) => {
      let data = [];
      pokemons.forEach((pokemon, index) => {
        fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokeData) => {
         data.push({
           'id' : pokeData.id,
           'name' : pokeData.name,
           'types' : pokeData.types.map(type => type.type.name),
           'imageUrl' : pokeData.sprites.other.dream_world.front_default
         })
         if(index === pokemons.length - 1 ){
          dispatch(getPokemonsSuccess(data))
         }
        });
      });
    };
    dispatch(getPokemonsStart());
    let url = "https://pokeapi.co/api/v2/pokemon?limit=100";
    return fetch(url)
      .then((response) => response.json())
      .then((result) => getPokeDetail(result.results))
      .catch((error) => dispatch(getPokemonsError(error)));
  };
}
