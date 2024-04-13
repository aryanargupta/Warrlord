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

export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.image(512, 384, "background");

    const logo = this.add.image(512, 300, "logo");

    // Button 1
    const button1 = this.add.sprite(512, 480, "buttonTexture")
      .setInteractive()
      .on('pointerdown', () => {
        console.log('Button 1 clicked!');
        // Add your button 1 functionality here
      });

    // Button 2
    const button2 = this.add.sprite(512, 580, "buttonTexture")
      .setInteractive()
      .on('pointerdown', () => {
        console.log('Button 2 clicked!');
        // Add your button 2 functionality here
      });

    // Optionally, you can set the origin of the buttons for positioning
    button1.setOrigin(0.5);
    button2.setOrigin(0.5);

    // Optionally, you can set a different scale for the buttons
    button1.setScale(0.8);
    button2.setScale(0.8);

    // Optionally, you can add text labels to the buttons
    this.add.text(button1.x, button1.y, 'Create Account', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' })
      .setOrigin(0.5);
    this.add.text(button2.x, button2.y, 'Connect Wallet', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
