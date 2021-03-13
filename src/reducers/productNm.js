const productNmReducer = (state = "XXXX", action) => {
  switch (action.type) {
    case "SETPRODUCTNM":
      return action.productNm;
    default:
      return state;
  }
};

export default productNmReducer;