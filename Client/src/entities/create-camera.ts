import { Canvas } from '../canvas';
import { TEntity } from '../ecs/entity';
import { World } from '../ecs/world';

export function createCamera(world: World, canvas: Canvas, follow: TEntity) {
  const camera = world.createEntity();
  world.cameras.set(camera, {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    follow: follow,
  });
}
