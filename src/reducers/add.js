const addReducer = (state = false, action) => {
  switch (action.type) {
    case "SETADD":
      return action.add;
    default:
      return state;
  }
};

export default addReducer;