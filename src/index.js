import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene';
import PreloadScene from './scenes/PreloadScene';
import PlayScene from './scenes/PlayScene';

const WIDTH = 800;
const HEIGHT = 600;
const RED_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 }
const BLUE_POSITION = { x: WIDTH * 0.9, y: HEIGHT / 2 }

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  redStartPosition: RED_POSITION,
  blueStartPosition: BLUE_POSITION
}

const Scenes = [PreloadScene, MenuScene, PlayScene];
const CreateScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(CreateScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  },
  scene: initScenes()
}

new Phaser.Game(config);