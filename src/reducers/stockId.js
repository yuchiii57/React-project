const stockIdReducer = (state = "XXXX", action) => {
  switch (action.type) {
    case "SETSTOCKID":
      return action.stockId;
    default:
      return state;
  }
};

export default stockIdReducer;
