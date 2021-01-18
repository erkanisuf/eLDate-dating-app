import { updateMyConversations, pushToMyConversations } from "./actions";

const myProfileReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_MY_CONVERSATIONS":
      return updateMyConversations(action, state);
    case "PUSH_TO_MY_CONVERSATIONS_NODB":
      return pushToMyConversations(action, state);
    default:
      return state;
  }
};

export default myProfileReducer;
