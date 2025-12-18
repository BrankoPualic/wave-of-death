import { Canvas } from '../canvas.js';
import { gameOverSystem } from '../ecs/systems/game-over-system.js';
import { World } from '../ecs/world.js';
import { createObstacles } from '../entities/create-obstacles.js';
import { createPlayer } from '../entities/create-player.js';
import { createZombies } from '../entities/zombies/create-zombies.js';

// Game ONLY:
// - manages time
// - runs the loop
// - calls World
export class SandboxGameObrad {
  private _lastTime: number = 0; // in milliseconds
  private _isGameOver = false;
  private _world: World;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private canvas: Canvas,
  ) {
    this._world = new World();
    this.eventsInit(this._world);
  }

  start() {
    console.log('sandbox started');
    this.init();

    this._lastTime = performance.now();

    requestAnimationFrame(this.loop);
  }

  private loop = (currentTime: number) => {
    // delta time = the amount of real time that passed between two frames
    const deltaTime = (currentTime - this._lastTime) / 1000; // both times are in milliseconds, and we want seconds
    this._lastTime = currentTime;

    this.canvas.clear();

    this._world.update(deltaTime, this.ctx, this.canvas);
    if (!this._isGameOver) {
      if (gameOverSystem(this._world)) {
        this._isGameOver = true;
        this.drawGameOver(currentTime);
      }
    } else {
      this.drawGameOver(currentTime);
    }

    requestAnimationFrame(this.loop);
  };

  private init() {
    this._isGameOver = false;

    this._world.reset();

    createObstacles(this._world);
    const player = createPlayer(this._world, this.canvas);
    createZombies(this._world, player, 4);
  }

  private drawGameOver(currentTime: number) {
    this.ctx.fillStyle = 'rgba(114, 114, 114, 0.7)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save(); // save the current context state

    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.ctx.font = '24px Arial sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(
      "Click 'Backspace' button to restart the game!",
      0,
      this.canvas.height / 2 - 50,
    );

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

    this.ctx.restore(); // restore the context (remove the styles and updates for other text that comes after this "game over")
  }

  // Events

  private eventsInit(world: World): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this._isGameOver && e.code === 'Backspace') {
        this.start();
      }

      world.inputs.forEach((_) => _.keys.add(e.code));
    });

    document.addEventListener('keyup', (e: KeyboardEvent) => {
      world.inputs.forEach((_) => _.keys.delete(e.code));
    });
  }
}
