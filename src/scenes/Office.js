class Office extends Phaser.Scene {

    constructor() {
        super("Office");
    }

    create() {

        this.tw = new Typewriter(this, 100, 100);
        this.tw.writeBitmapText("New York \n\n 1937");

        this.time.delayedCall(3000, () => {
            
            this.player = new Player(this, 0, 0, "detectiveAnims");
            this.objectMap = this.createObjectMap();
            this.createMap();
            this.createGridEngine();
            this.cameras.main.fadeIn(500);
            this.cameras.main.startFollow(this.player, false, 0.2, 0.2);
            this.cameras.main.setBounds(44, 0, this.map.widthInPixels - 88, this.map.heightInPixels - 64);

            this.createTween();


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

        // let entrances = this.map.createFromObjects("Entrances", {name: "Entrance", classType: Entrance });
        // for (let e of entrances) {
        //     e.addColliders();
        // }


        let interact = this.map.createFromObjects("Items");
        for (let obj of interact) {
            let pos = this.map.worldToTileXY(obj.x, obj.y);
            let playerInteractEvent = "E" + pos.x + "," + pos.y;
            if (obj.name == "Desk") {
                this.events.on(playerInteractEvent, () => {
                    this.scene.pause().run("DeskScene");
                });
                obj.setVisible(false);
            }
            else if (obj.name == "Chest") {
                this.events.on(playerInteractEvent, () => {
                    this.scene.pause().run("InventoryScene");
                });
                obj.setVisible(false);
            }
            else if (obj.name == "Mailbox") {
                this.events.on(playerInteractEvent, () => {
                    this.scene.pause().run("Mailbox");
                });
                this.ex = this.add.image(obj.x, obj.y, "exclamation").setScale(2, 2);
                this.ex.setDepth(100);
                obj.setVisible(false);
            }
            else if (obj.name == "Desk2") {
                this.events.on(playerInteractEvent, () => {
                    this.scene.pause().run("AccusationScene");
                });
                obj.setVisible(false);
            }
            else if (obj.name == "") {
                console.log("here setting depth");
                obj.setDepth(100);
            }
            else if (obj.name != "") {
                obj.info = this.objectMap.get(obj.name);
                this.events.on(playerInteractEvent, () => {

                    this.scene.pause().run("DialogModal", { text: obj.info.commentary, scene: "Office" });
                    this.scene.get("InventoryScene").events.emit("itemPicked", obj);
                    obj.destroy();
                    obj = null;
                    this.events.removeListener(playerInteractEvent);
                }, this);
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
                    startPosition: { x: 5, y: 3 },
                },
            ],
        };
        this.gridEngine.create(this.map, gridEngineConfig);
        this.gridEngine.positionChangeFinished().subscribe(() => {
            let pos = this.gridEngine.getFacingPosition("player");
            let worldPos = this.map.tileToWorldXY(pos.x, pos.y);
            this.player.facingCollider.setPosition(worldPos.x + 8, worldPos.y + 8);
        });
    }

    createObjectMap() {

        let objectMap = new Map();
        var data = this.cache.json.get("objects");
        for (let i = 0; i < data.length; i++) {
            objectMap.set(data[i].name, data[i]);
        }
        return objectMap;
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
        this.events.on("mailNotif",()=>{
            this.mailNotifTween.resume();
            this.ex.setVisible(true);

        })

    }
}