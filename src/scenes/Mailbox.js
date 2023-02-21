class Mailbox extends Phaser.Scene {

    constructor() {
        super("Mailbox");
    }

    preload() {

        this.load.bitmapFont('clean', './assets/fonts/CleanBasic.png', './assets/fonts/CleanBasic.xml');
       
    }

    create() {

        this.cameras.main.setZoom(2);
        this.createMailbox();
        let exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M); //temp method
        exitKey.on("down", () => {
            this.scene.sleep();
            this.scene.resume("GameScreen");
        });

        this.events.on("sendMail",()=>{
            console.log("mail received");
            this.addMessage();
            this.mailNum++;
        });
        this.mailNum = 0;
    }

    createMailbox(){

        let background = new Phaser.GameObjects.Rectangle(this,200,150,100,400,0x964B00,0.7);
        background.setOrigin(0,0);
        this.add.existing(background);
    }

    addMessage(){

        let r = new Message(this,200,150+this.mailNum*20,100,18);
        r.setOrigin(0,0);

    }

}