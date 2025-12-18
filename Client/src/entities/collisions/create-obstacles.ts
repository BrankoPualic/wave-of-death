import { World } from '../../ecs/world';

export function createObstacles(world: World) {
  const obstacle = world.createEntity();

  world.positions.set(obstacle, {
    x: 800,
    y: 150,
  });

  world.sprites.set(obstacle, {
    width: 25,
    height: 100,
    fillStyle: 'red',
  });

  world.obstacles.add(obstacle);
}
