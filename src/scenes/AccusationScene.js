class AccusationScene extends Phaser.Scene {

    constructor() {
        super("AccusationScene");
    }

    create() {

        this.background = this.add.rectangle(75, 65, 520, 400, 0x523A28, 0.9).setOrigin(0, 0);
       
        this.#createPortraits();
    }

    #createPortraits() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {

                let portrait = this.add.image(120 + 150 * i, 120 + 180 * j, "portrait_frame").setOrigin(0, 0);
                let img = this.add.image(125 + 150 * i, 140 + 180 * j, "player_portrait").setOrigin(0, 0).setScale(3, 3);
                portrait.setInteractive({ useHandCursor: true });
                let confirmFunc = null;
                (i==0 && j==0) ? confirmFunc = () =>{
                    this.scene.start("WinScene");
                } : confirmFunc = () =>{
                    this.scene.start("LoseScene");
                }
                
                portrait.on("pointerdown", () => {
                    this.scene.pause().run("ConfirmationModal",{parentScene: this.scene.key, callback: confirmFunc});
                });
            }
        }
    }
}