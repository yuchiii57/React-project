const invoiceNoReducer = (state = "", action) => {
  switch (action.type) {
    case "SETINVOICENO":
      return action.invoiceNo;
    default:
      return state;
  }
};

export default invoiceNoReducer;