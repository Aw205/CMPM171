class InventoryScene extends Phaser.Scene {

    constructor() {
        super("InventoryScene");
    }

    create() {

        //Inventory code very messy need to clean up in future

        this.add.nineslice(100 - 60,120,46, 46,'window',7).resize(300,200);
        let forensicsWindow = this.add.nineslice(100 - 60,320,46,46,'window',7).resize(300,70);
        this.forensicsButton = new BitmapTextButton(this,190 - 60,340,"peaberry","Send to Forensics","flatButton", () => {

            if (Inventory.forensicsSlotPointer.item != null) {
                let itemName = Inventory.forensicsSlotPointer.item.item.info.name;
                Inventory.forensicsSlotPointer.item.setVisible(false);
                this.scene.get("Office").time.delayedCall(5000, () => {
                    this.scene.get("Mailbox").events.emit("sendMail",
                        "Forensics Analysis",
                        `Hello Detective,\n The forensics lab has finished its analysis on the ${itemName}. Good luck!`);
                    Inventory.forensicsSlotPointer.item.setVisible(true);
                    Inventory.forensicsSlotPointer.item.isUnlocked = true;
                });
            }
        });
        
        let exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        exitKey.on("down", () => {
            this.scene.sleep().resume("Office");
        });
        this.events.on("itemPicked", (item) => {
            this.inventory.addItem(item);
        });

        this.events.on("updateItemPanel", () => {
            this.itemImage.setTexture(Inventory.selectedItem.item.texture,Inventory.selectedItem.item.frame.name);
            this.itemDescription.setText(Inventory.selectedItem.item.info.description);
            this.itemName.setText(Inventory.selectedItem.item.info.name);
            this.setForensicsDescription(Inventory.selectedItem);
            this.itemBanner.resize(this.itemName.width+20,32);
            
        });
        this.addItemDescriptionPanel();
        this.inventory = new Inventory(this,270 -60 ,config.height / 2, null);
    }

    addItemDescriptionPanel() {

        this.add.nineslice(400 -60 ,120,46,46,'window',7).resize(280,300);
        this.itemBanner = this.add.nineslice(410 - 60 ,130,32,16,'itemBanner',7);
        this.itemBanner.resize(150,32);
        //let portrait = this.add.image(450, config.height / 2 - 120, "portrait_frame").setOrigin(0, 0);
        this.itemImage = this.add.image(450 - 20, config.height / 2 - 50, undefined, undefined).setOrigin(0, 0).setScale(1, 1);
        this.itemName = this.add.bitmapText(420 - 60,130,"peaberry",""); //max width 240
        //this.itemDescription = this.add.bitmapText(410 - 50, 250, "clean","",8);
        this.itemDescription = this.add.text(410 - 60, 250, "",{fontFamily: "mono",fontSize: "16px"}).setWordWrapWidth(260);

        this.add.nineslice(410 - 60,340,48,48,"goldFrame",9).resize(260,70);
        this.forensicsLock = this.add.image(540 - 60,375,"lock").setScale(2,2);
        this.forensicsDescription = this.add.text(410 - 55, 340, "",{fontFamily: "mono",fontSize: "16px"}).setWordWrapWidth(240);
    }

    setForensicsDescription(invItem){

        if(invItem.isUnlocked){
            this.forensicsLock.setVisible(false);
            this.forensicsDescription.setText(invItem.item.info.forensics);
            return;
        }
        this.forensicsLock.setVisible(true);
        this.forensicsDescription.setText("");
    }
}