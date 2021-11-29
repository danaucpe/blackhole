import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image('stars', 'assets/stars.png');
        this.load.image('blue', 'assets/blueship.png');
        this.load.image('red', 'assets/redship.png');
        this.load.image('thrust1', 'assets/Thrust-1.png');
        this.load.image('blaster1', 'assets/Blaster-1.png');
        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.image('logo', 'assets/logo.png')

        this.load.audio('backgroundMusic', 'assets/space-music.wav');
        this.load.audio('blasterSound', 'assets/Blaster1.wav');
        this.load.audio('thrusterSound', 'assets/Thruster1.wav');
    }

    create() {
        this.scene.start('MenuScene');
    }

}

export default PreloadScene;