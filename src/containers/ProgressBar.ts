import Phaser from "phaser";
import {gameObjectCreator} from "../helpers/gameObjectCreator";
import {progressBarLayout, progressLayout} from "../layouts/gameLayout";
import {GAME_SCENE} from "../constants/gameContants";

export default class ProgressBar extends Phaser.GameObjects.Container {
    private progress!: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        this.createGameObjects();
    }

    public createGameObjects(): void {
        gameObjectCreator.img(this.scene, progressBarLayout);
        this.progress = gameObjectCreator.graphics(this.scene, progressLayout);
    }

    public setProgress(scene: Phaser.Scene, score: number): void {
        this.progress.clear();
        this.progress.fillRoundedRect(GAME_SCENE.width / 2 - 128, 59, score, 23, 8);
    }

    public returnProgressToDefault(): void {
        this.progress.clear();
    }
}