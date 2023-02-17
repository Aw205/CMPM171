class InventoryScene extends Phaser.Scene {

    constructor() {
        super("InventoryScene");
    }

    preload() {
        this.load.image("slot", "./assets/Inventory_Slot.png")
    }

    create(data) {

        this.cameras.main.setZoom(2);
        this.inventory = new Inventory(this, config.width / 2, config.height / 2, null);
        let exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I); //temp method
        exitKey.on("down", () => {
            this.scene.sleep();
            this.scene.resume("GameScreen");
        });
        this.events.on("wake", (sys, data) => {
            if (data.items.length != 0) {
                this.inventory.addItems(data.items);
            }
        });
        if (data.items.length != 0) { //redundancy needed if player collects item before accessing inventory for first time
            this.inventory.addItems(data.items);
        }
    }
}