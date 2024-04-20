import { Scene } from 'phaser';

export class Attack extends Scene
{
    constructor ()
    {
        super('Attack');
    }

    create ()
    {
        //  This is the Attack Scene
        //  It is called after the Game Scene and is used to display the results of the attack
        this.add.image(512, 384, 'gameBG');
        this.add.text(512, 384, 'Attack Scene', { color: '#000000', fontSize: '48px' }).setOrigin(0.5);
    }
}