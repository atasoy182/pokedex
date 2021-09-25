import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function pokemonListReducer(
  state = initialState.pokemons,
  action
) {
  switch (action.type) {
    case actionTypes.GET_POKEMONS_START:
      return { ...state, isLoading: true, message: "" };
    case actionTypes.GET_POKEMONS_SUCCESS:
      console.log("yuklendi")
      return { ...state, allPokemons: action.payload, isLoading: false };
    case actionTypes.GET_POKEMONS_ERROR:
      return { ...state, message: action.payload, isLoading: false };
    default:
      return state;
  }
}
