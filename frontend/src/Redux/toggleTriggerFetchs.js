import { reTriggerFunc } from "./actions";
const toggleTriggerFetchs = (state = true, action) => {
  switch (action.type) {
    case "RE_TRIGGER":
      return reTriggerFunc(action, state);
    default:
      return state;
  }
};

export default toggleTriggerFetchs;
