import { useSelector } from "react-redux";
import { message } from "antd";

function Referral() {
  const union = require("../../asserts/img/union.png");
  const address = useSelector((state) => state.address);
  console.log("address1", address);
  const userId = useSelector((state) => state.userId);

  const [messageApi, contextHolder] = message.useMessage();
  const copyInfo = () => {
    messageApi.success("Copied successfully!");
    navigator.clipboard.writeText(userId)
  };

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
                  <span className="pr-4">{userId}</span>
                  {contextHolder}
                  <img
                    className="w-3 cursor-pointer"
                    onClick={copyInfo}
                    src={require("../../asserts/img/copy.png")}
                  />
                </div>
              </div>
              <button
                className="_borderS h-10 pr-6 pl-6 rounded-lg ml-6 flex items-center justify-center text-sm"
              >
                Invite <span className="_hiddenM pl-1"> Friends</span>
              </button>
            </div>
          </div>
          <div className="pr-4 _hiddenM">
            <img
              style={{ width: "352px" }}
              src={require("../../asserts/img/reward.png")}
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
            <div className="_tipsTitle text-lg mb-6">Number of invitees</div>
            <div className="text-xs _text flex items-center justify-between _flexM">
              <div className="w-1/2 rounded-xl p-5 _background2 mr-5 _M100 _border">
                <div className="flex items-center justify-between _line">
                  <div className="pb-4">
                    <div className="flex items-center">
                      <img
                        className="w-8 pr-2"
                        src={require("../../asserts/img/USDT.png")}
                      />
                      <span className="text-2xl text-white">1000 USDT</span>
                    </div>
                    <p className="pt-4 text-xs">Unclaimed comission</p>
                  </div>
                  <button className="_background-gradient2 h-10 pr-10 pl-10 rounded-full flex items-center justify-center text-sm text-white">
                    Claim
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="pt-4">
                    <div className="flex items-center">
                      <img
                        className="w-8 pr-2"
                        src={require("../../asserts/img/USDT.png")}
                      />
                      <span className="text-2xl text-white">1000 USDT</span>
                    </div>
                    <p className="pt-4 text-xs">Unclaimed comission</p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 rounded-xl p-5 _background2 ml-5 _M100 _border">
                <div className="flex items-center justify-between _line pb-4">
                  <div>
                    <div className="text-2xl _active">1000</div>
                    <p className="pt-4 text-xs">Friends</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <div className="text-2xl _active">100</div>
                    <p className="pt-4 text-xs">
                      Friends Who Started Participating
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="p-5 _background2 rounded-xl"
          style={{ maxWidth: "1182px", margin: "0 auto", overflow: "hidden" }}
        >
          <div className="flex items-start justify-between">
            <div
              className="w-1/2 pr-10"
              style={{ borderRight: "1px solid #333" }}
            >
              <div className="mb-4">Unclaimed comission</div>
              <div className="text-xs font-bold">
                <div className="h-10 flex items-center justify-between">
                  <span className="flex items-center">
                    <img
                      className="w-6"
                      src={require("../../asserts/img/ETH.png")}
                    />
                    <span className="pl-2">ETH</span>
                  </span>
                  <span>10</span>
                </div>
                <div className="h-10 flex items-center justify-between">
                  <span className="flex items-center">
                    <img
                      className="w-6"
                      src={require("../../asserts/img/USDT.png")}
                    />
                    <span className="pl-2">USDT</span>
                  </span>
                  <span>10000</span>
                </div>
              </div>
            </div>
            <div className="w-1/2 pl-10">
              <div>Number of invitees</div>
              <div className="flex items-center text-xs">
                <div>
                  <div className="_active text-2xl font-medium pt-5 pb-4">
                    10000
                  </div>
                  <div className="_nav-title">Friends</div>
                </div>
                <div className="pl-20">
                  <div className="_active text-2xl font-medium pt-5 pb-4">
                    100
                  </div>
                  <div className="_nav-title">
                    Friends Who Started Participating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div
          className="_tipsBox"
          style={{
            maxWidth: "1182px",
            margin: "0 auto",
            marginTop: "50px",
            overflow: "hidden",
          }}
        >
          <div className="_tipsTitle text-lg">Tips</div>
          <div className="text-xs _text flex items-start justify-between mt-6 relative pb-10 pt-10 _tips  _background2 rounded-xl _border">
            <div className="w-1/4 flex flex-col items-center _tipDiv">
              <img
                className="w-16 text-center"
                src={require("../../asserts/img/i1.png")}
              />
              <div className="text-center mt-4 _desc">
                1. Share your invite code with friends.
              </div>
            </div>
            <div className="w-1/4 flex flex-col items-center _tipDiv">
              <img className="w-16" src={require("../../asserts/img/i2.png")} />
              <div className="text-center mt-4 _desc">
                2. Invite friends to sign up and enter your invite code.
              </div>
            </div>
            <div className="w-1/4 flex flex-col items-center _tipDiv _paddingBNo">
              <img className="w-16" src={require("../../asserts/img/i3.png")} />
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
              />
              <img
                className="ml-1"
                style={{ width: "5px" }}
                src={require("../../asserts/img/icon.png")}
              />
            </div>
            <div
              className="absolute flex items-center _hiddenM"
              style={{ width: "22%", right: "20%", top: "36%" }}
            >
              <img
                style={{ width: "300px", height: "1px" }}
                src={require("../../asserts/img/line.png")}
              />
              <img
                className="ml-1"
                style={{ width: "5px" }}
                src={require("../../asserts/img/icon.png")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Referral;
