class InterrogationScene extends Phaser.Scene {

    constructor() {
        super("InterrogationScene");
    }

    create(data) {

        this.transcript = data.transcript;
        this.suspectName = data.name;


        this.dialogEntities = this.add.group();
        this.currText = new Phaser.GameObjects.Text(this, 0, 0, "", { fontFamily: "mono" });

        this.add.nineslice(75, 65, 46, 46, 'window', 7).resize(520, 400);
        this.input.keyboard.on('keydown-SPACE', this.#onKeyDownSpace, this);

        new ImageButton(this, 100, 90, "backButton", undefined, "backPressedButton", () => {
            this.scene.stop().run("SuspectReportScene");
        }).setScale(2);
        new ImageButton(this, 560, 90, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.stop().run("Office");
        }).setScale(2);

        this.dialogIndex = -1;
        this.currDialogHeight = 100;
        this.dialogWidth = [270, 400];
        this.typewriter = null;
        this.#onKeyDownSpace();

    }

    #onKeyDownSpace() {

        if (this.typewriter != null && !this.typewriter.isFinished) {
            this.typewriter.fastForward();
        }
        else if (this.dialogIndex != this.transcript.length - 1) {

            this.dialogIndex++;
            let w = this.dialogWidth[this.dialogIndex % 2];

            this.currText.setText(this.transcript[this.dialogIndex]).setWordWrapWidth(w);
            let currentWidth = Math.round(this.currText.width);
            let currentHeight = Math.round(this.currText.height);

            if (this.currDialogHeight > 400) {
                this.dialogEntities.clear(true,true);
                this.currDialogHeight = 100;
            }

            let x = (this.dialogIndex % 2 == 0) ? 90 : 560 - currentWidth;
            let imgX = (x == 90) ? 105 : 545;

            this.typewriter = new Typewriter(this, x + 10, this.currDialogHeight);
            let dialogBox = this.add.nineslice(x, this.currDialogHeight, 318, 78, "dialogBox", 7);
            dialogBox.resize(currentWidth + 20, currentHeight + 10);
            this.dialogEntities.add(dialogBox);

            if (this.dialogIndex % 2 == 0) {
                let playerPortrait = this.add.image(imgX, this.currDialogHeight, "player_portrait").setOrigin(0.5, 1);
                this.dialogEntities.add(playerPortrait);
            }
            else {
                let suspectPortrait = this.add.image(imgX, this.currDialogHeight, "suspectHeadshots", this.suspectName).setOrigin(0.5, 1);
                this.dialogEntities.add(suspectPortrait);
            }
            this.currDialogHeight += currentHeight + 20;
            let label = this.typewriter.write(this.transcript[this.dialogIndex], 30, w);
            this.dialogEntities.add(label);
        }
    }
}