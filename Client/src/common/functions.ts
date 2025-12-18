import { TEntity } from '../ecs/entity';
import { World } from '../ecs/world';
import { Entity } from '../entities/entity';
import { IEntityBox } from '../interfaces/entity-box-interface';
import { Constants } from './constants.js';

//
// COLLISION
//

export function isColliding(
  nextRect: IEntityBox | Entity,
  obstacle: IEntityBox | Entity,
): boolean {
  return (
    nextRect.x < obstacle.x + obstacle.width &&
    nextRect.x + nextRect.width > obstacle.x &&
    nextRect.y < obstacle.y + obstacle.height &&
    nextRect.y + nextRect.height > obstacle.y
  );
}

export function getEntityBox(world: World, entity: TEntity, x?: number, y?: number): IEntityBox | null {
  const pos = world.positions.get(entity);
  const spirte = world.sprites.get(entity);
  if (!pos || !spirte) return null;

  return {
    x: x ?? pos.x,
    y: y ?? pos.y,
    width: spirte.width,
    height: spirte.height,
  };
}

export function isBlockedByObstacles(world: World, mover: TEntity, nextBox: IEntityBox): boolean {
  for (const obstacle of world.obstacles) {
    if (obstacle === mover) continue;

    const obstacleBox = getEntityBox(world, obstacle);
    if (!obstacleBox) continue;

    if (isColliding(nextBox, obstacleBox))
      return true;
  }

  return false;
}

export function tryMoveEntity(world: World, entity: TEntity, dx: number, dy: number) {
  const pos = world.positions.get(entity);
  const sprite = world.sprites.get(entity);
  if(!pos || !sprite) return;

  // TRY X
  if (dx !== 0) {
    const nextX = pos.x + dx;
    const boxX = {
      x: nextX,
      y: pos.y,
      width: sprite.width,
      height: sprite.height,
    };

    if (!isBlockedByObstacles(world, entity, boxX))
      pos.x = nextX;
  }

  // TRY Y
  if (dy !== 0) {
    const nextY = pos.y + dy;
    const boxY = {
      x: pos.x,
      y: nextY,
      width: sprite.width,
      height: sprite.height,
    };

    if (!isBlockedByObstacles(world, entity, boxY))
      pos.y = nextY;
  }

}


//
// HELPERS
//

export function drawHitbox(
  ctx: CanvasRenderingContext2D,
  entity: Entity,
  stroke: string = 'lime',
): void {
  ctx.strokeStyle = stroke;
  ctx.strokeRect(entity.x, entity.y, entity.width, entity.height);
}

export function getFont(size: number, bold?: boolean, font?: string): string {
  return `${bold ? 'bold' : ''} ${size}px ${font ? font : Constants.FONTFAMILIY}`;
}
