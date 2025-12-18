import { ICamera } from '../components/camera.js';
import { World } from '../world.js';

export function renderSystem(world: World, ctx: CanvasRenderingContext2D) {
  // Assume exactly one camera
  const camera = world.cameras.values().next().value as ICamera;
  if (!camera) return;

  world.sprites.forEach((sprite, entity) => {
    const position = world.positions.get(entity);

    if (!position) return;

    const facing = world.facings.get(entity);

    const screenX = position.x - camera.x;
    const screenY = position.y - camera.y;

    ctx.save();

    if (sprite.image) {
      if (facing?.direction === 'left') {
        ctx.translate(screenX + sprite.width, screenY);
        ctx.scale(-1, 1);
        ctx.drawImage(sprite.image, 0, 0, sprite.width, sprite.height);
      } else {
        ctx.drawImage(
          sprite.image,
          screenX,
          screenY,
          sprite.width,
          sprite.height,
        );
      }
    } else if (sprite.fillStyle) {
      ctx.fillStyle = sprite.fillStyle;
      ctx.fillRect(screenX, screenY, sprite.width, sprite.height);
    }

    ctx.restore();
  });
}
