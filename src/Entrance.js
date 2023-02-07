class Entrance extends Phaser.GameObjects.Sprite {

    constructor(scene, type) {
        super(scene, type);
    }

    onCollision() {

        let sceneName = this.data.get("destination");
        this.scene.scene.start(sceneName);

    }
}
