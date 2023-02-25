class Office extends Phaser.Scene {

    constructor() {
        super("Office");
    }

    create() {

        this.player = new Player(this, 50, 50, "playerAnims");
        this.player.scale = 0.5;
        
        this.createMap();
        this.createGridEngine();

        this.cameras.main.fadeIn(500);
        this.cameras.main.startFollow(this.player, false, 0.2, 0.2);
        this.cameras.main.setZoom(2);

        //this.cameras.main.zoomTo(4,3000);
    }

    createMap() {

        this.map = this.make.tilemap({ key: "office" });
        for(let ts of this.map.tilesets){
            this.map.addTilesetImage(ts.name);
        }
        for(let layer of this.map.layers){
            this.map.createLayer(layer.name, this.map.tilesets);
        }
        // let entrances = this.map.createFromObjects("Entrances", {name: "Entrance", classType: Entrance });
        // for (let e of entrances) {
        //     e.addColliders();
        // }


        let interact = this.map.createFromObjects("Interactables");
        for (let obj of interact) {
            let pos = this.map.worldToTileXY(obj.x, obj.y);
            let playerInteractEvent = "E" + pos.x + "," + pos.y;
            if(obj.name == "Desk"){
                this.events.on(playerInteractEvent,()=>{
                    this.scene.pause().run("DeskScene");
                });
            }
            else if(obj.name == "Chest"){
                this.events.on(playerInteractEvent,()=>{
                    this.scene.pause().run("InventoryScene");
                });
            }
            obj.setVisible(false);

            // obj.info = this.objectMap.get(obj.name);
            // let pos = this.map.worldToTileXY(obj.x, obj.y);
            // let playerInteractEvent = "E" + pos.x + "," + pos.y;

            // this.events.on(playerInteractEvent, () => {

            //     this.scene.pause().run("ModalDialouge", { text: this.objectMap.get(obj.name).description });
            //     this.scene.get("InventoryScene").events.emit("itemPicked",obj);
            //     obj.destroy();
            //     obj = null;
            //     this.events.removeListener(playerInteractEvent);
            // }, this);
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