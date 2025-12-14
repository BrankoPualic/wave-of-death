import { isColliding } from '../functions.js';
import { IEntityBox } from '../interfaces/entity-box-interface.js';
import { IPosition } from '../interfaces/position-interface.js';

export class Zombie {
  x = 900;
  y = 50;
  readonly width = 50;
  readonly height = 50;
  readonly speed = 4;

  constructor() {}

  moveTo(target: IPosition, walls: IEntityBox[]) {
    // distance from target poistion and entity
    const dx = target.x - this.x;
    const dy = target.y - this.y;

    // vector
    const distance = Math.hypot(dx, dy);

    if (distance < 1.5) return; // this is to prevent the bug for division by zero, also jitter

    const dirX = dx / distance;
    const dirY = dy / distance;

    // TRY X MOVE
    const nextX = this.x + dirX * this.speed;

    const xRect: IEntityBox = {
      x: nextX,
      y: this.y,
      width: this.width,
      height: this.height,
    };

    let xBlocked = false;
    for (const wall of walls) {
      if (isColliding(xRect, wall)) {
        xBlocked = true;
        break;
      }
    }

    if (!xBlocked) {
      this.x = nextX;
    }

    // TRY Y MOVE
    const nextY = this.y + dirY * this.speed;

    const yRect: IEntityBox = {
      x: this.x,
      y: nextY,
      width: this.width,
      height: this.height,
    };

    for (const wall of walls) {
      if (isColliding(yRect, wall)) {
        return;
      }
    }

    this.y = nextY;
  }
}
