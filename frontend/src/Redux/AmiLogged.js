import { isLoggedIn } from "./actions";

import Cookies from "js-cookie";
const getcookie = Number(Cookies.get("token"));
const AmiLogged = (state = getcookie ? true : false, action) => {
  switch (action.type) {
    case "CHECK_IF_LOGGED_IN":
      return isLoggedIn(action, state);
    default:
      return state;
  }
};

export default AmiLogged;
