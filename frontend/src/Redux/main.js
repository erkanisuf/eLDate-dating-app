import myConversations from "./myConversations";
import logInReducer from "./logInReducer";
import conversationReducer from "./conversationReducer";
import myProfileReducer from "./myProfileReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  myConversations: myConversations,
  isLogedin: logInReducer,
  conversationReducer: conversationReducer,
  myProfileReducer: myProfileReducer,
});

export default rootReducer;
// This combines all reducers in to one
