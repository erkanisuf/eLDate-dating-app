import { updateMyProfileState } from "./actions";

const myprofile = {
  fullname: "",
  nickname: "",
  description: "",
  sex: "",
  relationship: "",
  searching: "",
  height: "",
  phone: "",
  weight: "",
  city: "",
  country: "",
  age: "",
  images: [],
};
const myProfileReducer = (state = myprofile, action) => {
  switch (action.type) {
    case "FETCH_MY_PROFILE":
      return updateMyProfileState(action, state);

    default:
      return state;
  }
};

export default myProfileReducer;
