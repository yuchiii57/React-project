const capacityReducer = (state = 0, action) => {
  switch (action.type) {
    case "SETCAPACITY":
      return action.capacity;
    default:
      return state;
  }
};

export default capacityReducer;
