import {BOMB, BONUS, FIELD_BACKGROUND, MAX_POINT, POINT, PROGRESS_BAR} from "../constants/imagesConstants";
import {GAME_SCENE} from "../constants/gameContants";
import {GraphicsDescription, ImgDescription, TextDescription} from "../interfaces/Interfaces";

export const gameFieldBackgroundLayout: Phaser.Types.GameObjects.Group.GroupCreateConfig = {
    key: FIELD_BACKGROUND.key,
    setXY: {x: GAME_SCENE.width / 4 + 25, y: GAME_SCENE.height / 2 + 50},
    setScale: {x: 1.02, y: 1.03}
}

export const progressBarLayout: ImgDescription = {
    x: GAME_SCENE.width / 2 + 50,
    y: 50,
    key: PROGRESS_BAR.key
}

export const progressLayout: GraphicsDescription = {
    color: 0x08BF08,
    alpha: 1,
}

export const bonusLayout: ImgDescription = {
    x: GAME_SCENE.width / 2 - 25,
    y: GAME_SCENE.height / 2 + 40,
    key: BONUS.key
}

export const bonusTextLayout: TextDescription = {
    x: GAME_SCENE.width / 2 - 60,
    y: GAME_SCENE.height / 2 + 62,
    text: '1',
    style: {
        fontSize: '45px',
        fill: '#fff',
        align: "center"
    }
}

export const bombBonusLayout: ImgDescription = {
    x: GAME_SCENE.width / 2 - 25,
    y: GAME_SCENE.height / 2 + 5,
    key: BOMB.key
}

export const pointLayout: ImgDescription = {
    x: GAME_SCENE.width / 2 + 525,
    y: GAME_SCENE.height - 400,
    key: POINT.key
}

export const pointTextLayout: TextDescription = {
    x: GAME_SCENE.width / 5 * 4 - 80,
    y: GAME_SCENE.height / 2 + 100,
    text: '',
    style: {
        fontSize: '45px',
        fill: '#fff',
        align: "center"
    }
}

export const movePointLayout: TextDescription = {
    x: GAME_SCENE.width / 5 * 4 - 65,
    y: GAME_SCENE.height / 2 - 10,
    text: '5',
    style: {
        fontSize: '45px',
        fill: '#fff',
        align: 'center'
    }
}

export const maskLayout: GraphicsDescription = {
    color: 0x4488AA,
    alpha: 1
}

export const maxPointLayout: ImgDescription = {
    x: GAME_SCENE.width / 2 + 500,
    y: 70,
    key: MAX_POINT.key
}