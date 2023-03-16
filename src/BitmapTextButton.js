class BitmapTextButton extends Phaser.GameObjects.BitmapText{

    constructor(scene,x,y,font,text,img,callback){

        super(scene,x,y,font,text);

        this.img = this.scene.add.nineslice(x-5,y+3,34,10,img,3);
        this.img.setOrigin(0,0).resize(this.width+10,25);
        this.callback = callback;
        this.setInteractive({useHandCursor: true})
            .on("pointerdown", ()=> this.#onClick())
            .on("pointerover",()=> this.#enterButtonHoverState())
            .on("pointerout",()=> this.#enterButtonRestState());
        this.scene.add.existing(this);

    }

      #onClick(){
        this.scene.sound.play("button_click",{volume:0.1});
        this.callback();
      }

      #enterButtonHoverState() {
        this.setTint(0xffff00);
      }
    
      #enterButtonRestState() {
        this.setTint(0xffffff);
      }
    
      #enterButtonActiveState() {
        //this.setStyle({ fill: '#0ff' });
      }

}