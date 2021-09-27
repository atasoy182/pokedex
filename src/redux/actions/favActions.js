import * as actionTypes from "./actionTypes";

export function addOrRemoveFav(pokemon){
    return {type:actionTypes.ADD_OR_REMOVE_FAV, payload : pokemon}
}
