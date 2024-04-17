import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";

import "./asserts/css/tailwind.css";
import "./asserts/css/init.css";

// import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

// import { WagmiConfig } from "wagmi";
// import { arbitrum, mainnet, sepolia } from "viem/chains";

// // 1. Get projectId at https://cloud.walletconnect.com
// const projectId = "454269b43ef322b9349e9336c5df2477";

// // 2. Create wagmiConfig
// // const icons = require('./asserts/img/ETH.png')
// const metadata = {
//   name: "oneU",
//   description: "oneU",
//   url: "https://one-u.vercel.app",
//   icons: ["https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029"],
// };

// const chains = [mainnet, arbitrum, sepolia];
// const wagmiConfig = defaultWagmiConfig({
//   chains,
//   projectId,
//   metadata,
//   enableAnalytics: true, // Optional - defaults to your Cloud configuration
// });

// const options = {
//   // tokens: {
//   //   1: {
//   //     address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
//   //     image: require("./asserts/img/USDT.png"), //optional
//   //   },
//   // },
//   themeVariables: {
//     '--w3m-font-family': 'Poppins-Medium',
//     '--w3m-font-size-master': '10px',
//   },

// };

// // 3. Create modal
// createWeb3Modal({
//   wagmiConfig,
//   projectId,
//   chains,
//   ...options,
// });
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

// 1. Get projectId
const projectId = "454269b43ef322b9349e9336c5df2477";

// 2. Set chains
const networks = [
  {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  },
  {
    chainId: 42161,
    name: "Arbitrum",
    currency: "ETH",
    explorerUrl: "https://arbiscan.io",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
  },
  {
    chainId: 11155111,
    name: "Sepolia",
    currency: "SepoliaETH",
    explorerUrl: "https://sepolia.etherscan.io",
    rpcUrl: "https://rpc.sepolia.org",
  },
];

// 3. Create a metadata object
const metadata = {
  name: "oneU",
  description: "Win crypro lotteries with just One Usdt.",
  url: "https://one-u.vercel.app", // origin must match your domain & subdomain
  icons: [""],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: networks,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
