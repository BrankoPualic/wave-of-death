import { Canvas } from '../canvas.js';
import { SandboxGameBranko } from './sandbox-game-branko.js';

window.addEventListener('load', () => {
  app();
});

function app(): void {
  const canvas = new Canvas();
  const ctx = canvas.getContext();

  const game = new SandboxGameBranko(ctx, canvas);
  game.start();
}
