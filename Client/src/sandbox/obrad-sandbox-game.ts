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
    }

    this._zombies.forEach((zombie) => {
      if (zombie.isAlive()) {
        zombie.update(this.ctx, this._player, deltaTime);
        zombie.draw(this.ctx);
        // zombie.loseHP(deltaTime);
      }
    });

    if (!this._player.isAlive()) {
      this.isGameOver = true;
      this.gameOverMessage(currentTime);
    }

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

  gameOverMessage(currentTime: number) {
    this.ctx.fillStyle = 'rgba(114, 114, 114, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save(); // save the current context state

    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.ctx.font = '24px Arial sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("Click 'Backspace' button to restart the game!", 0, this.canvas.height / 2 - 50);

    // pulsating effect
    const scale = 1 + 0.1 * Math.sin(currentTime / 300); // 0.9 - 1.1 scale
    this.ctx.scale(scale, scale);

    // shadow
    this.ctx.shadowColor = 'black';
    this.ctx.shadowBlur = 10;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    this.ctx.font = 'bold 78px Arial sans-serif';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('GAME OVER', 0, 0);

    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 2;
    this.ctx.strokeText('GAME OVER', 0, 0);

    this.ctx.restore(); // restor the context (remove the styles and updates for other text that comes after this "game over")
  }
}
