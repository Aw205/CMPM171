class SuspectSelectionScene extends Phaser.Scene {

    constructor() {
        super("SuspectSelectionScene");
    }

    create() {

        this.dlg = this.add.nineslice(75, 65, 46, 46, 'window', 7);
        this.dlg.resize(520, 400);
        this.reportMap = this.createSuspectReportMap();
        this.names = [["Mayor Crowley", "Lord Reynard"], ["Professor Bates", "Commander Pike"], ["Lady Faust", "Jenny"]];
        this.#createPortraits();

        new ImageButton(this, 560, 90, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.sleep().run("Office");
        }).setScale(2);

        new ImageButton(this, 100, 90, "backButton", undefined, "backPressedButton", () => {
            this.scene.sleep().run("DeskScene");
        }).setScale(2);
    }

    #createPortraits() {

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {

                let nameBanner = this.add.nineslice(110 + 160 * i,85 + 180 * j,30,16,"banner",5);
                let t = this.add.bitmapText(120 + 160 * i, 85 + 180 * j,"peaberry",this.names[i][j]);
                nameBanner.resize(t.width+20,32);

                let frame = this.add.image(115 + 160 * i, 120 + 180 * j, "portrait_frame").setOrigin(0, 0).setScale(1.5, 1.5);
                frame.on("pointerover", () => {
                    t.setTint(0x5192ee);
                    frame.setTint(0xC4D1E8);
                });
                frame.on("pointerout", () => {
                    t.clearTint();
                    frame.clearTint();
                });
                let img = this.add.image(170 + 160 * i, 150 + 180 * j, "suspectHeadshots", this.names[i][j]).setScale(3, 3);
                frame.setInteractive({ useHandCursor: true });
                
                this.scene.add("SuspectReportScene" + this.names[i][j],SuspectReportScene,true,{suspectInfo: this.reportMap.get(this.names[i][j])});
                this.scene.sleep("SuspectReportScene" + this.names[i][j]);
                frame.on("pointerdown", () => {
                    this.scene.sleep().run("SuspectReportScene" + this.names[i][j]);
                });
            }
        }
    }

    createSuspectReportMap() {

        let reportMap = new Map();
        let data = this.cache.json.get("dialogs");
        for (let i = 0; i < data.length; i++) {
            reportMap.set(data[i].name, data[i]);
        }
        return reportMap;
    }

}