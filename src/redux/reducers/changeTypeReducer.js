import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function changeTypeReducer(
  state = initialState.currentType,
  action
) {
  switch (action.type) {
    case actionTypes.CHANGE_TYPE:
      return action.payload;
    default:
      return state;
  }
}
