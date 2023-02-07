var player;

class GameScreen extends Phaser.Scene {

    constructor() {
        super("game_screen");
    }

    preload() {
        this.load.image("serene_village", "./assets/map/Serene_Village.png");
        this.load.tilemapTiledJSON("tilemap", "./assets/map/tempMap.json");
    }

    create() {

        this.cameras.main.fadeIn(500);
        player = new Player(this,100,150,"playerAnims");
        player.scale = 0.5;
        player.setDepth(10);

        this.createMap();
        
        this.cameras.main.startFollow(player,true);
        this.cameras.main.setZoom(2);

    }

    createMap(){

        this.map = this.make.tilemap({key: "tilemap" });
        const tileset = this.map.addTilesetImage("Serene_Village", "serene_village");
        let layerNames = ["Ground","4","3","2","1","Houses","Above Houses"];
        
        for(let name of layerNames){
            let layer = this.map.createLayer(name,tileset);
        }

        let entrances = this.map.createFromObjects("House Entrance",{name: "Entrance", classType: Entrance});
        for(let e of entrances){
           let tile =  this.map.getTileAtWorldXY(e.x,e.y,false,undefined,"Ground");
           tile.properties["ent"] = e;
        }

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels,this.map.heightInPixels);

        const gridEngineConfig = {
            characters: [
              {
                id: "player",
                sprite: player,
                walkingAnimationMapping: 6,
                startPosition: { x: 8, y: 8 },
              },
            ],
          };
        
        this.gridEngine.create(this.map, gridEngineConfig);
    }

}