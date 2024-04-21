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

    let townhallHP = 2400;
    let cannon1HP = 1200;
    let cannon2HP = 1200;
    let charizard1HP = 1000;
    let charizard2HP = 1000;

    let cannonFireRate = 3000; // Duration of cannon bullet animation
    let charizardFireballRate = 4000; // Duration of charizard fireball animation

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
            console.log("Charizard 1 HP:", charizard1HP);
            // bullet.destroy(); // Destroy the bullet sprite when animation completes
            if (charizard1HP <= 0 || cannon1HP <= 0) {
              fireballTween.remove();
              bulletTween1.remove();
              fireball.destroy();
              bullet.destroy();
              cannon1.setTexture("destroyedCannon");
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
            console.log("Charizard 2 HP:", charizard2HP);
            // bullet.destroy(); // Destroy the bullet sprite when animation completes
            if (charizard2HP <= 0 || cannon2HP <= 0) {
              fireballTween2.remove();
              bulletTween2.remove();
              fireball2.destroy();
              bullet2.destroy();
              cannon2.setTexture("destroyedCannon");
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
            console.log("Cannon 1 HP:", cannon1HP);
            // fireball.destroy(); // Destroy the bullet sprite when animation completes
            if (charizard1HP <= 0 || cannon1HP <= 0) {
              fireballTween.remove();
              bulletTween1.remove();
              fireball.destroy();
              bullet.destroy();
              cannon1.setTexture("destroyedCannon");
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
            console.log("Cannon 2 HP:", cannon2HP);
            // fireball2.destroy(); // Destroy the bullet sprite when animation completes
            if (charizard2HP <= 0 || cannon2HP <= 0) {
              fireballTween2.remove();
              bulletTween2.remove();
              fireball2.destroy();
              bullet2.destroy();
              cannon2.setTexture("destroyedCannon");
            }
            // Optionally, you can add logic here for what happens when the bullet reaches its target
          },
        });
      });
      this.time.delayedCall(21500, () => {
        const fireball3 = this.add.sprite(
          500,
          250,
          "fireball"
        );
        fireball3.scale = 0.05;
        // fireball3.flipY = true;
        fireball3.flipX = true;

        const fireball4 = this.add.sprite(
          575,
          350,
          "fireball"
        );
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
            console.log("Townhall HP:", townhallHP);
            // fireball.destroy(); // Destroy the bullet sprite when animation completes
            if (townhallHP <= 0) {
              fireballTween3.remove();
              fireball3.destroy();
              fireball4.destroy();
              townhall.setTexture("destroyedCannon");
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
            console.log("Townhall HP:", townhallHP);
            // fireball.destroy(); // Destroy the bullet sprite when animation completes
            if (townhallHP <= 0) {
              fireballTween4.remove();
              fireball4.destroy();
              fireball3.destroy();
              townhall.setTexture("destroyedCannon");
            }
            // Optionally, you can add logic here for what happens when the bullet reaches its target
          },
        });
      });
    });
  }
}
