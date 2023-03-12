class SuspectReportScene extends Phaser.Scene {

    constructor(scene) {
        super("SuspectReportScene");
    }

    create(data) {

        this.info = data.suspectInfo;
        this.add.nineslice(75,65,46, 46,'window',7).resize(520,400);
        this.#createBio();
        this.#createTranscript();
        this.#createPortrait();
        new ImageButton(this, 100, 90, "backButton", undefined, "backPressedButton", () => {
            this.scene.stop().run("SuspectSelectionScene");
        }).setScale(2);

        new ImageButton(this, 560, 90, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.stop().run("Office");
        }).setScale(2);

    }

    #createBio() {
        this.add.nineslice(280,127,46, 46,'window',7).resize(300,140);;
        this.add.bitmapText(280,127,"peaberry",this.info.bio).setMaxWidth(300);
    }

    #createTranscript() {
        this.add.nineslice(120,300,46,46,'window',7).resize(450,150);
        this.add.bitmapText(125, 300,"peaberry",this.info.transcript).setMaxWidth(440)
    }
    
    #createPortrait() {

        let portrait = this.add.image(120, 130, "portrait_frame").setOrigin(0, 0).setScale(1.5,1.5);
        let img = this.add.image(125, 150, "player_portrait").setOrigin(0, 0).setScale(3, 3);
        let nameBanner = this.add.nineslice(110,90,30,16,"banner",5);
        let t =this.add.bitmapText(120, 90,"peaberry",this.info.name);
        nameBanner.resize(t.width+20,32);

    }
}