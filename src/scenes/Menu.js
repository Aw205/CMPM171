
class Menu extends Phaser.Scene {

    constructor() {
        super("Menu");
    }

    create() {

        this.sound.play("menu_music",{loop: true});

        this.input.setDefaultCursor('url(assets/UI/SAxCursor.png), auto');
        this.add.text(0,0, "",{fontFamily: "mono"}); // just to make sure font is loaded properly

        this.text = this.add.bitmapText(game.config.width/2,100,"clean","Out of Depth").setFontSize(48).setOrigin(0.5,0).setAlpha(0);
        this.tweens.add({
            targets: this.text,
            alpha: 1,
            duration: 3500,
            ease: "Quad.easeIn",
        }); 
          
        this.startButton = new TextButton(this, game.config.width / 2, 500, "Start", {fontSize: 30 }, "button_background",() => {
            this.cameras.main.fadeOut(1500);
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start("Office");
            });
        }).setOrigin(0.5);
        this.tutorialButton = new TextButton(this, game.config.width / 2, 550, "Options", { fontSize: 20 },"button_background",() => { }).setOrigin(0.5);
        this.creditsButton = new TextButton(this, game.config.width / 2, 600, "Credits", { fontSize: 22 },"button_background", () => {
            this.scene.sleep().run("CreditsScene");
         }).setOrigin(0.5);

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
}