import { combineReducers } from "redux";
import changeTypeReducer from "./changeTypeReducer";
import typeListReducer from "./typeListReducer";
import pokemonListReducer from "./pokemonListReducer";
import inventoryReducer from "./inventoryReducer";
import pokemonDetailReducer from "./pokemonDetailReducer";
import favReducer from "./favReducer";

const rootReducer = combineReducers({
  changeTypeReducer,
  typeListReducer,
  pokemonListReducer,
  inventoryReducer,
  pokemonDetailReducer,
  favReducer
});

export default rootReducer;
