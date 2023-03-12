class MessageHeader extends Phaser.GameObjects.Graphics {


    constructor(scene,options,title,body) {
        super(scene, options);

        this.scene.add.existing(this);
        this.messageBody = body;
        this.colors = [0xA47551,1,0xD0B49F,0.5]; //initial,pointerover
        this.init();

        this.closeIcon = this.scene.add.image(this.x+5,this.y-5,"env_closed").setOrigin(0,0).setVisible(true);
        this.openIcon = this.scene.add.image(this.x+5,this.y-5,"env_opened").setOrigin(0,0).setVisible(false);

        this.text = this.scene.add.bitmapText(this.x+40,this.y+10,"peaberry",title);
        this.text.setOrigin(0,0);

    }


    init() {

        this.fillStyle(this.colors[0],this.colors[1]);
        this.fillRoundedRect(0, 0, 500, 36, 5);
        let hitArea = new Phaser.Geom.Rectangle(0, 0, 500, 36);
        this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
        this.#createListeners();
    }


    #createListeners(){

        this.once("pointerdown",()=>{
            this.openIcon.setVisible(true);
            this.closeIcon.setVisible(false);
            this.scene.numOpened++;
            if(this.scene.numOpened == this.scene.mailNum){
                this.scene.scene.get("Office").events.emit("readAllMail")
            }
        });

        this.on("pointerdown", () => {
            this.scene.scene.pause("Mailbox").run("MessageModal",{text: this.messageBody});
        });

       this.on("pointerover",()=>{
           this.fillStyle(this.colors[2],this.colors[3]);
           this.fillRoundedRect(0,0,500,36,5);
       });

       this.on("pointerout",()=>{
           this.fillStyle(this.colors[0],this.colors[1]);
           this.fillRoundedRect(0,0,500,36,5);
       });
    }

}