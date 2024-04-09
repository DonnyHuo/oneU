import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./asserts/css/tailwind.css";
import "./asserts/css/init.css";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet } from "viem/chains";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "454269b43ef322b9349e9336c5df2477";

// 2. Create wagmiConfig
// const icons = require('./asserts/img/ETH.png')
const metadata = {
  name: "oneU",
  description: "oneU",
  url: "https://one-u.vercel.app",
  icons: ["https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029"],
};

const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const options = {
  // tokens: {
  //   1: {
  //     address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  //     image: require("./asserts/img/USDT.png"), //optional
  //   },
  // },
  themeVariables: {
    '--w3m-font-family': 'Poppins-Medium',
    '--w3m-font-size-master': '10px',
  },
  
};

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  ...options,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
