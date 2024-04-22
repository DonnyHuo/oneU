import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useDisconnect,
} from "@web3modal/ethers5/react";
import {
  shortStr,
  getContract,
  getWriteContractLoad,
  chainList,
} from "../../utils";
import { Drawer, message, Button, Modal, Popover } from "antd";
import { useSelector, useDispatch } from "react-redux";
import poolManagerAbi from "../../asserts/abi/poolManagerAbi.json";
import inviteAbi from "../../asserts/abi/inviteAbi.json";
import { ethers } from "ethers";
import { erc20Abi } from "viem";
import { useInterval } from "../../hooks/useInterval";

const Header = () => {
  const location = useLocation();
  const logoIcon = require("../../asserts/img/logo.png");
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const { walletProvider } = useWeb3ModalProvider();

  const { open } = useWeb3Modal();

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

  // get userID fun
  const dispatch = useDispatch();
  const inviteContract = useSelector((state) => state.inviteContract);

  const reModalOpen = useSelector(
    (state) => state.reModalOpen,
    (pre, next) => pre === next
  );

  const getUserId = async () => {
    const userId = await getContract(
      walletProvider,
      inviteContract,
      inviteAbi,
      "getUserId",
      address
    );
    dispatch({ type: "CHANGE_USER", payload: userId.toString() });
  };

  useEffect(() => {
    // get userId
    address ? getUserId() : dispatch({ type: "CHANGE_USER", payload: "--" });
    // save address
    dispatch({ type: "CHANGE_ADDRESS", payload: address });
  }, [address, chainId]);

  const [code, setCode] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);

  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    dispatch({ type: "CHANGE_REMODAL", payload: userId * 1 === 0 });
  }, [userId]);

  const [messageApi, contextHolder] = message.useMessage();

  // user signup
  const signUp = () => {
    setSignUpLoading(true);
    getWriteContractLoad(
      walletProvider,
      inviteContract,
      inviteAbi,
      "signUp",
      code ? code * 1 : 0
    )
      .then((res) => {
        setSignUpLoading(false);
        dispatch({ type: "CHANGE_REMODAL", payload: false });
        setCode("");
        messageApi.success("Registration Success!");
        getUserId();
      })
      .catch((err) => {
        setSignUpLoading(false);
        messageApi.error("registration failed!");
        console.log(err);
      });
  };

  const [openUserAccount, setOpenUserAccount] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpenUserAccount(newOpen);
  };

  const { disconnect } = useDisconnect();

  const [ETHBalance, setETHBalance] = useState("--");
  const [USDTBalance, setUSDTBalance] = useState("--");
  const getBalance = async () => {
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const balanceOf = await ethersProvider.getBalance(address);
    const balance = parseFloat(
      (ethers.utils.formatUnits(balanceOf, 18) * 1).toFixed(3)
    );
    setETHBalance(balance);
  };

  const poolManager = useSelector((state) => state.poolManager);

  const getUSDTBalance = async () => {
    const usdt = await getContract(
      walletProvider,
      poolManager,
      poolManagerAbi,
      "usdt"
    );
    const decimals = await getContract(
      walletProvider,
      usdt,
      erc20Abi,
      "decimals"
    );
    const balanceOf = await getContract(
      walletProvider,
      usdt,
      erc20Abi,
      "balanceOf",
      address
    );
    const balance = parseFloat(
      (ethers.utils.formatUnits(balanceOf, decimals) * 1).toFixed(3)
    );
    setUSDTBalance(balance);
  };
  
  useInterval(()=>{
    address ? getBalance() : setETHBalance("--");
    address ? getUSDTBalance() : setUSDTBalance("--");
  }, 2000)

  const AccountContent = () => {
    const copy = (address) => {
      messageApi.success("Copied Success!");
      navigator.clipboard.writeText(address);
    };
    return (
      <div className="font-medium">
        {contextHolder}
        <div
          className="flex items-center pb-3 border-b border-zinc-800 cursor-pointer"
          onClick={() => copy(address)}
        >
          <img
            className="w-7"
            src={require("../../asserts/img/connect.png")}
            alt=""
          />
          <span className="px-2">{shortStr(address)}</span>

          <img
            className="w-3"
            src={require("../../asserts/img/copy.png")}
            alt=""
          />
        </div>
        <div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center">
              <img
                className="w-6"
                src={require("../../asserts/img/USDT.png")}
                alt=""
              />
              <span className="ml-2">USDT</span>
            </div>
            <div>{USDTBalance}</div>
          </div>
          <div className="flex items-center justify-between mt-5 pb-5 border-b border-zinc-800">
            <div className="flex items-center">
              <img
                className="w-6"
                src={require("../../asserts/img/ETH.png")}
                alt=""
              />
              <span className="ml-2">ETH</span>
            </div>
            <div>{ETHBalance}</div>
          </div>
        </div>
        <div className="text-center">
          <button
            className="mt-5 w-full h-11 rounded"
            style={{ background: "#2A2539" }}
            onClick={() => {
              setOpenUserAccount(false);
              disconnect();
            }}
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-18 flex items-center justify-between pl-5 pr-5 border-spacing-1 text-white _background1 _line relative">
      <div>
        <Link to="/">
          <img className="h-5 mt-6 mb-6" src={logoIcon} alt="" />
        </Link>
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
        <a
          target="_blank"
          href="https://www.alchemy.com/faucets/ethereum-sepolia"
        >
          <button className="_border rounded-full p-2 md:pl-4 md:pr-4 text-sm mr-2 flex items-center">
            <img
              className="h-5"
              src={require("../../asserts/img/faucets.png")}
              alt=""
            />
            <span className="ml-2 _hiddenM">Faucets</span>
          </button>
        </a>

        {isConnected && (
          <button
            className="_border rounded-full p-2 md:pl-4 md:pr-4 text-sm mr-2 flex items-center"
            onClick={() => open({ view: "Networks" })}
          >
            <img className="w-5" src={selectNetworkIcon(chainId)?.url} alt="" />
            <span className="ml-2 _hiddenM">
              {selectNetworkIcon(chainId)?.name}
            </span>
          </button>
        )}

        <button
          className={`_border rounded-full p-2 md:pl-4 md:pr-4 text-sm ${
            address ? "_borderW" : "_borderS pl-4 pr-4"
          }`}
        >
          {address ? (
            <Popover
              content={<AccountContent />}
              trigger="click"
              placement="bottomRight"
              arrow={false}
              color={"#1C172A"}
              open={openUserAccount}
              onOpenChange={handleOpenChange}
              overlayClassName="accountInfo"
            >
              <div className="flex items-center">
                <img
                  className="w-5"
                  src={require("../../asserts/img/connect.png")}
                  alt=""
                />
                <span className="pl-2 _hiddenM">{shortStr(address, 5, 4)}</span>
              </div>
            </Popover>
          ) : (
            <span onClick={() => open()}>Connect Wallet</span>
          )}
        </button>
        <button
          className="flex items-center justify-center _borderW rounded-full p-2 ml-2 _hiddenP"
          onClick={showDrawer}
        >
          <img
            style={{ transform: openDrawer ? "rotate(90deg)" : "rotate(0deg)" }}
            className="w-5"
            src={require("../../asserts/img/menu.png")}
            alt=""
          />
        </button>
      </div>
      <Drawer
        width={"80vw"}
        closeIcon={false}
        onClose={onClose}
        open={openDrawer}
      >
        <div className="drawerTitle">
          <img
            className="h-5 mt-6 mb-6"
            src={require("../../asserts/img/logo.png")}
            alt=""
          />
          <img
            className="w-5 mr-1"
            src={require("../../asserts/img/drawerClose.png")}
            onClick={onClose}
            alt=""
          />
        </div>
        <div className="text-lg">
          <p className="pt-5 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6 flex items-center justify-between ${
                location.pathname === "/" && location.search === ""
                  ? "_active"
                  : ""
              }`}
              to="/"
            >
              <span>Lottery</span>
              <img
                className="w-4"
                src={require("../../asserts/img/drawerRight.png")}
                alt=""
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
                alt=""
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
                alt=""
              />
            </Link>
          </p>
          <p className="pt-5 pb-5" onClick={onClose}>
            <Link
              className={`ml-6 mr-6 flex items-center justify-between ${
                location.pathname === "/" && location.search === "?reward"
                  ? "_active"
                  : ""
              }`}
              to="/?reward"
            >
              <span>My Reward</span>
              <img
                className="w-4"
                src={require("../../asserts/img/drawerRight.png")}
                alt=""
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
                alt=""
              />
            </a>
          </p>
        </div>
      </Drawer>
      <Modal
        title="Got an invite code?"
        centered
        open={reModalOpen}
        onCancel={() => {
          dispatch({ type: "CHANGE_REMODAL", payload: false });
          setCode("");
        }}
        footer={false}
        closeIcon={
          <img
            className="w-6 mt-3 mr-2"
            src={require("../../asserts/img/closeModal.png")}
            alt=""
          />
        }
        width={420}
        zIndex={10000}
      >
        <p className="mt-5 _nav-title">
          Get an invite code from an existing user to sign up.
        </p>
        <div>
          <input
            value={code}
            onChange={(value) => setCode(value.target.value)}
            className="w-full h-12 rounded-xl outline-none text-white pl-4 pr-4 text-sm mt-5"
            style={{ background: "rgba(42, 37, 57, 1)" }}
            placeholder="Enter invite code"
          />
        </div>
        {contextHolder}
        <Button
          className="w-full h-12 mt-5 _background-gradient2 text-white rounded-full text-sm pt-2 pb-2 pl-5 pr-5 border-0"
          loading={signUpLoading}
          onClick={signUp}
        >
          Proceed
        </Button>
      </Modal>
    </div>
  );
};

export default Header;
