import { Entity } from '../entities/entity';
import { IEntityBox } from '../interfaces/entity-box-interface';

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
