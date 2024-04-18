import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message, Button } from "antd";
import { getContract, getWriteContractLoad } from "../../utils";
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";
import poolManagerAbi from "../../asserts/abi/poolManagerAbi.json";
import inviteAbi from "../../asserts/abi/inviteAbi.json";
import erc20Abi from "../../asserts/abi/erc20Abi.json";
import { ethers } from "ethers";

function Referral() {
  const { walletProvider } = useWeb3ModalProvider();
  const union = require("../../asserts/img/union.png");
  const address = useSelector((state) => state.address);
  const userId = useSelector((state) => state.userId);

  const [messageApi, contextHolder] = message.useMessage();
  const copyInfo = () => {
    messageApi.success("Copied Success!");
    navigator.clipboard.writeText(userId);
  };

  const poolManager = useSelector((state) => state.poolManager);

  // get ReferralReward
  const [rewardAccumulated, setRewardAccumulated] = useState(0);
  const [rewardAccrued, setRewardAccrued] = useState(0);
  const [usdtSymbol, setUsdtSymbol] = useState("USDT");
  const referralRewardAccumulated = async () => {
    // 获取usdt信息
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
    const symbol = await getContract(walletProvider, usdt, erc20Abi, "symbol");
    setUsdtSymbol(symbol);

    const rewardAccumulated = await getContract(
      walletProvider,
      poolManager,
      poolManagerAbi,
      "referralRewardAccumulated",
      address
    );
    setRewardAccumulated(
      ethers.utils.formatUnits(rewardAccumulated, decimals) * 1
    );

    const rewardAccrued = await getContract(
      walletProvider,
      poolManager,
      poolManagerAbi,
      "referralRewardAccured",
      address
    );
    setRewardAccrued(ethers.utils.formatUnits(rewardAccrued, decimals) * 1);
  };

  useEffect(() => {
    address && referralRewardAccumulated();
  }, [address]);

  // collectReferralReward
  const [rewardLoading, setRewardLoading] = useState(false);
  const collectReferralReward = async () => {
    setRewardLoading(true);
    await getWriteContractLoad(
      walletProvider,
      poolManager,
      poolManagerAbi,
      "collectReferralReward",
      address
    )
      .then((res) => {
        setRewardLoading(false);
        messageApi.success("Claim Success!");
        referralRewardAccumulated();
      })
      .catch((err) => {
        setRewardLoading(false);
        messageApi.error("Claim Fail!");
        console.log(err);
      });
  };

  const [childrenCountOf, setChildrenCountOf] = useState(0);
  const inviteContract = useSelector((state) => state.inviteContract);
  //获取参与人数
  const getChildrenCountOf = async () => {
    const childrenCountOf = await getContract(
      walletProvider,
      inviteContract,
      inviteAbi,
      "childrenCountOf",
      userId
    );
    setChildrenCountOf(childrenCountOf.toString());
  };

  useEffect(() => {
    address && userId > -1 ? getChildrenCountOf() : setChildrenCountOf("--");
  }, [address, userId]);

  return (
    <div className="_background1 _title">
      <div className="_background-referral">
        <div
          className="pt-20 pb-20 flex items-center justify-between _referralHome _paddingTB"
          style={{ backgroundImage: `url(${union})` }}
        >
          <div className="_tipsBox _marginLR">
            <div className="text-5xl _referralTitle _size20 _lineHeight30">
              <p>Invite friends. Earn 3%</p>
              <p>commission on each friend’s participate.</p>
            </div>
            <div className="flex items-center justify-center _hiddenP">
              <img
                style={{ width: "300px", marginTop: "20px" }}
                src={require("../../asserts/img/reward.png")}
                alt=""
              />
            </div>
            <div
              className="flex items-center mt-10 _marginAutoM"
              style={{ maxWidth: "500px" }}
            >
              <div
                className="h-10 _border flex items-center justify-between pr-3 pl-3 rounded-lg text-sm _background-code"
                style={{ width: "70%" }}
              >
                <span className="_text font-medium">Invite Code</span>
                <div className="flex items-center">
                  <span className="pr-4">
                    {userId * 1 === -1 ? "--" : userId}
                  </span>
                  {contextHolder}
                  <button className="mx-1 _active" onClick={copyInfo}>Copy</button>
                </div>
              </div>
              <button className="_borderS h-10 pr-6 pl-6 rounded-lg ml-6 flex items-center justify-center text-sm">
                Invite <span className="_hiddenM pl-1"> Friends</span>
              </button>
            </div>
          </div>
          <div className="pr-4 _hiddenM">
            <img
              style={{ width: "352px" }}
              src={require("../../asserts/img/reward.png")}
              alt=""
            />
          </div>
        </div>
        <div>
          <div
            className="_tipsBox mt-10 _marginLR"
            style={{
              maxWidth: "1182px",
              margin: "0 auto",
            }}
          >
            <div className="_tipsTitle text-lg mb-6">My Comission</div>
            <div className="text-xs _text ">
              <div className="rounded-xl px-5 py-12 _background-gradient5 _M100 _border flex items-center text-center _flexM">
                <div className="w-3/12 border-r border-zinc-800">
                  <div className="text-2xl _active font-bold">{childrenCountOf}</div>
                  <p className="pt-4 text-xs">Friends</p>
                </div>
                <div className="w-4/12 flex items-center justify-center border-r border-zinc-800">
                  <div className="">
                    <div className="flex items-center">
                      <img
                        className="w-8 pr-2"
                        src={require("../../asserts/img/USDT.png")}
                        alt=""
                      />
                      <span className="text-2xl text-white font-bold">
                        {address ? rewardAccumulated - rewardAccrued : "--"}{" "}
                        {usdtSymbol}
                      </span>
                    </div>
                    <p className="pt-4 text-xs">Claimed comission</p>
                  </div>
                </div>
                <div className="w-5/12 flex items-end justify-center">
                  <div className="">
                    <div className="flex items-center">
                      <img
                        className="w-8 pr-2"
                        src={require("../../asserts/img/USDT.png")}
                        alt=""
                      />
                      <span className="text-2xl text-white font-bold">
                        {address ? rewardAccrued : "--"} {usdtSymbol}
                      </span>
                    </div>
                    <p className="pt-4 text-xs">Unclaimed comission</p>
                  </div>
                  {contextHolder}
                  <Button
                    disabled={!rewardAccrued}
                    loading={rewardLoading}
                    onClick={collectReferralReward}
                    className="_background-gradient2 h-10 pr-12 pl-12 rounded-full flex items-center justify-center text-sm text-white ml-10"
                  >
                    Claim
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="_tipsBox"
          style={{
            maxWidth: "1182px",
            margin: "0 auto",
            marginTop: "50px",
            paddingBottom: "100px",
            overflow: "hidden",
          }}
        >
          <div className="_tipsTitle text-lg">Tips</div>
          <div className="text-xs _text flex items-start justify-between mt-6 relative pb-10 pt-10 _tips _background-gradient5 rounded-xl _border">
            <div className="w-1/4 flex flex-col items-center _tipDiv">
              <img
                className="w-16 text-center"
                src={require("../../asserts/img/i1.png")}
                alt=""
              />
              <div className="text-center mt-4 _desc">
                1. Share your invite code with friends.
              </div>
            </div>
            <div className="w-1/4 flex flex-col items-center _tipDiv">
              <img
                className="w-16"
                src={require("../../asserts/img/i2.png")}
                alt=""
              />
              <div className="text-center mt-4 _desc">
                2. Invite friends to sign up and enter your invite code.
              </div>
            </div>
            <div className="w-1/4 flex flex-col items-center _tipDiv _paddingBNo">
              <img
                className="w-16"
                src={require("../../asserts/img/i3.png")}
                alt=""
              />
              <div className="text-center mt-4 _desc">
                3. Receive commission from each friend’s participate.
              </div>
            </div>
            <div
              className="absolute flex items-center _hiddenM"
              style={{ width: "22%", left: "20%", top: "36%" }}
            >
              <img
                style={{ width: "300px", height: "1px" }}
                src={require("../../asserts/img/line.png")}
                alt=""
              />
              <img
                className="ml-1"
                style={{ width: "5px" }}
                src={require("../../asserts/img/icon.png")}
                alt=""
              />
            </div>
            <div
              className="absolute flex items-center _hiddenM"
              style={{ width: "22%", right: "20%", top: "36%" }}
            >
              <img
                style={{ width: "300px", height: "1px" }}
                src={require("../../asserts/img/line.png")}
                alt=""
              />
              <img
                className="ml-1"
                style={{ width: "5px" }}
                src={require("../../asserts/img/icon.png")}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Referral;
