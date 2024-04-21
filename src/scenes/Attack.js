import { Scene } from "phaser";

export class Attack extends Scene {
  constructor() {
    super("Attack");
  }

  preload() {
    this.load.spritesheet(
      "charizardSpritesheet",
      "assets/charizardspritesheet.png",
      {
        frameWidth: 172,
        frameHeight: 166,
      }
    );

    this.load.spritesheet(
      "charizardFlipSpriteSheet",
      "assets/charizardflipspritesheet.png",
      {
        frameWidth: 172,
        frameHeight: 166,
      }
    );
  }

  create() {
    //  This is the Attack Scene
    //  It is called after the Game Scene and is used to display the results of the attack
    this.add.image(512, 384, "armyBase");

    const bgm = this.sound.add("attackBgm", { loop: true });
    this.time.delayedCall(2000, () => {
      bgm.play();
    });

    let buildingCount = 3;
    let currentCount = 0;

    let townhallHP = 2400;
    let cannon1HP = 1200;
    let cannon2HP = 1200;
    let charizard1HP = 1000;
    let charizard2HP = 1000;

    let cannonFireRate = 3000; // Duration of cannon bullet animation
    let charizardFireballRate = 4000; // Duration of charizard fireball animation

    // Create HP bars
    const townhallHPBar = this.add.rectangle(530, 260, 200, 20, 0xff0000);
    const cannon1HPBar = this.add.rectangle(350, 300, 150, 15, 0xff0000);
    const cannon2HPBar = this.add.rectangle(680, 340, 150, 15, 0xff0000);
    const charizard1HPBar = this.add.rectangle(130, 660, 100, 10, 0x00ff00);
    const charizard2HPBar = this.add.rectangle(130, 610, 100, 10, 0x00ff00);

    // Set initial HP bar sizes
    townhallHPBar.displayWidth = 200 * (townhallHP / 2400);
    cannon1HPBar.displayWidth = 150 * (cannon1HP / 1200);
    cannon2HPBar.displayWidth = 150 * (cannon2HP / 1200);
    charizard1HPBar.displayWidth = 100 * (charizard1HP / 1000);
    charizard2HPBar.displayWidth = 100 * (charizard2HP / 1000);

    // Add titles above HP bars
    const townhallTitle = this.add.text(530, 230, "Townhall", {
      fontSize: "18px",
      fill: "#000",
      fontStyle: "bold",
    });
    townhallTitle.setOrigin(0.5, 0.5);

    const cannon1Title = this.add.text(350, 280, "Cannon 1", {
      fontSize: "18px",
      fill: "#000",
      fontStyle: "bold",
    });
    cannon1Title.setOrigin(0.5, 0.5);

    const cannon2Title = this.add.text(680, 320, "Cannon 2", {
      fontSize: "18px",
      fill: "#000",
      fontStyle: "bold",
    });
    cannon2Title.setOrigin(0.5, 0.5);

    const charizard1Title = this.add.text(130, 640, "Charizard 1", {
      fontSize: "18px",
      fill: "#fff",
      fontStyle: "bold",
    });
    charizard1Title.setOrigin(0.5, 0.5);

    const charizard2Title = this.add.text(130, 590, "Charizard 2", {
      fontSize: "18px",
      fill: "#fff",
      fontStyle: "bold",
    });
    charizard2Title.setOrigin(0.5, 0.5);

    const townhall = this.add.sprite(530, 300, "townhall");
    townhall.scale = 0.4;
    townhall.flipX = true;

    const cannon1 = this.add.sprite(350, 340, "cannon");
    cannon1.scale = 0.65;
    cannon1.flipX = true;

    const cannon2 = this.add.sprite(680, 380, "cannon");
    cannon2.scale = 0.65;

    // Define the animation for the troop
    this.anims.create({
      key: "charizardAttack", // Animation key
      frames: this.anims.generateFrameNumbers("charizardSpritesheet", {
        start: 0,
        end: 50,
      }), // Assuming 8 frames for the attack animation
      frameRate: 30, // Adjust as needed for the animation speed
      repeat: 100,
    });

    this.anims.create({
      key: "charizardFlip",
      frames: this.anims.generateFrameNumbers("charizardFlipSpriteSheet", {
        start: 0,
        end: 50,
      }),
      frameRate: 30,
      repeat: 100,
    });

    // Create a deploy troops button

    const deployButton = this.add.sprite(130, 730, "buttonTexture");
    deployButton.scale = 0.8;
    deployButton.setInteractive();
    const deployText = this.add.text(40, 720, "Deploy Troops", {
      fontSize: "24px",
      fill: "#fff",
    });
    deployButton.on("pointerdown", () => {
      deployButton.setTint(0x808080);
      deployButton.disableInteractive();
      // Add your troop sprite and play the attack animation
      const troop = this.add
        .sprite(120, 420, "charizardSpritesheet")
        .setDepth(10); // Adjust x, y coordinates
      troop.anims.play("charizardAttack"); // Play the attack animation

      const troop2 = this.add
        .sprite(870, 440, "charizardFlipSpriteSheet")
        .setDepth(10);
      troop2.anims.play("charizardFlip");

      this.time.delayedCall(1000, () => {
        this.tweens.add({
          targets: troop, // Add both troops to the tween
          x: 190, // Move towards the townhall's x position
          y: 380, // Move towards the townhall's y position
          duration: 2000, // Duration of the movement
          ease: "Linear", // Linear easing for smooth movement
        });
      });

      this.time.delayedCall(1000, () => {
        this.tweens.add({
          targets: troop2, // Add both troops to the tween
          x: 830, // Move towards the townhall's x position
          y: 400, // Move towards the townhall's y position
          duration: 2000, // Duration of the movement
          ease: "Linear", // Linear easing for smooth movement
        });
      });

      // Tweening for movement after 5 seconds
      this.time.delayedCall(17500, () => {
        this.tweens.add({
          targets: troop, // Add both troops to the tween
          x: townhall.x - 100, // Move towards the townhall's x position
          y: townhall.y - 50, // Move towards the townhall's y position
          duration: 3000, // Duration of the movement
          ease: "Linear", // Linear easing for smooth movement
        });
      });

      // Tweening for movement after 5 seconds
      this.time.delayedCall(17500, () => {
        this.tweens.add({
          targets: troop2, // Add both troops to the tween
          x: townhall.x + 100, // Move towards the townhall's x position
          y: townhall.y + 50, // Move towards the townhall's y position
          duration: 3000, // Duration of the movement
          ease: "Linear", // Linear easing for smooth movement
        });
      });

      // Create a circular bullet sprite

      //   console.log("Bullet Position:", bullet.x, bullet.y);
      this.time.delayedCall(5000, () => {
        // // Define the bullet animation
        const bullet = this.add.sprite(335, 345, "cannonBullet");
        bullet.scale = 0.05;

        const bullet2 = this.add.sprite(710, 380, "cannonBullet");
        bullet2.scale = 0.05;

        const fireball = this.add.sprite(250, 380, "fireball");
        fireball.scale = 0.05;
        fireball.flipY = true;
        fireball.flipX = true;

        const fireball2 = this.add.sprite(750, 400, "fireball");
        fireball2.scale = 0.05;
        fireball2.flipY = true;

        const bulletTween1 = this.tweens.add({
          targets: bullet,
          x: troop.x + 40, // Move towards the troop's x position
          y: troop.y + 10, // Move towards the troop's y position
          duration: cannonFireRate, // Duration of the movement (adjust as needed)
          ease: "Linear", // Linear easing for smooth movement
          repeat: 100,
          onRepeat: () => {
            charizard1HP -= 100; // Reduce the charizard's HP when the bullet hits
            charizard1HPBar.displayWidth = 100 * (charizard1HP / 1000); // Update HP bar
            console.log("Charizard 1 HP:", charizard1HP);
            // bullet.destroy(); // Destroy the bullet sprite when animation completes
            if (charizard1HP <= 0 || cannon1HP <= 0) {
              fireballTween.remove();
              bulletTween1.remove();
              fireball.destroy();
              bullet.destroy();
              cannon1.setTexture("destroyedCannon");
              currentCount += 1;
            }
            // Optionally, you can add logic here for what happens when the bullet reaches its target
          },
        });

        const bulletTween2 = this.tweens.add({
          targets: bullet2,
          x: troop2.x - 20, // Move towards the troop's x position
          y: troop2.y + 30, // Move towards the troop's y position
          duration: cannonFireRate, // Duration of the movement (adjust as needed)
          ease: "Linear", // Linear easing for smooth movement
          repeat: 100,
          onRepeat: () => {
            charizard2HP -= 100;
            charizard2HPBar.displayWidth = 100 * (charizard2HP / 1000); // Update HP bar
            console.log("Charizard 2 HP:", charizard2HP);
            // bullet.destroy(); // Destroy the bullet sprite when animation completes
            if (charizard2HP <= 0 || cannon2HP <= 0) {
              fireballTween2.remove();
              bulletTween2.remove();
              fireball2.destroy();
              bullet2.destroy();
              cannon2.setTexture("destroyedCannon");
              currentCount += 1;
            }
            // Optionally, you can add logic here for what happens when the bullet reaches its target
          },
        });

        const fireballTween = this.tweens.add({
          targets: fireball,
          x: 335, // Move towards the troop's x position
          y: 345, // Move towards the troop's y position
          duration: charizardFireballRate, // Duration of the movement (adjust as needed)
          ease: "Linear", // Linear easing for smooth movement
          repeat: 100,
          onRepeat: () => {
            cannon1HP -= 200;
            cannon1HPBar.displayWidth = 100 * (cannon1HP / 1000); // Update HP bar
            console.log("Cannon 1 HP:", cannon1HP);
            // fireball.destroy(); // Destroy the bullet sprite when animation completes
            if (charizard1HP <= 0 || cannon1HP <= 0) {
              fireballTween.remove();
              bulletTween1.remove();
              fireball.destroy();
              bullet.destroy();
              cannon1.setTexture("destroyedCannon");
              currentCount += 1;
            }
            // Optionally, you can add logic here for what happens when the bullet reaches its target
          },
        });

        const fireballTween2 = this.tweens.add({
          targets: fireball2,
          x: 710, // Move towards the troop's x position
          y: 380, // Move towards the troop's y position
          duration: charizardFireballRate, // Duration of the movement (adjust as needed)
          ease: "Linear", // Linear easing for smooth movement
          repeat: 100,
          onRepeat: () => {
            cannon2HP -= 200;
            cannon2HPBar.displayWidth = 100 * (cannon2HP / 1000); // Update HP bar
            console.log("Cannon 2 HP:", cannon2HP);
            // fireball2.destroy(); // Destroy the bullet sprite when animation completes
            if (charizard2HP <= 0 || cannon2HP <= 0) {
              fireballTween2.remove();
              bulletTween2.remove();
              fireball2.destroy();
              bullet2.destroy();
              cannon2.setTexture("destroyedCannon");
              currentCount += 1;
            }
            // Optionally, you can add logic here for what happens when the bullet reaches its target
          },
        });
      });
      this.time.delayedCall(21500, () => {
        const fireball3 = this.add.sprite(500, 250, "fireball");
        fireball3.scale = 0.05;
        // fireball3.flipY = true;
        fireball3.flipX = true;

        const fireball4 = this.add.sprite(575, 350, "fireball");
        fireball4.scale = 0.05;
        fireball4.flipY = true;
        const fireballTween3 = this.tweens.add({
          targets: fireball3,
          x: 550, // Move towards the troop's x position
          y: 300, // Move towards the troop's y position
          duration: charizardFireballRate, // Duration of the movement (adjust as needed)
          ease: "Linear", // Linear easing for smooth movement
          repeat: 100,
          onRepeat: () => {
            townhallHP -= 200;
            townhallHPBar.displayWidth = 100 * (townhallHP / 1000); // Update HP bar
            console.log("Townhall HP:", townhallHP);
            // fireball.destroy(); // Destroy the bullet sprite when animation completes
            if (townhallHP <= 0) {
              fireballTween3.remove();
              fireballTween4.remove();
              fireball3.destroy();
              fireball4.destroy();
              townhall.setTexture("destroyedCannon");
              currentCount += 1;
              console.log(
                "Attack Percentage: " +
                  (currentCount / buildingCount) * 100 +
                  "%"
              );
              const attackPercentage = (currentCount / buildingCount) * 100;
              this.showResultScreen(attackPercentage, bgm); // Call the showResultScreen method with the attack percentage
            }
            // Optionally, you can add logic here for what happens when the bullet reaches its target
          },
        });

        const fireballTween4 = this.tweens.add({
          targets: fireball4,
          x: townhall.x, // Move towards the troop's x position
          y: townhall.y + 50, // Move towards the troop's y position
          duration: charizardFireballRate, // Duration of the movement (adjust as needed)
          ease: "Linear", // Linear easing for smooth movement
          repeat: 100,
          onRepeat: () => {
            townhallHP -= 200;
            townhallHPBar.displayWidth = 100 * (townhallHP / 1000); // Update HP bar
            console.log("Townhall HP:", townhallHP);
            // fireball.destroy(); // Destroy the bullet sprite when animation completes
            if (townhallHP <= 0) {
              fireballTween4.remove();
              fireballTween3.remove();
              fireball4.destroy();
              fireball3.destroy();
              townhall.setTexture("destroyedCannon");
              currentCount += 1;
              console.log(
                "Attack Percentage: " +
                  (currentCount / buildingCount) * 100 +
                  "%"
              );
              const attackPercentage = (currentCount / buildingCount) * 100;
              this.showResultScreen(attackPercentage, bgm); // Call the showResultScreen method with the attack percentage
            }
            // Optionally, you can add logic here for what happens when the bullet reaches its target
          },
        });
      });
    });
  }

  showResultScreen(attackPercentage, bgm) {
    // Add code to show the result screen
    this.add.image(512, 384, "popupBackground").setDepth(10); // Background image
    const resultPercent = this.add
      .text(-15, -60, `Destruction: ${attackPercentage}%`, {
        fontSize: "36px",
        fill: "#0000ff",
        fontStyle: "bold",
      })
      .setOrigin(0.5, 0.5); // Attack percentage text

    const resultsPopup = this.add.container(512, 384);
    resultsPopup.setDepth(105);

    const popupBackground = this.add.image(0, 0, "popupBackground");
    resultsPopup.add(popupBackground);

    const popupText = this.add.text(0, -200, "Result", {
      fontFamily: "Brush Script",
      fontSize: "48px",
      color: "#000",
      fontStyle: "italic",
      fontWeight: "bold",
      align: "center",
    });
    popupText.setOrigin(0.5);
    resultsPopup.add(popupText);
    resultsPopup.add(resultPercent);

    const backToHomeButton = this.add.sprite(0, 130, "buttonTexture");
    backToHomeButton.scale = 0.8;
    const buttonText = this.add.text(-80, 120, "Back to Home", {
      fontSize: "24px",
      fill: "#fff",
    });
    backToHomeButton.setInteractive();
    resultsPopup.add(backToHomeButton);
    resultsPopup.add(buttonText);
    backToHomeButton.on("pointerdown", () => {
      bgm.stop(); // Stop the background music
      this.scene.start("Game");
    });
  }
}
