import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.scenePlugin({
      key: "rexuiplugin",
      url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      sceneKey: "rexUI",
    });

    this.load.plugin(
      "rextexteditplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js",
      true
    );

    this.load.plugin(
      "rexbbcodetextplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js",
      true
    );
  }

  create({ smartAccount }) {
    this.add.image(512, 384, "gameBG");

    this.add.image(512, 384, "gameBG").setAlpha(0.5);

    this.add.image(512, 384, "border");

    const townhall = this.add.sprite(510, 230, "townhall");
    townhall.scale = 0.35;
    townhall.flipX = true;
    townhall.setInteractive();
    townhall.on("pointerover", () => {
      townhall.setScale(0.36);
    });
    townhall.on("pointerout", () => {
      townhall.setScale(0.35);
    });

    const cannon = this.add.sprite(540, 530, "cannon");
    cannon.scale = 0.65;
    cannon.flipX = true;

    const clancastle = this.add.sprite(730, 350, "clancastle");
    clancastle.scale = 0.6;
    clancastle.angle = clancastle.angle - 4;

    clancastle.setInteractive(); // Make clan castle clickable

    // Create a container for the popup
    const clanCastlePopup = this.add.container(512, 384);
    clanCastlePopup.setDepth(100);
    clanCastlePopup.setAlpha(0); // Initially hide the popup

    // Add background to the popup
    const popupBackground = this.add.image(0, 0, "popupBackground");
    clanCastlePopup.add(popupBackground);

    // Add "Liquidity Pool" text to the popup
    const popupText = this.add.text(0, -200, "Liquidity Pool", {
      fontFamily: "Brush Script",
      fontSize: "48px",
      color: "#000",
      fontStyle: "italic",
      fontWeight: "bold",
      align: "center",
    });
    popupText.setOrigin(0.5);
    clanCastlePopup.add(popupText);

    // Add buttons to the popup
    const stakeButton = this.add.sprite(0, -80, "buttonTexture");
    stakeButton.scale = 0.8; // Increased button size
    clanCastlePopup.add(stakeButton);
    stakeButton.setInteractive(); // Make the button interactive
    const stakeText = this.add.text(-90, -90, "Add Liquidity", {
      // Adjusted text position
      fontSize: "24px", // Increased text size
      fill: "#fff",
    });
    clanCastlePopup.add(stakeText);

    const swapButton = this.add.sprite(0, 80, "buttonTexture");
    swapButton.scale = 0.8; // Increased button size
    clanCastlePopup.add(swapButton);
    swapButton.setInteractive(); // Make the button interactive
    const swapText = this.add.text(-40, 65, "Swap", {
      // Adjusted text position
      fontSize: "32px", // Increased text size
      fill: "#fff",
    });
    clanCastlePopup.add(swapText);

    const clanCastleCloseButton = this.add.sprite(190, -210, "closeButton"); // Add a close button to the clanCastlePopup
    clanCastleCloseButton.scale = 0.1;
    clanCastleCloseButton.setDepth(101);
    clanCastleCloseButton.setInteractive();
    clanCastleCloseButton.on("pointerup", () => {
      this.tweens.add({
        targets: clanCastlePopup,
        alpha: 0,
        duration: 500,
        onComplete: () => {
          clanCastlePopup.setVisible(false);
        },
      });
    });
    clanCastlePopup.add(clanCastleCloseButton);

    const handleAddLiquidityClick = () => {
      // Close the clanCastlePopup
      this.tweens.add({
        targets: clanCastlePopup,
        alpha: 0,
        duration: 500,
        onComplete: () => {
          clanCastlePopup.setVisible(false);
        },
      });

      // Open a new popup for adding liquidity
      const addLiquidityPopup = this.add.container(512, 384); // Create a container for the add liquidity popup
      addLiquidityPopup.setDepth(101);
      addLiquidityPopup.setAlpha(0); // Initially hide the add liquidity popup

      const addLiquidityBackground = this.add.image(0, 0, "popupBackground"); // Replace "popupBackground" with your actual add liquidity background image
      addLiquidityBackground.setOrigin(0.5);
      addLiquidityPopup.add(addLiquidityBackground);

      const addLiquidityText = this.add.text(0, -200, "Add Liquidity", {
        fontFamily: "Brush Script",
        fontSize: "48px",
        color: "#000",
        fontStyle: "italic",
        fontWeight: "bold",
        align: "center",
      });
      addLiquidityText.setOrigin(0.5);
      addLiquidityPopup.add(addLiquidityText);

      // Add close button to the add liquidity popup
      const addLiquidityCloseButton = this.add.sprite(190, -210, "closeButton"); // Add a close button to the add liquidity popup
      addLiquidityCloseButton.scale = 0.1;
      addLiquidityCloseButton.setDepth(101);
      addLiquidityCloseButton.setInteractive();
      addLiquidityCloseButton.on("pointerup", () => {
        this.tweens.add({
          targets: addLiquidityPopup,
          alpha: 0,
          duration: 500,
          onComplete: () => {
            addLiquidityPopup.setVisible(false);
          },
        });
      });
      addLiquidityPopup.add(addLiquidityCloseButton);

      // Add USDC Amount box
      const usdcTitle = this.add.text(-190, -100, "USDC Amount:", {
        fontSize: "18px",
        fill: "#000",
      });
      addLiquidityPopup.add(usdcTitle);


      var usdcAmount = this.add
        .rexBBCodeText(50, -90, "0", {
          color: "black",
          fontSize: "18px",
          fixedWidth: 100,
          fixedHeight: 30,
          backgroundColor: "#ffffff",
          valign: "center",
        })
        .setOrigin(0.5);
      addLiquidityPopup.add(usdcAmount);

      this.plugins.get("rextexteditplugin").add(usdcAmount, {
        type: "text",
        enterClose: true,
        selectAll: true,
      });

      // Add Gold Coin Amount box
      const goldCoinTitle = this.add.text(-190, -50, "Gold Coin Amount:", {
        fontSize: "18px",
        fill: "#000",
      });
      addLiquidityPopup.add(goldCoinTitle);


      var goldCoinAmount = this.add
        .rexBBCodeText(50, -40, "0", {
          color: "black",
          fontSize: "18px",
          fixedWidth: 100,
          fixedHeight: 30,
          backgroundColor: "#ffffff",
          valign: "center",
        })
        .setOrigin(0.5);
      addLiquidityPopup.add(goldCoinAmount);

      this.plugins.get("rextexteditplugin").add(goldCoinAmount, {
        type: "text",
        enterClose: true,
        selectAll: true,
      });

      // Add "Add Liquidity" button
      const addLiquidityButton = this.add.sprite(0, 110, "buttonTexture"); // Adjust position and use the correct image for the button
      addLiquidityButton.scale = 0.8;
      addLiquidityPopup.add(addLiquidityButton);
      addLiquidityButton.setInteractive(); // Make the button interactive

      const addLiquidityButtonText = this.add.text(-90, 100, "Add Liquidity", {
        fontSize: "24px",
        fill: "#fff",
      });
      addLiquidityPopup.add(addLiquidityButtonText);

      // Functionality for Add Liquidity button
      addLiquidityButton.on("pointerup", () => {
        // Add your logic here for adding liquidity
        console.log("Add Liquidity button clicked");
      });

      this.tweens.add({
        targets: addLiquidityPopup,
        alpha: 1,
        duration: 500,
      });
    };

    const handleSwapClick = () => {
      // Close the clanCastlePopup
      this.tweens.add({
        targets: clanCastlePopup,
        alpha: 0,
        duration: 500,
        onComplete: () => {
          clanCastlePopup.setVisible(false);
        },
      });

      // Open a new popup for swapping
      const swapPopup = this.add.container(512, 384); // Create a container for the swap popup
      swapPopup.setDepth(101);
      swapPopup.setAlpha(0); // Initially hide the swap popup

      const swapBackground = this.add.image(0, 0, "popupBackground"); // Replace "popupBackground" with your actual swap background image
      swapBackground.setOrigin(0.5);
      swapPopup.add(swapBackground);

      const swapText = this.add.text(0, -200, "Swap", {
        fontFamily: "Brush Script",
        fontSize: "48px",
        color: "#000",
        fontStyle: "italic",
        fontWeight: "bold",
        align: "center",
      });
      swapText.setOrigin(0.5);
      swapPopup.add(swapText);

      // Add close button to the swap popup
      const swapCloseButton = this.add.sprite(190, -210, "closeButton"); // Add a close button to the swap popup
      swapCloseButton.scale = 0.1;
      swapCloseButton.setDepth(101);
      swapCloseButton.setInteractive();
      swapCloseButton.on("pointerup", () => {
        this.tweens.add({
          targets: swapPopup,
          alpha: 0,
          duration: 500,
          onComplete: () => {
            swapPopup.setVisible(false);
          },
        });
      });
      swapPopup.add(swapCloseButton);

      // Add content and functionality to the swap popup as needed

            // Add USDC Amount box
            const usdcTitle = this.add.text(-190, -100, "USDC Amount:", {
              fontSize: "18px",
              fill: "#000",
            });
            swapPopup.add(usdcTitle);
      
      
            var usdcAmount = this.add
              .rexBBCodeText(50, -90, "0", {
                color: "black",
                fontSize: "18px",
                fixedWidth: 100,
                fixedHeight: 30,
                backgroundColor: "#ffffff",
                valign: "center",
              })
              .setOrigin(0.5);
            swapPopup.add(usdcAmount);
      
            this.plugins.get("rextexteditplugin").add(usdcAmount, {
              type: "text",
              enterClose: true,
              selectAll: true,
            });
      
            // Add Gold Coin Amount box
            const goldCoinTitle = this.add.text(-190, -50, "Gold Coin Amount:", {
              fontSize: "18px",
              fill: "#000",
            });
            swapPopup.add(goldCoinTitle);
      
      
            var goldCoinAmount = this.add
              .rexBBCodeText(50, -40, "0", {
                color: "black",
                fontSize: "18px",
                fixedWidth: 100,
                fixedHeight: 30,
                backgroundColor: "#ffffff",
                valign: "center",
              })
              .setOrigin(0.5);
            swapPopup.add(goldCoinAmount);
      
            this.plugins.get("rextexteditplugin").add(goldCoinAmount, {
              type: "text",
              enterClose: true,
              selectAll: true,
            });
      
            // Add "Add Liquidity" button
            const swapButton = this.add.sprite(0, 110, "buttonTexture"); // Adjust position and use the correct image for the button
            swapButton.scale = 0.8;
            swapPopup.add(swapButton);
            swapButton.setInteractive(); // Make the button interactive
      
            const swapButtonText = this.add.text(-30, 100, "Swap", {
              fontSize: "24px",
              fill: "#fff",
            });
            swapPopup.add(swapButtonText);
      
            // Functionality for Add Liquidity button
            swapButton.on("pointerup", () => {
              // Add your logic here for adding liquidity
              console.log("Swap button clicked");
            });

      this.tweens.add({
        targets: swapPopup,
        alpha: 1,
        duration: 500,
      });
    };

    // Add click events to handle "Add Liquidity" and "Swap" button clicks
    stakeButton.on("pointerup", () => {
      handleAddLiquidityClick();
    });

    swapButton.on("pointerup", () => {
      handleSwapClick();
    });

    // Function to handle clan castle click
    const handleClanCastleClick = () => {
      clanCastlePopup.setVisible(!clanCastlePopup.visible); // Toggle popup visibility
      this.tweens.add({
        targets: clanCastlePopup,
        alpha: clanCastlePopup.visible ? 1 : 0, // Fade in/out the popup
        duration: 500,
      });
    };

    // Set up click event for the clan castle
    clancastle.on("pointerup", () => {
      handleClanCastleClick();
    });

    const mine = this.add.sprite(280, 390, "mine");
    mine.scale = 0.3;
    mine.flipX = true;

    const shop = this.add.sprite(100, 700, "shop");
    shop.scale = 0.25;
    shop.setInteractive();
    shop.on("pointerover", () => {
      shop.setScale(0.28);
    });
    shop.on("pointerout", () => {
      shop.setScale(0.25);
    });

    const bgm = this.sound.add("bgm", { loop: true });
    bgm.play();

    const toggleButton = this.add.sprite(100, 50, "toggleButton").setDepth(1);
    toggleButton.scale = 0.3;
    toggleButton.setInteractive();
    toggleButton.on("pointerover", () => {
      toggleButton.setScale(0.32);
    });
    toggleButton.on("pointerout", () => {
      toggleButton.setScale(0.3);
    });

    let isBgmPlaying = true; // Flag to track if bgm is playing

    // Function to toggle bgm
    const toggleBgm = () => {
      isBgmPlaying ? bgm.pause() : bgm.resume();
      isBgmPlaying = !isBgmPlaying; // Toggle flag
      toggleButton.setTint(isBgmPlaying ? 0xffffff : 0x808080); // White if sound is on, dim color if sound is off
    };

    // Set up pointer events for the toggle button
    toggleButton.on("pointerup", () => {
      toggleBgm();
    });

    const mineCapacity = 10; // Maximum coins that can be stored in the mine
    let mineCount = 0; // Current coins in the mine
    const coinBarCapacity = 100; // Maximum coins that can be in the coin bar
    let coinCount = 0; // Current coins in the coin bar

    const coinBar = this.add.graphics();
    const barWidth = 200;
    const barHeight = 20;
    const barX = 800;
    const barY = 30;

    const updateCoinBar = () => {
      const percentFilled = (coinCount / coinBarCapacity) * 100;
      coinBar.clear();
      coinBar.fillStyle(0xffd700); // Gold color
      coinBar.fillRoundedRect(
        barX,
        barY,
        barWidth * (percentFilled / 100),
        barHeight,
        barHeight / 2
      ); // Rounded rectangle

      // Draw rounded border around the bar
      coinBar.lineStyle(2, 0xffffff); // White color, 2px thickness
      coinBar.beginPath();
      coinBar.moveTo(barX + barHeight / 2, barY);
      coinBar.lineTo(barX + barWidth - barHeight / 2, barY);
      coinBar.arc(
        barX + barWidth - barHeight / 2,
        barY + barHeight / 2,
        barHeight / 2,
        -Math.PI / 2,
        Math.PI / 2,
        false
      );
      coinBar.lineTo(barX + barHeight / 2, barY + barHeight);
      coinBar.arc(
        barX + barHeight / 2,
        barY + barHeight / 2,
        barHeight / 2,
        Math.PI / 2,
        -Math.PI / 2,
        false
      );
      coinBar.closePath();
      coinBar.stroke();
    };

    let latestTooltip = null; // Track the latest created tooltip

    // Show tooltip over mine every 5 seconds
    this.time.addEvent({
      delay: 4000, // 5 seconds in milliseconds
      loop: true,
      callback: () => {
        // Check if a tooltip already exists
        if (latestTooltip && latestTooltip.active) {
          // If a tooltip is active, return and don't create a new one
          return;
        }

        // Create a new tooltip
        const cointooltip = this.add
          .image(mine.x, mine.y - 50, "cointooltip")
          .setAlpha(0);
        cointooltip.scale = 0.3;

        // Fade in animation
        this.tweens.add({
          targets: cointooltip,
          alpha: 1,
          duration: 500, // Fade in duration
          delay: 500, // Delay before fading out
        });

        cointooltip.setInteractive();
        cointooltip.on("pointerup", () => {
          // Destroy the tooltip on click
          cointooltip.destroy();
          if (mineCount > 0) {
            coinCount += mineCount;
            if (coinCount > coinBarCapacity) {
              coinCount = coinBarCapacity;
            }
            mineCount = 0;
            updateCoinBar();
          }
        });

        // Update the latestTooltip reference
        latestTooltip = cointooltip;
      },
    });

    // Increment mine count and update bar when a coin is found
    const incrementMine = () => {
      if (mineCount < mineCapacity) {
        mineCount++;
        updateCoinBar();
      }
    };

    // Trigger incrementMine every 2 seconds
    this.time.addEvent({
      delay: 4000, // 2 seconds in milliseconds
      loop: true,
      callback: () => {
        incrementMine();
      },
    });

    this.add.image(780, 40, "ethcoin").setScale(0.1);

    // Rotate cannon by 90 degrees every 3 seconds
    this.time.addEvent({
      delay: 3000, // 3 seconds in milliseconds
      loop: true,
      callback: () => {
        cannon.flipX = !cannon.flipX;
      },
    });

    const shopPopup = this.add.container(512, 384); // Create a container for the shop popup
    shopPopup.setDepth(100);
    shopPopup.setAlpha(0); // Initially hide the shop popup
    const shopBackground = this.add.image(0, 0, "popupBackground"); // Replace "popupBackground" with your actual shop background image
    shopBackground.setOrigin(0.5);
    shopPopup.add(shopBackground);

    // Add the "SHOP" text in a stylish font at the top center
    const shopText = this.add.text(0, -200, "SHOP", {
      fontFamily: "Brush Script",
      fontSize: "48px",
      color: "#000",
      fontStyle: "italic",
      fontWeight: "bold",
      align: "center",
    });
    shopText.setOrigin(0.5);
    shopPopup.add(shopText);

    // Add shop items, descriptions, prices, etc., to the shopPopup container as needed
    let isShopOpen = false; // Flag to track if the shop is open

    const closeButton = this.add.sprite(190, -210, "closeButton"); // Add a close button to the shop popup
    closeButton.scale = 0.1;
    closeButton.setDepth(101);
    closeButton.setInteractive();
    closeButton.on("pointerup", () => {
      this.tweens.add({
        targets: shopPopup,
        alpha: 0,
        duration: 500,
        onComplete: () => {
          shopPopup.setVisible(false);
        },
      });
      isShopOpen = false; // Close the shop
    });
    shopPopup.add(closeButton);

    // Show shop popup on shop button click
    shop.on("pointerup", () => {
      shopPopup.setVisible(!isShopOpen);
      this.tweens.add({
        targets: shopPopup,
        alpha: 1,
        duration: 500,
      });
      isShopOpen = !isShopOpen; // Toggle flag
    });

    // Add gold storage to the shop popup
    const goldStorage = this.add.sprite(-100, -30, "goldStorage"); // Adjust the position as needed
    goldStorage.scale = 0.4;
    shopPopup.add(goldStorage);

    // Add buy button for gold storage
    const buyGoldStorageButton = this.add.sprite(-100, 70, "buttonTexture"); // Adjust position and use the correct image for the buy button
    buyGoldStorageButton.scale = 0.5;
    shopPopup.add(buyGoldStorageButton);
    buyGoldStorageButton.setInteractive(); // Make the button interactive

    // Add "Buy" text next to the buy button
    const buyGoldText = this.add.text(-130, 60, "100", {
      fontSize: "24px",
      fill: "#fff",
    });
    shopPopup.add(buyGoldText);

    // Add ethcoin image next to the buy button
    const ethcoinImageGold = this.add.image(-60, 70, "ethcoin").setScale(0.1);
    shopPopup.add(ethcoinImageGold);

    // Add army camp to the shop popup
    const armyCamp = this.add.sprite(80, -30, "armyCamp"); // Adjust the position as needed
    armyCamp.scale = 0.4;
    shopPopup.add(armyCamp);

    // Add buy button for army camp
    const buyArmyCampButton = this.add.sprite(80, 70, "buttonTexture"); // Adjust position and use the correct image for the buy button
    buyArmyCampButton.scale = 0.5;
    shopPopup.add(buyArmyCampButton);
    buyArmyCampButton.setInteractive(); // Make the button interactive

    // Add "Buy" text next to the buy button
    const buyArmyText = this.add.text(50, 60, "200", {
      fontSize: "24px",
      fill: "#fff",
    });
    shopPopup.add(buyArmyText);

    // Add ethcoin image next to the buy button
    const ethcoinImageArmy = this.add.image(110, 70, "ethcoin").setScale(0.1);
    shopPopup.add(ethcoinImageArmy);

    // Function to handle buy button click
    const handleBuyButtonClick = (button, buildingSprite) => {
      button.setTint(0x808080); // Dim the button
      this.time.delayedCall(1000, () => {
        // Wait for 1 second
        shopPopup.setVisible(false); // Close the shop
        isShopOpen = false; // Toggle shop open flag
        // Place the building in the game screen
        if (buildingSprite === "goldStorage") {
          const building = this.add.sprite(412, 440, buildingSprite); // Adjust position as needed
          building.scale = 0.3;
        }
        else {
          const building = this.add.sprite(630, 420, buildingSprite); // Adjust position as needed
          building.scale = 0.25;
        }
      });
    };

    // Set up click events for buy buttons
    buyGoldStorageButton.on("pointerup", () => {
      handleBuyButtonClick(buyGoldStorageButton, "goldStorage");
    });

    buyArmyCampButton.on("pointerup", () => {
      handleBuyButtonClick(buyArmyCampButton, "armyCamp");
    });

    // this.input.once("pointerdown", () => {
    //   bgm.stop();
    //   this.scene.start("GameOver");
    // });
  }
}


