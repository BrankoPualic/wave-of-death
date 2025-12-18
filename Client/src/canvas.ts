export class Canvas {
  width = 1000;
  height = 750;
  private _ctx: CanvasRenderingContext2D;

  constructor() {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    canvas.width = this.width;
    canvas.height = this.height;

    const context = canvas.getContext('2d');

    if (!context) throw new Error('Canvas context not found');

    this._ctx = context;

    this.load();
  }
  
  getContext = () => this._ctx;

  load() {
    this._ctx.fillStyle = 'green';
    this._ctx.fillRect(0, 0, this.width, this.height);
  }

  clear() {
    this._ctx.clearRect(0, 0, this.width, this.height);
  }
}
