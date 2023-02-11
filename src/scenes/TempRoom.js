class TempRoom extends Phaser.Scene {

    constructor() {
        super("TempRoom");
    }

    preload() {

        this.load.image("interiors", "./assets/map/Interiors.png");
        this.load.image("room_builder", "./assets/map/Room_Builder.png");
        this.load.tilemapTiledJSON("tempRoom", "./assets/map/Shop_room.json");
    }

    create() {


        this.player = new Player(this, 50, 50, "playerAnims");
        this.player.scale = 0.5;
        this.createMap();
        this.createGridEngine();

        this.cameras.main.fadeIn(500);
        this.cameras.main.startFollow(this.player, false, 0.2, 0.2);
        this.cameras.main.setZoom(2);
    }

    createMap() {

        this.map = this.make.tilemap({ key: "tempRoom" });
        const interiorTileset = this.map.addTilesetImage("Interior", "interiors");
        const roomTileset = this.map.addTilesetImage("Room", "room_builder");

        let layerNames = ["Floor", "Furniture", "Above Furniture", "Border"];
        for (let name of layerNames) {
            let layer = this.map.createLayer(name, [interiorTileset, roomTileset]);
        }
        let entrances = this.map.createFromObjects("Entrances", {name: "Entrance", classType: Entrance });
        for (let e of entrances) {
            e.addColliders(); // can't do this in constructor because tilemap data isn't copied in until after createFromObjects
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

}