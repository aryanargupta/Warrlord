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

    const townhall = this.add.sprite(530, 300, "townhall");
    townhall.scale = 0.4;
    townhall.flipX = true;

    const cannon1 = this.add.sprite(350, 340, "cannon");
    cannon1.scale = 0.65;
    cannon1.flipX = true;

    const cannon2 = this.add.sprite(680, 380, "cannon");
    cannon2.scale = 0.65;

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

    // Add your troop sprite and play the attack animation
    const troop = this.add.sprite(190, 380, "charizardSpritesheet"); // Adjust x, y coordinates
    troop.anims.play("charizardAttack"); // Play the attack animation

    this.anims.create({
      key: "charizardFlip",
      frames: this.anims.generateFrameNumbers("charizardFlipSpriteSheet", {
        start: 0,
        end: 50,
      }),
      frameRate: 30,
      repeat: 100,
    });

    const troop2 = this.add.sprite(830, 400, "charizardFlipSpriteSheet");
    troop2.anims.play("charizardFlip");

    // Tweening for movement after 5 seconds
    this.time.delayedCall(20000, () => {
      this.tweens.add({
        targets: troop, // Add both troops to the tween
        x: townhall.x - 100, // Move towards the townhall's x position
        y: townhall.y - 50, // Move towards the townhall's y position
        duration: 4000, // Duration of the movement
        ease: "Linear", // Linear easing for smooth movement
      });
    });

    // Tweening for movement after 5 seconds
    this.time.delayedCall(20000, () => {
      this.tweens.add({
        targets: troop2, // Add both troops to the tween
        x: townhall.x + 100, // Move towards the townhall's x position
        y: townhall.y + 50, // Move towards the townhall's y position
        duration: 4000, // Duration of the movement
        ease: "Linear", // Linear easing for smooth movement
      });
    });

    // Create a circular bullet sprite

    //   console.log("Bullet Position:", bullet.x, bullet.y);

    // // Define the bullet animation
    const bulletTween = this.tweens.add({
      targets: bullet,
      x: troop.x + 40, // Move towards the troop's x position
      y: troop.y + 10, // Move towards the troop's y position
      duration: 2500, // Duration of the movement (adjust as needed)
      ease: "Linear", // Linear easing for smooth movement
      repeat: 4,
      onComplete: () => {
        bullet.destroy(); // Destroy the bullet sprite when animation completes
        // Optionally, you can add logic here for what happens when the bullet reaches its target
      },
    });
      
      
    const bulletTween2 = this.tweens.add({
        targets: bullet2,
        x: troop2.x-20, // Move towards the troop's x position
        y: troop2.y+30, // Move towards the troop's y position
        duration: 2500, // Duration of the movement (adjust as needed)
        ease: "Linear", // Linear easing for smooth movement
        repeat: 4,
        onComplete: () => {
          bullet.destroy(); // Destroy the bullet sprite when animation completes
          // Optionally, you can add logic here for what happens when the bullet reaches its target
        },
    });
      
      const fireballTween = this.tweens.add({
        targets: fireball,
        x: 335, // Move towards the troop's x position
        y: 345, // Move towards the troop's y position
        duration: 4000, // Duration of the movement (adjust as needed)
        ease: "Linear", // Linear easing for smooth movement
        repeat: 4,
        onComplete: () => {
          fireball.destroy(); // Destroy the bullet sprite when animation completes
          // Optionally, you can add logic here for what happens when the bullet reaches its target
        },
      })

        const fireballTween2 = this.tweens.add({
            targets: fireball2,
            x: 710, // Move towards the troop's x position
            y: 380, // Move towards the troop's y position
            duration: 4000, // Duration of the movement (adjust as needed)
            ease: "Linear", // Linear easing for smooth movement
            repeat: 4,
            onComplete: () => {
            fireball2.destroy(); // Destroy the bullet sprite when animation completes
            // Optionally, you can add logic here for what happens when the bullet reaches its target
            },
        })
  }
}
