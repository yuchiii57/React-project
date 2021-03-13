const casebaseReducer = (state = "false", action) => {
  switch (action.type) {
    case "SETCASEBASE":
      return action.casebase;
    default:
      return state;
  }
};

export default casebaseReducer;
