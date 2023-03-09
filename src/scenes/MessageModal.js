class MessageModal extends Phaser.Scene {

    constructor() {
        super("MessageModal");
    }

    create(data) {

        this.add.image(205, 155, "mailPaper").setScale(5, 5).setOrigin(0, 0);
        this.add.bitmapText(215, 180, "peaberry", data.text).setMaxWidth(235).setFontSize(14).setTint(0x4e372e);
        new ImageButton(this, 420, 165, "exitButton", undefined, "exitPressedButton", () => {
            this.scene.stop().resume("Mailbox");
        }).setScale(1.6);
    }

}