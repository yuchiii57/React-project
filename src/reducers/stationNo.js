const stationNoReducer = (state = "S00001", action) => {
  switch (action.type) {
    case "SETSTATIONNO":
      return action.stationNo;
    default:
      return state;
  }
};

export default stationNoReducer;
