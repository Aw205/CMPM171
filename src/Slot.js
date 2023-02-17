class Slot extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        this.setSize(20, 20); // size of slot texture, need to replace all the hardcoded values
        this.item = null;
        this.setInteractive({ draggable: true, dropZone: true });
    }

    addItem(sprite) {

        this.item = new Phaser.GameObjects.Image(this.scene, 0, 0, sprite.texture, sprite.frame.name);
        this.item.setInteractive({ draggable: true, useHandCursor: true });
        this.add(this.item);

        this.item.on("pointerdown", (pointer, localX, localY) => {

            this.parentContainer.bringToTop(this);
            this.startX = this.x;
            this.startY = this.y;
            this.setSize(0, 0); // so item doesn't trigger drop zone of its current slot
            this.item.setOrigin((16 - localX) / 16, (16 - localY) / 16); //16 is size of item texture
        });

        this.item.on("drag", (pointer, dragX, dragY) => {
            this.x = this.startX + dragX;
            this.y = this.startY + dragY;
        });
        this.item.on("drop", (pointer, target) => {
            if (target.item != null) {
                return;
            }
            let targetPos = [target.x, target.y];
            target.setPosition(this.startX, this.startY);
            this.setPosition(targetPos[0], targetPos[1]);
            this.startX = targetPos[0];
            this.startY = targetPos[1];
            this.setSize(20, 20);
        });
        this.item.on("pointerup", () => {
            this.setPosition(this.startX, this.startY);
            this.setSize(20, 20);
            this.item.setOrigin(0.5, 0.5);
        });

    }
}