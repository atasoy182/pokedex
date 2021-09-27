import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function pokemonDetailReducer(
  state = initialState.pokemon,
  action
) {
  switch (action.type) {
    case actionTypes.GET_POKEMON_SUCCESS:
      return { ...state, ...action.payload };
    case actionTypes.GET_POKEMON_FAMILY_SUCCESS:
        return { ...state, ...{'family' : action.payload} };
    case actionTypes.GET_POKEMON_CLEAR:
      return {}
    default:
      return state;
  }
}
