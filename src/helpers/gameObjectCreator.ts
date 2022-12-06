import Phaser from "phaser";
import {GraphicsDescription, ImgDescription, SpriteDescription, TextDescription} from "../interfaces/Interfaces";

export interface CreatorInterface {
    sprite: (scene: Phaser.Scene, layout: SpriteDescription) => Phaser.GameObjects.Sprite;
    text: (scene: Phaser.Scene, layout: TextDescription) => Phaser.GameObjects.Text;
    img: (scene: Phaser.Scene, layout: ImgDescription) => Phaser.GameObjects.Image;
    graphics: (scene: Phaser.Scene, layout: GraphicsDescription) => Phaser.GameObjects.Graphics;
}

export default class GameObjectCreator implements CreatorInterface {

    public sprite(scene: Phaser.Scene, layout: SpriteDescription): Phaser.GameObjects.Sprite {
        return scene.add.sprite(layout.x, layout.y, layout.key);
    }

    public img(scene: Phaser.Scene, layout: ImgDescription): Phaser.GameObjects.Image {
        return scene.add.image(layout.x, layout.y, layout.key);
    }

    public text(scene: Phaser.Scene, layout: TextDescription): Phaser.GameObjects.Text {
        return scene.add.text(layout.x, layout.y, layout.text, layout.style);
    }

    public graphics(scene: Phaser.Scene, layout: GraphicsDescription): Phaser.GameObjects.Graphics {
        return scene.add.graphics().fillStyle(layout.color, layout.alpha);
    }
}

export const gameObjectCreator = new GameObjectCreator();