import * as Phaser from "phaser";
import {ImagesInterfaces} from "../interfaces/Interfaces";
import {ALL_SPRITES} from "../constants/imagesConstants";

export class AssetsLoader {
    public static load(scene: Phaser.Scene, images: Array<ImagesInterfaces>) {
        for (let i = 0; i < images.length; i++) {
            scene.load?.image(images[i]?.key, images[i]?.url);
        }

        scene.load.spritesheet(ALL_SPRITES.key, ALL_SPRITES.url, {
            frameWidth: 62.2,
            frameHeight: 71
        });
    }
}