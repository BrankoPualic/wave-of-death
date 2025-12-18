import { World } from '../../ecs/world';

export function createWorldBorders(world: World) {
  const north = world.createEntity();
  world.positions.set(north, {
    x: 0,
    y: 0,
  });
  world.sprites.set(north, {
    width: world.width,
    height: 0,
  });

  const east = world.createEntity();
  world.positions.set(east, {
    x: world.width,
    y: 0,
  });
  world.sprites.set(east, {
    width: 0,
    height: world.height,
  });

  const south = world.createEntity();
  world.positions.set(south, {
    x: 0,
    y: world.height,
  });
  world.sprites.set(south, {
    width: world.width,
    height: 0,
  });

  const west = world.createEntity();
  world.positions.set(west, {
    x: 0,
    y: 0,
  });
  world.sprites.set(west, {
    width: 0,
    height: world.height,
  });

  world.obstacles.add(north);
  world.obstacles.add(east);
  world.obstacles.add(south);
  world.obstacles.add(west);
}
