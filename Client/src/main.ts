import { Canvas } from './canvas.js';
import { Player } from './entities/player.js';
import { Game } from './game.js';


window.addEventListener('load', () => {
  app();
});

function app(): void {
  const canvas = new Canvas();
  const ctx = canvas.getContext();

  const player = new Player(0, 0);
  player.load(canvas);

  

  const game = new Game(ctx, player, canvas);
  game.start();
}
