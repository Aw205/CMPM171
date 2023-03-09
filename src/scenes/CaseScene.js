class CaseScene extends Phaser.Scene {

    constructor() {
        super("CaseScene");
    }

    create() {

        this.background = this.add.rectangle(75, 65, 520, 400, 0x523A28, 0.9).setOrigin(0, 0);
        let portrait = this.add.image(120, 120, "portrait_frame").setOrigin(0, 0).setScale(1.5, 1.5);
        portrait.setInteractive({ useHandCursor: true });
        portrait.on("pointerdown", () => {
            this.scene.stop("Office");
            this.scene.stop().run("GameScreen");
        });

        this.add.text(130, 150, "Crime Scene Portrait", { color: "0" });
        this.add.text(350, 140, "Description: ");

        new ImageButton(this, 550, 80, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.stop().run("Office");
        }).setScale(2);
        new ImageButton(this, 100, 80, "backButton", undefined, "backButton", () => {
            this.scene.stop().run("DeskScene");
        }).setScale(2);
    }

}