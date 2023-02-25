class SuspectReportScene extends Phaser.Scene {

    constructor(scene) {
        super("SuspectReportScene");
    }

    create(suspectInfo) {

        this.info = suspectInfo;

        this.background = this.add.rectangle(50, 65, 520, 400, 0x523A28, 0.9).setOrigin(0, 0);
        this.#createBio();
        this.#createTranscript();
        this.#createPortrait();

        let backButton = this.add.image(530, 80, "arrow").setOrigin(0, 0).setScale(2, 2);
        backButton.setInteractive({ useHandCursor: true });
        backButton.on("pointerdown", () => {
            this.scene.stop().run("SuspectSelectionScene");
        });

    }

    #createBio() {
        this.add.rectangle(300, 100, 200, 70, 0x81B622, 0.8).setOrigin(0, 0);
        this.add.text(300, 100, "Bio: ").setOrigin(0, 0);
    }

    #createTranscript() {
        this.add.rectangle(330, 200, 150, 250, 0xECF87F, 0.8).setOrigin(0, 0);
        this.add.text(330, 200, "Transcript: ").setOrigin(0, 0);
    }

    #createPortrait() {

        let portrait = this.add.image(120, 120, "portrait_frame").setOrigin(0, 0);
        let img = this.add.image(125, 140, "player_portrait").setOrigin(0, 0).setScale(3, 3);
        this.add.text(100, 100, "Portrait: ").setOrigin(0, 0);
    }


}