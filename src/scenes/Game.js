import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.add.image(512, 384, "gameBG");

    this.add.image(512, 384, "gameBG").setAlpha(0.5);

    this.add.image(512, 384, "border");

    const townhall = this.add.sprite(540, 230, "townhall");
    townhall.scale = 0.3;
    townhall.flipX = true;
    townhall.setInteractive();
    townhall.on("pointerover", () => {
      townhall.setScale(0.28);
    });
    townhall.on("pointerout", () => {
      townhall.setScale(0.25);
    });

    const cannon = this.add.sprite(540, 500, "cannon");
    cannon.scale = 0.6;
    cannon.flipX = true;

    const clancastle = this.add.sprite(700, 350, "clancastle");
    clancastle.scale = 0.6;
    clancastle.angle = clancastle.angle - 3;

    const mine = this.add.sprite(400, 390, "mine");
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

    // Coin Counter Bar
    const coinBar = this.add.graphics();
    let coinCount = 0; // Initial coin count
    const maxCoins = 10; // Maximum coins that can be collected
    const barWidth = 200;
    const barHeight = 20;
    const barX = 800;
    const barY = 30;

    const updateCoinBar = () => {
      const percentFilled = (coinCount / maxCoins) * 100;
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

    updateCoinBar(); // Initial update

    // Show tooltip over mine every 5 seconds
    this.time.addEvent({
      delay: 4000, // 5 seconds in milliseconds
      loop: true,
      callback: () => {
        const cointooltip = this.add.image(mine.x, mine.y - 50, "cointooltip").setAlpha(0);
        cointooltip.scale = 0.3
        this.tweens.add({
          targets: cointooltip,
          alpha: 1,
          duration: 500, // Fade in duration
          delay: 500, // Delay before fading out
          onComplete: () => {
            this.tweens.add({
              targets: cointooltip,
              alpha: 0,
              duration: 500, // Fade out duration
              delay: 500, // Delay before next popup
              onComplete: () => {
                cointooltip.destroy();
                // Increment coin count and update bar
                if (coinCount < maxCoins) {
                  coinCount++;
                }
                updateCoinBar();
              },
            });
          },
        });
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

    // this.input.once("pointerdown", () => {
    //   bgm.stop();
    //   this.scene.start("GameOver");
    // });
  }
}
