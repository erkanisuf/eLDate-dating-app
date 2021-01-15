import counterReducer from "./reducer";
import logInReducer from "./logInReducer";
import conversationReducer from "./conversationReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  mainreducer: counterReducer,
  isLogedin: logInReducer,
  conversationReducer: conversationReducer,
});

export default rootReducer;
// This combines all reducers in to one
