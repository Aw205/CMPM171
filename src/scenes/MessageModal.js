class MessageModal extends Phaser.Scene {

    constructor() {
        super("MessageModal");
    }

    create(data) {

        this.add.image(160, 70, "mailPaper").setScale(7, 7).setOrigin(0, 0);
        let text =  this.add.text(185,100,data.text,{fontFamily: 'mono', color: '0'});
        text.setWordWrapWidth(270);
        new ImageButton(this, 450, 100, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.stop().resume("Mailbox");
        }).setScale(2);
    }

}