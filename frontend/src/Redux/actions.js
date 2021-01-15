export const incrementMe = (action, state) => {
  return action.action + state;
};

export const changeName = (action, state) => {
  const { name, age } = action.data;

  return { name: name, age: age };
};

//EDIT CONVERSATION ID TO SEND TO BACKEND
export const changeConversationID = (action, state) => {
  console.log(action, "action");

  return action.action;
};
//--end
// Functions to reducers!
