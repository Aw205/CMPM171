class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture) {

        super(scene, x, y, texture);
        this.scene.add.existing(this);
        this.cursors = this.scene.input.keyboard.createCursorKeys();

    }

    preUpdate(time, delta) {

        super.preUpdate(time, delta);

        let pos = this.scene.gridEngine.getFacingPosition("player"); // probably a better way to do this without polling
        if (this.scene.gridEngine.isTileBlocked(pos)) {              // probably use events instead, but this will do for now
            let tile = this.scene.map.getTileAt(pos.x, pos.y, false, "Ground");
            tile.properties["ent"]?.onCollision();
        }

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
}