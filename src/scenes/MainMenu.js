import { Scene } from "phaser";

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
