import { tryMoveEntity } from '../../common/functions.js';
import { World } from '../world.js';

export function playerMovementSystem(world: World, deltaTime: number) {
  world.players.forEach((player) => {
    const position = world.positions.get(player);
    const velocity = world.velocities.get(player);
    const input = world.inputs.get(player);
    const facing = world.facings.get(player);

    if (!position || !velocity || !input || !facing) return;

    let vx = 0;
    let vy = 0;

    if (input.keys.has('KeyW')) vy -= 1;
    if (input.keys.has('KeyS')) vy += 1;
    if (input.keys.has('KeyA')) vx -= 1;
    if (input.keys.has('KeyD')) vx += 1;

    // Diagonal movement
    if (vx !== 0 && vy !== 0) {
      const inv = 1 / Math.sqrt(2);
      vx *= inv;
      vy *= inv;
    }

    if (vx < 0) facing.direction = 'left';
    else if (vx > 0) facing.direction = 'right';

    tryMoveEntity(
      world,
      player,
      vx * velocity.speed * deltaTime,
      vy * velocity.speed * deltaTime,
    );
  });
}
