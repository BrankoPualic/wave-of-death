import { isColliding } from '../functions.js';
import { IEntityBox } from '../interfaces/entity-box-interface.js';
import { IPosition } from '../interfaces/position-interface.js';

export class Zombie {
  x = 900;
  y = 50;
  readonly width = 50;
  readonly height = 50;
  readonly speed = 2;

  constructor() {}

  moveTo(position: IPosition, walls: IEntityBox[]) {
    // distance from target poistion and entity
    const dx = position.x - this.x;
    const dy = position.y - this.y;

    // vector
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= 1) return; // this is to prevent the bug for division by zero, also jitter

    // Predict next position
    const nextX = this.x + (dx / distance) * this.speed;
    const nextY = this.y + (dy / distance) * this.speed;

    const nextRect = {
      x: nextX,
      y: nextY,
      width: this.width,
      height: this.height,
    } as IEntityBox;

    for (const wall of walls) {
      console.log(isColliding(nextRect, wall));
      if (isColliding(nextRect, wall)) return;
    }

    this.x = nextX;
    this.y = nextY;
  }
}
