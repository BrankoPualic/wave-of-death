import { World } from '../world.js';

export function cameraFollowSystem(world: World) {
  world.cameras.forEach((camera) => {
    if (!camera.follow) return;

    const targetPos = world.positions.get(camera.follow);
    if (!targetPos) return;

    camera.x = targetPos.x - camera.width / 2;
    camera.y = targetPos.y - camera.height / 2;

    camera.x = Math.max(0, Math.min(camera.x, world.width - camera.width));
    camera.y = Math.max(0, Math.min(camera.y, world.height - camera.height));
  });
}
