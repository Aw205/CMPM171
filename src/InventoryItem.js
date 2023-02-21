class InventoryItem extends Phaser.GameObjects.Image{

    constructor(scene,x,y,item){
        super(scene,x,y,item.texture,item.frame.name);

        this.item = item;

        this.setInteractive({ draggable: true, useHandCursor: true });
        this.#createListeners();

        this.name = item.info.name;
        this.description = item.info.description;
       
        this.label = new Phaser.GameObjects.Text(scene,0,0,this.name,{backgroundColor:"#0000004F",color: "#fff", fontSize: "12px"});
        scene.add.existing(this.label);
        this.label.setOrigin(0,0);
        this.label.setVisible(false);
    }


    #createListeners(){

        this.on("pointerdown", (pointer, localX, localY) => {

            this.parentContainer.parentContainer.bringToTop(this.parentContainer);
            this.parentContainer.startX = this.parentContainer.x;
            this.parentContainer.startY = this.parentContainer.y;
            this.parentContainer.disableInteractive();
            this.setOrigin((16 - localX) / 16, (16 - localY) / 16); //16 is size of item texture
        });

        this.on("drag", (pointer, dragX, dragY) => {
            this.parentContainer.x = this.parentContainer.startX + dragX;
            this.parentContainer.y = this.parentContainer.startY + dragY;
        });
        this.on("drop", (pointer, target) => {
            if (target.item != null) {
                return;
            }
            let targetPos = [target.x, target.y];
            target.setPosition(this.parentContainer.startX, this.parentContainer.startY);
            this.parentContainer.setPosition(targetPos[0], targetPos[1]);
            this.parentContainer.startX = targetPos[0];
            this.parentContainer.startY = targetPos[1];
            this.parentContainer.setInteractive();
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