class DeskScene extends Phaser.Scene {

    constructor() {
        super("DeskScene");
    }

    create() {

        this.add.nineslice(75,65,46, 46,'window',7).resize(520,400);
        this.caseFolder = this.add.image(90, 140, "folder").setOrigin(0, 0).setScale(0.4);
        this.poiFolder = this.add.image(340, 140, "folder").setOrigin(0, 0).setScale(0.4);
        this.add.text(150, 240, "CASES", { fontSize: 48, color: "0" }).setOrigin(0, 0);
        this.add.text(400, 240, "P.O.I", { fontSize: 48, color: "0" }).setOrigin(0, 0);

        this.#createListeners();

        new ImageButton(this, 560, 90, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.stop().run("Office");
        }).setScale(2);
    }

    #createListeners() {

        this.poiFolder.setInteractive({ useHandCursor: true });
        this.caseFolder.setInteractive({ useHandCursor: true });
        this.poiFolder.on("pointerdown", () => {
            this.scene.stop().run("SuspectSelectionScene");
        });
        this.caseFolder.on("pointerdown", () => {
            this.scene.stop().run("CaseScene");
        });
    }

}