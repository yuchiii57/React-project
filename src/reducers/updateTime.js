const updateTimeReducer = (state = "12:59", action) => {
  switch (action.type) {
    case "SETUPDATETIME":
      return action.updateTime;
    default:
      return state;
  }
};

export default updateTimeReducer;
