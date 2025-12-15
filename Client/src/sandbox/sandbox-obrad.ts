import { Canvas } from '../canvas.js';
import { SandboxGameObrad } from './sandbox-game-obrad.js';

window.addEventListener('load', () => {
  app();
});

function app(): void {
  const canvas = new Canvas();
  const ctx = canvas.getContext();

  const game = new SandboxGameObrad(ctx, canvas);
  game.start();
}
