import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers5/react";

import { shortStr, getContract } from "../../utils";
import { Drawer } from "antd";

import { useSelector, useDispatch } from "react-redux";

import inviteAbi from "../../asserts/abi/inviteAbi.json";

const Header = () => {
  const location = useLocation();
  const logoIcon = require("../../asserts/img/logo.png");
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  

  const { open } = useWeb3Modal();
  
  const chainList = [
    {
      networkId: 1,
      name: "Ethereum",
      url: require("../../asserts/img/ETH.png"),
    },
    {
      networkId: 42161,
      name: "Arbitrum",
      url: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029",
    },
    {
      networkId: 11155111,
      name: "Sepolia",
      url: require("../../asserts/img/ETH.png"),
    },
  ];

  const selectNetworkIcon = (chainId) => {
    return chainList.filter((list) => list.networkId == chainId)[0];
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const { walletProvider } = useWeb3ModalProvider()

  // get userID fun
  const dispatch = useDispatch();
  const inviteContract = useSelector((state) => state.inviteContract);

  const getUserId = async () => {
    const userId = await getContract(
      walletProvider,
      inviteContract,
      inviteAbi,
      "getUserId",
      address
    );
    dispatch({ type: "CHANGE_USER", payload: userId.toString() });
    
    
    console.log('userId', userId.toString())
  };

  useEffect(() => {
    // get userId
    address && getUserId();
    // save address
    dispatch({ type: "CHANGE_ADDRESS", payload: address });
  }, [address]);

  return (
    <div className="h-18 flex items-center justify-between pl-5 pr-5 border-spacing-1 text-white _background1 _line relative">
      <div>
        <img className="h-5 mt-6 mb-6" src={logoIcon} />
      </div>
      <div
        className="flex items-center font-medium _hiddenM"
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translate(-50%)",
        }}
      >
        <Link
          className={`ml-6 mr-6 ${
            location.pathname === "/" ? "_active" : "_title"
          }`}
          to="/"
        >
          Lottery
        </Link>
        <Link
          className={`ml-6 mr-6 ${
            location.pathname === "/referral" ? "_active" : "_title"
          }`}
          to="/referral"
        >
          Referral
        </Link>
        <Link
          className={`ml-6 mr-6 ${
            location.pathname === "/tutorials" ? "_active" : "_title"
          }`}
          to="/tutorials"
        >
          Tutorials
        </Link>
        <a
          target="_blank"
          href="https://www.google.com"
          className={`ml-6 mr-6 ${
            location.pathname === "/discord" ? "_active" : "_title"
          }`}
        >
          Discord
        </a>
      </div>
      <div className="flex items-center">
        {/* <w3m-button /> */}
        {isConnected && (
          <button
            className="_border rounded-full p-2 md:pl-4 md:pr-4 text-sm mr-2 flex items-center"
            onClick={() => open({ view: "Networks" })}
          >
            <img className="w-5" src={selectNetworkIcon(chainId)?.url} />
            <span className="ml-2 _hiddenM">{selectNetworkIcon(chainId)?.name}</span>
          </button>
        )}

        <button
          className="_borderS rounded-full p-2 md:pl-4 md:pr-4 text-sm"
          onClick={() => open()}
        >
          {address ? (
            <div className="flex items-center">
              <img
                className="w-5"
                src={require("../../asserts/img/connect.png")}
              />
              <span className="pl-2 _hiddenM">{shortStr(address, 5, 4)}</span>
            </div>
          ) : (
            "Connect Wallet"
          )}
        </button>
        <button
          className="flex items-center justify-center _borderS rounded-full p-2 ml-2 _hiddenP"
          onClick={showDrawer}
        >
          <img
            style={{ transform: openDrawer ? "rotate(90deg)" : "rotate(0deg)" }}
            className="w-5"
            src={require("../../asserts/img/menu.png")}
          />
        </button>
      </div>
      <Drawer width={300} closeIcon={false} onClose={onClose} open={openDrawer}>
        <div className="drawerTitle">
          <img className="w-20" src={require("../../asserts/img/logo.png")} />
          <img
            className="w-5 mr-1"
            src={require("../../asserts/img/drawerClose.png")}
            onClick={onClose}
          />
        </div>
        <div className="text-lg">
          <p className="pt-5 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6 flex items-center justify-between ${
                location.pathname === "/" ? "_active" : ""
              }`}
              to="/"
            >
              <span>Lottery</span>
              <img
                className="w-4"
                src={require("../../asserts/img/drawerRight.png")}
              />
            </Link>
          </p>
          <p className="pt-5 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/referral" ? "_active" : ""
              }`}
              to="/referral"
            >
              <span>Referral</span>
              <img
                className="w-4"
                src={require("../../asserts/img/drawerRight.png")}
              />
            </Link>
          </p>
          <p className="pt-5 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/tutorials" ? "_active" : ""
              }`}
              to="/tutorials"
            >
              <span>Tutorials</span>
              <img
                className="w-4"
                src={require("../../asserts/img/drawerRight.png")}
              />
            </Link>
          </p>
          <p className="pt-5 pb-5" onClick={onClose}>
            <a
              target="_blank"
              href="https://www.google.com"
              className={`ml-6 mr-6  flex items-center justify-between ${
                location.pathname === "/discord" ? "_active" : ""
              }`}
            >
              <span>Discord</span>
              <img
                className="w-4"
                src={require("../../asserts/img/drawerRight.png")}
              />
            </a>
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
