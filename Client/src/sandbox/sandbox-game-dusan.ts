import { Canvas } from '../canvas.js';
import { Pistol } from '../weapons/pistol.js';

export class SandboxGameDusan {
  private mouse = { x: 0, y: 0 };
  private pistol: Pistol;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private canvas: Canvas,
  ) {
    this.pistol = new Pistol(canvas.width / 2,
      canvas.height / 2
    );

    const domCanvas = document.getElementById('game') as HTMLCanvasElement;

    domCanvas.addEventListener('mousemove', (e) => {
      const rect = domCanvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      });
  }

  start() {
    console.log('sandbox started');  
    requestAnimationFrame(this.loop);
    
  }

  loop = () => {
    this.canvas.clear();
    this.canvas.load();
    this.pistol.update(this.mouse.x, this.mouse.y);
    this.pistol.draw(this.ctx);
    requestAnimationFrame(this.loop);
  };
}
