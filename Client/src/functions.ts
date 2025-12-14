import { IEntityBox } from './interfaces/entity-box-interface';

export function isColliding(nextRect: IEntityBox, wall: IEntityBox) {
  return (
    nextRect.x < wall.x + wall.width &&
    nextRect.x + nextRect.width > wall.x &&
    nextRect.y < wall.y + wall.height &&
    nextRect.y + nextRect.height > wall.y
  );
}
