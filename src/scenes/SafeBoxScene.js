class SafeBoxScene extends Phaser.Scene {

    constructor() {
        super("SafeBoxScene");
    }

    create() {
        this.tw = new Typewriter(this,180,430);
        this.scene.run("DialogModal", {text: "It seems to be locked. I guess I'll give a crack at it.\n\n [ENTER]", scene: "SafeBoxScene" });

        this.formHtml = this.createInput();
        this.codeInput = this.add.dom(180, 410).createFromHTML(this.formHtml).setVisible(false);

        this.confirmButton = this.add.text(210,400," --> Confirm",{fontFamily: "mono"}).setInteractive({useHandCursor: true});
        this.confirmButton.on("pointerdown",()=>{
            let val = document.querySelector('input[name="code"]').value;
            if(val.trim() == "1937"){
               this.tw.write("Success! There's nothing inside...except a note?");
               CrimeScene.cardObtained = true;
               this.scene.scene.events.emit("safeUnlocked");
               this.scene.get("CrimeScene").events.emit("safeUnlocked");
            }
            else{
               this.tw.write("Hmm not quite. Unfortunate.");
            }
            this.confirmButton.disableInteractive();
            this.input.keyboard.manager.enabled = true;
        });
        this.confirmButton.on("pointerover",()=>{
           this.confirmButton.setTint(0x90908a);
        });
        this.confirmButton.on("pointerout",()=>{
            this.confirmButton.clearTint();
        });
        this.events.once("dialog_finished",()=>{
            this.scene.bringToTop();
            this.codeInput.setVisible(true);
            this.input.keyboard.manager.enabled = false;
        });
        this.events.once("modalFinished",()=>{
            this.scene.stop().resume("CrimeScene");
        });

    }


    createInput() {

        let form = `<head>
            <style>
            #input-form input {
                outline: none;
                outline-width: 0;
                font-size: 12px;
                font-family: Monospace;
                color: White;
                background-color: Black;
                width: 40px;
                height: 8px;
            }
        </style>
    </head>
    <body>
        <div id="input-form">
            <input type="text" name="code" placeholder="code" />
        </div>
    </body>`

        return form;
    }
}