import { tryMoveEntity } from '../../common/functions.js';
import { World } from '../world.js';

export function chaserMovementSystem(world: World, deltaTime: number) {
  world.zombies.forEach((zombie) => {
    const target = world.chasers.get(zombie)?.target;
    if (!target) return;

    const targetPosition = world.positions.get(target);
    const targetHealth = world.healths.get(target);
    const position = world.positions.get(zombie);
    const velocity = world.velocities.get(zombie);
    const sprite = world.sprites.get(zombie);
    const attack = world.attacks.get(zombie);

    if (
      !targetPosition ||
      !targetHealth ||
      !position ||
      !velocity ||
      !sprite ||
      !attack
    )
      return;

    // distance from target position and entity
    const dx = targetPosition.x - position.x;
    const dy = targetPosition.y - position.y;

    // vector
    const distance = Math.hypot(dx, dy);

    if (distance < 1 || distance <= attack.range) return; // this is to prevent the bug for division by zero, also jitter

    const dirX = dx / distance;
    const dirY = dy / distance;

    tryMoveEntity(
      world,
      zombie,
      dirX * velocity.speed * deltaTime,
      dirY * velocity.speed * deltaTime,
    );
  });
}
