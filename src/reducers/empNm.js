const empNmReducer = (state = "XXXX", action) => {
  switch (action.type) {
    case "SETEMPNM":
      return action.empNm;
    default:
      return state;
  }
};

export default empNmReducer;