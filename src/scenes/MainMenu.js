import { Scene } from "phaser";
import { accountConfig, authConfig } from "../utils/constants";
import {
  createWalletClient,
  custom
} from "viem";
import { baseGoerli } from "viem/chains";
import "viem/window";
import { createSmartAccountClient } from "@biconomy/account";
import { ethers } from "ethers";
import { Web3Auth } from "@web3auth/modal";

const connectWallet = async () => {
  if (!window.ethereum) return;
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  // switch chain
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x14a33" }],
  });

  const walletClient = createWalletClient({
    account,
    chain: baseGoerli,
    transport: custom(window.ethereum),
  });

  const smartAccount = await createSmartAccountClient({
    signer: walletClient,
    bundlerUrl: accountConfig.bundlerUrl,
    biconomyPaymasterApiKey: accountConfig.biconomyPaymasterApiKey,
  });
  console.log(await smartAccount.getAddress())
}

const createAccount = async () => {
  try {
    const web3auth = new Web3Auth({
      ...authConfig,
      privateKeyProvider: window.ethereum,
    });
    await web3auth.initModal();
    const web3authProvider = await web3auth.connect();
    const ethersProvider = new ethers.providers.Web3Provider(web3authProvider);
    const web3authSigner = ethersProvider.getSigner();

    const smartWallet = await createSmartAccountClient({
      signer: web3authSigner,
      bundlerUrl: accountConfig.bundlerUrl,
      biconomyPaymasterApiKey: accountConfig.biconomyPaymasterApiKey,
    });

    console.log(await smartWallet.getAddress());
  }
  catch(err){
    console.log(err);
  }
}

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.image(512, 384, "background");

    this.add.image(512, 350, "logo");

    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
