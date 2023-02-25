class InventoryScene extends Phaser.Scene {

    constructor() {
        super("InventoryScene");
    }

    create() {

        this.inventory = new Inventory(this, config.width / 2, config.height / 2, null);

        let exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I); //temp method
        exitKey.on("down", () => {
            this.scene.sleep().resume("Office");
        });

        this.events.on("itemPicked", (item) => {
            this.inventory.addItem(item);
        });

    }

}