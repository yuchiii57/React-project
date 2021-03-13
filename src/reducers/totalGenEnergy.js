const totalGenEnergyReducer = (state = 0, action) => {
  switch (action.type) {
    case "SETTOTALGENENERGY":
      return action.totalGenEnergy;
    default:
      return state;
  }
};

export default totalGenEnergyReducer;
