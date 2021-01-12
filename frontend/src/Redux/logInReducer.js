import { changeName } from "./actions";
const loginReducer = (state = { name: "gg" }, action) => {
  switch (action.type) {
    case "LOG_IN":
      return true;
    case "LOGOUT":
      return false;
    case "CHANGE_NAME":
      return changeName(action, state);
    default:
      return state;
  }
};

export default loginReducer;
