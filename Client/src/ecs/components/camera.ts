import { TEntity } from '../entity.js';

export interface ICamera {
  // Top-left of camera in world space
  x: number;
  y: number;
  // Canvas size in world units
  width: number;
  height: number;
  // Local player only
  follow?: TEntity;
}
