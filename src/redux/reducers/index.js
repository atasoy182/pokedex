import { combineReducers } from "redux";
import changeTypeReducer from "./changeTypeReducer";
import typeListReducer from "./typeListReducer";
import pokemonListReducer from "./pokemonListReducer";
import inventoryReducer from "./inventoryReducer";

const rootReducer = combineReducers({
  changeTypeReducer,
  typeListReducer,
  pokemonListReducer,
  inventoryReducer,
});

export default rootReducer;
