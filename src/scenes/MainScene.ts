import Phaser from 'phaser';
import {MAIN_SCENE} from "../constants/gameContants";
import GameField from "../containers/GameField";
import {gameFieldBackgroundLayout} from "../layouts/gameLayout";

export default class MainScene extends Phaser.Scene {
    private gameField!: Phaser.GameObjects.Container;

    constructor() {
        super(MAIN_SCENE)
    }

    preload() {
        this.add.group(gameFieldBackgroundLayout);
    }

    create() {
        this.add.existing((this.gameField = new GameField(this)));
    }
}
