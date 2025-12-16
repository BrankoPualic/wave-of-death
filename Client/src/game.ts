import { Canvas } from './canvas';
import { Player } from './entities/player';
import { Zombie } from './entities/zombies/zombie';

export class Game {
  private _lastTime: number = 0;

  constructor(
    private canvas: Canvas,
    private ctx: CanvasRenderingContext2D,
    private player: Player,
    private zombie: Zombie,
  ) {}

  start() {
    console.log('game started');

    this._lastTime = performance.now();

    requestAnimationFrame(this.loop);
  }

  loop = (currentTime: number) => {
    const deltaTime = (currentTime - this._lastTime) / 1000;
    this._lastTime = currentTime;

    this.canvas.clear();
    this.canvas.load();
    this.player.update(deltaTime);
    this.player.draw(this.ctx);

    if (this.zombie.isAlive()) {
      this.zombie.update(this.ctx, this.player, deltaTime);
      this.zombie.draw(this.ctx);
      // this.zombie.loseHP(deltaTime);
    }

    requestAnimationFrame(this.loop);
  };
}
