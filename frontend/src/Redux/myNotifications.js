import { msgNotific } from "./actions";

const myNotifications = (state = { messages: [], matches: [] }, action) => {
  switch (action.type) {
    case "MESSAGE_NOTIFICATIONS":
      return msgNotific(action, state);

    default:
      return state;
  }
};

export default myNotifications;
