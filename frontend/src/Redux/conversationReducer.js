import { changeConversationID } from "./actions";
const conversationReducer = (state = null, action) => {
  switch (action.type) {
    case "CHANGE_CONVERSATION_ID":
      return changeConversationID(action, state);

    default:
      return state;
  }
};

export default conversationReducer;
