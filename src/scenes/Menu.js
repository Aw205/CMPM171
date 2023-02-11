
class Menu extends Phaser.Scene {

    constructor() {
        super("Menu");
    }

    preload() {
        this.load.audio("button_click", "./assets/audio/button_click.wav");
        this.load.image("button_background", "./assets/button_background.png");
        this.load.spritesheet("playerAnims", "./assets/player/characters.png", {
            frameWidth: 52,
            frameHeight: 72,
        });
    }

    create() {
        this.createAnimations('up', 90, 92);
        this.createAnimations('right', 78, 80);
        this.createAnimations('down', 54, 56);
        this.createAnimations('left', 66, 68);

        this.startButton = new TextButton(this, game.config.width / 2, 500, "Start", { fontSize: 30 }, () => {
            this.cameras.main.fadeOut(1500);
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start("GameScreen");
            });
        }).setOrigin(0.5);
        this.tutorialButton = new TextButton(this, game.config.width / 2, 550, "", { fontSize: 20 }, () => { }).setOrigin(0.5);
        this.creditsButton = new TextButton(this, game.config.width / 2, 600, "", { fontSize: 22 }, () => { }).setOrigin(0.5);

        this.tweenButtons();

    }

    tweenButtons() {
        this.tweens.add({
            targets: [this.startButton, this.startButton.img],
            y: 250,
            ease: Phaser.Math.Easing.Sine.InOut,
            duration: 1500
        });

        this.tweens.add({
            targets: [this.tutorialButton, this.tutorialButton.img],
            y: 320,
            ease: Phaser.Math.Easing.Sine.InOut,
            duration: 1500
        });

        this.tweens.add({
            targets: [this.creditsButton, this.creditsButton.img],
            y: 390,
            ease: Phaser.Math.Easing.Sine.InOut,
            duration: 1500
        });
    }

    createAnimations(name, startFrame, endFrame) {

        this.anims.create({
            key: name,
            frames: this.anims.generateFrameNumbers("playerAnims", {
                start: startFrame,
                end: endFrame,
            }),
            frameRate: 10,
            repeat: -1,
            yoyo: true,
        });
    }


}