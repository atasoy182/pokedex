import { imageNotFound } from "../../components/common/Common";
import * as actionTypes from "./actionTypes";

export function getPokemonSuccess(pokemon) {
  return { type: actionTypes.GET_POKEMON_SUCCESS, payload: pokemon };
}

export function getPokemonFamilySuccess(pokemon) {
  return { type: actionTypes.GET_POKEMON_FAMILY_SUCCESS, payload: pokemon };
}

export function getPokemon(id) {
  const getFamilyFromChain = (chain, dispatch) => {
    const familyArr = [];
    if (Object.keys(chain.species).length > 0) {
      var arr = chain.species.url.split("/");
      familyArr.push(arr[arr.length - 2]);
    }
    if (Object.keys(chain.evolves_to).length > 0) {
      chain.evolves_to.forEach((item) => {
        if (item.species) {
          var arr = item.species.url.split("/");
          familyArr.push(arr[arr.length - 2]);
        }
        if (Object.keys(item.evolves_to).length > 0) {
          item.evolves_to.forEach((item2) => {
            if (item2.species) {
              var arr = item2.species.url.split("/");
              familyArr.push(arr[arr.length - 2]);
            }
          });
        }
      });
    }
    dispatch(getPokemonsFamily(familyArr));
    return familyArr;
  };

  const getPokemonEvelotionChain = (pokemon, dispatch) => {
    let url = "";
    if (pokemon["details"]["evoUrl"]) {
      url = pokemon["details"]["evoUrl"];
    } else {
      return dispatch(getPokemonSuccess(pokemon));
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => {
        pokemon["details"]["evelotions"] = getFamilyFromChain(
          result.chain,
          dispatch
        );
        return dispatch(getPokemonSuccess(pokemon));
      })
      .catch((error) => {
        return dispatch(getPokemonSuccess(pokemon));
      });
  };

  const getPokemonSpecies = (pokemon, dispatch) => {
    let url = "https://pokeapi.co/api/v2/pokemon-species/" + pokemon.id;
    return fetch(url)
      .then((response) => response.json())
      .then((result) => {
        pokemon["details"] = {
          color: result.color.name,
          text: result.flavor_text_entries
            .find((text) => text.language.name === "en")
            .flavor_text.replace("\f", ""),
          evoUrl: result.evolution_chain.url,
        };
        getPokemonEvelotionChain(pokemon, dispatch);
      })
      .catch((error) => {
        return dispatch(getPokemonSuccess(pokemon));
      });
  };

  return function (dispatch) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + id;
    return fetch(url)
      .then((response) => response.json())
      .then((result) => getPokemonSpecies(result, dispatch))
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getPokemonsFamily(family) {
  return function (dispatch) {
    const data = [];
    let requests = family.map((child, index) => {
      return new Promise((resolve) => {
        let url = "https://pokeapi.co/api/v2/pokemon/" + child;
        console.log(url);
        fetch(url)
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
      dispatch(getPokemonFamilySuccess(data.sort((a, b) => a.id - b.id)))
    );
  };
}

export function clearPokemon() {
  return { type: actionTypes.GET_POKEMON_CLEAR };
}
