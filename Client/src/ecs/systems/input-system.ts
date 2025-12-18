import { World } from '../world.js';

export function inputSystem(world: World) {
  world.players.forEach((entity) => {
    const input = world.inputs.get(entity);

    if (!input) return;

    // keys are updated via DOM events
  });
}
