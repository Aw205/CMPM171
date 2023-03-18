class AccusationScene extends Phaser.Scene {

    constructor() {
        super("AccusationScene");
    }

    create() {

        this.form = this.add.dom(330,350);
        this.index = 0;
        this.motiveIndex = 0;
        this.motiveMap = this.#createMotiveMap();
        this.add.nineslice(75, 65, 46, 46, 'window', 7).resize(520, 400);
        this.names = ["Lord Reynard", "Mayor Crowley", "Commander Pike", "Professor Bates", "Lady Faust", "Jenny"];
        this.motives = ["Threat", "Conspiracy", "Cover-up", "Collusion", "Political Assassination", "Hatred"];

        this.add.nineslice(280,160,46,46,"window",7).resize(295,100);

        new ImageButton(this, 560, 90, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.stop().run("Office");
        }).setScale(2);

        let portrait_back = new ImageButton(this, 125, 280, "backButton", undefined, "backPressedButton", () => {
            if (this.index == 0) {
                this.index = 6;
            }
            this.name.setText(this.names[--this.index]);
            this.portrait.setTexture("suspectHeadshots", this.names[this.index]);
            this.nameBanner.resize(this.name.width + 20, 32);
        }).setScale(2);

        let portrait_forward = new ImageButton(this, 250, 280, "backButton", undefined, "backPressedButton", () => {
            if (this.index == 5) {
                this.index = -1;
            }
            this.name.setText(this.names[++this.index]);
            this.portrait.setTexture("suspectHeadshots", this.names[this.index]);
            this.nameBanner.resize(this.name.width + 20, 32);
        }).setScale(2).setFlip(true, false);

        let motiveButton = new ImageButton(this, 565, 255, "backButton", undefined, "backPressedButton", () => {

            if (this.motiveIndex == 5) {
                this.motiveIndex = -1;
            }
            this.motive.setText(this.motives[++this.motiveIndex]);
            let data = this.motiveMap.get(this.motives[this.motiveIndex]);
            this.motiveDescription.setText(data.description);

            if(data.optionPrompt != null){
                let html = this.updateForm(data.optionPrompt,data.options);
                this.form.createFromHTML(html);
            }
            else{
                this.form.removeElement();
            }

        }).setScale(2).setFlip(true, false);

        this.confirmButton = new BitmapTextButton(this, 310, 410, "peaberry", "Confirm", "flatButton", () => {
            if (this.name.text == "Lord Reynard" && this.motive == "Conspiracy") {
                let option = document.querySelector('input[name="drone"]:checked').value;
                if(option == 0){
                    return this.scene.start("WinScene");
                }
            }
            this.scene.start("LoseScene");
        });

        this.#createPortraits();
        this.add.bitmapText(290,125,"peaberry","Motive: ");
        this.motive = this.add.bitmapText(360,125,"peaberry",this.motives[0]).setTint(0xF7BEC0);
        this.motiveDescription = this.add.text(290,165,this.motiveMap.get(this.motives[0]).description,{fontFamily: "mono"}).setWordWrapWidth(290);
        let html = this.updateForm(this.motiveMap.get(this.motives[0]).optionPrompt,this.motiveMap.get(this.motives[0]).options);
        this.form.createFromHTML(html);

    }

    #createPortraits() {

        this.nameBanner = this.add.nineslice(110, 90, 30, 16, "banner", 5);
        this.name = this.add.bitmapText(120, 90, "peaberry", this.names[this.index]);
        this.nameBanner.resize(this.name.width + 20, 32)
        this.add.image(120, 130, "portrait_frame").setOrigin(0, 0).setScale(1.5, 1.5);
        this.portrait = this.add.image(185, 165, "suspectHeadshots", this.names[this.index]).setScale(3, 3);
    }

    #createMotiveMap() {

        let m = new Map();
        var data = this.cache.json.get("motives");
        for (let i = 0; i < data.length; i++) {
            m.set(data[i].motive, data[i]);
        }
        return m;
    }

    updateForm(optionPrompt,options){

        let form = `
        <fieldset>
        <legend> ${optionPrompt}:</legend>
        <div>
          <input type="radio" id="huey" name="drone" value="0"
                 checked>
          <label for="huey">${options[0]}</label>
        </div>

        <div>
          <input type="radio" id="dewey" name="drone" value="1}">
          <label for="dewey">${options[1]}</label>
        </div>
    
        <div>
          <input type="radio" id="louie" name="drone" value="2">
          <label for="louie">${options[2]}</label>
        </div>
    </fieldset>`;
    return form;

    }
}