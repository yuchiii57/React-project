const soPrintReducer = (state = "銷貨", action) => {
  switch (action.type) {
    case "SETSOPRINT":
      return action.soPrint;
    default:
      return state;
  }
};

export default soPrintReducer;