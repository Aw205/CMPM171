class TextButton extends Phaser.GameObjects.Text{

    constructor(scene,x,y,text,style,img,callback){

        super(scene,x,y,text,style);

        this.img = this.scene.add.image(x,y,img).setScale(4,4);

        // this.img = this.scene.add.nineslice(x,y,92,92,img,11);
        // this.img.resize(100,60);
        // this.img.setOrigin(0.5);
       

        this.setColor("#ADD8E6");
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
        this.setStyle({ fill: "#ffff00"});
      }
    
      #enterButtonRestState() {
        this.setStyle({ fill: "#ADD8E6"});
      }
    
      #enterButtonActiveState() {
        this.setStyle({ fill: '#0ff' });
      }

}