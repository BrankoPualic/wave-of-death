import { Canvas } from '../canvas.js';
import { SandboxGameBranko } from './branko-sandbox-game.js';

window.addEventListener('load', () => {
  app();
});

function app(): void {
  const canvas = new Canvas();
  const ctx = canvas.getContext();

  const game = new SandboxGameBranko(canvas, ctx);
  game.start();
}
