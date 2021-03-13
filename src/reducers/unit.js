const unitReducer = (state = "XXXX", action) => {
  switch (action.type) {
    case "SETUNIT":
      return action.unit;
    default:
      return state;
  }
};

export default unitReducer;