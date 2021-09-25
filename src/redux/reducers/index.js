import { combineReducers } from "redux";
import changeTypeReducer from "./changeTypeReducer";
import typeListReducer from "./typeListReducer";

const rootReducer = combineReducers({
    changeTypeReducer,
    typeListReducer
});

export default rootReducer;