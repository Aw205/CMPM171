class Mailbox extends Phaser.Scene {

    constructor() {
        super("Mailbox");
    }

    create() {

        this.graphics = this.add.graphics();
        this.createMailbox();
        this.mailNum = 0;
        this.numOpened = 0;

        new ImageButton(this, 530, 90, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.sleep().resume("Office");
        }).setScale(2,2);
        this.events.on("sendMail", (title,body) => {
            this.addMessage(title,body);
            this.scene.get("Office").events.emit("mailNotif");
        });
        this.addMessage("Welcome!", `Greetings Detective,\n We extend to you a warm welcome upon your return. This has been a trying and prolonged month
        for us. Civil strife is reaching unprecedented levels and with the political turmoil sweeping our nation, our bureau has been inundated with a variety
        of complex cases. A recent fatality has occurred on the far side of the train station. As of now, there are no indications of wrongdoing; nevertheless
        we are entrusting you with the investigation. Unearth the responsible party, and if there be one, mete out justice.\n Best of luck,\n
        Chief Inspector Johnson`);
        this.addMessage("Controls", "Use WASD to move and E to interact.");

    }
    createMailbox() {
        this.graphics.fillStyle(0x523A28, 0.9);
        this.graphics.fillRoundedRect(50, 65, 520, 400, 20);
    }

    addMessage(title, body) {

        let r = new MessageHeader(this, { x: 55, y: 115 + this.mailNum * 40 }, title, body);
        this.mailNum++;
    }

}