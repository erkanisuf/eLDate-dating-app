// const incrementMe = (action, state) => {
//   console.log(action, "action");
//   console.log(state, "state");
//   return action.action + state;
// };
import { incrementMe } from "./actions";
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      //   return state + 1;
      return incrementMe(action, state);
    case "DECREMENT":
      return incrementMe(action, state);
    default:
      return state;
  }
};

export default counterReducer;
