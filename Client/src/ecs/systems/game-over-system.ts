import { World } from '../world.js';

export function gameOverSystem(world: World): boolean {
  if (world.players.size === 0) {
    return true;
  }

  return false;
}
