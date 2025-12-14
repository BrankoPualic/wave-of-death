import { Canvas } from './canvas.js';
import { Player } from './entities/player.js';
import { drawHitbox } from './common/functions.js';
import { Entity } from './entities/entity.js';
import { Game } from './game.js';
import { IPosition } from './interfaces/position-interface.js';
import { Zombie } from './zombies/zombie.js';

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

  const enemy = new Zombie(900, 50);
  const enemy2 = new Zombie(100, 100);

  const walls: Entity[] = [new Entity(800, 150, 25, 100)];

  function gameLoop() {
    canvas.clear();

    ctx.fillStyle = 'red';
    for (const wall of walls)
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

    // hitbox
    drawHitbox(ctx, enemy);

    enemy.moveTo(
      {
        // center
        x: canvas.width / 2 - enemy.width / 2,
        y: canvas.height / 2 - enemy.height / 2,
      } as IPosition,
      walls,
    );

    ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.drawImage(enemyImg, enemy2.x, enemy2.y, enemy2.width, enemy2.height);

    requestAnimationFrame(gameLoop);
  }
}
