import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { Drawer, notification, Button, Modal, Popover } from "antd";
import { useSelector, useDispatch } from "react-redux";
import poolManagerAbi from "../../asserts/abi/poolManagerAbi.json";
import inviteAbi from "../../asserts/abi/inviteAbi.json";
import { ethers } from "ethers";
import { erc20Abi } from "viem";
import { useInterval } from "ahooks";
import { useTranslation } from "react-i18next";
import { resources } from "../../config";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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

  const [openUserAccount, setOpenUserAccount] = useState(false);

  const [api, contextHolder] = notification.useNotification({
    placement: "topRight",
    top: openUserAccount ? 320 : 0,
    duration: 5,
    maxCount: 10,
    zIndex: 100000,
  });

  const inviteCode = location.search.split("?code=")[1] * 1;
  const [openTips, setOpenTips] = useState(true);

  const inviteFun = () => {
    if (isConnected) {
      if (inviteCode * 1 > 0) {
        if (userId * 1 <= 0) {
          setCode(inviteCode);
          dispatch({ type: "CHANGE_REMODAL", payload: true });
        } else {
          setOpenTips(true);
          if (openTips) {
            notification.open({
              message: t("header.hadRegister"),
              duration: 5,
            });
          }
          dispatch({ type: "CHANGE_REMODAL", payload: false });
          setOpenTips(false);
        }
      }
    } else {
      if (inviteCode * 1 > 0) {
        setCode(inviteCode);
        dispatch({ type: "CHANGE_REMODAL", payload: true });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      inviteFun();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isConnected, address, inviteCode, openTips, userId]);

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
        getUserId();
        setCode("");
        api["success"]({ message: "Registration Success!" });
        setTimeout(() => {
          dispatch({ type: "CHANGE_REMODAL", payload: false });
        }, 2000);
      })
      .catch((err) => {
        setSignUpLoading(false);
        api["error"]({ message: "Registration failed!" });
        console.log(err);
      });
  };

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

  useInterval(
    () => {
      address ? getBalance() : setETHBalance("--");
      address ? getUSDTBalance() : setUSDTBalance("--");
    },
    2000,
    { immediate: true }
  );

  const AccountContent = () => {
    const copy = (address) => {
      api["success"]({ message: t("referral.CopiedSuccess") });
      navigator.clipboard.writeText(address);
    };
    return (
      <div className="font-medium">
        {contextHolder}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 cursor-pointer">
          <div className="flex items-center" onClick={() => copy(address)}>
            <img
              className="w-7"
              src={require("../../asserts/img/connect.png")}
              alt=""
            />
            <span className="px-2">{shortStr(address)}</span>

            <img
              className="w-4 cursor-pointer"
              src={require("../../asserts/img/copy.png")}
              alt=""
            />
          </div>
          <div
            className="rounded-xl _background3 p-2 flex items-center justify-center closeWallet"
            onClick={() => {
              setOpenUserAccount(false);
              disconnect();
            }}
          ></div>
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
          <a href="https://o3swap.com/swap" target="_black">
            <button className="mt-5 w-full h-11 rounded-xl _borderS2 _background-gradient6">
              {t("header.BridgeAndSwap")}
            </button>
          </a>
        </div>
      </div>
    );
  };

  const [openCommunity, setOpenCommunity] = useState(false);
  const OpenCommunityChange = (newOpen) => {
    setOpenCommunity(newOpen);
  };
  const Community = () => {
    return (
      <>
        <div className="p-2 border-b border-neutral-800 font-bold">
          <a
            href="https://discord.com"
            target="_blank"
            className="flex items-center py-2 pl-4 pr-8 rounded-xl cursor-pointer list"
          >
            <img
              className="w-5 mr-2"
              src={require("../../asserts/img/Discord.png")}
              alt=""
            />
            Discord
          </a>
        </div>
        <div className="p-2 border-b border-neutral-800 font-bold">
          <a
            href="https://twitter.com"
            target="_blank"
            className="flex items-center py-2 pl-4 pr-8 rounded-xl cursor-pointer list"
          >
            <img
              className="w-5 mr-2"
              src={require("../../asserts/img/Twitter.png")}
              alt=""
            />
            Twitter
          </a>
        </div>
        <div className="p-2 font-bold">
          <a
            href="https://github.com"
            target="_blank"
            className="flex items-center py-2 pl-4 pr-8 rounded-xl cursor-pointer list"
          >
            <img
              className="w-5 mr-2"
              src={require("../../asserts/img/Github.png")}
              alt=""
            />
            Github
          </a>
        </div>
      </>
    );
  };

  const [openLang, setOpenLang] = useState(false);
  const langOpenChange = (value) => {
    setOpenLang(value);
  };

  const [currentLang, setCurrentLang] = useState(i18n.language);

  const LangList = () => {
    const langArr = [];
    for (let key in resources) {
      langArr.push(key);
    }
    return (
      <div className="cursor-pointer">
        {langArr.map((list) => {
          return (
            <div
              className="w-20 py-1 px-2 text-center rounded-md hover:bg-black"
              onClick={() => {
                setOpenLang(false);
                setCurrentLang(list);
                i18n.changeLanguage(list);
                window.localStorage.setItem('lang', list)
              }}
            >
              {showLang(list)}
            </div>
          );
        })}
      </div>
    );
  };

  const showLang = (lang) => {
    switch (lang) {
      case "en":
        return "English";
      case "zh-CN":
        return "简体中文";
      default:
        return "English";  
    }
  };

  return (
    <div className="h-18 flex items-center justify-between pl-5 pr-5 border-spacing-1 text-white _background1 _line relative">
      <div>
        <Link to="">
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
          {t("header.Lottery")}
        </Link>
        <Link
          className={`ml-6 mr-6 ${
            location.pathname === "/referral" ? "_active" : "_title"
          }`}
          to="/referral"
        >
          {t("header.Referral")}
        </Link>
        <Link
          className={`ml-6 mr-6 ${
            location.pathname === "/tutorials" ? "_active" : "_title"
          }`}
          to="/tutorials"
        >
          {t("header.Tutorials")}
        </Link>

        <Popover
          content={<Community />}
          trigger="click"
          placement="bottom"
          arrow={false}
          color={"#1C172A"}
          open={openCommunity}
          onOpenChange={OpenCommunityChange}
          overlayClassName="communityList"
        >
          <button className="px-6 cursor-pointer flex items-center">
            <span>{t("header.Community")}</span>
            <img
              className={`w-3 ml-1 mt-0.5 ${
                openCommunity ? "rotate-180" : "animate-bounce"
              }`}
              src={require("../../asserts/img/down.png")}
              alt=""
            />
          </button>
        </Popover>
      </div>
      <div className="flex items-center">
        <a
          target="_blank"
          href="https://www.alchemy.com/faucets/ethereum-sepolia"
        >
          <button className="_border rounded-full p-2 text-sm mr-2 flex items-center">
            <img
              className="h-5"
              src={require("../../asserts/img/faucets.png")}
              alt=""
            />
            {/* <span className="ml-2 _hiddenM">{t("header.Faucets")}</span> */}
          </button>
        </a>

        {isConnected && (
          <button
            className="_border rounded-full p-2 text-sm mr-2 flex items-center"
            onClick={() => open({ view: "Networks" })}
          >
            <img className="w-5" src={selectNetworkIcon(chainId)?.url} alt="" />
            {/* <span className="ml-2 _hiddenM">
              {selectNetworkIcon(chainId)?.name}
            </span> */}
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
              <div className="flex items-center justify-between">
                <img
                  className="w-5"
                  src={require("../../asserts/img/connect.png")}
                  alt=""
                />
                <span className="pl-2 _hiddenM">{shortStr(address, 5, 4)}</span>
                <img
                  className="w-3 ml-2 mt-0.5 _hiddenM"
                  src={require("../../asserts/img/walletDown.png")}
                  alt=""
                />
              </div>
            </Popover>
          ) : (
            <span onClick={() => open()}>{t("lottery.ConnectWallet")}</span>
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
        <button>
          <Popover
            content={<LangList />}
            trigger="click"
            placement="bottomRight"
            arrow={false}
            color={"#1C172A"}
            open={openLang}
            onOpenChange={langOpenChange}
            overlayClassName="langList"
          >
            <button className="_border rounded-full p-2 px-4 text-sm ml-2 flex items-center">
              {showLang(currentLang)}
            </button>
          </Popover>
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
              <span>{t("header.Lottery")}</span>
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
              <span>{t("header.Referral")}</span>
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
              <span>{t("header.Tutorials")}</span>
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
              <span>{t("lottery.tabs.MyReward")}</span>
              <img
                className="w-4"
                src={require("../../asserts/img/drawerRight.png")}
                alt=""
              />
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-around absolute bottom-8 w-full">
          <div
            className="rounded-xl w-1/4 h-12"
            style={{ background: "#2a2539" }}
          >
            <a
              target="_blank"
              href="https://discord.com"
              className="w-full h-full flex items-center justify-center"
            >
              <img
                className="w-5"
                src={require("../../asserts/img/discordM.png")}
                alt=""
              />
            </a>
          </div>
          <div
            className="rounded-xl w-1/4 h-12"
            style={{ background: "#2a2539" }}
          >
            <a
              target="_blank"
              href="https://twitter.com"
              className="w-full h-full flex items-center justify-center"
            >
              <img
                className="w-5"
                src={require("../../asserts/img/twitterM.png")}
                alt=""
              />
            </a>
          </div>
          <div
            className="rounded-xl w-1/4 h-12"
            style={{ background: "#2a2539" }}
          >
            <a
              target="_blank"
              href="https://github.com"
              className="w-full h-full flex items-center justify-center"
            >
              <img
                className="w-5"
                src={require("../../asserts/img/githubM.png")}
                alt=""
              />
            </a>
          </div>
        </div>
      </Drawer>
      <Modal
        title={t("header.JoinUs")}
        destroyOnClose={true}
        centered
        maskClosable={false}
        open={reModalOpen}
        onCancel={() => {
          dispatch({ type: "CHANGE_REMODAL", payload: false });
          setCode("");
          navigate();
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
        zIndex={3000}
      >
        <p className="mt-5 _nav-title">{t("header.JoinUsDesc")}</p>
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
          onClick={() => {
            address ? signUp() : open();
          }}
        >
          {address ? t("header.SignUp") : t("lottery.ConnectWallet")}
        </Button>
      </Modal>
    </div>
  );
};

export default Header;
