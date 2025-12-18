import { isColliding, tryMoveEntity } from '../../common/functions.js';
import { IEntityBox } from '../../interfaces/entity-box-interface.js';
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

    // if (distance > attack.range) {
    //   // Move
    //   const dirX = dx / distance;
    //   const dirY = dy / distance;

    //   if (world.obstacles.size === 0) {
    //     position.x += dirX * velocity.speed * deltaTime;
    //     position.y += dirY * velocity.speed * deltaTime;
    //   } else {
    //     // TRY X MOVE
    //     const nextX = position.x + dirX * velocity.speed * deltaTime;

    //     const xRect: IEntityBox = {
    //       x: nextX,
    //       y: position.y,
    //       width: sprite.width,
    //       height: sprite.height,
    //     };

    //     let xBlocked = false;

    //     for (const obstacle of world.obstacles) {
    //       const position = world.positions.get(obstacle);
    //       const sprite = world.sprites.get(obstacle);

    //       const obstacleRect: IEntityBox = {
    //         x: position!.x,
    //         y: position!.y,
    //         width: sprite!.width,
    //         height: sprite!.height,
    //       };

    //       if (isColliding(xRect, obstacleRect)) {
    //         xBlocked = true;
    //         break;
    //       }
    //     }

    //     if (!xBlocked) {
    //       position.x = nextX;
    //     }

    //     // TRY Y MOVE
    //     const nextY = position.y + dirY * velocity.speed * deltaTime;

    //     const yRect: IEntityBox = {
    //       x: position.x,
    //       y: nextY,
    //       width: sprite.width,
    //       height: sprite.height,
    //     };

    //     for (const obstacle of world.obstacles) {
    //       const position = world.positions.get(obstacle);
    //       const sprite = world.sprites.get(obstacle);

    //       const obstacleRect: IEntityBox = {
    //         x: position!.x,
    //         y: position!.y,
    //         width: sprite!.width,
    //         height: sprite!.height,
    //       };

    //       if (isColliding(yRect, obstacleRect)) {
    //         return;
    //       }
    //     }

    //     position.y = nextY;
    //   }
    // }
  });
}
