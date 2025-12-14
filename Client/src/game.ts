import { Canvas } from './canvas';
import { Player } from './entities/player';
import { Zombie } from './entities/zombies/zombie';

export class Game {
  constructor(
    private canvas: Canvas,
    private ctx: CanvasRenderingContext2D,
    private player: Player,
    private zombie: Zombie,
  ) {}

  start() {
    console.log('game started');
    requestAnimationFrame(this.loop);
  }

  loop = () => {
    this.canvas.clear();
    this.canvas.load();
    this.player.update();
    this.player.draw(this.ctx);
    this.zombie.update(this.ctx, this.player);
    this.zombie.draw(this.ctx);
    requestAnimationFrame(this.loop);
  };
}
