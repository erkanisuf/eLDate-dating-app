import counterReducer from "./reducer";
import logInReducer from "./logInReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  mainreducer: counterReducer,
  isLogedin: logInReducer,
});

export default rootReducer;
// This combines all reducers in to one
