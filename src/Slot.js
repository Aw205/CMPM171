class Slot extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        this.size = 45;
        this.setSize(this.size,this.size);
        this.setInteractive({ draggable: true, dropZone: true });
        this.item = null;
       
    }

    addItem(item) {

        this.item = new InventoryItem(this.scene,0,0,item);
        this.add(this.item);

    }

    removeItem(){

        if(this.item!=null){
            this.item.destroy(true);
        }

    }
}