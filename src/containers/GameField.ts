import Phaser from "phaser";
import Engine from "../engine/Engine";
import Point from "./Point";
import ProgressBar from "./ProgressBar";
import {GAME_PARAMS, WIN} from "../constants/gameContants";
import BombBonus from "./Bonus/BombBonus";
import eventEmitter, {LOSE_EVENT, WIN_EVENT} from "../helpers/eventEmitter";
import {gameObjectCreator} from "../helpers/gameObjectCreator";
import {maskLayout, maxPointLayout} from "../layouts/gameLayout";
import {ALL_SPRITES} from "../constants/imagesConstants";

export default class GameField extends Phaser.GameObjects.Container {
    private point!: Point;
    private progressBar!: ProgressBar;
    private bombBonus!: BombBonus;
    private gameEngine: Engine;

    private poolArray: any;
    private flag: boolean;
    private score: number = 0;
    private move: number = 5;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);

        this.createGameObjects(scene);

        this.gameEngine = new Engine(GAME_PARAMS);

        this.createGameField();
        this.flag = true;

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        this.scene.input.on("pointerdown", this.cubeChoice, this);
    }

    private createGameObjects(scene: Phaser.Scene): void {
        this.add((this.point = new Point(scene)));
        this.add((this.progressBar = new ProgressBar(scene)));
        this.add((this.bombBonus = new BombBonus(scene)));
        gameObjectCreator.img(this.scene, maxPointLayout);
        const mask: Phaser.GameObjects.Graphics = gameObjectCreator.graphics(scene, maskLayout);
        mask.fillRoundedRect(200, 0, 600, 160, 8);
        this.add(mask);
    }


    private createGameField(): void {
        this.gameEngine.createGameMatrix();
        this.poolArray = [];
        for (let i = 0; i < this.gameEngine.rows; i++) {
            for (let j = 0; j < this.gameEngine.columns; j++) {
                let x = GAME_PARAMS.offset.x + GAME_PARAMS.width * j + GAME_PARAMS.width / 2;
                let y = GAME_PARAMS.offset.y + GAME_PARAMS.height * i + GAME_PARAMS.height / 2;
                this.gameEngine.setImage(i, j, this.scene.add.image(x, y, ALL_SPRITES.key, this.gameEngine.getValue(i, j)));
            }
        }
    }

    private setPoints(count: number): void {
        if (count < 3) {
            this.score += 10 * count;
        } else if (count >= 3 && count < 5) {
            this.score += 20 * count;
        } else if (count >= 5) {
            this.score += 30 * count;
        }
    }

    private cubeChoice(currentCube): void {
        let row = Math.floor((currentCube.y - GAME_PARAMS.offset.y) / GAME_PARAMS.height);
        let col = Math.floor((currentCube.x - GAME_PARAMS.offset.x) / GAME_PARAMS.width);
        if (this.flag && !this.bombBonus.bombState) {
            if (this.gameEngine.checkCubeInField(row, col)) {
                if (this.gameEngine.returnSimilarCubeCount(row, col) > 1) {
                    this.flag = false;
                    const needToDeleteCube: any = this.gameEngine.returnSimilarCube(row, col);
                    let deleted = 0;
                    for (let i = 0; i < needToDeleteCube.length; i++) {
                        deleted++;
                        this.poolArray.push(this.gameEngine.getImage(needToDeleteCube[i].row, needToDeleteCube[i].column));
                        this.scene.tweens.add({
                            targets: this.gameEngine.getImage(needToDeleteCube[i].row, needToDeleteCube[i].column),
                            alpha: 0,
                            duration: GAME_PARAMS.duration * 2,
                            callbackScope: this,
                            onComplete: () => {
                                deleted--;
                                if (deleted === 0) {
                                    this.gameEngine.deleteSimilarCube(row, col);
                                    this.bombBonus.bombState = false;
                                    this.dropCube();
                                }
                            }
                        });
                    }
                }
            }
        }
        if (this.bombBonus.bombState) {
            const needToDeleteCube: Array<{ row: number, column: number }> = this.gameEngine.getRadius({
                x: row,
                y: col
            }, 1);

            for (let i = 0; i < needToDeleteCube.length; i++) {
                this.poolArray.push(this.gameEngine.getImage(needToDeleteCube[i].row, needToDeleteCube[i].column));
                this.scene.tweens.add({
                    targets: this.gameEngine.getImage(needToDeleteCube[i].row, needToDeleteCube[i].column),
                    duration: GAME_PARAMS.duration * 2,
                    callbackScope: this,
                    onComplete: () => {
                        this.bombBonus.getBonus().removeInteractive();
                        this.flag = false;
                        this.bombBonus.bombState = false;
                        this.bombBonus.usedBonus = true;
                    }
                });
            }

            this.gameEngine.removeRadiusCubes(needToDeleteCube);
            this.dropCube();
        }
    }


    private dropCube(): void {
        let dropCube = 0;
        let dropCubes: Array<{ row: number, column: number, deltaRow: number }> = this.gameEngine.dropCube();
        let fillCells: Array<{ row: number, column: number, deltaRow: number }> = this.gameEngine.addNewCubes();
        if (this.gameEngine?.findSimilarCubeArray?.length) this.setPoints(this.gameEngine?.pointsCounter);

        for (let i = 0; i < dropCubes.length; i++) {
            dropCube++;
            this.scene.tweens.add({
                targets: this.gameEngine.getImage(dropCubes[i].row, dropCubes[i].column),
                y: this.gameEngine.getImage(dropCubes[i].row, dropCubes[i].column).y + GAME_PARAMS.height * dropCubes[i].deltaRow,
                duration: GAME_PARAMS.duration * dropCubes[i].deltaRow,
                callbackScope: this,
                onComplete: () => {
                    dropCube--;
                    if (dropCube === 0) {
                        this.flag = true;
                        this.bombBonus.usedBonus = true;
                    }
                }
            })
        }

        for (let i = 0; i < fillCells.length; i++) {
            dropCube++;
            let sprite = this.poolArray.pop();
            sprite.alpha = 1;
            sprite.y = GAME_PARAMS.offset.y + GAME_PARAMS.height * (fillCells[i].row - fillCells[i].deltaRow + 1) - GAME_PARAMS.height / 2;
            sprite.x = GAME_PARAMS.offset.x + GAME_PARAMS.width * fillCells[i].column + GAME_PARAMS.width / 2;
            sprite.setFrame(this.gameEngine.getValue(fillCells[i].row, fillCells[i].column));
            this.gameEngine.setImage(fillCells[i].row, fillCells[i].column, sprite);

            this.scene.tweens.add({
                targets: sprite,
                y: GAME_PARAMS.offset.y + GAME_PARAMS.height * fillCells[i].row + GAME_PARAMS.height / 2,
                duration: GAME_PARAMS.duration * fillCells[i].deltaRow,
                callbackScope: this,
                onComplete: () => {
                    dropCube--;
                    if (dropCube === 0) {
                        this.move -= 1;
                        this.flag = true;
                        this.pointsCountResult();
                    }
                }
            });
        }
    }

    private pointsCountResult(): void {
        if (this.move >= 0) {
            this.point.setScoreAndMove(this.score, this.move);
            this.progressBar.setProgress(this.scene, this.score);
            if (this.move === 0 && this.score < WIN) {
                this.progressBar.returnProgressToDefault();
                eventEmitter.emit(LOSE_EVENT);
                this.point.returnPointsAndMoveToDefault();
                this.restartRound();
            }

            if (this.move >= 0 && this.score >= WIN) {
                this.progressBar.returnProgressToDefault();
                eventEmitter.emit(WIN_EVENT);
                this.point.returnPointsAndMoveToDefault();
                this.restartRound();
            }
        }
    }

    private restartRound(): void {
        this.score = 0;
        this.move = 5;
        this.bombBonus.returnBombToDefault();
    }
}