import { Canvas } from './canvas';
import { Player } from './entities/player';
import { Zombie } from './entities/zombies/zombie';

export class Game {
  private _lastTime: number = 0; // in milliseconds

  private _player!: Player;
  private _zombies: Zombie[] = [];

  constructor(
    private canvas: Canvas,
    private ctx: CanvasRenderingContext2D,
  ) {
    this.init();
  }

  init(): void {
    this.loadPlayer();
    this.loadZombies();
  }

  start() {
    console.log('game started');

    this._lastTime = performance.now();

    requestAnimationFrame(this.loop);
  }

  loop = (currentTime: number) => {
    // delta time = the amount of real time that passed between two frames
    const deltaTime = (currentTime - this._lastTime) / 1000; // both times are in miliseconds, and we want seconds
    this._lastTime = currentTime;

    this.canvas.clear();
    this.canvas.load();

    if (this._player.isAlive()) {
      this._player.update(deltaTime);
      this._player.draw(this.ctx);
    }

    this._zombies.forEach((zombie) => {
      if (zombie.isAlive()) {
        zombie.update(this.ctx, this._player, deltaTime);
        zombie.draw(this.ctx);
      }
    });

    requestAnimationFrame(this.loop);
  };

  // --- PRIVATE ---

  private loadPlayer(): void {
    this._player = new Player(0, 0);
    this._player.load(this.canvas);
  }

  private loadZombies(): void {
    this._zombies.push(new Zombie(900, 50), new Zombie(100, 100));
    this._zombies.forEach((zombie) => zombie.load(this.canvas));
  }
}
