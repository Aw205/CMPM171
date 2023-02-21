class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture) {

        super(scene, x, y, texture);
        this.scene.add.existing(this);
        this.facingCollider = this.scene.physics.add.sprite(x, y).setSize(4, 4);
        this.createKeys();

    }

    preUpdate(time, delta) {

        super.preUpdate(time, delta);


        //this.scene.scene.get("InventoryScene").events.emit("idk");

        if (this.cursors.left.isDown) {
            this.scene.gridEngine.move("player", "left");
        } else if (this.cursors.right.isDown) {
            this.scene.gridEngine.move("player", "right");
        } else if (this.cursors.up.isDown) {
            this.scene.gridEngine.move("player", "up");
        } else if (this.cursors.down.isDown) {
            this.scene.gridEngine.move("player", "down");
        }

    }

    createKeys() {

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        let interactKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        interactKey.on('down', () => {
            let pos = this.scene.gridEngine.getFacingPosition("player");
            this.scene.events.emit("E", pos.x, pos.y); // for npcs
            this.scene.events.emit("E" + pos.x + "," + pos.y);
        });

        let invKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I); // temporary, just to demo inventory
        invKey.on('down', () => {
            this.scene.scene.pause();
            this.scene.scene.run("InventoryScene");
        });

        let mailKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M); // temporary, just to demo mail
        mailKey.on('down', () => {
            this.scene.scene.get("Mailbox").events.emit("sendMail");
            this.scene.scene.pause();
            this.scene.scene.run("Mailbox");
        });
    }
}