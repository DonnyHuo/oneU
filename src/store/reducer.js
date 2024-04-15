const initState = {
  address: "",
  userId: -1,
  inviteContract: "0xeafc4f68773B9e130678267105c5df65c44B5E9f",
  poolManager: '0xfC3504C442cF3946095E02073dB5b9D88693A778',
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
