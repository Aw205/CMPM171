class ModalDialouge extends Phaser.Scene{

    constructor() {
        super("ModalDialouge");
    }

    preload(){
        this.load.image("box", "./assets/box.png");
    }

    create(data){

        this.typewriter = new Typewriter(this,60,380);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', this.onKeyDownSpace,this);
        this.add.image(0,350,"box").setOrigin(0,0).setScale(0.5,0.5);
        this.typewriter.write(data.text);
    }

    onKeyDownSpace(){

        if(this.typewriter.isFinished){
            this.scene.resume("GameScreen");
            this.scene.stop();
        }
        this.typewriter.fastForward();
    }

}