import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene';
import PreloadScene from './scenes/PreloadScene';
import PlayScene from './scenes/PlayScene';

const WIDTH = 1080;
const HEIGHT = 800;
const RED_POSITION = { x: WIDTH * 0.1, y: HEIGHT / 2 }
const BLUE_POSITION = { x: WIDTH * 0.9, y: HEIGHT / 2 }
const GREEN_POSITION = { x: WIDTH * 0.5, y: HEIGHT * 0.9 }
const BULLET_SPEED = 250;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  redStartPosition: RED_POSITION,
  blueStartPosition: BLUE_POSITION,
  greenStartPosition: GREEN_POSITION,
  bulletSpeed: BULLET_SPEED
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
      gravity: {x: 0, y: 0}
    }
  },
  scene: initScenes()
}

new Phaser.Game(config);