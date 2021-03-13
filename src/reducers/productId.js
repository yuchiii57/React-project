const productIdReducer = (state = "XXXX", action) => {
  switch (action.type) {
    case "SETPRODUCTID":
      return action.productId;
    default:
      return state;
  }
};

export default productIdReducer;