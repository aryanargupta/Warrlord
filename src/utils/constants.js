import { CHAIN_NAMESPACES } from "@web3auth/base"

export const accountConfig = {
    bundlerUrl: "https://bundler.biconomy.io/api/v2/11155111/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
    biconomyPaymasterApiKey: "Cl_Wr0R-a.7640b381-ec8e-42d7-887e-a127e7f40a4c"
}

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://sepolia.infura.io/v3/",
  displayName: "Sepolia",
  blockExplorer: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Sepolia",
}

export const authConfig = {
  clientId: "BDH_GfItGFfXHlIxAlv7Vh-9XEryY4ZIxmjz5-g1EdlyFPYBxgK8_PSWlgYyoBZjm0N4BgShv0sAJKXAnFs_4EQ", 
  web3AuthNetwork: "sapphire_devnet", 
  chainConfig,
  uiConfig: {
    appName: "Biconomy X Web3Auth",
    mode: "dark", 
    loginMethodsOrder: ["apple", "google", "twitter"],
    logoLight: "https://web3auth.io/images/web3auth-logo.svg",
    logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
    defaultLanguage: "en", 
    loginGridCol: 3,
    primaryButton: "socialLogin", 
  },
}