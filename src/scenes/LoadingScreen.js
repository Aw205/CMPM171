class LoadingScreen extends Phaser.Scene {

    constructor() {
        super({
            key: "LoadingScreen", pack: {
                files: [
                    { type: "json", key: "assets", url: "./assets/assets.json" }
                ]
            }
        });
    }

    preload() {

        this.load.setBaseURL("assets/");
        this.loadAssets(this.cache.json.get("assets"));
        this.createProgressBar();
    }

    loadAssets(assets) {
        Object.keys(assets).forEach((group) => {
            Object.keys(assets[group]).forEach((key) => {
                let value = assets[group][key];
                if (group == "bitmapFont" || group == "spritesheet" || group == "atlas") {
                    this.load[group](key, value[0], value[1]);
                }
                else {
                    this.load[group](key, value);
                }
            }, this);
        }, this);
    }

    createProgressBar() {

        let width = 400;
        let height = 20;
        let x = game.config.width / 2 - width / 2;
        let y = game.config.height / 2 - height / 2;

        let borderOffset = 2;
        let borderRect = new Phaser.Geom.Rectangle(x - borderOffset, y - borderOffset, width + borderOffset * 2, height + borderOffset * 2);
        let border = this.add.graphics({ lineStyle: { width: 5, color: 0xaaaaaa } });
        border.strokeRectShape(borderRect);

        this.add.text(game.config.width / 2, game.config.height / 2 - 50, "Loading...");

        this.progressBar = this.add.graphics();
        this.load.on("progress", (progress) => {
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(x, y, progress * width, height);
        }, this);
        this.load.once("complete", () => {
            this.load.off("progress");
            this.scene.start("Menu");
        }, this);
    }
}