class InventoryScene extends Phaser.Scene {

    constructor() {
        super("InventoryScene");
    }

    create() {


        this.selectedItem = null;
        this.cameras.main.setZoom(1.5,1.5);
        this.inventory = new Inventory(this, config.width / 2, config.height / 2, null);

       // this.forensicsButton = new TextButton(this,300,100,"Send to forensics");

        let exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        exitKey.on("down", () => {
            this.scene.sleep().resume("Office");
        });
        this.events.on("itemPicked", (item) => {
            this.inventory.addItem(item);
        });
    }

    sendToForensics(item){
        item.destroy(true);
    }
}