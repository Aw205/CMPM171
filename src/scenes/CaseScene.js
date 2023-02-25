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

        let exitButton = this.add.image(530, 80, "exit").setOrigin(0, 0).setScale(2, 2);
        exitButton.setInteractive({ useHandCursor: true });
        exitButton.on("pointerdown", () => {
            this.scene.stop().run("Office");
        });

        let backButton = this.add.image(80, 75, "arrow").setOrigin(0, 0).setScale(1.5, 1.5);
        backButton.setInteractive({ useHandCursor: true });
        backButton.on("pointerdown", () => {
            this.scene.stop().run("DeskScene");
        });

    }

}