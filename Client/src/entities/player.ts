import { Canvas } from '../canvas.js';
import { Entity } from './entity.js';

export class Player extends Entity {
  private _speed = 5;
  private readonly _imgSrc = 'assets/player.png';
  private _image?: HTMLImageElement;

  private _keys = new Set<string>();
  private _facing: 'left' | 'right' = 'right';

  constructor(x?: number, y?: number, width?: number, height?: number) {
    super(x, y, width, height);
  }

  load(canvas: Canvas): void {
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height / 2 - this.height / 2;

    this._image = new Image();
    this._image.src = this._imgSrc;
    this._image.addEventListener('load', () => {
      canvas
        .getContext()
        .drawImage(this._image!, this.x, this.y, this.width, this.height);
    });

    const player = this as Player;
    document.addEventListener('keydown', (e: KeyboardEvent) =>
      this.handleKeydown(e, player),
    );
    document.addEventListener('keyup', (e: KeyboardEvent) =>
      this.handleKeyup(e, player),
    );
  }

  handleKeydown(e: KeyboardEvent, player: Player): void {
    player._keys.add(e.code);
  }

  handleKeyup(e: KeyboardEvent, player: Player): void {
    player._keys.delete(e.code);
  }

  update(): void {
    let vx = 0;
    let vy = 0;

    if (this._keys.has('KeyW')) vy -= 1;
    if (this._keys.has('KeyS')) vy += 1;
    if (this._keys.has('KeyA')) vx -= 1;
    if (this._keys.has('KeyD')) vx += 1;

    // Diagonal movement
    if (vx !== 0 && vy !== 0) {
      const inv = 1 / Math.sqrt(2);
      vx *= inv;
      vy *= inv;
    }

    if (vx < 0) this._facing = 'left';
    else if (vx > 0) this._facing = 'right';

    this.x += vx * this._speed;
    this.y += vy * this._speed;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this._image) return;

    ctx.save();

    if (this._facing === 'left') {
      ctx.translate(this.x + this.width, this.y);
      ctx.scale(-1, 1);
      ctx.drawImage(this._image, 0, 0, this.width, this.height);
    } else {
      ctx.drawImage(this._image, this.x, this.y, this.width, this.height);
    }

    ctx.restore();
  }
}
