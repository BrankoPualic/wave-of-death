
export class Pistol {
  private image = new Image();
  private angle = 0;  
  private facingLeft = true;
  
  constructor(private x: number,
  private y: number,
  private width = 64,
  private height = 64,) {
    this.image.src = 'assets/pistol.png';
  }

   update(mouseX: number, mouseY: number) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;

    this.angle = Math.atan2(dy, dx);
    this.facingLeft = mouseX <= this.x;
  }

draw(ctx: CanvasRenderingContext2D) {
    if (!this.image.complete) return;

    ctx.save();
    // Move origin to pistol center
    ctx.translate(this.x, this.y);

    if (this.facingLeft) {
      // Flip horizontally
      ctx.rotate(this.angle + Math.PI);
  } else {
    // RIGHT side → flip + invert rotation
      ctx.scale(-1, 1);
      ctx.rotate(-this.angle );
    }
    // Draw centered
    ctx.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    ctx.restore();
  }
}
