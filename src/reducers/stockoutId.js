const stockoutIdReducer = (state = "XXXXX", action) => {
  switch (action.type) {
    case "SETSTOCKOUTID":
      return action.stockoutId;
    default:
      return state;
  }
};

export default stockoutIdReducer;
