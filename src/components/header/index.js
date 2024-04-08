import { Link, useLocation } from "react-router-dom";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useNetwork } from "wagmi";
import { shortStr } from "../../utils";
const Header = () => {
  const location = useLocation();
  const logoIcon = require("../../asserts/img/logo.png");

  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const { chain } = useNetwork();

  return (
    <div className="h-18 flex items-center justify-between pl-5 pr-5 border-spacing-1 text-white _background1 _line relative">
      <div>
        <img className="h-5 mt-6 mb-6" src={logoIcon} />
      </div>
      <div
        className="flex items-center font-medium"
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
      <div>
        {/* <w3m-button /> */}
        {chain && (
          <button
            className="_border rounded-full p-2 pl-4 pr-4 text-sm mr-2"
            onClick={() => open({ view: "Networks" })}
          >
            {chain?.name}
          </button>
        )}

        <button
          className="_borderS rounded-full p-2 pl-4 pr-4 text-sm"
          onClick={() => open()}
        >
          {address ? shortStr(address, 5, 4) : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Header;
