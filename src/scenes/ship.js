class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.setInteractive();
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.up.isDown) {    
            this.physics.velocityFromRotation(this.red.rotation - 1.5807, 150, this.red.body.acceleration);
          } else {
            this.red.setAcceleration(0);
          }
          
          if (this.cursors.left.isDown) {
            this.red.setAngularVelocity(-300);
          } else if (this.cursors.right.isDown) {
            this.red.setAngularVelocity(300);
          } else {
             this.red.setAngularVelocity(0);
          }
    }

}
