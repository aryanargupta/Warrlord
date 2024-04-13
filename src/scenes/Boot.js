import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/bg.png');
        this.load.image('gameScreen', 'assets/gameScreen.png');
        this.load.image('gameBG', 'assets/gameBG.png');
        this.load.image('townhall', 'assets/townhall.png');
        this.load.image('cannon', 'assets/cannon.png');
        this.load.image('clancastle', 'assets/clancastle.png');
        this.load.audio('bgm', ['assets/bgm.mp3']);
        this.load.image('mine', 'assets/mine.png');
        this.load.image('toggleButton', 'assets/soundtoggle.png');
        this.load.image('shop', 'assets/shop.png');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
