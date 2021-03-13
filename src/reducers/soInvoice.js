const soInvoiceReducer = (state = "", action) => {
  switch (action.type) {
    case "SETSOINVOICE":
      return action.soInvoice;
    default:
      return state;
  }
};

export default soInvoiceReducer;