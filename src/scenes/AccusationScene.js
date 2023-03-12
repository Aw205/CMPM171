class AccusationScene extends Phaser.Scene {

    constructor() {
        super("AccusationScene");
    }

    create() {

        this.index = 0;
        this.add.nineslice(75,65,46,46,'window',7).resize(520,400);
        this.names = ["Lord Reynard","Mayor Crowley","Commander Pike","Professor Bates","Lady Faust","Jenny"];

        new ImageButton(this, 560, 90, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.stop().run("Office");
        }).setScale(2);

        new ImageButton(this, 110, 280, "backButton", undefined, "backPressedButton", () => {
            if(this.index == 0){
                this.index= 6;
            }
            this.name.setText(this.names[--this.index]);
            this.nameBanner.resize(this.name.width+20,32);
        }).setScale(2);

        new ImageButton(this, 560, 280, "backButton", undefined, "backPressedButton", () => {
            if(this.index == 5){
                this.index = -1;
            }
            this.name.setText(this.names[++this.index]);
            this.nameBanner.resize(this.name.width+20,32);
        }).setScale(2).setFlip(true,false);

        this.confirmButton = new TextButton(this, 330, 420, "Confirm", null, "button_background",() => {
            if(this.names[this.index] == "Lord Reynard"){
                return this.scene.start("WinScene");
            }
            this.scene.start("LoseScene");
        }).setOrigin(0.5);

        this.#createPortraits();
    }

    #createPortraits() {

        this.nameBanner = this.add.nineslice(110,90,30,16,"banner",5);
        this.name = this.add.bitmapText(120, 90,"peaberry",this.names[this.index]);
        this.nameBanner.resize(this.name.width+20,32)

        this.motive = this.add.bitmapText(310, 340,"peaberry","Motive: ");
        this.add.image(280,150, "portrait_frame").setOrigin(0, 0).setScale(1.5,1.5);
        this.portrait = this.add.image(285, 170, "player_portrait").setOrigin(0, 0).setScale(3, 3);
    }
}