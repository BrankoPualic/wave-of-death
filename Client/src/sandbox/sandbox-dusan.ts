import { Canvas } from '../canvas.js';
import { SandboxGameDusan } from './sandbox-game-dusan.js';

window.addEventListener('load', () => {
  app();
});

function app(): void {
  const canvas = new Canvas();
  const ctx = canvas.getContext();

  const game = new SandboxGameDusan(ctx, canvas);
  game.start();
}
