import { Canvas } from '../canvas';
import { IAttack } from './components/attack';
import { IChaser } from './components/chaser';
import { IDamageable } from './components/damageable';
import { IFacing } from './components/facing';
import { IHealth } from './components/health';
import { IInput } from './components/input';
import { IPosition } from './components/position';
import { ISprite } from './components/sprite';
import { IVelocity } from './components/velocity';
import { TEntity } from './entity';
import { attackSystem } from './systems/attack-system.js';
import { backgroundSystem } from './systems/background-system.js';
import { chaserMovementSystem } from './systems/chaser-movement-system.js';
import { deathSystem } from './systems/death-system.js';
import { playerMovementSystem } from './systems/movement-system.js';
import { renderSystem } from './systems/render-system.js';

// - owns entities
// - owns components
// - runs systems in order
export class World {
  private _nextEntityId: TEntity = 0;

  // Stores

  positions = new Map<TEntity, IPosition>();
  velocities = new Map<TEntity, IVelocity>();
  healths = new Map<TEntity, IHealth>();
  inputs = new Map<TEntity, IInput>();
  facings = new Map<TEntity, IFacing>();
  sprites = new Map<TEntity, ISprite>();
  attacks = new Map<TEntity, IAttack>();
  chasers = new Map<TEntity, IChaser>();
  damageables = new Map<TEntity, IDamageable>();

  // Tags

  // #TODO: sytems won't work for MP
  players = new Set<TEntity>();
  zombies = new Set<TEntity>();
  obstacles = new Set<TEntity>();

  // Methods

  createEntity = (): TEntity => this._nextEntityId++;

  update(deltaTime: number, ctx: CanvasRenderingContext2D, canvas: Canvas) {
    backgroundSystem(canvas);

    playerMovementSystem(this, deltaTime);
    chaserMovementSystem(this, deltaTime);
    attackSystem(this, deltaTime);
    deathSystem(this);

    renderSystem(this, ctx);
  }

  reset() {
    this.positions.clear();
    this.velocities.clear();
    this.healths.clear();
    this.inputs.clear();
    this.facings.clear();
    this.sprites.clear();
    this.attacks.clear();
    this.chasers.clear();
    this.damageables.clear();

    this.players.clear();
    this.zombies.clear();
    this.obstacles.clear();

    this._nextEntityId = 0;
  }
}
