const expiredDayReducer = (state = 0, action) => {
  switch (action.type) {
    case "SETEXPIREDDAY":
      return action.expiredDay;
    default:
      return state;
  }
};

export default expiredDayReducer;