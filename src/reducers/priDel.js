const priDelReducer = (state = [], action) => {
  switch (action.type) {
    case "SETPRIDEL":
      return action.priDel;
    default:
      return state;
  }
};

export default priDelReducer;