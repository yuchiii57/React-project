const createDTReducer = (state = "", action) => {
  switch (action.type) {
    case "SETCREATEDT":
      return action.createDT;
    default:
      return state;
  }
};

export default createDTReducer;