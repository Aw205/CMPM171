class SuspectReportScene extends Phaser.Scene {

    constructor(scene) {
        super("SuspectReportScene");
    }

    create(data) {

        this.info = data.suspectInfo;

        this.background = this.add.rectangle(75, 65, 520, 400, 0x523A28, 0.9).setOrigin(0, 0);
        this.#createBio();
        this.#createTranscript();
        this.#createPortrait();

        new ImageButton(this, 100, 80, "backButton", undefined, "backButton", () => {
            this.scene.stop().run("SuspectSelectionScene");
        }).setScale(2);

        new ImageButton(this, 550, 80, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.stop().run("Office");
        }).setScale(2);

    }

    #createBio() {
        this.add.rectangle(300, 100, 200, 70, 0x81B622, 0.8).setOrigin(0, 0);
        this.add.bitmapText(300, 100, "peaberry","Bio: " + this.info.bio).setMaxWidth(200).setFontSize(14).setTint(0x4e372e);
    }

    #createTranscript() {
        this.add.rectangle(330, 200, 150, 250, 0xECF87F, 0.8).setOrigin(0, 0);
        this.add.bitmapText(330, 200,"peaberry", "Transcript: " + this.info.transcript).setMaxWidth(150).setFontSize(14).setTint(0x4e372e);
    }

    #createPortrait() {

        let portrait = this.add.image(120, 120, "portrait_frame").setOrigin(0, 0);
        let img = this.add.image(125, 140, "player_portrait").setOrigin(0, 0).setScale(3, 3);
        this.add.bitmapText(120, 90,"peaberry",this.info.name).setFontSize(14);
    }
}