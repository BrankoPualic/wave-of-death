export interface IAttack {
  dmg: number;
  range: number;
  speed: number;

  timer: number; // OPR: this value should always be 0
  minAttackInterval: number;
}
