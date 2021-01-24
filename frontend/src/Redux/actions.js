export const incrementMe = (action, state) => {
  return action.action + state;
};

export const reTriggerFunc = (action, state) => {
  return !state;
};

//EDIT CONVERSATION ID TO SEND TO BACKEND
export const changeConversationID = (action, state) => {
  return action.action;
};
//--end
// Functions to reducers!

//My Profile Fetching Update

export const updateMyProfileState = (action, state) => {
  return action.action;
};

//MY CONVERSATIONS Fetch updating
export const updateMyConversations = (action, state) => {
  return action.action;
};
//Pushes to Conversations but not DB (Only so user can see it in front end )
export const pushToMyConversations = (action, state) => {
  console.log(action, "action");
  console.log(state, "astaa");
  const copyState = [...state];
  console.log(copyState, "cop");
  copyState.push(action.action);

  return state.push(action.action);
};
// Am i Logged in
export const isLoggedIn = (action, state) => {
  return action.action;
};

//reset profile on logout
export const profileReset = (action, state) => {
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
  return myprofile;
};
