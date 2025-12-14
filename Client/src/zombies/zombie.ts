export class Zombie {
  x = 50;
  y = 50;
  readonly width = 50;
  readonly height = 50;
  readonly speed = 2;

  constructor() {}

  moveTo(position: IPosition) {
    // distance from target poistion and entity
    const dx = position.x - this.x;
    const dy = position.y - this.y;

    // vector
    const distance = Math.sqrt(dx * dx + dy * dy);

    // this is to prevent the bug for division by zero, also jitter
    if (distance > 1) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    }
  }
}

export interface IPosition {
  x: number;
  y: number;
}
