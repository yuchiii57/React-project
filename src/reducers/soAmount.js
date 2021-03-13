const soAmountReducer = (state = 0, action) => {
  switch (action.type) {
    case "SETSOAMOUNT":
      return action.soAmount;
    default:
      return state;
  }
};

export default soAmountReducer;
