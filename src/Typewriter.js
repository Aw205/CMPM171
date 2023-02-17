class Typewriter {

    constructor(scene, x, y) {

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.text = "";
        this.label = null;
        this.isFinished = false;

    }

    write(text) {
        this.text = text;
        this.label = this.scene.add.text(this.x, this.y, '').setWordWrapWidth(480);
        const lines = this.label.getWrappedText(text)
        let textArr = lines.join('\n');
        const length = textArr.length
        let i = 0
        this.scene.time.addEvent({
            callback: () => {
                this.label.text += textArr[i++]
            },
            repeat: length - 1,
            delay: 50
        })
    }

    fastForward() {

        this.scene.time.removeAllEvents();
        this.label.setText(this.text);
        this.isFinished = true;

    }

    clearText() {
        this.label.setText("");
    }
}