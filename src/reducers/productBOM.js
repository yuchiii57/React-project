const productBOMReducer = (state = [], action) => {
  switch (action.type) {
    case "SETPRODUCTBOM":
      return action.productBOM;
    default:
      return state;
  }
};

export default productBOMReducer;