class MessageModal extends Phaser.Scene {

    constructor() {
        super("MessageModal");
    }

    create(data) {

        this.bodyBackground = this.add.rectangle(205, 155, 240, 180, 0xF3E1C0, 1).setOrigin(0, 0).setStrokeStyle(5, 0xffffff);
        this.bodyText = this.add.text(210, 180, data.text).setColor("0").setWordWrapWidth(235);

        let exitButton = this.add.image(420, 165, "exit").setOrigin(0, 0);
        exitButton.setInteractive({ useHandCursor: true });
        exitButton.on("pointerdown", () => {
            this.scene.stop().resume("Mailbox");
        });
    }

}