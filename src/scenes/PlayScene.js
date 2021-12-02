import BaseScene from './BaseScene';
import Bullets from './Bullets';

const VELOCITY = 200;

class PlayScene extends BaseScene {

    constructor(config) {
        super('PlayScene', config);
        this.red = null;
        this.redcenter = null;
        this.blue = null;
        this.thrusterSound = null;
        this.blasterSound = null;
        this.bullets = null;

        this.thrustVelocity = 100;
        this.isPaused = false;
    }

    create() {
        super.create();
        this.createRed();
        this.createBlue();
        this.createAsteroid();
        this.createColliders();
        this.handleInputs();

        this.bullets = new Bullets(this);
        this.music = this.sound.add('gameloop');
        this.music.loop = true;
        this.music.play();
        this.music.volume = .3;
    }

    update() {
            this.updateShipPosition();
            this.checkGameStatus()
    }

    createRed() {
        this.red = this.physics.add.sprite(this.config.redStartPosition.x, this.config.redStartPosition.y, 'red')
            .setOrigin(.5)
            .setScale(1)
        this.red.setCollideWorldBounds(true)
        this.redcenter = this.red.getCenter();
        this.thrusterSound = this.sound.add('thrusterSound');
        this.blasterSound = this.sound.add('blasterSound');
            
        this.thrust1 = this.add.image(this.red.body.position.x+16, this.red.body.position.y+16, 'thrust1')
            .setVisible(true)
            .setDisplayOrigin(-4, -16)
            .setScale(1)
        this.thrust2 = this.add.image(this.red.body.x+16, this.red.body.y+16, 'thrust1')
            .setVisible(true)
            .setDisplayOrigin(8,-16)
            .setScale(1)

        this.turnThrustRight = this.add.image(this.red.body.x+16, this.red.body.y+16, 'thrust1')
            .setRotation(this.red.rotation - 1.5807)
            .setVisible(true)
            .setDisplayOrigin(-10,-8)
            .setScale(1)
        this.turnThrustLeft = this.add.image(this.red.body.x+16, this.red.body.y+16, 'thrust1')
            .setRotation(this.red.rotation + 1.5807)
            .setVisible(true)
            .setDisplayOrigin(14,-8)
            .setScale(1)
    }

    createBlue() {
        this.blue = this.physics.add.sprite(this.config.blueStartPosition.x, this.config.blueStartPosition.y, 'blue')
            .setOrigin(.5,.5)
            .setScale(1)
        this.blue.setCollideWorldBounds(true)
    }

    createAsteroid() {
        this.asteroid = this.physics.add.sprite(this.config.width/2, this.config.height/2, 'asteroid')
            .setOrigin(.5,.5)
            .setScale(2)
        this.asteroid.setCollideWorldBounds(true)
    }

    createColliders() {
        this.physics.add.collider(this.red, this.blue, this.gameOver, null, this);
    }

    handleInputs() {       
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown_W', this.fireBlaster, this);
    }

    updateShipPosition() {
        if (this.cursors.up.isDown) {    
            this.physics.velocityFromRotation(this.red.rotation - 1.5807, 150, this.red.body.acceleration);
            this.thrust1.setVisible(true).setX(this.red.body.x+16).setY(this.red.body.y+16)
            this.thrust2.setVisible(true).setX(this.red.body.x+16).setY(this.red.body.y+16)
            if (!this.thrusterSound.isPlaying)
            {
                this.thrusterSound.play();
                this.thrusterSound.volume = 0.1
                this.thrusterSound.loop = true;
            }
          } else {
            this.red.setAcceleration(0);
            this.thrust1.setVisible(false);
            this.thrust2.setVisible(false);
            this.thrusterSound.stop()
          }
          
          if (this.cursors.left.isDown) {
            this.red.setAngularVelocity(-300);
            this.thrust1.setRotation(this.red.rotation);
            this.thrust2.setRotation(this.red.rotation);
            this.turnThrustRight.setRotation(this.red.rotation - 1.5807).setVisible(true).setX(this.red.body.x+16).setY(this.red.body.y+16)
            this.turnThrustLeft.setRotation(this.red.rotation + 1.5807).setVisible(false).setX(this.red.body.x+16).setY(this.red.body.y+16)
          } else if (this.cursors.right.isDown) {
            this.red.setAngularVelocity(300);
            this.thrust1.setRotation(this.red.rotation);
            this.thrust2.setRotation(this.red.rotation);
            this.turnThrustRight.setRotation(this.red.rotation - 1.5807).setVisible(false).setX(this.red.body.x+16).setY(this.red.body.y+16)
            this.turnThrustLeft.setRotation(this.red.rotation + 1.5807).setVisible(true).setX(this.red.body.x+16).setY(this.red.body.y+16)
          } else {
             this.red.setAngularVelocity(0);
             this.turnThrustRight.setVisible(false);
             this.turnThrustLeft.setVisible(false)
          }
    }

    checkGameStatus() {
        /*if (this.red.body.x >= this.config.width - this.red.width) {
            this.red.body.velocity.x = -VELOCITY;
          }
        
          if (this.red.body.x <= 0) {
            this.red.body.velocity.x = VELOCITY;
          }*/
        
          //if (this.red.getBounds().bottom >= this.config.height || this.red.body.y <= 0) {
          //  this.gameOver();
          //}
    }

    gameOver() {
        console.log('test')
        /*if (!this.gameOverFlag) {
            this.gameOverFlag = true;
            this.physics.pause();
        }*/
    }

    fireBlaster() {
        this.blasterSound.play()
        this.shipVelocityPlusSpeed = this.physics.velocityFromRotation(this.red.rotation - 1.5807, this.config.bulletSpeed)
        this.bullets.fireBullet(this.red.body.x, this.red.body.y, this.shipVelocityPlusSpeed)
    }
}

export default PlayScene;