class SuspectSelectionScene extends Phaser.Scene {

    constructor() {
        super("SuspectSelectionScene");
    }

    create() {

        this.background = this.add.rectangle(75, 65, 520, 400, 0x523A28, 0.9).setOrigin(0, 0);
        this.suspectInfo = null;
        this.#createPortraits();

        let exitButton = this.add.image(530, 80, "exit").setOrigin(0, 0).setScale(2, 2);
        exitButton.setInteractive({ useHandCursor: true });
        exitButton.on("pointerdown", () => {
            this.scene.stop().run("Office");
        });
    }

    #createPortraits() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {

                let portrait = this.add.image(120 + 150 * i, 120 + 180 * j, "portrait_frame").setOrigin(0, 0);
                let img = this.add.image(125 + 150 * i, 140 + 180 * j, "player_portrait").setOrigin(0, 0).setScale(3, 3);
                portrait.setInteractive({ useHandCursor: true });
                portrait.on("pointerdown", () => {
                    this.scene.stop().run("SuspectReportScene", this.suspectInfo)
                });
            }
        }
    }
}