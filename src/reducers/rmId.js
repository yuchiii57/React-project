const rmIdReducer = (state = "XXXX", action) => {
  switch (action.type) {
    case "SETRMID":
      return action.rmId;
    default:
      return state;
  }
};

export default rmIdReducer;