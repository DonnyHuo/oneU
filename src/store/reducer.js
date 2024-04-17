const initState = {
  address: "",
  userId: -1,
  inviteContract: "0xeafc4f68773B9e130678267105c5df65c44B5E9f",
  poolManager: "0x3f14762c2CE63F561514E8Bc10CfE1D159291A68",
  reModalOpen: false,
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
    case "CHANGE_REMODAL":
      return {
        ...state,
        reModalOpen: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
