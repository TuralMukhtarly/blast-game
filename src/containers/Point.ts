import Phaser from "phaser";
import eventEmitter, {LOSE_EVENT, WIN_EVENT} from "../helpers/eventEmitter";
import {gameObjectCreator} from "../helpers/gameObjectCreator";
import {movePointLayout, pointLayout, pointTextLayout} from "../layouts/gameLayout";

export default class Point extends Phaser.GameObjects.Container {
    public score!: Phaser.GameObjects.Text;
    public move!: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        this.createGameObjects();
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        eventEmitter.on(LOSE_EVENT, () => this.returnPointsAndMoveToDefault);
        eventEmitter.on(WIN_EVENT, () => this.returnPointsAndMoveToDefault);
    }

    public createGameObjects(): void {
        gameObjectCreator.img(this.scene, pointLayout);
        this.score = gameObjectCreator.text(this.scene, pointTextLayout);
        this.move = gameObjectCreator.text(this.scene, movePointLayout);
    }

    public setScoreAndMove(score, move): void {
        this.score.setText(score);
        this.move.setText(move);
    }

    public returnPointsAndMoveToDefault(): void {
        this.score.setText('');
        this.move.setText('5');
    }
}