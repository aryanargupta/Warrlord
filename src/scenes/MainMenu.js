import { Scene } from "phaser";
import { accountConfig } from "../utils/constants";
import {
  createWalletClient,
  custom,
} from "viem";
import { baseGoerli } from "viem/chains";
import "viem/window";
import { createSmartAccountClient } from "@biconomy/account";

const connectWallet = async () => {
  if (!window.ethereum) return;
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
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

const createAccount = () => {

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
