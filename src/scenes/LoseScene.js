class LoseScene extends Phaser.Scene {

    constructor() {
        super("LoseScene");
    }

    create() {

       this.scene.bringToTop();
       this.add.rectangle(0,0,game.config.width,game.config.height,0,1).setOrigin(0,0);
       this.add.text(game.config.width/2,game.config.height/2,"You lose!");
    }
       
}