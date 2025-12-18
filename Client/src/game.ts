import { Canvas } from './canvas';
import { Player } from './entities/player';
import { Pistol } from './weapons/pistol';
export class Game {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private player: Player,
    private canvas: Canvas,
    
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
    

    requestAnimationFrame(this.loop);
  };
}
