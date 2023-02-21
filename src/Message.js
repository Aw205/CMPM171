class Message extends Phaser.GameObjects.Rectangle{

    constructor(scene,x,y,width,height){
        super(scene,x,y,width,height);

        this.initColor = 0xD0B49F;
        this.overColor = 0xE4D4C8;
        this.overAlpha = 0.5;
        this.initAlpha = 1;
        this.setFillStyle(this.filllColor,this.fillAlpha);
        this.setInteractive({useHandCursor: true });
        this.#createListeners();
        scene.add.existing(this);
       
        this.label = new Phaser.GameObjects.BitmapText(scene,x,y,"clean","Title");
        this.label.setDepth(10);
        this.label.setOrigin(0,0);
        scene.add.existing(this.label);
    
        //this.content = new Phaser.GameObjects.Text(scene,x,y,"hello");
        
    }


    #createListeners(){

        this.on("pointerdown", (pointer, localX, localY) => {
        });

        this.on("pointerup", () => {
        });

        this.on("pointerover",()=>{
            this.setFillStyle(this.overColor,this.overAlpha);
        });

        this.on("pointerout",()=>{
            this.setFillStyle(this.initColor,this.initAlpha);
        });
    }

}