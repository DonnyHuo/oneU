import { useState } from "react";
import { Select, Progress, Popover, Modal } from "antd";


function Lottery() {

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

  const coinList = [
    {
      name: "USDT",
      number: 1,
      participated: 400,
      total: 1000,
      endTime: "2 Days 12:30:59",
    },
    {
      name: "USDT",
      number: 10,
      participated: 400,
      total: 1000,
      endTime: "2 Days 12:30:59",
    },
    {
      name: "USDT",
      number: 10000,
      participated: 400,
      total: 1000,
      endTime: "2 Days 12:30:59",
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
                    <img className="w-16" src={list.imgUrl} />
                  </div>
                  <div className="mt-5 mb-2 font-bold _title">{list.title}</div>
                  <div className="text-sm _nav-title _hiddenM">{list.desc}</div>
                </div>
              );
            })}
          </div>
          <div className="_border p-8 rounded-xl mt-20 _widthP _marginAuto0 _widthM _borderNo _paddingNo">
            <div className="flex items-center justify-between text-sm mb-10 _marginBottom">
              <div className="flex items-center font-bold">
                <button
                  className={!tab ? "_title" : "_text"}
                  onClick={() => setTab(0)}
                >
                  Ongoing Lotteries
                </button>
                {/* <button
                  className={`pl-4 ${tab ? "_title" : "_text"}`}
                  onClick={() => setTab(1)}
                >
                  Participation&Reward History
                </button> */}
              </div>
              <button onClick={() => setIsRewardOpen(true)} className="_active">
                My Reward
              </button>
            </div>

            <div className="">
              {coinList.map((list, index) => {
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
                          options={epoch}
                          suffixIcon={
                            <img
                              style={{ width: "10px", marginRight: "10px" }}
                              src={require("../../asserts/img/down.png")}
                            />
                          }
                        />
                        <span className="pl-2 _hiddenM">
                          Next Epoch Start At: 2024/04/08 01:00:00
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start justify-between _text text-sm mt-10 text-left _homeListM">
                      <div className="h-24 flex flex-col justify-between">
                        <div>Reward Pool</div>
                        <div className="text-3xl _title">1,000 USDT</div>
                        <Popover
                          content={"0xe369aec574d5408604daa3d12e95d5624fae9112"}
                          placement="top"
                          trigger="click"
                          overlayClassName="_popover"
                        >
                          <button className="leading-6 text-left text-xs underline decoration-slate-100 decoration-dotted _popoverBtn">
                            Contract Address
                          </button>
                        </Popover>
                      </div>
                      <div className="h-24 flex flex-col justify-between _hiddenM">
                        <div className="_title">2024/04/08 00:00:00</div>
                        <div className="text-xs">Draw Time</div>
                        <div className="_title">To be drawn</div>
                        <div className="text-xs">Winning Number</div>
                      </div>
                      <div className="_hiddenP pt-4 mt-4 pb-4 mb-8 _borderLine">
                        <div className="flex item-center justify-between h-6">
                          <div className="text-xs">Draw Time</div>
                          <div className="_title">2024/04/08 00:00:00</div>
                        </div>
                        <div className="flex item-center justify-between h-6">
                          <div className="text-xs">Winning Number</div>
                          <div className="_title">To be drawn</div>
                        </div>
                      </div>
                      <div className="h-24 flex flex-col justify-between _title">
                        <div>
                          Win 1,000 USDT lottery with just{" "}
                          <span className="_tip-yellow"> 1 USDT</span>.
                        </div>
                        <div>
                          <Progress
                            percent={30}
                            strokeColor={
                              "linear-gradient(180deg, #CE00FF 0%, #7F00FF 100%)"
                            }
                            trailColor={"rgba(163,159,173, 0.2)"}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span>
                            Tickets Purchased:
                            <span className="_active">400</span>
                          </span>
                          <span className="ml-10">Total Tickets: 800</span>
                        </div>
                      </div>
                      <div className="h-24 flex flex-col justify-between">
                        <div>
                          <button
                            className="_borderS rounded-full p-2 pr-12 pl-12 h-10 _title _listBtn"
                            onClick={() => setIsShareOpen(true)}
                          >
                            Buy Tickets
                          </button>
                        </div>
                        <div className="_title">
                          Time to end: 2 Days 12:30:59
                        </div>
                        <div className="pl-2 _hiddenP">
                          Next Epoch Start At: 2024/04/08 01:00:00
                        </div>
                      </div>
                    </div>
                    {/* <div className="mt-10 text-3xl font-bold">
                      {list.number} {list.name}
                    </div>
                    <div className="_text mt-2">Pool</div>
                    <div className="flex items-center justify-between text-sm mt-10">
                      <div>Participated: {list.participated}</div>
                      <div>Total: {list.total}</div>
                    </div>
                    <div className="mt-10 _text text-xs">
                      Win 1 BTC lottery with just{" "}
                      <span className="_tip-yellow">
                        {list.number / 1000} {list.name}
                      </span>
                      .
                    </div>
                    <button className="w-full _borderS rounded-full h-12 mt-4 mb-4">
                      Participate
                    </button>
                    <div className="text-sm">Time to end: {list.endTime}</div> */}
                  </div>
                );
              })}
            </div>

            {/* <div>
                <div
                  className="h-10 rounded-xl flex items-center justify-between text-xs pl-1 pr-1"
                  style={{ backgroundColor: "#2A2539" }}
                >
                  <button
                    className={`h-8 text-center w-1/2 rounded-xl ${
                      !tab2 && "_background-gradient2"
                    }`}
                    onClick={() => setTab2(0)}
                  >
                    Participation History
                  </button>
                  <button
                    className={`h-8 text-center w-1/2 rounded-xl ${
                      tab2 && "_background-gradient2"
                    }`}
                    onClick={() => setTab2(1)}
                  >
                    Reward History
                  </button>
                </div>
                {!tab2 ? (
                  <div>
                    <table className="text-left w-full text-xs">
                      <thead className="h-14">
                        <tr className="text-xs _text ">
                          <th className="font-light">Wallet Address</th>
                          <th className="font-light">Pool</th>
                          <th className="font-light">Participated Shares</th>
                          <th className="font-light">Participated Amount</th>
                          <th className="font-light text-right">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="h-10">
                          <td>0x3cdc641********6317eccf9</td>
                          <td className="w-32">
                            <img
                              className="w-6"
                              src={require("../../asserts/img/BTC.png")}
                            />
                          </td>
                          <td>0.01 ETH</td>
                          <td>10 ETH</td>
                          <td className="text-right">2024.04.02 00:00:00</td>
                        </tr>
                        <tr className="h-10">
                          <td>0x3cdc641********6317eccf9</td>
                          <td className="w-32">
                            <img
                              className="w-6"
                              src={require("../../asserts/img/ETH.png")}
                            />
                          </td>
                          <td>0.01 ETH</td>
                          <td>10 ETH</td>
                          <td className="text-right">2024.04.02 00:00:00</td>
                        </tr>
                        <tr className="h-10">
                          <td>0x3cdc641********6317eccf9</td>
                          <td className="w-32">
                            <img
                              className="w-6"
                              src={require("../../asserts/img/USDT.png")}
                            />
                          </td>
                          <td>0.01 USDT</td>
                          <td>10 USDT</td>
                          <td className="text-right">2024.04.02 00:00:00</td>
                        </tr>
                        <tr className="h-10">
                          <td>0x3cdc641********6317eccf9</td>
                          <td className="w-32">
                            <img
                              className="w-6"
                              src={require("../../asserts/img/BTC.png")}
                            />
                          </td>
                          <td>0.01 ETH</td>
                          <td>10 ETH</td>
                          <td className="text-right">2024.04.02 00:00:00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div>
                    <table className="text-left w-full text-xs">
                      <thead className="h-14">
                        <tr className="text-xs _text ">
                          <th className="font-light">Wallet Address</th>
                          <th className="font-light">Pool</th>
                          <th className="font-light">Participated Shares</th>
                          <th className="font-light">Participated Amount</th>
                          <th className="font-light text-right">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="h-10">
                          <td>0x3cdc641********6317eccf9</td>
                          <td className="w-32">
                            <img
                              className="w-6"
                              src={require("../../asserts/img/USDT.png")}
                            />
                          </td>
                          <td>0.01 ETH</td>
                          <td>10 ETH</td>
                          <td className="text-right">2024.04.02 00:00:00</td>
                        </tr>
                        <tr className="h-10">
                          <td>0x3cdc641********6317eccf9</td>
                          <td className="w-32">
                            <img
                              className="w-6"
                              src={require("../../asserts/img/BTC.png")}
                            />
                          </td>
                          <td>0.01 ETH</td>
                          <td>10 ETH</td>
                          <td className="text-right">2024.04.02 00:00:00</td>
                        </tr>
                        <tr className="h-10">
                          <td>0x3cdc641********6317eccf9</td>
                          <td className="w-32">
                            <img
                              className="w-6"
                              src={require("../../asserts/img/ETH.png")}
                            />
                          </td>
                          <td>0.01 USDT</td>
                          <td>10 USDT</td>
                          <td className="text-right">2024.04.02 00:00:00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div> */}
          </div>
          {/* <div className="_background2 flex items-center justify-between p-4 rounded-xl _widthP _marginAuto _hiddenM">
            <div className="_title">Trusted By The Smart Contract</div>
            <div className="_text">
              Contract Address: 0x3cdc75A5aDa1504F8A2Cb4b88Cb66416317Eccf98
            </div>
          </div> */}
        </div>
      </div>
     

      <Modal
        title="Buy Share"
        centered
        open={isShareOpen}
        onCancel={() => setIsShareOpen(false)}
        footer={false}
        closeIcon={
          <img
            className="w-6 mt-3 mr-2"
            src={require("../../asserts/img/closeModal.png")}
          />
        }
        width={480}
      >
        <p className="mt-5 _nav-title">
          Get an invite code from an existing user to sign up.
        </p>
        <div>
          <input
            className="w-full h-12 rounded-xl outline-none text-white pl-4 pr-4 text-sm mt-5"
            style={{ background: "rgba(42, 37, 57, 1)" }}
            placeholder="Enter invite code"
          />
        </div>
        <button className="w-full h-12 mt-5 _background-gradient2 text-white rounded-full text-sm pt-2 pb-2 pl-5 pr-5">
          Proceed
        </button>
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
