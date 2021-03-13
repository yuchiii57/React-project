const priceReducer = (state = 0, action) => {
  switch (action.type) {
    case "SETPRICE":
      return action.price;
    default:
      return state;
  }
};

export default priceReducer;