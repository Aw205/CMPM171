class CaseScene extends Phaser.Scene {

    constructor() {
        super("CaseScene");
    }

    create() {

        this.add.nineslice(75,65,46,46,'window',7).resize(520,400);
        let portrait = this.add.image(120, 120, "portrait_frame").setOrigin(0, 0).setScale(1.5, 1.5);
        portrait.setInteractive({ useHandCursor: true });
        
        portrait.on("pointerdown", () => {
            this.scene.sleep("Office");
            this.scene.stop().run("CrimeScene");
        });

        this.add.bitmapText(130,150,"peaberry","Crime Scene");
        //this.add.text(350, 140, "Description: ");

        new ImageButton(this, 560, 90, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.stop().run("Office");
        }).setScale(2);
        new ImageButton(this, 100, 90, "backButton", undefined, "backPressedButton", () => {
            this.scene.stop().run("DeskScene");
        }).setScale(2);
    }

}