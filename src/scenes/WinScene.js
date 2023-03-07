class WinScene extends Phaser.Scene {

    constructor() {
        super("WinScene");
    }

    create() { 
       this.scene.bringToTop();
       this.add.rectangle(0,0,game.config.width,game.config.height,0,1).setOrigin(0,0);
       this.add.text(game.config.width/2,game.config.height/2,"You win!");
    }
   
}