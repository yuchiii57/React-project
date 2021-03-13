const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "SETLOGGED":
      return action.logged;
    default:
      return state;
  }
};

export default loggedReducer;
