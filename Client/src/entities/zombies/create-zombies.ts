import { Constants } from '../../common/constants.js';
import { TEntity } from '../../ecs/entity';
import { World } from '../../ecs/world';

export function createZombies(world: World, player: TEntity, count: number) {
  for (let i = 0; i < count; i++) {
    const zombie = world.createEntity();

    world.positions.set(zombie, {
      x: 100,
      y: 100,
    });

    world.velocities.set(zombie, { speed: Math.random() * (300 - 100) + 100 });
    world.healths.set(zombie, { hp: 100 });

    const image = world.images.get('zombie');
    world.sprites.set(zombie, {
      image,
      width: Constants.BASE_CHARACTER_WIDTH,
      height: Constants.BASE_CHARACTER_HEIGHT,
    });

    world.attacks.set(zombie, {
      dmg: 20,
      range: 45,
      speed: 1,
      timer: 0,
      minAttackInterval: 0.5,
    });

    world.chasers.set(zombie, { target: player });

    world.damageables.set(zombie, { team: 'enemy' });

    world.zombies.add(zombie);
  }
}
