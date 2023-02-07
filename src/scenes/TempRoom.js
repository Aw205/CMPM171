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
    }

    createMap() {

        const map = this.make.tilemap({ key: "tempRoom" });
        const interiorTileset = map.addTilesetImage("Interior", "interiors");
        const roomTileset = map.addTilesetImage("Room", "room_builder");

        let layerNames = ["Floor", "Furniture", "Above Furniture", "Border"];
        for (let name of layerNames) {
            let layer = map.createLayer(name, [interiorTileset, roomTileset]);
        }

        this.cameras.main.startFollow(this.player, false, 0.2, 0.2);
        this.cameras.main.setZoom(2);

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

        this.gridEngine.create(map, gridEngineConfig);
    }

}