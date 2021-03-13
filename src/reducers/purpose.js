const purposeReducer = (state = "", action) => {
  switch (action.type) {
    case "SETPURPOSE":
      return action.purpose;
    default:
      return state;
  }
};

export default purposeReducer;