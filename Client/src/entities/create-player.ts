import { Canvas } from '../canvas';
import { Constants } from '../common/constants.js';
import { TEntity } from '../ecs/entity';
import { World } from '../ecs/world';

export function createPlayer(world: World, canvas: Canvas): TEntity {
  const player = world.createEntity();

  world.positions.set(player, {
    x: canvas.width / 2 - Constants.BASE_CHARACTER_WIDTH / 2,
    y: canvas.height / 2 - Constants.BASE_CHARACTER_HEIGHT / 2,
  });

  world.velocities.set(player, { speed: 300 });
  world.healths.set(player, { hp: 100 });
  world.inputs.set(player, { keys: new Set() });
  world.facings.set(player, { direction: 'right' });

  const image = world.images.get('player');
  world.sprites.set(player, {
    image,
    width: Constants.BASE_CHARACTER_WIDTH,
    height: Constants.BASE_CHARACTER_HEIGHT,
  });

  world.damageables.set(player, { team: 'player' });

  world.players.add(player);

  return player;
}
