const specReducer = (state = "XXXX", action) => {
  switch (action.type) {
    case "SETSPEC":
      return action.spec;
    default:
      return state;
  }
};

export default specReducer;