import BaseScene from './BaseScene';

class MenuScene extends BaseScene {

    constructor(config) {
        super('MenuScene', config);

        this.menu = [
            {scene: 'PlayScene', text: 'Play'},
            {scene: null, text: 'Exit'},
        ]
        this.music = null;
    }

    create() {
        super.create();
        this.createMenu(this.menu, this.setupMenuEvents.bind(this));
        this.music = this.sound.add('backgroundMusic');
        this.music.loop = true;
        this.music.play();
        this.music.volume = .1;
    }

    setupMenuEvents(menuItem) {
        const textGO = menuItem.textGO;

        textGO.setInteractive();
        textGO.on('pointerover', () => {
            textGO.setStyle({fill: '#ff0'});
        })

        textGO.on('pointerout', () => {
            textGO.setStyle({fill: '#fff'});
        })

        textGO.on('pointerup', () => {
            menuItem.scene && this.scene.start(menuItem.scene)

            if (menuItem.text == 'Exit') {
                this.game.destroy(true);
            }
        })
    }
}

export default MenuScene;