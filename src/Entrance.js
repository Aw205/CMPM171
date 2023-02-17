class Entrance extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y,texture) {
        super(scene,x,y,texture);
    }
    addColliders(){

        let collider = this.scene.physics.add.sprite(this.x,this.y,null).setSize(20,20);
        this.scene.physics.add.overlap(collider,this.scene.player.facingCollider,this.collideCallback,null,this)

    }

    collideCallback() {

        let sceneName = this.data.get("destination");
        this.scene.player.facingCollider.setPosition(0,0); //temporary solution
        let dir = this.scene.gridEngine.getFacingDirection("player");
        this.scene.scene.switch(sceneName,{playerDir: dir});

    }
}
