import { Link, useLocation } from "react-router-dom";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useNetwork, useEnsAvatar } from "wagmi";
import { shortStr } from "../../utils";
const Header = () => {
  const location = useLocation();
  const logoIcon = require("../../asserts/img/logo.png");

  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const ensAvatar = useEnsAvatar()
  console.log('ensAvatar', ensAvatar)

  console.log('chain', chain)

  const chainList =[
    {
      networkId: 1,
      url: require('../../asserts/img/ETH.png')
    },
    {
      networkId: 42161,
      url: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029"
    }
  ]

  const selectNetworkIcon = (id)=> {
    return chainList.filter(list => list.networkId == id)[0]
  }

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
      <div className="flex items-center">
        {/* <w3m-button /> */}
        {chain && (
          <button
            className="_border rounded-full p-2 pl-4 pr-4 text-sm mr-2 flex items-center"
            onClick={() => open({ view: "Networks" })}
          >
            <img className="w-5 mr-2" src={selectNetworkIcon(chain.id)?.url} />
            <span>{chain?.name}</span>
          </button>
        )}

        <button
          className="_borderS rounded-full p-2 pl-4 pr-4 text-sm"
          onClick={() => open()}
        >
          {address ? (
            <div className="flex items-center">
              <img className="w-5" src={require("../../asserts/img/connect.png")} />
              <span className="pl-2">{shortStr(address, 5, 4)}</span>
            </div>
          ) : (
            "Connect Wallet"
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
