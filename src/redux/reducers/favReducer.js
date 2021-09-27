import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function favReducer(state = initialState.favs, action) {
  switch (action.type) {
    case actionTypes.ADD_OR_REMOVE_FAV:
      let addedFav = state.find((poke) => poke.id === action.payload.id);
      if (addedFav) {
        let newState1 = [...state];
        return newState1.filter((fav) => fav.id !== action.payload.id);
      } else {
        let newState2 = [...state];
        newState2.push(action.payload);
        return newState2;
      }
    default:
      return state;
  }
}
