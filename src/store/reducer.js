const initState = {
  address: "",
  userId: -1,
  inviteContract: "0x3ac45D38391E59F1b1C1Fc49B12CDC003295cD1b",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };

    case "CHANGE_USER":
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
