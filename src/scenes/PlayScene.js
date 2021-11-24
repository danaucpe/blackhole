import BaseScene from './BaseScene';

const VELOCITY = 200;

class PlayScene extends BaseScene {

    constructor(config) {
        super('PlayScene', config);
        this.red = null;
        this.blue = null;

        this.thrustVelocity = 100;
        this.isPaused = false;
    }

    create() {
        super.create();
        this.createRed();
        this.createBlue();
        this.createColliders();
        this.handleInputs();
    }

    update() {
            this.checkGameStatus()
    }

    createRed() {
        this.red = this.physics.add.sprite(this.config.redStartPosition.x, this.config.redStartPosition.y, 'red')
            .setOrigin(.5,.5)
            .setScale(2)
        this.red.setCollideWorldBounds(true)
        this.red.rotation = 1.5807
    }

    createBlue() {
        this.blue = this.physics.add.sprite(this.config.blueStartPosition.x, this.config.blueStartPosition.y, 'blue')
            .setOrigin(.5,.5)
            .setScale(2)
        this.blue.setCollideWorldBounds(true)
        this.blue.rotation = 1.5807 * 3
    }

    createColliders() {
        this.physics.add.collider(this.red, this.blue, this.gameOver, null, this);
    }

    handleInputs() {       
        this.input.keyboard.on('keydown_W', this.thrustRed, this);
    }
    
    checkGameStatus() {
        if (this.red.body.x >= this.config.width - this.red.width) {
            this.red.body.velocity.x = -VELOCITY;
          }
        
          if (this.red.body.x <= 0) {
            this.red.body.velocity.x = VELOCITY;
          }
        
          //if (this.red.getBounds().bottom >= this.config.height || this.red.body.y <= 0) {
          //  this.gameOver();
          //}
    }

    gameOver() {
        if (!this.gameOverFlag) {
            this.gameOverFlag = true;
            this.physics.pause();
        }
    }

    thrustRed() {
        this.red.body.velocity.x += this.thrustVelocity;
    }
}

export default PlayScene;