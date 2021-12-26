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
        this.load.image('blaster1', 'assets/blast-ball.png');

        // load spritsheet
        this.load.spritesheet('green-ship', 'assets/12-26-shipsprite.png', {frameWidth: 72, frameHeight: 88})

        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.image('logo', 'assets/logo-new.png')

        this.load.audio('inGameMusic', 'assets/InGameMusic.ogg');
        this.load.audio('blasterSound', 'assets/Blaster1.wav');
        this.load.audio('thrusterSound', 'assets/Thruster-Side.ogg');
        this.load.audio('thrusterBack', 'assets/Thruster-Back.ogg');
        this.load.audio('introMusic', 'assets/IntroMusic.ogg');
    }

    create() {
        this.scene.start('MenuScene');
    }

}

export default PreloadScene;