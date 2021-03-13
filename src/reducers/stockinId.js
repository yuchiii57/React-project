const stockinIdReducer = (state = "XXXX", action) => {
  switch (action.type) {
    case "SETSTOCKINID":
      return action.stockinId;
    default:
      return state;
  }
};

export default stockinIdReducer;
