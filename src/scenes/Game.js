import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.add.image(512, 384, "gameBG");

    this.add.image(512, 384, "gameBG").setAlpha(0.5);

    const townhall = this.add.sprite(540, 230, "townhall");
    townhall.scale = 0.3;
    townhall.flipX = true;

    const cannon = this.add.sprite(540, 500, "cannon");
    cannon.scale = 0.5;

    const clancastle = this.add.sprite(480, 440, "clancastle");
    clancastle.scale = 0.5;

    const mine = this.add.sprite(400, 390, "mine");
    mine.scale = 0.3;
    mine.flipX = true;

    const bgm = this.sound.add("bgm", { loop: true });
    bgm.play();

    const toggleButton = this.add.sprite(100, 100, "toggleButton").setDepth(1);
    toggleButton.scale = 0.1;
    toggleButton.setInteractive();
    toggleButton.on("pointerover", () => {
      toggleButton.setScale(0.11);
    });
    toggleButton.on("pointerout", () => {
      toggleButton.setScale(0.1);
    });


    let isBgmPlaying = true; // Flag to track if bgm is playing

    // Function to toggle bgm
    const toggleBgm = () => {
      isBgmPlaying ? bgm.pause() : bgm.resume();
      isBgmPlaying = !isBgmPlaying; // Toggle flag
    };

    // Set up pointer events for the toggle button
    toggleButton.on("pointerup", toggleBgm);

    // this.input.once("pointerdown", () => {
    //   bgm.stop();
    //   this.scene.start("GameOver");
    // });
  }
}
