class Inventory extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        this.scene.add.existing(this);
        this.invWidth = 6;
        this.invHeight = 4;
        this.setDepth(10);
        this.#createGrid();
    }

    #createGrid() {

        for (let y = -this.invHeight / 2; y < this.invHeight / 2; y++) {
            for (let x = -this.invWidth / 2; x < this.invWidth / 2; x++) {
                this.add(new Phaser.GameObjects.Rectangle(this.scene,x*50,y*50,45,45,0x262BA5,0.5));
                this.add(new Slot(this.scene, x * 50, y * 50));
            }
        }
    }

    addItem(item) {
        let emptySlots = this.getAll("item", null);
        emptySlots[0].addItem(item);

    }
}