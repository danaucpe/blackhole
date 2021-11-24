import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image('stars', 'assets/stars.png');
        this.load.image('blue', 'assets/blueship.png');
        this.load.image('red', 'assets/redship.png');
    }

    create() {
        this.scene.start('MenuScene');
    }

}

export default PreloadScene;