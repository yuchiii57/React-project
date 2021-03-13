const costReducer = (state = 0, action) => {
  switch (action.type) {
    case "SETCOST":
      return action.cost;
    default:
      return state;
  }
};

export default costReducer;