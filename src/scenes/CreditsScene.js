class CreditsScene extends Phaser.Scene {

    constructor() {
        super("CreditsScene");
    }

    create() {

        this.add.image(game.config.width / 2, game.config.height / 2, "credits").setDisplaySize(640,480);
        this.returnButton = new BitmapTextButton(this, game.config.width / 2, 430,"peaberry","Return","flatButton",()=>{
            this.scene.stop().run("Menu");
        });

    }
}