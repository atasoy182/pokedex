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
    //   const createIdForResult = (result) => {
    //     result.map((item, index) => item['id'] = index);
    //     return result;
    //   }
    console.log("BASLA")
    const getPokeDetail = (pokemons) => {
      let data = [];
      pokemons.forEach(pokemon => {
        fetch(pokemon.url)
        .then((response) => response.json())
        .then(function (pokeData) {
          
         // data[]
         data.push({
           'id' : pokeData.id,
           'name' : pokeData.name,
           'types' : pokeData.types.map(type => type.type.name),
           'imageUrl' : pokeData.sprites.other.dream_world.front_default
         })
         //console.log(pokeData.types.forEach(item))
        // pokeData.types.forEach(el => console.log(el.type.name))
        //  console.log({
        //   'id' : pokeData.id,
        //   'name' : pokeData.name,
        //   'types' : pokeData.types.map(type => type.name)
        // });
        });
      });
      dispatch(getPokemonsSuccess(data))
      
      // fetch(url)
      //   .then((response) => response.json())
      //   .then(function (pokeData) {
      //     console.log(pokeData);
      //   });

      
    };
    dispatch(getPokemonsStart());
    let url = "https://pokeapi.co/api/v2/pokemon?limit=100";
    return fetch(url)
      .then((response) => response.json())
      .then((result) => getPokeDetail(result.results))
      .catch((error) => dispatch(getPokemonsError(error)));
  };
}
