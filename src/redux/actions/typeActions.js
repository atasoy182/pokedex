import * as actionTypes from "./actionTypes";

export function changeType(type) {
  return { type: actionTypes.CHANGE_TYPE, payload: type };
}

export function getTypesSuccess(types) {
  return { type: actionTypes.GET_TYPES_SUCCESS, payload: types };
}

export function getTypesError(message) {
  return { type: actionTypes.GET_TYPES_ERROR, payload: message };
}

export function getTypesStart() {
  return { type: actionTypes.GET_TYPES_START };
}

export function getTypes() {
  return function (dispatch) {
    const createIdForResult = (result) => {
      result.map((item, index) => {
        item["id"] = index;
        item["name"] = item["name"][0].toUpperCase() + item["name"].slice(1).toLowerCase();
      });
      result.unshift({ name: "All" });
      return result;
    };
    dispatch(getTypesStart());
    let url = "https://pokeapi.co/api/v2/type";
    return fetch(url)
      .then((response) => response.json())
      .then((result) =>
        dispatch(getTypesSuccess(createIdForResult(result.results)))
      )
      .catch((error) => dispatch(getTypesError(error)));
  };
}
