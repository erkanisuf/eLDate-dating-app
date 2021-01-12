export const incrementMe = (action, state) => {
  console.log(action, "action");
  console.log(state, "state");
  return action.action + state;
};

export const changeName = (action, state) => {
  const { name, age } = action.data;
  console.log(action, "action");
  console.log(state, "state");
  return { name: name, age: age };
};

// Functions to reducers!
