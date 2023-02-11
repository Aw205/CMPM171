'use strict';

let cursors;
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics:{
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [Menu,GameScreen,TempRoom,ModalDialouge],
    pixelArt: true,
    plugins: {
        scene: [
          {
            key: "gridEngine",
            plugin: GridEngine,
            mapping: "gridEngine",
          },
        ],
      }
    //zoom : 1
};

let game = new Phaser.Game(config);