class InventoryItem extends Phaser.GameObjects.Image{

    constructor(scene,x,y,item){
        super(scene,x,y,item.texture,item.frame.name);

        this.setScale(0.5,0.5);

        this.item = item;
        this.setInteractive({ draggable: true, useHandCursor: true });
        this.#createListeners();

        this.name = item.info.name;
        this.description = item.info.description;

        this.label = this.scene.add.bitmapText(0,0,"peaberry",this.name);
        this.label.setOrigin(0,0);
        this.label.setVisible(false);

        this.isUnlocked = false;
    }


    #createListeners(){

        this.on("pointerdown", (pointer, localX, localY) => {

            Inventory.selectedItem = this;
            Inventory.selectFrame.setPosition(this.parentContainer.x,this.parentContainer.y);
            Inventory.selectFrame.setVisible(true);
           
            this.scene.events.emit("updateItemPanel");

            this.parentContainer.parentContainer.bringToTop(this.parentContainer);
            this.parentContainer.startX = this.parentContainer.x;
            this.parentContainer.startY = this.parentContainer.y;
            this.parentContainer.disableInteractive();
            this.setOrigin((64 - localX) / 64, (64 - localY) / 64); //16 is size of item texture

            this.parentContainer.parentContainer.bringToTop(Inventory.selectFrame);
        });

        this.on("drag", (pointer, dragX, dragY) => {
            this.parentContainer.x = this.parentContainer.startX + dragX;
            this.parentContainer.y = this.parentContainer.startY + dragY;
        });
        this.on("drop", (pointer, target) => {
            if (target.item != null) {
                return;
            }

            if(this.parentContainer == Inventory.forensicsSlotPointer){
                Inventory.forensicsSlotPointer = target;
            }
            else if(target == Inventory.forensicsSlotPointer){
                Inventory.forensicsSlotPointer = this.parentContainer;
            }

            let targetPos = [target.x, target.y];
            target.setPosition(this.parentContainer.startX, this.parentContainer.startY);
            this.parentContainer.setPosition(targetPos[0], targetPos[1]);
            this.parentContainer.startX = targetPos[0];
            this.parentContainer.startY = targetPos[1];
            this.parentContainer.setInteractive();

            Inventory.selectFrame.setPosition(this.parentContainer.x,this.parentContainer.y);


        });
        this.on("pointerup", () => {
            this.parentContainer.setPosition(this.parentContainer.startX, this.parentContainer.startY);
            this.parentContainer.setInteractive();
            this.setOrigin(0.5, 0.5);
        });

        this.on("pointerover",()=>{

            this.label.setDepth(100);
            this.label.setVisible(true);
        });

        this.on("pointermove",(pointer,localX,localY,event)=>{
            this.label.setPosition(pointer.worldX+8,pointer.worldY+8);  
        });

        this.on("pointerout",(pointer,event)=>{
            this.label.setVisible(false);
        });
    }

}