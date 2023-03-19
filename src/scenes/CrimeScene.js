class CrimeScene extends Phaser.Scene {

    constructor() {
        super("CrimeScene");
    }

    create() {

        this.createMap();
        this.objectMap = this.createObjectMap();
        this.player = new Player(this, 0, 0, "detectiveAnims");
        this.createGridEngine();
        this.createObjectLayers();
    
        this.cameras.main.fadeIn(500);
        this.cameras.main.startFollow(this.player, false, 0.2, 0.2);
        this.cameras.main.setZoom(2,2);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        let exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        exitKey.on("down", () => {
            this.cameras.main.fadeOut(500);
            this.cameras.main.on("camerafadeoutcomplete",(cam,effect)=>{
                this.scene.transition({target: "Office",duration: 500,sleep: true});
            });
        });
        this.events.on("wake",()=>{
            this.cameras.main.fadeIn(500);
        });
    }

    createMap() {

        this.map = this.make.tilemap({ key: "crime1" });
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
                continue;
            }
            objectDepth = layerDepth;
            if (layerOrder[i][0] != "9") {
                let arr = this.map.createFromObjects(layerOrder[i][0]);
                for (let obj of arr) {
                    obj.setDepth(objectDepth);
                    objectDepth += 0.01;
                }
            }
            else {
                let items = this.map.createFromObjects("9");
                for (let obj of items) {
                    let pos = this.map.worldToTileXY(obj.x, obj.y);
                    let playerInteractEvent = "E" + pos.x + "," + pos.y;
                        obj.info = this.objectMap.get(obj.name);
                        this.events.on(playerInteractEvent, () => {
                            this.scene.pause().run("DialogModal", { text: obj.info.commentary, scene: "CrimeScene"});
                            this.scene.get("InventoryScene").events.emit("itemPicked", obj);
                            obj.destroy();
                            obj = null;
                            this.events.removeListener(playerInteractEvent);
                        }, this);
                        obj.setDepth(objectDepth);
                        objectDepth += 0.01;
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
                    walkingAnimationMapping: 1,
                    startPosition: { x: 7, y: 2 },
                    speed: 4
                }
            ],
        };
        this.gridEngine.create(this.map, gridEngineConfig);
    }

    createObjectMap() {

        let objectMap = new Map();
        var data = this.cache.json.get("objects");
        for (let i = 0; i < data.length; i++) {
            objectMap.set(data[i].name, data[i]);
        }
        return objectMap;
    }

    getOppositeDir(direction) {
        if (direction == "up") {
            return "down";
        }
        else if (direction == "down") {
            return "up"
        }
        else if (direction == "right") {
            return "left"
        }
        return "right";
    }
}