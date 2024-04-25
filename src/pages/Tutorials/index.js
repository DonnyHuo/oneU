import { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "antd";

function Tutorials() {
  const [qaList] = useState([
    {
      key: "1",
      label: "1. How much reward can l receive?",
      children: (
        <div>
          Purchase just 1 share, you have the chance to win the entire prize
          pool.
        </div>
      ),
    },
    {
      key: "2",
      label: "2. How to increase the probability of receiving rewards?",
      children: (
        <div>
          The more shares you purchase, the greater the probability of receiving
          rewards.
        </div>
      ),
    },
    {
      key: "3",
      label: "3. How do l verify that the draw is fair and impartial?",
      children: (
        <div>
          The lottery rules are written in the smart contract, and you can
          verify it in the smart contract address we published.
        </div>
      ),
    },
    {
      key: "4",
      label: "4. How do l view and claim my rewards?",
      children: (
        <div>
          You can view and claim your rewards in [My reward], and you will need
          to pay gas fees when claiming them.
        </div>
      ),
    },
    {
      key: "5",
      label: "5. How to get rewards for inviting friends?",
      children: (
        <div>
          For every share purchased by a friend you invite, you will receive a
          3% commission from the purchase amount.
        </div>
      ),
    },
  ]);

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="_background1 _title">
      <div className="_background-tutorials">
        <div
          className="pt-20 pb-20 flex items-center justify-between _flexNo _paddingTB"
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          <div>
            <div className="text-5xl _lineHeight30 _referralTitle _size20">
              <p>Earn crypto lotteries</p>
              <p>simply, transparently</p>
              <p> and fairly. </p>
            </div>

            <div
              className="flex items-center justify-between mt-10 _hiddenM"
              style={{ width: "400px" }}
            >
              <Link to="/">
                <button
                  className="_background-gradient2 h-10 pr-3 pl-3 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ width: "180px" }}
                >
                  Play Now
                </button>
              </Link>
            </div>
          </div>

          <div className="_border rounded-3xl p-8 _background2 _marginLR _padding10 _marginTop _tutorialsInfo">
            <div className="_tutorialsInfoBox">
              <div className="pb-4 _title font-bold">How to participate?</div>
              <div>
                <div className="flex items-start _backgroundLine">
                  <img
                    className="w-4 mr-3 mt-1"
                    src={require("../../asserts/img/point.png")}
                    alt=""
                  />
                  <div>
                    <p className="_title font-bold">Step 1</p>
                    <p className="_text text-xs pt-2 pb-4">
                      Onboarding with your wallet. (Metamask)
                    </p>
                  </div>
                </div>
                <div className="flex items-start _backgroundLine">
                  <img
                    className="w-4 mr-3 mt-1"
                    src={require("../../asserts/img/point.png")}
                    alt=""
                  />
                  <div>
                    <p className="_title font-bold">Step 2</p>
                    <p className="_text text-xs pt-2 pb-4">
                      Purchase at least one share to participate.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <img
                    className="w-4 mr-3 mt-1"
                    src={require("../../asserts/img/point.png")}
                    alt=""
                  />
                  <div>
                    <p className="_title font-bold">Step 3</p>
                    <p className="_text text-xs pt-2 pb-4">
                      Waiting for the lottery draw to get the big prize.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ maxWidth: "1180px" }}
          className="_marginLR _marginAuto0 _paddingB20"
        >
          <div className="text-2xl font-bold mb-6">Q&A</div>
          <div className="pb-20">
            <Collapse
              expandIconPosition={"end"}
              expandIcon={(value) => {
                return (
                  <img
                    style={{
                      width:'18px',
                      transform: value.isActive
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s linear",
                    }}
                    src={require("../../asserts/img/right.png")}
                    alt=""
                  />
                );
              }}
              items={qaList}
              defaultActiveKey={["1"]}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorials;
