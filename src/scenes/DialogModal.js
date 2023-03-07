class DialogModal extends Phaser.Scene {

    constructor() {
        super("DialogModal");
    }

    create(data) {

        this.typewriter = new Typewriter(this, 60, 380);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', this.#onKeyDownSpace, this);
        this.add.image(0, 350, "box").setOrigin(0, 0).setScale(0.5, 0.5);

        this.sectionIndex = 0;
        this.textArr = data.text.split("\\");
        this.typewriter.write(this.textArr[0]);
    }

    #onKeyDownSpace() {

        if (!this.typewriter.isFinished) {
            return this.typewriter.fastForward();
        }
        if (this.sectionIndex != this.textArr.length - 1) {
            this.typewriter.clearText();
            return this.typewriter.write(this.textArr[++this.sectionIndex]);
        }
        this.scene.resume("Office").stop();
    }

}