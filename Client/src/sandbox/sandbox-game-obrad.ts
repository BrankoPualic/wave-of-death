import { Canvas } from '../canvas.js';

export class SandboxGameObrad {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private canvas: Canvas,
  ) {}

  start() {
    console.log('sandbox started');
    requestAnimationFrame(this.loop);
  }

  loop = () => {
    this.canvas.clear();
    this.canvas.load();
    requestAnimationFrame(this.loop);
  };
}
