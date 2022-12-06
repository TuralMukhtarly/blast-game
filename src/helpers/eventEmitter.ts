import Phaser from 'phaser';

export const WIN_EVENT = 'congratulations';
export const LOSE_EVENT = 'game_over';

const eventEmitter = new Phaser.Events.EventEmitter();

export default eventEmitter;
