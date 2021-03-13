const carbonReductionReducer = (state = 0, action) => {
  switch (action.type) {
    case "SETCARBONREDUCTION":
      return action.carbonReduction;
    default:
      return state;
  }
};

export default carbonReductionReducer;
