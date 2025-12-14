import { Constants } from '../common/constants.js';

export class Entity {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x?: number, y?: number, width?: number, height?: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || Constants.BASE_CHARACTER_WIDTH;
    this.height = height || Constants.BASE_CHARACTER_HEIGHT;
  }
}
