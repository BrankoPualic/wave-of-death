import { Canvas } from './canvas.js';
import { Player } from './entities/player.js';
import { Game } from './game.js';
import { IPosition, Zombie } from './zombies/zombie.js';

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

  const enemyImg = new Image();
  enemyImg.src = '../assets/mvp-normal-zombie.png';
  enemyImg.addEventListener('load', () => {
    gameLoop();
  });

  const enemy = new Zombie();

	function gameLoop() {
	  canvas.clear();

	  enemy.moveTo({
	    // center
	    x: canvas.width / 2 - enemy.width / 2,
	    y: canvas.height / 2 - enemy.height / 2,
	  } as IPosition);

	  ctx?.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);

	  requestAnimationFrame(gameLoop);
	}
}
