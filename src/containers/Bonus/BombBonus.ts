import Phaser from "phaser";
import {BonusFeature} from "./BonusFeature";
import {gameObjectCreator} from "../../helpers/gameObjectCreator";
import {bombBonusLayout, bonusLayout, bonusTextLayout} from "../../layouts/gameLayout";
import eventEmitter, {LOSE_EVENT, WIN_EVENT} from "../../helpers/eventEmitter";
import {generateText} from "../../helpers/textGenerate";
import {LOSE_TEXT, WIN_TEXT} from "../../constants/textsConstants";

export default class BombBonus extends BonusFeature {
    public bombState: boolean = false;
    public usedBonus: boolean = false;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.createBonus();
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.bonus.on('pointerdown', this.activatedBombBonus, this)
        eventEmitter.on(LOSE_EVENT, () => generateText(LOSE_TEXT))
        eventEmitter.on(WIN_EVENT, () => generateText(WIN_TEXT))
    }

    public createBonus(): void {
        this.bonus = gameObjectCreator.img(this.scene, bonusLayout).setInteractive();
        this.text = gameObjectCreator.text(this.scene, bonusTextLayout);
        gameObjectCreator.img(this.scene, bombBonusLayout)
    }

    public setText(text: string): void {
        this.text.setText(text);
    }

    public getText(): string {
        return this.text.text;
    }

    public getBonus(): Phaser.GameObjects.Image {
        return this.bonus;
    }

    public activatedBombBonus(): void {
        this.bombState = !this.bombState;
        if (!this.usedBonus) {
            if (this.bombState) {
                this.bonus.setAlpha(0.5);
                this.setText('0');
            }
            if (!this.bombState) {
                this.getBonus().setAlpha(1);
                this.setText('1');
            }
        }
    }

    public returnBombToDefault(): void {
        this.bonus.setAlpha(1);
        this.setText('1');
        this.usedBonus = false;
        this.getBonus().setInteractive();
    }
}