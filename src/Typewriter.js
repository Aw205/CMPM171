class Typewriter {

    constructor(scene, x, y) {

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.text = "";
        this.label = null;
        this.isFinished = false;

    }


    writeBitmapText(text) {

        this.text = text;
        this.label = this.scene.add.bitmapText(this.x, this.y, "clean", '').setFontSize(72);

        let i = 0;
        this.scene.time.addEvent({
            callback: () => {
                this.label.text += text[i++]
            },
            repeat: text.length - 1,
            delay: 120
        });

        this.scene.time.delayedCall(3000, () => {

            this.scene.tweens.add({
                targets: this.label,
                x: -370,
                duration: 500,
                ease: "Sine.easeIn",
            });
        });
    }

    write(text) {

        this.text = text;
        this.label = this.scene.add.text(this.x, this.y, '').setWordWrapWidth(480);
        let textArr = this.label.getWrappedText(text).join('\n');

        let i = 0;
        this.scene.time.addEvent({
            callback: () => {
                this.label.text += textArr[i++]
            },
            repeat: textArr.length - 1,
            delay: 50
        });
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