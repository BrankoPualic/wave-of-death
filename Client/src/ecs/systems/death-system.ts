import { World } from '../world';

export function deathSystem(world: World) {
  world.healths.forEach((health, entity) => {
    if (health.hp > 0) return;

    world.positions.delete(entity);
    world.velocities.delete(entity);
    world.healths.delete(entity);
    world.inputs.delete(entity);
    world.facings.delete(entity);
    world.sprites.delete(entity);
    world.attacks.delete(entity);
    world.chasers.delete(entity);
    world.damageables.delete(entity);

    world.players.delete(entity);
    world.zombies.delete(entity);
    // world.obstacles.delete(entity); // if in future they have some durability
  });
}
