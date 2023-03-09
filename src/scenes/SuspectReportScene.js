class SuspectReportScene extends Phaser.Scene {

    constructor(scene) {
        super("SuspectReportScene");
    }

    create(data) {

        this.info = data.suspectInfo;

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
        this.add.rectangle(300, 100, 200, 90, 0x81B622, 0.8).setOrigin(0, 0);
        // chris made the length 90
        this.add.text(300, 100, "Bio: " + this.info.bio).setOrigin(0, 0).setWordWrapWidth(200).setFontSize(12);
    }

    #createTranscript() {
        this.add.rectangle(300, 200, 200, 250, 0xC82F0F, 0.8).setOrigin(0, 0);
        this.add.text(300, 200, "Transcript: \n" + this.info.transcript).setOrigin(0, 0).setWordWrapWidth(150).setFontSize(12);
    }
     // just making the rectangles bigger, text is uniform in size
     // changed colors so easier to read with white font

    #createPortrait() {

        let portrait = this.add.image(120, 120, "portrait_frame").setOrigin(0, 0);
        let img = this.add.image(125, 140, "player_portrait").setOrigin(0, 0).setScale(3, 3);
        this.add.text(100, 100, "Portrait: \n" + this.info.name).setOrigin(0, 0).setFontSize(12);
    }

}