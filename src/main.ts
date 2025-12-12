import { Game } from './game.js';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (!ctx)
    throw new Error('Canvas context not found');

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const game = new Game(ctx);
game.start();
