class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture) {

        super(scene, x, y, texture);
        this.scene.add.existing(this);
        this.createKeys();
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.cursors.A.isDown) {
            this.scene.gridEngine.move("player", "left");
        } else if (this.cursors.D.isDown) {
            this.scene.gridEngine.move("player", "right");
        } else if (this.cursors.W.isDown) {
            this.scene.gridEngine.move("player", "up");
        } else if (this.cursors.S.isDown) {
            this.scene.gridEngine.move("player", "down");
        }
    }

    createKeys() {

        this.cursors = this.scene.input.keyboard.addKeys("W,A,S,D");
        let interactKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        interactKey.on('down', () => {
            let pos = this.scene.gridEngine.getFacingPosition("player");
            this.scene.events.emit("E", pos.x, pos.y); // for npcs
            this.scene.events.emit("E" + pos.x + "," + pos.y);
        });
    }
}