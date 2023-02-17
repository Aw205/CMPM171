class Inventory extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        this.scene.add.existing(this);
        this.invWidth = 6;
        this.invHeight = 4;
        this.setDepth(10);
        this.createGrid();
    }

    createGrid() {

        for (let y = -this.invHeight / 2; y < this.invHeight / 2; y++) {
            for (let x = -this.invWidth / 2; x < this.invWidth / 2; x++) {
                this.add(new Phaser.GameObjects.Image(this.scene, x * 20, y * 20, "slot"));
                this.add(new Slot(this.scene, x * 20, y * 20));
            }
        }
    }

    addItems(items) {

        let emptySlots = this.getAll("item", null);
        for (let i = items.length - 1; i > -1; i--) {
            emptySlots[i].addItem(items.pop());
        }
    }
}