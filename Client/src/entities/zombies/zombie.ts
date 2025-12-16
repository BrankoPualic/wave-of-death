import { Canvas } from '../../canvas.js';
import { drawHitbox, isColliding } from '../../common/functions.js';
import { Entity } from '../entity.js';
import { Player } from '../player.js';

export class Zombie extends Entity {
  private readonly _imgSrc = 'assets/mvp-normal-zombie.png';
  private _image?: HTMLImageElement;
  private _speed = 100; // units per second
  private _HP = 100;
  private _DMG = 20;
  private _attackRange = 35;

  private _attackTimer = 0;
  private _attackSpeed = 1; // attacks per second
  private readonly _MIN_ATTACK_INTERVAL = 0.5; // seconds

  private _walls: Entity[] = [new Entity(800, 150, 25, 100)];

  constructor(x: number, y: number) {
    super(x, y);
    this._speed = Math.random() * (300 - 100) + 100;
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

  update(ctx: CanvasRenderingContext2D, player: Player, deltaTime: number) {
    ctx.fillStyle = 'red';
    ctx.fillRect(
      this._walls[0].x,
      this._walls[0].y,
      this._walls[0].width,
      this._walls[0].height,
    );

    // hitbox
    drawHitbox(ctx, this);

    if (!player.isAlive()) return;

    // distance from target poistion and entity
    const dx = player.x - this.x;
    const dy = player.y - this.y;

    // vector
    const distance = Math.hypot(dx, dy);

    if (distance < 1) return; // this is to prevent the bug for division by zero, also jitter

    if (distance > this._attackRange) {
      const dirX = dx / distance;
      const dirY = dy / distance;
      this.move(dirX, dirY, deltaTime, this._walls);
    } else {
      this.stopAndAttack(deltaTime, player);
    }
  }

  move(dirX: number, dirY: number, deltaTime: number, walls: Entity[]) {
    // TRY X MOVE
    const nextX = this.x + dirX * this._speed * deltaTime;

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
    const nextY = this.y + dirY * this._speed * deltaTime;

    const yRect = new Entity(this.x, nextY, this.width, this.height);

    for (const wall of walls) {
      if (isColliding(yRect, wall)) {
        return;
      }
    }

    this.y = nextY;
  }

  stopAndAttack(deltaTime: number, player: Player) {
    this._attackTimer += deltaTime;

    if (this._attackTimer >= this.attackInterval) {
      // if attack interval is 1 second, the player will take dmg only once a second
      player.takeDamage(this._DMG);
      this._attackTimer = 0;
    }
  }

  loseHP(deltaTime: number) {
    this._HP -= 20 * deltaTime; // 20 hp per second
  }

  isAlive = () => this._HP > 0;

  private get attackInterval() {
    const interval = 1 / this._attackSpeed;
    return Math.max(interval, this._MIN_ATTACK_INTERVAL);
  }
}
