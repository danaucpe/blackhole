import Phaser from 'phaser';

class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'blaster1');
    }

    fire (x, y, velVector)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocity(velVector.x*2.5, velVector.y*2.5);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (this.x >= 1080 || this.x < 0 || this.y >= 800 || this.y < 0)
        {
            this.setActive(false);
            this.setVisible(false);
            console.log('reload')
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 10,
            key: 'blaster1',
            active: false,
            visible: false,
            classType: Bullet
        });
    }


    fireBullet (x, y, velVector)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y, velVector);
        } else {
            console.log('no bullet')
        }
    }
}

export {
    Bullets,
    Bullet
}