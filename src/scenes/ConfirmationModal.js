class ConfirmationModal extends Phaser.Scene {

    constructor() {
        super("ConfirmationModal");
    }

    create(data) {

        this.parentScene = data.parentScene;
        this.callback = data.callback;
        this.scene.bringToTop();


        this.add.rectangle(game.config.width/2,80,170,300,0x523A28,1);
        this.add.text(game.config.width/2 - 75,50,"Confirm Selection?").setOrigin(0,0);

        this.yesButton = new TextButton(this,game.config.width/2,100,"Yes",undefined,()=>{
            this.callback();

        });
        this.noButton = new TextButton(this,game.config.width/2,140,"No",undefined,()=>{
            this.scene.stop().resume(this.parentScene);
        });
    }

}