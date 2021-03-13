const empIdReducer = (state = "XXXXX", action) => {
  switch (action.type) {
    case "SETEMPID":
      return action.empId;
    default:
      return state;
  }
};

export default empIdReducer;