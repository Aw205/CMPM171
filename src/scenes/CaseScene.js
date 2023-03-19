class CaseScene extends Phaser.Scene {

    constructor() {
        super("CaseScene");
    }

    create() {

        this.add.nineslice(75, 65, 46, 46, 'window', 7).resize(520, 400);

        let frame = this.add.nineslice(110, 110, 92, 92, "pixelFrame2", 8);
        frame.resize(228, 125);
        frame.setInteractive({ useHandCursor: true });
        frame.on("pointerover",()=>{
            frame.setTint(0xC4D1E8);
        });
        frame.on("pointerout",()=>{
            frame.clearTint();
        });
        frame.on("pointerdown", () => {
            this.scene.sleep("Office");
            this.scene.stop().run("CrimeScene");
        });

        this.add.image(120, 120, "crimePortrait").setOrigin(0, 0).setScale(0.1, 0.1);

        this.add.bitmapText(130,240,"peaberry",`This is Thompson's house, just off of 110th Street. He died in his living room sitting
        in a chair by his table. He was discovered by the hired help. The home is a well off home, fitting for a political figure with a
        nice spacious first floor for receiving guests. The home is furnished appropriately.`).setMaxWidth(400);

        new ImageButton(this, 560, 90, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.stop().run("Office");
        }).setScale(2);
        new ImageButton(this, 100, 90, "backButton", undefined, "backPressedButton", () => {
            this.scene.stop().run("DeskScene");
        }).setScale(2);
    }

}