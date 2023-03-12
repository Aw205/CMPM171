class DialogModal extends Phaser.Scene {

    constructor() {
        super("DialogModal");
    }

    create(data) {

        this.typewriter = new Typewriter(this, 100, 370);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', this.#onKeyDownSpace, this);
        this.add.nineslice(90,350,318,78,"dialogBox",7).resize(450,120);
        this.sectionIndex = 0;
        this.textArr = data.text.split("\\");
        this.typewriter.write(this.textArr[0],25);
    }

    #onKeyDownSpace() {

        if (!this.typewriter.isFinished) {
            return this.typewriter.fastForward();
        }
        if (this.sectionIndex != this.textArr.length - 1) {
            this.typewriter.clearText();
            return this.typewriter.write(this.textArr[++this.sectionIndex]);
        }
        this.scene.stop().resume("Office");
    }

}