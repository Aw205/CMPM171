class Mailbox extends Phaser.Scene {

    constructor() {
        super("Mailbox");
    }

    create() {
        
        this.graphics = this.add.graphics();
        this.createMailbox();
        this.mailNum = 0;

        let exitButton = this.add.image(500, 75, "exit").setScale(2, 2).setOrigin(0, 0);
        exitButton.setInteractive({ useHandCursor: true });
        exitButton.on("pointerdown", () => {
            this.scene.sleep().resume("Office");
        });
        this.events.on("sendMail", () => {
            this.addMessage();
        });

        this.addMessage("Welcome!", "Hey,\n welcome to the game!");
        this.addMessage("Next Steps", "Explore the office! Check out your desk and clues chest.")

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