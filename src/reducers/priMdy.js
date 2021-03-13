const priMdyReducer = (state = [], action) => {
  switch (action.type) {
    case "SETPRIMDY":
      return action.priMdy;
    default:
      return state;
  }
};

export default priMdyReducer;