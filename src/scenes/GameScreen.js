
class GameScreen extends Phaser.Scene {

    constructor() {
        super("GameScreen");
    }

    preload() {
        this.load.spritesheet("serene_village", "./assets/map/Serene_Village.png", { frameWidth: 16, frameHeight: 16 });
        this.load.tilemapTiledJSON("tilemap", "./assets/map/tempMap.json");
        this.load.json("objects", "./assets/objects.json");
        this.load.json("dialogs", "./assets/dialog.json");

    }

    create() {

        this.itemsPicked = []; //might need to pass this to other scenes, using data manager?

        this.player = new Player(this, 100, 150, "playerAnims");
        this.player.scale = 0.5;
        this.player.setDepth(10);

        this.objectMap = this.createObjectMap();
        this.npcMap = this.createNPCMap();
        this.createMap();
        this.createGridEngine();

        this.cameras.main.fadeIn(500);
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setZoom(2);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.events.on("wake", (data) => {
            this.gridEngine.turnTowards("player", data.playerDir);
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
            e.addColliders();
        }

        let interact = this.map.createFromObjects("Interactables");
        for (let obj of interact) {
            let pos = this.map.worldToTileXY(obj.x, obj.y);
            let playerInteractEvent = "E" + pos.x + "," + pos.y;

            //console.log(obj.frame.name); gets the frame num for texture

            this.events.on(playerInteractEvent, () => {
                this.scene.pause().run("ModalDialouge", { text: this.objectMap.get(obj.name).description });
                this.itemsPicked.push(obj);
                obj.destroy();
                obj = null;
                this.events.removeListener(playerInteractEvent);
            }, this);
        }

        this.npcs = this.map.createFromObjects("NPC");
        for (let npc of this.npcs) {
            npc.setTexture("playerAnims").setScale(0.5, 0.5);
            this.events.on("E", (x, y) => {
                let pos = this.gridEngine.getPosition(npc.name);
                if (pos.x == x && pos.y == y) {
                    let playerDir = this.gridEngine.getFacingDirection("player");
                    this.gridEngine.turnTowards(npc.name, this.getOppositeDir(playerDir));
                    this.scene.pause().run("ModalDialouge", { text: this.npcMap.get(npc.name).dialog });
                }
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
                {
                    id: "Mayor Crowley",
                    sprite: this.npcs[0],
                    walkingAnimationMapping: 0,
                    startPosition: { x: 12, y: 5 },
                    speed: 3,
                }
            ],
        };
        this.gridEngine.create(this.map, gridEngineConfig);
        this.gridEngine.follow("Mayor Crowley", "player", 2, true);
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

    createNPCMap() {

        let npcMap = new Map();
        var data = this.cache.json.get("dialogs");
        for (let i = 0; i < data.length; i++) {
            npcMap.set(data[i].name, data[i]);
        }
        return npcMap;
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