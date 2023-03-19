class Typewriter {

    constructor(scene, x, y) {

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.text = "";
        this.label = this.scene.add.text(this.x, this.y, '',{fontFamily: 'mono'});
        this.isFinished = false;

    }


    writeBitmapText(text) {

        this.text = text;
        this.label = this.scene.add.bitmapText(this.x, this.y, "clean", '').setFontSize(72);

        let i = 0;
        this.scene.time.addEvent({
            callback: () => {
                this.label.text += text[i++];
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

        return this.label;
    }

    write(text, delayVal = 50,wrapWidth = 480) {

        this.text = text;
        this.isFinished = false;
        this.label.setDepth(100);
        this.label.setWordWrapWidth(wrapWidth);
        this.label.setFixedSize(2000,200); //fixed issue??
        let textArr = this.label.getWrappedText(text).join('\n'); // needs some fix

        let i = 0;
        this.ev= this.scene.time.addEvent({
            callback: () => {
                
                this.label.text += textArr[i++];
                if(this.ev.getOverallProgress() == 1){
                    this.scene.events.emit("typewriter_finished");
                    this.isFinished = true;
                }
            },
            repeat: textArr.length - 1,
            delay: delayVal,
        });
        return this.label;
    }

    fastForward() {

        this.scene.time.removeAllEvents();
        this.label.setText(this.text);
        this.isFinished = true;
        this.scene.events.emit("typewriter_finished");

    }

    clearText() {
        this.label.setText("");
    }
}