
class Menu extends Phaser.Scene {

    constructor() {
        super("Menu");
    }

    create() {

        this.text = this.add.bitmapText(game.config.width/2,100,"clean","Out of Depth").setFontSize(48).setOrigin(0.5,0).setAlpha(0);
        this.tweens.add({
            targets: this.text,
            alpha: 1,
            duration: 3500,
            ease: "Quad.easeIn",
        });       

        this.createAnimations('up', 90, 92);
        this.createAnimations('right', 78, 80);
        this.createAnimations('down', 54, 56);
        this.createAnimations('left', 66, 68);

        this.startButton = new TextButton(this, game.config.width / 2, 500, "Start", { fontSize: 30 }, () => {

           
            this.cameras.main.fadeOut(1500);
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start("Office");
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