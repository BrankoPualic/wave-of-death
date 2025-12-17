import { Canvas } from './canvas.js';
import { Game } from './game.js';

window.addEventListener('load', () => {
  app();
});

function app(): void {
  const canvas = new Canvas();
  const ctx = canvas.getContext();

  const game = new Game(canvas, ctx);
  game.start();
}
