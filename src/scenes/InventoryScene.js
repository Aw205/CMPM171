class InventoryScene extends Phaser.Scene {

    constructor() {
        super("InventoryScene");
    }

    preload() {
        //this.load.image("slot", "./assets/Inventory_Slot.png")
    }

    create() {

        this.cameras.main.setZoom(2);
        this.inventory = new Inventory(this, config.width / 2, config.height / 2, null);
        let exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I); //temp method
        exitKey.on("down", () => {
            this.scene.sleep();
            this.scene.resume("GameScreen");
        });

        this.events.on("itemPicked",(item)=>{
            this.inventory.addItem(item);
        });

    }

}