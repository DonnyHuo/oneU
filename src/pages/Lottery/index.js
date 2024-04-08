import { useState } from "react";

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
      name: "BTC",
      number: 1,
      img: require("../../asserts/img/BTC.png"),
      participated: 400,
      total: 1000,
      endTime: "2 Days 12:30:59",
    },
    {
      name: "ETH",
      number: 10,
      img: require("../../asserts/img/ETH.png"),
      participated: 400,
      total: 1000,
      endTime: "2 Days 12:30:59",
    },
    {
      name: "USDT",
      number: 10000,
      img: require("../../asserts/img/USDT.png"),
      participated: 400,
      total: 1000,
      endTime: "2 Days 12:30:59",
    },
  ];

  const [tab, setTab] = useState(0);
  const [tab2, setTab2] = useState(0);

  return (
    <div className="_background1 _background-home text-center  pb-10">
      <div className="_background-home2 pt-32">
        <div className="text-white">
          <div className="text-6xl font-bold _title">
            Win Crypto Lotteries With OneU
          </div>
          <div className="text-sm mt-5 _title">
            Users can win crypto lotteries such as BTC/ETH/SOL assets with just
            1 USDT, trusted by the smart contract.
          </div>
          <div
            className="flex items-center justify-around"
            style={{ width: "1100px", margin: "100px auto" }}
          >
            {descList.map((list, index) => {
              return (
                <div key={index} className="w-3/12 text-center">
                  <div className="flex items-center justify-center">
                    <img className="w-16" src={list.imgUrl} />
                  </div>
                  <div className="mt-5 mb-2 font-bold _title">{list.title}</div>
                  <div className="text-sm _nav-title">{list.desc}</div>
                </div>
              );
            })}
          </div>
          <div
            className="_border p-8 rounded-xl mt-20"
            style={{ width: "1080px", margin: "5rem auto" }}
          >
            <div className="flex items-center justify-between text-sm mb-10">
              <div className="flex items-center font-bold">
                <button
                  className={!tab ? "_title" : "_text"}
                  onClick={() => setTab(0)}
                >
                  Ongoing Lotteries
                </button>
                <button
                  className={`pl-4 ${tab ? "_title" : "_text"}`}
                  onClick={() => setTab(1)}
                >
                  Participation&Reward History
                </button>
              </div>
              <div className="_active">My Reward</div>
            </div>
            {!tab ? (
              <div className="flex items-center justify-between">
                {coinList.map((list, index) => {
                  return (
                    <div
                      key={index}
                      className="rounded-xl p-6 _background-gradient"
                      style={{ width: "320px" }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="_text text-xs">Epoch 1</div>
                        <div className="flex items-center">
                          <img style={{ width: "24px" }} src={list.img} />
                          <span className="text-xs pl-1 _title font-bold">
                            {list.number} {list.name} Lottery
                          </span>
                        </div>
                      </div>
                      <div className="mt-10 text-3xl font-bold">
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
                      <div className="text-sm">Time to end: {list.endTime}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
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
              </div>
            )}
          </div>
          <div
            className="_background2 flex items-center justify-between p-4 rounded-xl"
            style={{ width: "1080px", margin: "0 auto" }}
          >
            <div className="_title">Trusted By The Smart Contract</div>
            <div className="_text">
              Contract Address: 0x3cdc75A5aDa1504F8A2Cb4b88Cb66416317Eccf98
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lottery;
