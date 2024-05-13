const initState = {
  address: "",
  userId: -1,
  inviteContract: "0xd085ffeB0719134DB8E117C5b6106aBC35bBe20C",
  poolManager: "0x1532214641bF5FFE476EFbd7cEb3B36aB37Cc952",
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
    case "CHANGE_INVITE_CONTRACT":
      return {
        ...state,
        inviteContract: action.payload,
      };
    case "CHANGE_POOL_MANAGER":
      return {
        ...state,
        poolManager: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
