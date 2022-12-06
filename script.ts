import Phaser from 'phaser'
import MainScene from "./src/scenes/MainScene";
import PreloadScene from "./src/scenes/PreloadScene";
import {GAME_SCENE} from "./src/constants/gameContants";

const config = {
    type: Phaser.AUTO,
    width: GAME_SCENE.width,
    height: GAME_SCENE.height,
    backgroundColor: '#4488aa',
    scene: [PreloadScene, MainScene]
}

export default new Phaser.Game(config)
