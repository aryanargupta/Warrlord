import { CHAIN_NAMESPACES } from "@web3auth/base"

export const accountConfig = {
    bundlerUrl: "https://bundler.biconomy.io/api/v2/84531/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
    biconomyPaymasterApiKey: "ctCFUOHSG.22a421c6-1e05-4442-8cc3-7c1e269c4518"
}

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x14a33",
  rpcTarget: "https://base-goerli.public.blastapi.io",
  displayName: "Base",
  blockExplorer: "",
  ticker: "ETH",
  tickerName: "Base",
}

export const authConfig = {
  clientId: "BDH_GfItGFfXHlIxAlv7Vh-9XEryY4ZIxmjz5-g1EdlyFPYBxgK8_PSWlgYyoBZjm0N4BgShv0sAJKXAnFs_4EQ", 
  web3AuthNetwork: "sapphire_devnet", // Web3Auth Network
  chainConfig,
  uiConfig: {
    appName: "Biconomy X Web3Auth",
    mode: "dark", // light, dark or auto
    loginMethodsOrder: ["apple", "google", "twitter"],
    logoLight: "https://web3auth.io/images/web3auth-logo.svg",
    logoDark: "https://web3auth.io/images/web3auth-logo---Dark.svg",
    defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
    loginGridCol: 3,
    primaryButton: "socialLogin", // "externalLogin" | "socialLogin" | "emailLogin"
  },
}