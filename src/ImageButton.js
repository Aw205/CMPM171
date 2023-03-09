class ImageButton extends Phaser.GameObjects.Image{

    constructor(scene,x,y,texture,frame,pressedTexture,callback){

        super(scene,x,y,texture,frame);
        this.restTexture = texture;
        this.pressedTexture = pressedTexture;
        this.callback = callback;
        this.setInteractive({useHandCursor: true})
            .on("pointerdown", ()=> this.#onClick())
            .on("pointerover",()=> this.#enterButtonHoverState())
            .on("pointerout",()=> this.#enterButtonRestState());
        this.scene.add.existing(this);

    }

      #onClick(){
        this.callback();
      }

      #enterButtonHoverState() {
        this.setTexture(this.pressedTexture);
      }
    
      #enterButtonRestState() {
        this.setTexture(this.restTexture);
      }
}