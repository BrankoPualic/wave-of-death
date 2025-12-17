import { Entity } from '../entities/entity';
import { IEntityBox } from '../interfaces/entity-box-interface';
import { Constants } from './constants.js';

export function isColliding(
  nextRect: IEntityBox | Entity,
  wall: IEntityBox | Entity,
) {
  return (
    nextRect.x < wall.x + wall.width &&
    nextRect.x + nextRect.width > wall.x &&
    nextRect.y < wall.y + wall.height &&
    nextRect.y + nextRect.height > wall.y
  );
}

export function drawHitbox(
  ctx: CanvasRenderingContext2D,
  entity: Entity,
  stroke: string = 'lime',
) {
  ctx.strokeStyle = stroke;
  ctx.strokeRect(entity.x, entity.y, entity.width, entity.height);
}

export function getFont(size: number, bold?: boolean, font?: string): string {
  return `${bold ? 'bold' : ''} ${size}px ${font ? font : Constants.FONTFAMILIY}`;
}
