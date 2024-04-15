import { useEffect, useState } from "react";
import { useWeb3ModalProvider } from "@web3modal/ethers5/react";
import { Select, Progress, Popover, Modal, Button, message, Skeleton } from "antd";
import {
  getContract,
  getWriteContractLoad,
  shortStr,
} from "../../utils";
import { useSelector } from "react-redux";
import poolManagerAbi from "../../asserts/abi/poolManagerAbi.json";
import erc20Abi from "../../asserts/abi/erc20Abi.json";
import { ethers } from "ethers";
import moment from "moment";

function Lottery() {
  const { walletProvider } = useWeb3ModalProvider();

  const descList = [
    {
      imgUrl: require("../../asserts/img/square.png"),
      title: "Smart Contract Lottery",
      desc: "Blockchain-based smart contract lotteries offer secure and fair play.",
    },
    {
      imgUrl: require("../../asserts/img/frame.png"),
      title: "Untamper",
      desc: "Information cannot be tampered with, ensuring data integrity.",
    },
    {
      imgUrl: require("../../asserts/img/scales.png"),
      title: "Fair and Just",
      desc: "The drawing information is absolutely fair and just.",
    },
  ];

  const [tab, setTab] = useState(0);

  const [epoch] = useState([
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ]);

  const epochChange = (value) => {
    console.log("value", value);
  };

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isRewardOpen, setIsRewardOpen] = useState(false);

  const [pools, setPools] = useState([]);

  const setShowMoreInfoFun = (index) => {
    const newArr = pools.map((list, ind) => {
      if (index == ind) {
        list.showMore = !list.showMore;
        return list;
      } else {
        return list;
      }
    });

    setPools(newArr);
  };

  const poolManager = useSelector((state) => state.poolManager);
  const address = useSelector((state) => state.address);

  const [loading, setLoading] = useState(true)

  const [rows, setRows] = useState(1)
  const getPoolList = async () => {

    // 获取所有池子的信息
    const pools = [];
    const allPools = await getContract(
      walletProvider,
      poolManager,
      poolManagerAbi,
      "getAllPoolIds"
    );
    setRows(allPools.length)

    // 获取usdt信息
    const usdt = await getContract(
      walletProvider,
      poolManager,
      poolManagerAbi,
      "usdt"
    );
    const symbol = await getContract(walletProvider, usdt, erc20Abi, "symbol");

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
    const balance = ethers.utils.formatUnits(balanceOf, decimals) * 1;

    console.log("decimals", decimals);

    

    for (let i = 0; i < allPools.length; i++) {
      const pool = await getContract(
        walletProvider,
        poolManager,
        poolManagerAbi,
        "getPoolInfo",
        allPools[i]
      );

      const roundInfo = await getContract(
        walletProvider,
        poolManager,
        poolManagerAbi,
        "getRoundInfo",
        allPools[i],
        pool.currentRound
      );

      const resetPool = {
        USDTBalance: balance,
        contractAddress: allPools[i],
        currentRound: pool.currentRound.toString(),
        pricePerTicket: ethers.utils.formatUnits(pool.pricePerTicket, decimals),
        prize: ethers.utils.formatUnits(pool.prize, decimals),
        roundDuration: pool.roundDuration.toString(),
        roundGapTime: pool.roundGapTime.toString(),
        totalTickets: pool.totalTickets.toString(),
        rewardSymbol: symbol,
        roundInfo: {
          endTime: roundInfo.endTime.toString(),
          isClaimed: roundInfo.isClaimed,
          leftTickets: roundInfo.leftTickets.toString(),
          startTime: roundInfo.startTime.toString(),
          vrfRequestId: roundInfo.vrfRequestId.toString(),
          winNumber: roundInfo.winNumber.toString(),
        },
      };

      console.log("resetPool", resetPool);
      
      pools.push(resetPool);
    }
    setLoading(false)

    setPools(pools);
  };

  useEffect(() => {
    walletProvider && address && getPoolList();
  }, [walletProvider, address]);

  const epochOptions = (list) => {
    const options = [];
    for (let i = 0; i < list.length; i++) {
      let option = {
        value: i + 1,
        label: i + 1,
      };
      options.push(option);
    }
    return options;
  };

  const [selectPool, setSelectPool] = useState({});

  const [ticketAmount, setTicketAmount] = useState("");

  const [buyLoading, setBuyLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const buyTicketFun = async () => {
    const reg = /^[1-9]\d*$/;

    if (!reg.test(ticketAmount * 1)) {
      return messageApi.error("no amount");
    }
    setBuyLoading(true);
    await getWriteContractLoad(
      walletProvider,
      poolManager,
      poolManagerAbi,
      "buyTickets",
      selectPool.contractAddress,
      selectPool.currentRound,
      [ticketAmount]
    )
      .then((res) => {
        setBuyLoading(false);
        console.log("res", res);
        messageApi.success("Buy success!");
      })
      .catch((err) => {
        setBuyLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="_background1 _background-home text-center pb-10">
      <div className="_background-home2">
        <div className="text-white">
          <div className="text-6xl font-bold _title _size35 pt-32">
            Win Crypto Lotteries With OneU
          </div>
          <div className="text-sm mt-5 _title _hiddenM">
            Users can win crypto lotteries such as BTC/ETH/SOL assets with just
            1 USDT, trusted by the smart contract.
          </div>
          <div className="text-sm mt-5 _title _hiddenP pr-2 pl-2">
            Users can win crypto lotteries such as USDT assets with just 1 USDT,
            trusted by the smart contract.
          </div>
          <div className="flex items-start justify-around _widthP _marginAuto _widthM _size12">
            {descList.map((list, index) => {
              return (
                <div key={index} className="w-3/12 text-center _widthM-30">
                  <div className="flex items-center justify-center">
                    <img className="w-16" src={list.imgUrl} alt="" />
                  </div>
                  <div className="mt-5 mb-2 font-bold _title">{list.title}</div>
                  <div className="text-sm _nav-title _hiddenM">{list.desc}</div>
                </div>
              );
            })}
          </div>
          <div className="_border p-8 rounded-xl mt-20 _widthP _marginAuto0 _widthM _borderNo _paddingNo">
            <div className="flex items-center text-sm mb-10 _marginBottom _justA">
              <div className="flex items-center font-bold">
                <button
                  className={!tab ? "_title" : "_text"}
                  onClick={() => setTab(0)}
                >
                  Ongoing Lotteries
                </button>
              </div>
              <button
                onClick={() => setTab(1)}
                className={`${tab ? "_title" : "_text"} ml-5 font-bold`}
              >
                My Reward
              </button>
            </div>

            {!tab ? (
              <div className="">
                {pools.map((list, index) => {
                  return (
                    <div
                      key={index}
                      className="rounded-xl p-6 _background-gradient4 mt-6 _border"
                    >
                      <div className="flex items-center justify-between">
                        <div className="_text text-xs">
                          <span className="pr-2">Epoch</span>
                          <Select
                            popupClassName="epochSelect"
                            className="w-20 h-6 _backgroundNo"
                            defaultValue="1"
                            onChange={epochChange}
                            overlayClassName="dropdown-class"
                            options={epochOptions(list.currentRound)}
                            suffixIcon={
                              <img
                                style={{ width: "10px", marginRight: "10px" }}
                                src={require("../../asserts/img/down.png")}
                                alt=""
                              />
                            }
                          />
                          <span className="pl-2 _hiddenM">
                            Next Epoch Start At:{" "}
                            {moment(
                              list?.roundInfo?.endTime * 1000 +
                                list?.roundGapTime * 1000
                            ).format("YYYY-MM-DD HH:mm:ss")}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start justify-between _text text-sm mt-10 text-left _homeListM">
                        <div className="h-24 flex flex-col justify-between">
                          <div>Reward Pool</div>
                          <div className="text-3xl _title _pt-20 _pb-20">
                            <span>{list?.prize * 1}</span>
                            <span className="ml-2">{list?.rewardSymbol}</span>
                          </div>
                          <Popover
                            content={list.contractAddress}
                            placement="top"
                            trigger="click"
                            overlayClassName="_popover"
                            className="_hiddenM"
                          >
                            <button className="leading-6 text-left text-xs underline decoration-slate-400 decoration-1 _popoverBtn">
                              Contract Address
                            </button>
                          </Popover>
                        </div>
                        <div className="h-24 flex flex-col justify-between _hiddenM">
                          <div className="_title">
                            {moment(list?.roundInfo?.endTime * 1000).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </div>
                          <div className="text-xs">Draw Time</div>
                          <div className="_title">
                            {list?.roundInfo?.winNumber * 1 == 0
                              ? "--"
                              : list?.roundInfo?.winNumber}
                          </div>
                          <div className="text-xs">Winning Number</div>
                        </div>
                        <div className="_hiddenP pt-4 mt-4 pb-4 mb-8 _borderLine _hiddenM">
                          <div className="flex item-center justify-between h-6">
                            <div className="text-xs">Draw Time</div>
                            <div className="_title">
                              {moment(list?.roundInfo?.endTime * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            </div>
                          </div>
                          <div className="flex item-center justify-between h-6 _hiddenM">
                            <div className="text-xs">Winning Number</div>
                            <div className="_title">
                              {list?.roundInfo?.winNumber * 1 == 0
                                ? "--"
                                : list?.roundInfo?.winNumber}
                            </div>
                          </div>
                        </div>
                        <div className="h-24 flex flex-col justify-between _title">
                          <div className="_hiddenM">
                            <span>
                              Win {list?.prize * 1} {list?.rewardSymbol} lottery
                              with just
                            </span>
                            <span className="_tip-yellow pl-1">
                              {list?.pricePerTicket * 1}
                              <span className="pl-1">{list?.rewardSymbol}</span>
                            </span>
                            .
                          </div>
                          <div>
                            <Progress
                              percent={
                                (list?.totalTickets * 1 -
                                  list?.roundInfo?.leftTickets * 1) /
                                list?.totalTickets
                              }
                              strokeColor={
                                "linear-gradient(180deg, #CE00FF 0%, #7F00FF 100%)"
                              }
                              trailColor={"rgba(163,159,173, 0.2)"}
                            />
                          </div>
                          <div className="flex items-center justify-between _pt-10">
                            <span>
                              Tickets Purchased:
                              <span className="_active pl-2">
                                {list?.totalTickets * 1 -
                                  list?.roundInfo?.leftTickets * 1}
                              </span>
                            </span>
                            <span className="ml-10">
                              Total Tickets: {list?.totalTickets}
                            </span>
                          </div>
                        </div>
                        <div className="h-24 flex flex-col justify-between">
                          <div>
                            <button
                              className="_borderS rounded-full p-2 pr-12 pl-12 h-10 _title _listBtn"
                              onClick={() => {
                                setIsShareOpen(true);
                                setSelectPool(list);
                                setTicketAmount("");
                              }}
                            >
                              Buy Tickets
                            </button>
                          </div>
                          <div className="_title _justB">
                            <span>
                              Time to end:{" "}
                              {moment(list?.roundInfo.endTime * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            </span>
                            <button
                              className="_hiddenP _yellow font-bold"
                              onClick={() => setShowMoreInfoFun(index)}
                            >
                              more view
                            </button>
                          </div>
                          {list.showMore && (
                            <div className="_hiddenP _orderInfo">
                              <div>
                                <span>Draw Time</span>
                                <span>
                                  {moment(
                                    list?.roundInfo?.endTime * 1000
                                  ).format("YYYY-MM-DD HH:mm:ss")}
                                </span>
                              </div>
                              <div>
                                <span>Winning Number</span>
                                <span>
                                  {list?.roundInfo?.winNumber * 1 == 0
                                    ? "--"
                                    : list?.roundInfo?.winNumber}
                                </span>
                              </div>
                              <div>
                                <span>Contract Address</span>
                                <Popover
                                  content={list.contractAddress}
                                  placement="topRight"
                                  trigger="click"
                                  overlayClassName="_popover"
                                >
                                  <button className="leading-6 text-left text-xs underline decoration-slate-400 decoration-1 _popoverBtn">
                                    {shortStr(list.contractAddress)}
                                  </button>
                                </Popover>
                              </div>
                              <div>
                                <span>Next Epoch Start At</span>
                                <span>
                                  {" "}
                                  {moment(
                                    list?.roundInfo?.endTime * 1000 +
                                      list?.roundGapTime * 1000
                                  ).format("YYYY-MM-DD HH:mm:ss")}
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="pl-2 _hiddenP _hiddenM">
                            Next Epoch Start At:{" "}
                            {moment(
                              list?.roundInfo?.endTime * 1000 +
                                list?.roundGapTime * 1000
                            ).format("YYYY-MM-DD HH:mm:ss")}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <Skeleton active loading={loading} title={false} rows={rows} width={[100, 100]} paragraph={true}></Skeleton>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between _flex-col _mt-5">
                  <div className="_background2 rounded-xl p-6 _w100">
                    <div className="flex items-center">
                      <img
                        className="w-6 mr-2"
                        src={require("../../asserts/img/USDT.png")}
                        alt=""
                      />
                      <span className="text-2xl">1000 USDT</span>
                    </div>
                    <div className="_nav-title text-sm text-left pt-4">
                      Unclaimed Reward
                    </div>
                  </div>
                  <div className="_w100 _mt-5">
                    <div className="flex items-center justify-between _background2 rounded-xl p-6">
                      <div>
                        <div className="flex items-center">
                          <img
                            className="w-6 mr-2"
                            src={require("../../asserts/img/USDT.png")}
                            alt=""
                          />
                          <span className="text-2xl">1000 USDT</span>
                        </div>
                        <div className="_nav-title text-sm text-left pt-4">
                          Unclaimed Reward
                        </div>
                      </div>
                      <Button className="rounded-full _background-gradient2 text-white h-12 pl-16 pr-16">
                        Claim
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="text-left mt-8">
                  <div className="pt-4 pb-4 _borderT font-bold">History</div>
                </div>
                <table className="w-full text-left _table _hiddenM">
                  <thead className="text-sm h-10">
                    <tr className="_nav-title">
                      <th className="font-thin">Pool</th>
                      <th className="font-thin">Epoch</th>
                      <th className="font-thin">Purchased tickets</th>
                      <th className="font-thin">Purchase time</th>
                      <th className="text-right font-thin">
                        Your lottery number
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-14">
                      <td>1,000 USDT</td>
                      <td>1</td>
                      <td>3</td>
                      <td>2024.04.02 00;00:00</td>
                      <td className="text-right">
                        <Button className="tableBtn">check</Button>
                      </td>
                    </tr>
                    <tr className="h-14">
                      <td>1,000 USDT</td>
                      <td>1</td>
                      <td>3</td>
                      <td>2024.04.02 00;00:00</td>
                      <td className="text-right">
                        <Button className="tableBtn">check</Button>
                      </td>
                    </tr>
                    <tr className="h-14">
                      <td>1,000 USDT</td>
                      <td>1</td>
                      <td>3</td>
                      <td>2024.04.02 00;00:00</td>
                      <td className="text-right">
                        <Button className="tableBtn">check</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="_hiddenP">
                  <div className="text-sm mb-4 mt-2">
                    <div className="flex items-center justify-between">
                      <span>1,000 USDT ; Epoch 1</span>
                      <span className="_active">Check Number</span>
                    </div>
                    <div className="flex items-center justify-between _nav-title font-thin mt-2">
                      <span>3 tickets </span>
                      <span> 2024.04.02 00;00:00</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center justify-between">
                      <span>1,000 USDT ; Epoch 1</span>
                      <span className="_active">Check Number</span>
                    </div>
                    <div className="flex items-center justify-between _nav-title font-thin mt-2">
                      <span>3 tickets </span>
                      <span> 2024.04.02 00;00:00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title="Buy Tickets"
        centered
        open={isShareOpen}
        onCancel={() => setIsShareOpen(false)}
        footer={false}
        closeIcon={
          <img
            className="w-6 mt-3 mr-2"
            src={require("../../asserts/img/closeModal.png")}
            alt=""
          />
        }
      >
        <div className="text-white flex items-center justify-between font-bold">
          <span>Tickets</span>
          <span>1 Ticket = {selectPool.pricePerTicket * 1}U</span>
        </div>
        <div
          className="w-full h-12 rounded-xl text-white pl-4 pr-4 text-sm mt-5 flex items-center justify-between"
          style={{ background: "rgba(42, 37, 57, 1)" }}
        >
          <input
            value={ticketAmount}
            onChange={(value) => setTicketAmount(value.target.value)}
            className="h-12 outline-none bg-transparent w-4/5"
            placeholder="Enter amount"
          />
          <button
            className="_yellow text-base"
            onClick={() =>
              setTicketAmount(
                selectPool?.USDTBalance / selectPool?.pricePerTicket >=
                  selectPool?.roundInfo?.leftTickets
                  ? selectPool?.roundInfo?.leftTickets
                  : selectPool?.USDTBalance / selectPool?.pricePerTicket
              )
            }
          >
            Max
          </button>
        </div>
        <div className="flex items-center justify-between mt-5 _nav-title">
          <span>
            Remaining tickets:{" "}
            <span className="_active">
              {" "}
              {selectPool?.roundInfo?.leftTickets}
            </span>
          </span>
          <span>
            Balance: {selectPool?.USDTBalance} {selectPool?.rewardSymbol}
          </span>
        </div>
        {contextHolder}
        <Button
          loading={buyLoading}
          className="w-full h-12 mt-5 _background-gradient2 text-white rounded-full text-base font-bold pt-2 pb-2 pl-5 pr-5"
          onClick={buyTicketFun}
        >
          Buy
        </Button>
        <div className="text-center mt-5 mb-5 font-bold text-sm">
          Time to end:{" "}
          {moment(selectPool?.roundInfo?.endTime * 1000).format(
            "YYYY-MM-DD HH:mm:ss"
          )}
        </div>
        <div className="text-left _nav-title text-xs">
          Instructions for participation：By purchasing 1 ticket, you have the
          chance to win the entire prize pool. The more shares you purchase, the
          greater the probability of winning the reward pool.
        </div>
      </Modal>
      {/*  */}
      <Modal
        title="My Reward"
        centered
        open={isRewardOpen}
        onCancel={() => setIsRewardOpen(false)}
        footer={false}
        closeIcon={
          <img
            className="w-6 mt-3 mr-2"
            src={require("../../asserts/img/closeModal.png")}
            alt=""
          />
        }
        width={480}
      >
        <p className="mt-5 _nav-title">Unclaimed Reward</p>
        <div></div>
        <button className="w-full h-12 mt-5 _background-gradient2 text-white rounded-full text-sm pt-2 pb-2 pl-5 pr-5">
          Claim
        </button>
      </Modal>
    </div>
  );
}

export default Lottery;
