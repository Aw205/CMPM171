class CrimeScene extends Phaser.Scene {

    constructor() {
        super("CrimeScene");
    }

    create() {

        this.player = new Player(this,0,0, "detectiveAnims");

        this.objectMap = this.createObjectMap();
        this.createMap();
        this.createGridEngine();


        this.cameras.main.fadeIn(500);
        this.cameras.main.startFollow(this.player,false,0.2,0.2);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        let exitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        exitKey.on("down", () => {
            this.scene.stop();
            this.scene.run("Office");
           
            //this.scene.stop().resume("CaseScene");
        });

        // this.events.on("wake", (data) => {
        //     this.gridEngine.turnTowards("player", data.playerDir);
        // });
    }

    createMap() {

        this.map = this.make.tilemap({ key: "crime1" });
        for(let ts of this.map.tilesets){
            this.map.addTilesetImage(ts.name);
        }
        for(let layer of this.map.layers){
            this.map.createLayer(layer.name, this.map.tilesets);
        }

        // let entrances = this.map.createFromObjects("House Entrance", { name: "Entrance", classType: Entrance });
        // for (let e of entrances) {
        //     e.addColliders();
        // }

        let interact = this.map.createFromObjects("Items");
        for (let obj of interact) {
            
           
            let pos = this.map.worldToTileXY(obj.x, obj.y);
            let playerInteractEvent = "E" + pos.x + "," + pos.y;

            if(obj.name!=""){

                obj.info = this.objectMap.get(obj.name);

                this.events.on(playerInteractEvent, () => {

                    this.scene.pause().run("DialogModal", {text: obj.info.commentary, scene: "CrimeScene"});
                    this.scene.get("InventoryScene").events.emit("itemPicked",obj);
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
                    startPosition: { x: 5, y: 6 },
                }
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