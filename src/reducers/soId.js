const soIdReducer = (state = "XXXX", action) => {
  switch (action.type) {
    case "SETSOID":
      return action.soId;
    default:
      return state;
  }
};

export default soIdReducer;
