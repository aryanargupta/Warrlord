import { accountConfig, authConfig } from "../utils/constants";
import { gameManagerAbi, gameManagerAddress } from "../utils/contracts";
import { createWalletClient, custom, encodeFunctionData } from "viem";
import { sepolia } from "viem/chains";
import { PaymasterMode, createSmartAccountClient } from "@biconomy/account";
import { ethers } from "ethers";
import { Web3Auth } from "@web3auth/modal";
import "viem/window";

const connectWallet = async (scene) => {
  if (!window.ethereum) return;
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  }); 

  // switch chain
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0xaa36a7" }],
  });

  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: custom(window.ethereum),
  });

  const smartAccount = await createSmartAccountClient({
    signer: walletClient,
    bundlerUrl: accountConfig.bundlerUrl,
    biconomyPaymasterApiKey: accountConfig.biconomyPaymasterApiKey,
  });
  console.log(await smartAccount.getAddress())

  if(!smartAccount) return;
  await check_and_register(smartAccount);

  scene.start("Game", { smartAccount });
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

const check_and_register = async (smartAccount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const gameContract = new ethers.Contract(gameManagerAddress, gameManagerAbi, provider);
    const isRegistered = await gameContract.isPlayerExist(await smartAccount.getAddress());
    console.log('isRegistered?', isRegistered);
    if(isRegistered) return;
    // Register player if not already registered
    const encodedCall = encodeFunctionData({
        abi: gameManagerAbi,
        functionName: "initialize",
        args: [],
    });
    const userOpResponse = await smartAccount.sendTransaction({
      to: gameManagerAddress,
      data: encodedCall,
    }, {
      paymasterServiceData: {mode: PaymasterMode.SPONSORED}
    });

    const hash = await userOpResponse.waitForTxHash();
    console.log('hash', hash);
    const receipt = await userOpResponse.wait()
    console.log('receipt', receipt);
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
      .on('pointerdown', createAccount);

    // Button 2
    const button2 = this.add.sprite(512, 580, "buttonTexture")
      .setInteractive()
      .on('pointerdown', () => connectWallet(this.scene));

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
  }
}
