class DeskScene extends Phaser.Scene {

    constructor() {
        super("DeskScene");
    }

    create() {

        this.background = this.add.rectangle(75, 65, 520, 400, 0x523A28, 0.9).setOrigin(0, 0);
        this.caseFolder = this.add.image(90, 140, "folder").setOrigin(0, 0).setScale(0.4);
        this.poiFolder = this.add.image(340, 140, "folder").setOrigin(0, 0).setScale(0.4);
        this.add.text(150, 240, "CASES", { fontSize: 48, color: "0" }).setOrigin(0, 0);
        this.add.text(400, 240, "P.O.I", { fontSize: 48, color: "0" }).setOrigin(0, 0);

        this.#createListeners();

        let exitButton = this.add.image(530, 80, "exit").setOrigin(0, 0).setScale(2, 2);
        exitButton.setInteractive({ useHandCursor: true });
        exitButton.on("pointerdown", () => {
            this.scene.stop().run("Office");
        });

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