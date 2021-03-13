const privilegeReducer = (state = [], action) => {
  switch (action.type) {
    case "SETPRIVILEGE":
      return action.privilege;
    default:
      return state;
  }
};

export default privilegeReducer;
