import BaseScene from './BaseScene';
import {Bullets, Bullet} from './Bullets';
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

        this.thrustVelocity = 500;
        this.isPaused = false;
    }

    create() {
        super.create();
        
        this.bullets = new Bullets(this);
        
        this.createRed();
        this.createBlue();
        this.createGreen();
        this.createAsteroid();
        this.createColliders();
        this.handleInputs();

        this.music = this.sound.add('inGameMusic');
        this.music.loop = true;
        this.music.play();
        this.music.volume = .1;

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('green-ship', {start: 18, end: 26}),
            frameRate: 10,
            repeat: 0
        })
        
        this.anims.create({
            key: 'fine',
            frames: this.anims.generateFrameNumbers('green-ship', {start: 0, end: 0}),
            frameRate: 1,
            repeat: 0
        })
    }

    update() {
            this.updateShipPosition();
            this.checkGameStatus()
    }

    createRed() {
        this.red = this.physics.add.sprite(this.config.redStartPosition.x, this.config.redStartPosition.y, 'red')
            .setOrigin(.5)
            .setScale(1)
            .setMass(30)
        this.redcenter = this.red.getCenter();
        this.thrusterSound = this.sound.add('thrusterSound');
        this.blasterSound = this.sound.add('blasterSound');
        this.thrusterBack = this.sound.add('thrusterBack')
            
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
            .setMass(30)
    }

    createGreen() {
        this.green = this.physics.add.sprite(this.config.greenStartPosition.x, this.config.greenStartPosition.y, 'green-ship')
            .setOrigin(.5,.5)
            .setScale(0.5)
            .setMass(30)
        this.green.on('animationcomplete', () => {
            this.green.play('fine')
        })
    }

    createAsteroid() {
        this.asteroid = this.physics.add.sprite(this.config.width/2, this.config.height/2, 'asteroid')
            .setOrigin(.5,.5)
            .setScale(2)
            .setMass(10000)
    }

    createColliders() {
        this.physics.add.collider(this.red, this.blue, this.gameOver, null, this);
        this.physics.add.collider(this.red, this.asteroid, this.gameOver, null, this);
        this.physics.add.collider(this.red, this.green, this.explodeMe, null, this);
        this.physics.add.collider(this.blue, this.asteroid, this.gameOver, null, this);
        this.physics.add.collider(this.green, this.blue, this.gameOver, null, this);
        this.physics.add.collider(this.green, this.asteroid, this.gameOver, null, this);
        this.physics.add.collider(this.bullets, this.green, this.explodeMe, null, this);
        this.physics.add.collider(this.bullets, this.blue, this.gameOver, null, this);
        this.physics.add.collider(this.bullets, this.asteroid, this.gameOver, null, this);
    }

    handleInputs() {       
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown_W', this.fireBlaster, this);
    }

    updateShipPosition() {
        if (this.cursors.up.isDown) {    
            this.physics.velocityFromRotation(this.red.rotation - 1.5807, this.thrustVelocity, this.red.body.acceleration);
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
            if (!this.thrusterBack.isPlaying)
            {
                this.thrusterBack.play();
                this.thrusterBack.volume = 0.05
                this.thrusterBack.loop = true;
            }
          } else if (this.cursors.right.isDown) {
            this.red.setAngularVelocity(300);
            this.thrust1.setRotation(this.red.rotation);
            this.thrust2.setRotation(this.red.rotation);
            this.turnThrustRight.setRotation(this.red.rotation - 1.5807).setVisible(false).setX(this.red.body.x+16).setY(this.red.body.y+16)
            this.turnThrustLeft.setRotation(this.red.rotation + 1.5807).setVisible(true).setX(this.red.body.x+16).setY(this.red.body.y+16)
            if (!this.thrusterBack.isPlaying)
            {
                this.thrusterBack.play();
                this.thrusterBack.volume = 0.05
                this.thrusterBack.loop = true;
            }
          } else {
             this.red.setAngularVelocity(0);
             this.turnThrustRight.setVisible(false);
             this.turnThrustLeft.setVisible(false);
             this.thrusterBack.stop();
          }
    }

    checkGameStatus() {
        this.checkbodybound(this.red)  
        this.checkbodybound(this.blue)  
        this.checkbodybound(this.asteroid)
        this.checkbodybound(this.green)
    }

    checkbodybound( phys_sprite ) {
        const reduce_factor = -0.5

        if (phys_sprite.body.x <= 0) {
            phys_sprite.body.velocity.x = phys_sprite.body.velocity.x * reduce_factor;
            phys_sprite.body.x = 1
        } else if (phys_sprite.body.x >= this.config.width - phys_sprite.width) {
            phys_sprite.body.velocity.x = phys_sprite.body.velocity.x * reduce_factor;
            phys_sprite.body.x = this.config.width - phys_sprite.width - 1
        }
        
        if (phys_sprite.body.y <= 0) {
            phys_sprite.body.velocity.y = phys_sprite.body.velocity.y * reduce_factor;
            phys_sprite.body.y = 1
        } else if (phys_sprite.body.y >= this.config.height - phys_sprite.height) {
            phys_sprite.body.velocity.y = phys_sprite.body.velocity.y * reduce_factor;
            phys_sprite.body.y = this.config.height - phys_sprite.height - 1 
        }
    }

    gameOver(object1, object2) {
        console.log('test')
        if (object2 instanceof Bullet) {
            object2.setActive(false);
            object2.setVisible(false);
        }
    }

    explodeMe(object1, object2) {
        this.green.play('explode')
        if (object1 instanceof Bullet) {
            object1.setActive(false);
            object1.setVisible(false);    
        }
        if (object2 instanceof Bullet) {
            object2.setActive(false);
            object2.setVisible(false);    
        }
        
    }

    fireBlaster() {
        this.blasterSound.play()
        this.blasterSound.volume = 0.3
        this.shipVelocityPlusSpeed = this.physics.velocityFromRotation(this.red.rotation - 1.5807, this.config.bulletSpeed)
        this.bullets.fireBullet(this.red.body.center.x, this.red.body.center.y, this.shipVelocityPlusSpeed)
    }
}

export default PlayScene;