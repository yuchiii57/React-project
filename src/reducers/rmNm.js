const rmNmReducer = (state = "XXXX", action) => {
  switch (action.type) {
    case "SETRMNM":
      return action.rmNm;
    default:
      return state;
  }
};

export default rmNmReducer;