import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function inventoryReducer(state = initialState.inventory, action){
    switch(action.type){
        case actionTypes.ADD_TO_INVENTORY:
            let addedPokemon = state.find(p=>p.pokemon.id === action.payload.pokemon.id);
            if(addedPokemon){
                let newState = state.map(pokemonItem => {
                    if(pokemonItem.pokemon.id === action.payload.pokemon.id){
                        return Object.assign({}, addedPokemon, {quantity : addedPokemon.quantity + 1})
                    }
                    return pokemonItem;
                })
                return newState;
            }else{
                return [...state,{...action.payload}]
            }
        case actionTypes.REMOVE_FROM_INVENTORY:
            return state.filter(pokemonItem => pokemonItem.pokemon.id !== action.payload.id)
        default:
            return state;
    }
}