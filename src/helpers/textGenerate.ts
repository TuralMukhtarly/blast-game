import {CONGRATULATIONS_TEXT, GAME_OVER_TEXT, LOSE_TEXT, WIN_TEXT} from "../constants/textsConstants";

export const generateText = (text: string): any => {
    if (text === WIN_TEXT) return alert(CONGRATULATIONS_TEXT);
    if (text === LOSE_TEXT) return alert(GAME_OVER_TEXT);
}