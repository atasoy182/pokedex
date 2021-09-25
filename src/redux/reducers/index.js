import { combineReducers } from "redux";
import changeTypeReducer from "./changeTypeReducer";
import typeListReducer from "./typeListReducer";
import pokemonListReducer from "./pokemonListReducer";

const rootReducer = combineReducers({
    changeTypeReducer,
    typeListReducer,
    pokemonListReducer
});

export default rootReducer;