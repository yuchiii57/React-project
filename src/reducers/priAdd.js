const priAddReducer = (state = [], action) => {
  switch (action.type) {
    case "SETPRIADD":
      return action.priAdd;
    default:
      return state;
  }
};

export default priAddReducer;
