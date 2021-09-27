import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function typeListReducer(state = initialState.types, action) {
  switch (action.type) {
    case actionTypes.GET_TYPES_START:
      return { ...state, isLoading: true, message: "" };
    case actionTypes.GET_TYPES_SUCCESS:
      return { ...state, allTypes: action.payload, isLoading: false };
    case actionTypes.GET_TYPES_ERROR:
      return { ...state, message: action.payload, isLoading: false };
    default:
      return state;
  }
}
