import Phaser from 'phaser';
import {AssetsLoader} from "../assetsLoader/AssetsLoader";
import {MAIN_SCENE, PRELOAD_SCENE} from "../constants/gameContants";
import {IMAGES} from "../constants/imagesConstants";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super(PRELOAD_SCENE)
    }

    preload() {
        AssetsLoader.load(this, IMAGES);
        this.load.on('complete', this.complete, this);
    }

    private complete() {
        this.game.scene.start(MAIN_SCENE);
    }
}
