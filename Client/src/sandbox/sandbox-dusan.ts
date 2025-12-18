import { Canvas } from '../canvas.js';
import { Pistol } from '../weapons/pistol.js';
import { SandboxGameDusan } from './sandbox-game-dusan.js';

window.addEventListener('load', () => {
  app();
});

function app(): void {
  const canvas = new Canvas();
  const ctx = canvas.getContext();
  
  const pistol = new Pistol(100, 100);
    pistol.draw(ctx);
    
  const game = new SandboxGameDusan(ctx, canvas);
  game.start();
}
