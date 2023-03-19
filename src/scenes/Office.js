class Office extends Phaser.Scene {

    constructor() {
        super("Office");
    }

    create() {

        this.createCutscene();
        this.events.once("dialog_finished", () => {
            this.createMap();
            this.player = new Player(this, 0, 0, "detectiveAnims");
            this.createGridEngine();
            this.createObjectLayers();
            this.cameras.main.fadeIn(500);
            this.cameras.main.startFollow(this.player, false, 0.2, 0.2); // -88, -64
            this.cameras.main.setZoom(2, 2);
            this.cameras.main.setBounds(44, 0, this.map.widthInPixels, this.map.heightInPixels - 45);
            this.createTween();
            this.scene.run("InventoryScene");
            this.scene.sleep("InventoryScene");


        });
        this.events.on("transitionwake", (sys, data) => {
            this.cameras.main.fadeIn(1500);
        });
        this.cameras.main.once("camerafadeincomplete", () => {
            this.scene.pause().run("Mailbox");
        });
    }


    createCutscene() {

        let tw = new Typewriter(this, 100, 100);
        let label = tw.writeBitmapText("New York \n\n 1937");

        this.time.delayedCall(3000, () => {
            this.add.tween({
                targets: label,
                x: label.x - 470,
                ease: "Expo.easeInOut"
            });
            this.time.delayedCall(2000, () => {
                this.scene.pause().run("DialogModal", {
                    text: `The city that never sleeps. \\ It won't let me sleep either. \\ The election's soon.\n\n Great. \\ I've got mail.\n\n Likely a new case. \\ . . . . \\ Don't let me down.`,
                    scene: "Office"
                });
            });
        });
    }

    createMap() {

        this.map = this.make.tilemap({ key: "office" });
        for (let ts of this.map.tilesets) {
            this.map.addTilesetImage(ts.name);
        }
        for (let layer of this.map.layers) {
            this.map.createLayer(layer.name, this.map.tilesets);
        }
    }

    createObjectLayers() {

        let layerOrder = [];
        let layerDepth = - 1;
        let objectDepth = 0.0;
        for (let layer of this.map.objects) {
            layerOrder.push([layer.name, "objectLayer"]);
        }
        for (let layer of this.map.layers) {
            layerOrder.push([layer.name, "tileLayer"]);
        }
        layerOrder.sort((a, b) => {
            return a[0] - b[0];
        });
        for (let i = 0; i < layerOrder.length; i++) {
            if (layerOrder[i][1] == "tileLayer") {
                layerDepth++;
                objectDepth = layerDepth;
                continue;
            }
            if (layerOrder[i][0] != "8") {
                let arr = this.map.createFromObjects(layerOrder[i][0]);
                for (let obj of arr) {
                    obj.setDepth(objectDepth);
                    objectDepth += 0.01;
                }
            }
            else {

                let interactables = this.map.createFromObjects("8");
                for (let obj of interactables) {
                    let pos = this.map.worldToTileXY(obj.x, obj.y);
                    let playerInteractEvent = "E" + pos.x + "," + pos.y;
                    if (obj.name == "Desk") {
                        this.events.on(playerInteractEvent, () => {
                            this.scene.pause().run("DeskScene");
                        });
                        obj.destroy();
                    }
                    else if (obj.name == "Chest") {
                        this.events.on(playerInteractEvent, () => {
                            this.scene.pause().run("InventoryScene");
                        });
                        obj.destroy();
                    }
                    else if (obj.name == "Mailbox") {
                        this.events.on(playerInteractEvent, () => {
                            this.scene.pause().run("Mailbox");
                        });
                        this.ex = this.add.image(obj.x, obj.y, "exclamation").setScale(2, 2);
                        this.ex.setDepth(100);
                        obj.destroy();
                    }
                    else if (obj.name == "Desk2") {
                        this.events.on(playerInteractEvent, () => {
                            this.scene.pause().run("AccusationScene");
                        });
                        obj.destroy();
                    }
                    else if (obj.name == "") {
                        obj.setDepth(objectDepth);
                        objectDepth += 0.01;
                    }
                }

            }

        }
    }

    createGridEngine() {
        const gridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: this.player,
                    walkingAnimationMapping: 0,
                    startPosition: { x: 3, y: 2 },
                    speed: 4,
                    offsetY: -20
                },
            ],
        };
        this.gridEngine.create(this.map, gridEngineConfig);
    }

    createTween() {

        this.mailNotifTween = this.tweens.add({
            targets: this.ex,
            y: this.ex.y - 15,
            ease: "Linear",
            yoyo: true,
            duration: 1000,
            repeat: -1

        });
        this.events.on("readAllMail", () => {
            this.mailNotifTween.pause();
            this.ex.setVisible(false);

        });
        this.events.on("mailNotif", () => {
            this.mailNotifTween.resume();
            this.ex.setVisible(true);

        })

    }
}