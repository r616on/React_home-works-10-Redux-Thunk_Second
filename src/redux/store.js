import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import formReducer from "./formReducer";
import listReducer from "./listReducer";

const rootReducer = combineReducers({
  formReducer,
  listReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
