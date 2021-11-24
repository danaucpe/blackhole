import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {

    constructor(key, config) {
        super(key);
        this.config = config
        this.screenCenter = [config.width / 2, config.height / 2];
        this.fontSize = 34;
        this.lineHeight = 42;
        this.fontOptions = {fontSize: `${this.fontSize}px`, fill: '#fff'}
    }

    create() {
        this.stars = this.add.image(0, 0, 'stars').setOrigin(0);
        this.stars.displayHeight = this.config.height;
        this.stars.displayWidth = this.config.width;

        if (this.config.canGoBack) {
            const backButton = this.add.image(this.config.width - 10, this.config.height -10, 'back')
            .setInteractive()
            .setScale(2)
            .setOrigin(1)

            backButton.on('pointerup', () => {
                this.scene.start('MenuScene');
            })
        }
    }

    createMenu(menu, setupMenuEvents) {
        let lastMenuPositionY = 0;

        menu.forEach (menuItem => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY]
            menuItem.textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions)
                .setInteractive()
                .setOrigin(0.5, 1);
            lastMenuPositionY += this.lineHeight;
            setupMenuEvents(menuItem)
        })
    }
}

export default BaseScene;