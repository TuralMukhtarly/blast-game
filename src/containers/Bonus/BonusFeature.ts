import Phaser from "phaser";

export abstract class BonusFeature extends Phaser.GameObjects.Container {

    protected bonus!: Phaser.GameObjects.Image;

    protected text!: Phaser.GameObjects.Text;

    protected constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);
    }

    abstract createBonus(): void;

    abstract setText(text: string): void;
}