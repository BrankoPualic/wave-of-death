import { Canvas } from '../canvas.js';
import { Player } from '../entities/player.js';
import { Zombie } from '../entities/zombies/zombie.js';

export class SandboxGameObrad {
  private _lastTime: number = 0; // in miliseconds

  private _player: Player;
  private _zombies: Zombie[] = [];

  constructor(
    private ctx: CanvasRenderingContext2D,
    private canvas: Canvas,
  ) {
    this._player = new Player(0, 0);
    this._player.load(canvas);

    this._zombies.push(
      new Zombie(900, 50),
      new Zombie(100, 100),
    );
    this._zombies.forEach(zombie => zombie.load(canvas));
  }

  start() {
    console.log('sandbox started');
    requestAnimationFrame(this.loop);
  }

  loop = (currentTime: number) => {
    const deltaTime = (currentTime - this._lastTime) / 1000 // both times are in miliseconds, and we want seconds
    this._lastTime = currentTime;

    this.canvas.clear();
    this.canvas.load();

    this._player.update();
    this._player.draw(this.ctx);

    this._zombies.forEach(zombie => {
      if (zombie.isAlive()) {
        zombie.update(this.ctx, this._player);
        zombie.draw(this.ctx);
        zombie.loseHP(deltaTime);
      }
    })
    
    requestAnimationFrame(this.loop);
  };
}
