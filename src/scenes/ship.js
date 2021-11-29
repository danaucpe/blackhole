import Phaser from 'phaser';

class Ship extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y, config)
    {
        super(scene, x, y, 'blaster1');
        this.config = config;
    }

    fire (x, y, velVector)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocity(velVector);
    }

    preUpdate (time, delta)
    {
        //super.preUpdate(time, delta);
        if (this.x >= this.config.width || this.x < 0 || this.y >= this.config.height || this.y < 0)
        {
            debugger
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

export default Ship;