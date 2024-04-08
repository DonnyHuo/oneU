function Referral() {
  const union = require("../../asserts/img/union.png");
  return (
    <div className="_background1 _title">
      <div className="_background-referral">
        <div
          className="pt-20 pb-20 flex items-center justify-between"
          style={{
            width: "1182px",
            margin: "0 auto",
            backgroundImage: `url(${union})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "420px",
            backgroundPosition: "top right",
          }}
        >
          <div>
            <div
              className="text-5xl _referralTitle"
              style={{ lineHeight: "60px" }}
            >
              <p>Invite friends. Earn 3%</p>
              <p>commission on each friend’s</p>
              <p>participate.</p>
            </div>
            <div
              className="flex items-center justify-between mt-10"
              style={{ width: "400px" }}
            >
              <div
                className="h-10 _border flex items-center justify-between pr-3 pl-3 rounded-lg text-xs"
                style={{ width: "242px" }}
              >
                <span className="_text font-medium">Invite Code</span>
                <div className="flex items-center">
                  <span className="pr-2">88888888</span>
                  <img
                    className="w-3"
                    src={require("../../asserts/img/copy.png")}
                  />
                </div>
              </div>
              <button
                className="_borderS h-10 pr-3 pl-3 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ width: "140px" }}
              >
                Invite Friends
              </button>
            </div>
          </div>
          <div className="pr-4">
            <img
              style={{ width: "352px" }}
              src={require("../../asserts/img/reward.png")}
            />
          </div>
        </div>
        <div
          className="p-5 _background2 rounded-xl"
          style={{ width: "1182px", margin: "0 auto" }}
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
        </div>
        <div
          className="p-5 _background2 rounded-xl"
          style={{ width: "1182px", margin: "0 auto", marginTop: "50px" }}
        >
          <div>Tips</div>
          <div className="text-xs _text flex items-start justify-between mt-6 relative pb-5">
            <div className="w-1/4 flex flex-col items-center">
              <img
                className="w-16 text-center"
                src={require("../../asserts/img/i1.png")}
              />
              <div className="text-center mt-4">
                1. Share your invite code with friends.
              </div>
            </div>
            <div className="w-1/4 flex flex-col items-center">
              <img className="w-16" src={require("../../asserts/img/i2.png")} />
              <div className="text-center mt-4">
                2. Invite friends to sign up and enter your invite code.
              </div>
            </div>
            <div className="w-1/4 flex flex-col items-center">
              <img className="w-16" src={require("../../asserts/img/i3.png")} />
              <div className="text-center mt-4">
                3. Receive commission from each friend’s participate.
              </div>
            </div>
            <div
              className="absolute flex items-center"
              style={{ left: "200px", top: "30px" }}
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
              className="absolute flex items-center"
              style={{ left: "640px", top: "30px" }}
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
