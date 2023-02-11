class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture) {

        super(scene, x, y, texture);
        this.scene.add.existing(this);
        this.facingCollider = this.scene.physics.add.sprite(x, y).setSize(4, 4);
        this.createKeys();

    }

    preUpdate(time, delta) {

        super.preUpdate(time, delta);

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
            this.scene.events.emit("E" + pos.x + "," + pos.y);
        });
    }
}