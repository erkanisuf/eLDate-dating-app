import myConversations from "./myConversations";
import toggleTriggerFetchs from "./toggleTriggerFetchs";
import conversationReducer from "./conversationReducer";
import myProfileReducer from "./myProfileReducer";
import AmiLogged from "./AmiLogged";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  myConversations: myConversations,
  toggleTriggerFetchs: toggleTriggerFetchs,
  conversationReducer: conversationReducer,
  myProfileReducer: myProfileReducer,
  AmiLogged: AmiLogged,
});

export default rootReducer;
// This combines all reducers in to one
