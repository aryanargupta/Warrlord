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
        this.load.image('gameBG', 'assets/gameBG.png');
        this.load.image('townhall', 'assets/townhall.png');
        this.load.image('cannon', 'assets/cannon.png');
        this.load.image('clancastle', 'assets/clancastle.png');
        this.load.audio('bgm', ['assets/bgm.mp3']);
        this.load.image('mine', 'assets/mine.png');
        this.load.image('toggleButton', 'assets/soundtoggle.png');
        this.load.image('shop', 'assets/shop.png');
        this.load.image('ethcoin', 'assets/ethcoin.png');
        this.load.image('border', 'assets/border.png');
        this.load.image('buttonTexture', 'assets/buttonTexture.png');
        this.load.image('cointooltip', 'assets/cointooltip.png');
        this.load.image('popupBackground', 'assets/shopBackground.png');
        this.load.image('closeButton', 'assets/closeButton.png');
        this.load.image('goldStorage', 'assets/goldStorage.png');
        this.load.image('armyCamp', 'assets/armyCamp.png');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
