import { imageNotFound } from "../../components/common/Common";
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

export function getPokemonsCount(count) {
  return { type: actionTypes.GET_POKEMONS_COUNT, payload: count };
}

export function getPokemons(offset, limit) {
  return function (dispatch) {
    let data = [];
    const getPokeDetail = (pokemons) => {
      let requests = pokemons.map((pokemon, index) => {
        return new Promise((resolve) => {
          fetch(pokemon.url)
            .then((response) => response.json())
            .then((pokeData) => {
              data.push({
                id: pokeData.id,
                name: pokeData.name,
                types: pokeData.types.map((type) => type.type.name),
                imageUrl:
                  pokeData.sprites.other.dream_world.front_default ||
                  pokeData.sprites.other["official-artwork"].front_default ||
                  imageNotFound,
              });
              resolve();
            });
        });
      });
      Promise.all(requests).then(() =>
        dispatch(getPokemonsSuccess(data.sort((a, b) => a.id - b.id)))
      );
    };
    dispatch(getPokemonsStart());
    let url =
      "https://pokeapi.co/api/v2/pokemon?offset=" +
      offset.toString() +
      "&limit=" +
      limit.toString();

    console.log("URL REQUEST:", url);
    return fetch(url)
      .then((response) => response.json())
      .then((result) => {
        dispatch(getPokemonsCount(result.count));
        return getPokeDetail(result.results);
      })
      .catch((error) => dispatch(getPokemonsError(error)));
  };
}
