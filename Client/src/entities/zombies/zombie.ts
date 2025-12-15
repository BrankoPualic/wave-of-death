import { Canvas } from '../../canvas.js';
import { drawHitbox, isColliding } from '../../common/functions.js';
import { Entity } from '../entity.js';
import { Player } from '../player.js';
import { IPosition } from '../../interfaces/position-interface.js';

export class Zombie extends Entity {
  private readonly _speed = 2;
  private readonly _imgSrc = 'assets/mvp-normal-zombie.png';
  private _image?: HTMLImageElement;
  private _HP = 100;
  private _DMG = 5;

  private _walls: Entity[] = [new Entity(800, 150, 25, 100)];

  constructor(x: number, y: number) {
    super(x, y);
  }

  load(canvas: Canvas) {
    this._image = new Image();
    this._image.src = this._imgSrc;
    this._image.addEventListener('load', () => {
      canvas
        .getContext()
        .drawImage(this._image!, this.x, this.y, this.width, this.height);
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this._image) return;

    if (this._HP <= 0) return;

    ctx.drawImage(this._image!, this.x, this.y, this.width, this.height);
  }

  update(ctx: CanvasRenderingContext2D, player: Player) {
    ctx.fillStyle = 'red';
    for (const wall of this._walls)
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

    // hitbox
    drawHitbox(ctx, this);

    this.moveTo(
      {
        x: player.x,
        y: player.y,
      } as IPosition,
      this._walls,
    );
  }

  moveTo(target: IPosition, walls: Entity[]) {
    // distance from target poistion and entity
    const dx = target.x - this.x;
    const dy = target.y - this.y;

    // vector
    const distance = Math.hypot(dx, dy);

    if (distance < 1) return; // this is to prevent the bug for division by zero, also jitter

    const dirX = dx / distance;
    const dirY = dy / distance;

    // TRY X MOVE
    const nextX = this.x + dirX * this._speed;

    const xRect = new Entity(nextX, this.y, this.width, this.height);

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
    const nextY = this.y + dirY * this._speed;

    const yRect = new Entity(this.x, nextY, this.width, this.height);

    for (const wall of walls) {
      if (isColliding(yRect, wall)) {
        return;
      }
    }

    this.y = nextY;
  }

  loseHP(deltaTime: number) {
    this._HP -= 20 * deltaTime; // 20 hp per second
  }

  isAlive = () => this._HP > 0;
}
