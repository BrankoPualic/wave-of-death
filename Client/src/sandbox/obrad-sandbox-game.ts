import { Canvas } from '../canvas.js';
import { Player } from '../entities/player.js';
import { Zombie } from '../entities/zombies/zombie.js';

export class SandboxGameObrad {
  private _lastTime: number = 0; // in miliseconds

  private _player: Player = new Player(0, 0);
  private _zombies: Zombie[] = [];

  isGameOver = false;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private canvas: Canvas,
  ) {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.isGameOver && e.code === 'Backspace') {
        this.init(this.canvas);
        requestAnimationFrame(this.loop);
      }
    });

    this.init(canvas);
  }

  start() {
    console.log('sandbox started');

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
    } else {
      this.isGameOver = true;
    }

    this._zombies.forEach((zombie) => {
      if (zombie.isAlive()) {
        zombie.update(this.ctx, this._player, deltaTime);
        zombie.draw(this.ctx);
        // zombie.loseHP(deltaTime);
      }
    });

    requestAnimationFrame(this.loop);
  };

  init(canvas: Canvas) {
    this._player = new Player(0, 0);
    this._player.load(canvas);

    this._zombies = [
      new Zombie(900, 50),
      new Zombie(100, 100),
      new Zombie(10, 700),
      new Zombie(200, 0),
    ];
    this._zombies.forEach((zombie) => zombie.load(canvas));

    this.isGameOver = false;
  }
}
