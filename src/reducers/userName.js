const userNameReducer = (state = "0", action) => {
  switch (action.type) {
    case "SETUSERNAME":
      return action.userName;
    default:
      return state;
  }
};

export default userNameReducer;
