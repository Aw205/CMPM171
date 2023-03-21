class SuspectReportScene extends Phaser.Scene {

    constructor() {
        super();
    }

    create(data) {

        this.info = data.suspectInfo;
        this.add.nineslice(75, 65, 46, 46, 'window', 7).resize(520, 400);
        this.#createBio();
        //this.#createTranscript();
        this.#createPortrait();
        new ImageButton(this, 100, 90, "backButton", undefined, "backPressedButton", () => {
            this.scene.sleep().run("SuspectSelectionScene");
        }).setScale(2);
        new ImageButton(this, 560, 90, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.sleep().run("Office");
        }).setScale(2);
        this.#createInterrogateButton();
    }

    #createBio() {
        this.add.nineslice(280, 127, 46, 46, 'window', 7).resize(300, 140);
        this.add.text(290, 127, this.info.bio, { fontFamily: "mono" }).setWordWrapWidth(280);
    }

    #createTranscript() {
        this.add.nineslice(120, 300, 46, 46, 'window', 7).resize(450, 150);
        this.add.bitmapText(125, 300, "peaberry", this.info.transcript).setMaxWidth(440)
    }

    #createPortrait() {

        let portrait = this.add.image(120, 130, "portrait_frame").setOrigin(0, 0).setScale(1.5, 1.5);
        let img = this.add.image(185, 165, "suspectHeadshots", this.info.name).setScale(3, 3);
        let nameBanner = this.add.nineslice(110, 90, 30, 16, "banner", 5);
        let t = this.add.bitmapText(120, 90, "peaberry", this.info.name);
        nameBanner.resize(t.width + 20, 32);

    }

    #createInterrogateButton() {

        this.scene.add("InterrogationScene" + this.info.name, InterrogationScene, true, { name: this.info.name, transcripts: this.info.transcripts });
        this.scene.sleep("InterrogationScene" + this.info.name);

        this.interrogateButton = new BitmapTextButton(this, 280, 400, "peaberry", "Interrogate", "flatButton", () => {
            this.scene.sleep().run("InterrogationScene" + this.info.name);
        });
    }
}