import { Canvas } from './canvas.js';
import { Player } from './entities/player.js';
import { Zombie } from './entities/zombies/zombie.js';
import { Game } from './game.js';

window.addEventListener('load', () => {
  app();
});

function app(): void {
  const canvas = new Canvas();
  const ctx = canvas.getContext();

  const player = new Player(0, 0);
  player.load(canvas);

  const zombie = new Zombie(900, 50);
  zombie.load(canvas);

  const game = new Game(canvas, ctx, player, zombie);
  game.start();
}
