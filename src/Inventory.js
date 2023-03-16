class Inventory extends Phaser.GameObjects.Container {

    static selectedItem = null;
    static forensicsSlotPointer = null;
    static selectFrame = null;
    
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        this.scene.add.existing(this);
        this.invWidth = 6;
        this.invHeight = 4;
        this.setDepth(10);

        this.scene.add.nineslice(124 - 60 ,133,20,20,"invBackground",5).resize(252,173);

        Inventory.selectFrame = new Phaser.GameObjects.Image(scene,x,y,"invSelect").setVisible(false).setScale(2,2);
        this.add(Inventory.selectFrame);
        
        this.#createGrid();
        this.addForensicsSlot();
    }

    #createGrid() {

        for (let y = -this.invHeight / 2; y < this.invHeight / 2; y++) {
            for (let x = -this.invWidth / 2; x < this.invWidth / 2; x++) {
                this.add(new Phaser.GameObjects.Image(this.scene,x*40,y*40,"invSlot").setScale(2));
                this.add(new Slot(this.scene, x * 40, y * 40));
            }
        }
    }

    addForensicsSlot(){

        this.add(new Phaser.GameObjects.Image(this.scene,-122,115,"forensicsSlot"));
        let s = new Slot(this.scene,-122,115);
        this.add(s);
        Inventory.forensicsSlotPointer = s;
    }

    addItem(item) {
        
        let emptySlots = this.getAll("item", null);
        emptySlots[0].addItem(item);

    }
}