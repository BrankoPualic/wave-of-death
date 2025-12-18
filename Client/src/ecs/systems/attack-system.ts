import { isColliding } from '../../common/functions.js';
import { IAttack } from '../components/attack';
import { World } from '../world';

export function attackSystem(world: World, deltaTime: number) {
  world.attacks.forEach((attack, attacker) => {
    const attackerPosition = world.positions.get(attacker);
    const attackerHitbox = world.sprites.get(attacker);
    const attackerDamagable = world.damageables.get(attacker);

    if (!attackerPosition || !attackerHitbox || !attackerDamagable) return;

    attack.timer += deltaTime;

    if (attack.timer < attackInterval(attack)) return;

    // check all damageable entities
    world.damageables.forEach((targetDamageable, target) => {
      if (target === attacker) return; // protectes from self fire
      if (targetDamageable.team === attackerDamagable.team) return; // protects from friendly fire

      const targetPosition = world.positions.get(target);
      const targetHitbox = world.sprites.get(target);
      const targetHealth = world.healths.get(target);

      if (!targetPosition || !targetHitbox || !targetHealth) return;

      if (
        isColliding(
          {
            x: attackerPosition.x,
            y: attackerPosition.y,
            width: attackerHitbox.width,
            height: attackerHitbox.height,
          },
          {
            x: targetPosition.x,
            y: targetPosition.y,
            width: targetHitbox.width,
            height: targetHitbox.height,
          },
        )
      ) {
        targetHealth.hp -= attack.dmg;
        attack.timer = 0;
      }
    });
  });
}

function attackInterval(attack: IAttack) {
  const interval = 1 / attack.speed;
  return Math.max(interval, attack.minAttackInterval);
}
