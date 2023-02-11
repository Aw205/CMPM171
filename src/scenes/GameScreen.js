
class GameScreen extends Phaser.Scene {

    constructor() {
        super("GameScreen");
    }

    preload() {
        this.load.spritesheet("serene_village", "./assets/map/Serene_Village.png", { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON("tilemap", "./assets/map/tempMap.json");
        this.load.json("objects", "./assets/objects.json");
    }

    create() {

        this.player = new Player(this, 100, 150, "playerAnims");
        this.player.scale = 0.5;
        this.player.setDepth(10);

        this.objectMap = this.createObjectMap();
        this.createMap();
        this.createGridEngine();

        this.cameras.main.fadeIn(500);
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setZoom(2);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.events.on("wake",(data)=>{
            this.gridEngine.turnTowards("player",data.playerDir);
        });

    }

    createMap() {

        this.map = this.make.tilemap({ key: "tilemap" });
        const tileset = this.map.addTilesetImage("Serene_Village", "serene_village");
        let layerNames = ["Ground", "4", "3", "2", "1", "Houses", "Above Houses"];
        for (let name of layerNames) {
            let layer = this.map.createLayer(name, tileset);
        }
        let entrances = this.map.createFromObjects("House Entrance", { name: "Entrance", classType: Entrance });
        for (let e of entrances) {
            e.addColliders(); // can't do this in constructor because tilemap data isn't copied in until after createFromObjects
        }

        let interact = this.map.createFromObjects("Interactables");
        for (let obj of interact) {
            let pos = this.map.worldToTileXY(obj.x, obj.y);
            let playerInteractEvent = "E" + pos.x + "," + pos.y;
            this.events.on(playerInteractEvent, () => {
                this.scene.pause();
                this.scene.run("ModalDialouge", {text: this.objectMap.get(obj.name).description });
            }, this);
        }
    }


    createGridEngine() {

        const gridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: this.player,
                    walkingAnimationMapping: 6,
                    startPosition: { x: 8, y: 8 },
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

}