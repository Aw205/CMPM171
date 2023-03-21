class InterrogationScene extends Phaser.Scene {

    constructor() {
        super();
    }

    create(data) {

        this.transcripts = data.transcripts;
        this.suspectName = data.name;

        this.createEventListeners();

        this.maxTranscriptIndex = 0;
        this.transcriptIndex = 0;
        this.pageNum = 0;
        this.dialogPage = [];
        this.dialogPage.push(this.add.group());

        this.currText = new Phaser.GameObjects.Text(this, 0, 0, "", { fontFamily: "mono" });

        this.add.nineslice(75, 65, 46, 46, 'window', 7).resize(520, 400);
        this.input.keyboard.on('keydown-SPACE', this.#onKeyDownSpace, this);

        this.createButtons();

        this.dialogIndex = 0; // index within a single transcript
        this.currDialogHeight = 100;
        this.dialogWidth = [270, 400];
        this.typewriter = null;
        this.#onKeyDownSpace();

        this.pageLabel = this.add.bitmapText(320,420,"peaberry","1");

    }

    #onKeyDownSpace() {

        if (this.typewriter != null && !this.typewriter.isFinished) {
            this.typewriter.fastForward();
            return;
        }
        if(this.dialogIndex == this.transcripts[this.transcriptIndex].length){
            if(this.transcriptIndex < this.maxTranscriptIndex){
                this.scene.get("SuspectSelectionScene").events.emit(this.suspectName);
                this.dialogIndex = 0;
                this.transcriptIndex++;
            }
        }

         if (this.pageNum == this.dialogPage.length -1 && this.dialogIndex < this.transcripts[this.transcriptIndex].length) {

            let w = this.dialogWidth[this.dialogIndex % 2];

            this.currText.setText(this.transcripts[this.transcriptIndex][this.dialogIndex]).setWordWrapWidth(w);
            let currentWidth = Math.round(this.currText.width);
            let currentHeight = Math.round(this.currText.height);

            if (this.currDialogHeight > 370) {

                this.dialogPage[this.pageNum].setVisible(false);
                this.dialogPage.push(this.add.group());
                this.pageNum++;
                this.pageLabel.setText(this.pageNum + 1);

                this.currDialogHeight = 100;
            }

            let x = (this.dialogIndex % 2 == 0) ? 90 : 560 - currentWidth;
            let imgX = (x == 90) ? 105 : 545;

            this.typewriter = new Typewriter(this, x + 10, this.currDialogHeight);
            let dialogBox = this.add.nineslice(x, this.currDialogHeight, 318, 78, "dialogBox", 7);
            dialogBox.resize(currentWidth + 20, currentHeight + 10);

            if(this.transcriptIndex == 1){
                dialogBox.setTint(0x958BAB);
            }

            this.dialogPage[this.pageNum].add(dialogBox);

            if (this.dialogIndex % 2 == 0) {
                let playerPortrait = this.add.image(imgX, this.currDialogHeight, "player_portrait").setOrigin(0.5, 1);

                this.dialogPage[this.pageNum].add(playerPortrait);
            }
            else {
                let suspectPortrait = this.add.image(imgX, this.currDialogHeight, "suspectHeadshots", this.suspectName).setOrigin(0.5, 1);

                this.dialogPage[this.pageNum].add(suspectPortrait);
            }
            this.currDialogHeight += currentHeight + 20;
            let label = this.typewriter.write(this.transcripts[this.transcriptIndex][this.dialogIndex], 30, w);
            this.dialogPage[this.pageNum].add(label);

            this.dialogIndex++;
        }
    }


    createButtons() {

        this.prevPageButton = new ImageButton(this, 100, 440, "backButton", undefined, "backPressedButton", () => {
            if (this.pageNum > 0) {
                this.dialogPage[this.pageNum].setVisible(false);
                this.pageNum--;
                this.dialogPage[this.pageNum].setVisible(true);
                this.pageLabel.setText(this.pageNum + 1);
            }
        }).setScale(2);

        this.nextPageButton = new ImageButton(this, 560, 440, "backButton", undefined, "backPressedButton", () => {
            if (this.pageNum < this.dialogPage.length -1) {
                this.dialogPage[this.pageNum].setVisible(false);
                this.pageNum++;
                this.dialogPage[this.pageNum].setVisible(true);
                this.pageLabel.setText(this.pageNum + 1);
            }
        }).setScale(2).setFlip(true,false);

        new ImageButton(this, 100, 90, "backButton", undefined, "backPressedButton", () => {
            this.scene.sleep().run("SuspectReportScene" + this.suspectName);
        }).setScale(2);
        new ImageButton(this, 560, 90, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.sleep().run("Office");
        }).setScale(2);
    }

    createEventListeners(){

        this.itemsFound = 0;

        if(this.suspectName == "Lord Reynard"){
            this.scene.get("SafeBoxScene").events.once("safeUnlocked",()=>{
                this.maxTranscriptIndex++;
            });
        }
        else if(this.suspectName == "Mayor Crowley"){
            this.scene.get("InventoryScene").events.on("forensicsCompleted",(count)=>{
                if(count == 3){
                    this.maxTranscriptIndex++;
                }
            });
        }
        else if(this.suspectName == "Jenny"){
            this.scene.get("InventoryScene").events.on("itemPicked",()=>{
                this.itemsFound++;
                if(this.itemsFound == 8){
                    this.maxTranscriptIndex++;
                }
            });
        }
        else if(this.suspectName == "Lady Faust"){
            this.scene.get("SuspectSelectionScene").events.once("Jenny",()=>{
                this.maxTranscriptIndex++;
            });

        }

    }
}