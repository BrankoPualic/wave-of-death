export class Game {
    private ctx: CanvasRenderingContext2D;

    constructor(
        private context: CanvasRenderingContext2D
    ) {
        this.ctx = context;
    }

    start() {
        console.log('game started');
    }
}