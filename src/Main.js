'use strict';

let cursors;
let config = {
  type: Phaser.WEBGL,
  parent: window,
  width: 640,
  height: 480,
  resolution: window.devicePixelRatio,
  physics: {
    default: 'arcade',
    arcade: {
      //debug: true
    }
  },
  scene: [LoadingScreen, Menu, GameScreen, Office, DialogModal, InventoryScene, 
    Mailbox, MessageModal, SuspectReportScene, SuspectSelectionScene, DeskScene, 
    CaseScene, AccusationScene,InterrogationScene, ConfirmationModal, WinScene,LoseScene,CrimeScene],
  scale: {
    mode: Phaser.Scale.FIT,
  },
  dom: {
    createContainer: true
  },
  autoCenter: true,
  pixelArt: true,
  plugins: {
    global: [NineSlice.Plugin.DefaultCfg],
    scene: [
      {
        key: "gridEngine",
        plugin: GridEngine,
        mapping: "gridEngine",
      },
    ],
  }
};

let game = new Phaser.Game(config);