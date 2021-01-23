import { isLoggedIn } from "./actions";

const AmiLogged = (state = null, action) => {
  switch (action.type) {
    case "CHECK_IF_LOGGED_IN":
      return isLoggedIn(action, state);
    default:
      return state;
  }
};

export default AmiLogged;
