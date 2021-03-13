const invoiceReducer = (state = "", action) => {
  switch (action.type) {
    case "SETINVOICE":
      return action.invoice;
    default:
      return state;
  }
};

export default invoiceReducer;