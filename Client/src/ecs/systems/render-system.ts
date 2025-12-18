import { World } from '../world.js';

export function renderSystem(world: World, ctx: CanvasRenderingContext2D) {
  world.sprites.forEach((sprite, entity) => {
    const position = world.positions.get(entity);

    if (!position) return;

    const facing = world.facings.get(entity);

    ctx.save();

    if (sprite.image) {
      if (facing?.direction === 'left') {
        ctx.translate(position.x + sprite.width, position.y);
        ctx.scale(-1, 1);
        ctx.drawImage(sprite.image, 0, 0, sprite.width, sprite.height);
      } else {
        ctx.drawImage(
          sprite.image,
          position.x,
          position.y,
          sprite.width,
          sprite.height,
        );
      }
    } else if (sprite.fillStyle) {
      ctx.fillStyle = sprite.fillStyle;
      ctx.fillRect(position.x, position.y, sprite.width, sprite.height);
    }

    ctx.restore();
  });
}
