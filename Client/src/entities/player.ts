import { Canvas } from '../canvas.js';
import { IPosition } from '../common/position.js';
import { Entity } from './entity.js';

export class Player extends Entity {
  private _speed = 10;
  private readonly _imgSrc = 'assets/player.png';
  private _image?: HTMLImageElement;

  private _canvas?: Canvas;

  constructor(x?: number, y?: number, width?: number, height?: number) {
    super(x, y, width, height);
  }

  load(canvas: Canvas): void {
    this._canvas = canvas;

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
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      this.handleKeydown(e, player);
    });
  }

  moveTo(position: IPosition): void {
    this.x += position.x;
    this.y += position.y;

    this.moveAnimation();
  }

  moveAnimation() {
    if (!this._canvas) throw new Error('Canvas not loaded.');

    this._canvas.clear();

    this._canvas.load();
    this._canvas
      .getContext()
      .drawImage(this._image!, this.x, this.y, this.width, this.height);
  }

  handleKeydown(e: KeyboardEvent, player: Player): void {
    switch (e.code) {
      case 'KeyW':
        player.y -= this._speed;
        break;
      case 'KeyS':
        player.y += this._speed;
        break;
      case 'KeyA':
        player.x -= this._speed;
        break;
      case 'KeyD':
        player.x += this._speed;
        break;
      default:
        break;
    }

    player.moveAnimation();
  }
}
