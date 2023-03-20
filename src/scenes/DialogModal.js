class DialogModal extends Phaser.Scene {

    constructor() {
        super("DialogModal");
    }

    create(data) {

        this.scene.bringToTop();
        this.prevScene = data.scene;
        
        this.typewriter = new Typewriter(this, 100, 370);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', this.#onKeyDownSpace, this);

        this.add.nineslice(90,350,318,78,"dialogBox",7).resize(450,120);

        this.endIndicator = this.add.triangle(515,450,0,0,16,0,8,8,0).setStrokeStyle(1,0x73748c).setVisible(false);
        this.add.tween({
            targets: this.endIndicator,
            y: this.endIndicator.y - 5,
            ease: "Linear",
            yoyo: true,
            repeat: -1
        });

        this.events.on("typewriter_finished",()=>{
            if(this.sectionIndex != this.textArr.length -1){
                return this.endIndicator.setVisible(true);
            }
            this.scene.get(this.prevScene).events.emit("dialog_finished");
        });

        this.sectionIndex = 0;
        this.textArr = data.text.split("\\");
        this.typewriter.write(this.textArr[0],25,450);
    }

    #onKeyDownSpace() {

        if (!this.typewriter.isFinished) {
            return this.typewriter.fastForward();
        }
        if (this.sectionIndex != this.textArr.length - 1) {
            this.typewriter.clearText();
            this.endIndicator.setVisible(false);
            return this.typewriter.write(this.textArr[++this.sectionIndex],25,450);
        }
        this.scene.get(this.prevScene).events.emit("modalFinished");
        this.scene.stop().resume(this.prevScene);
    }

}