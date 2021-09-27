import * as actionTypes from "./actionTypes";

export function addToInventory(pokemon) {
  return { type: actionTypes.ADD_TO_INVENTORY, payload: pokemon };
}

export function removeFromInventory(pokemon) {
  return { type: actionTypes.REMOVE_FROM_INVENTORY, payload: pokemon };
}
