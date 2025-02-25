class Enemy {
    constructor(game, text) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/Zombie_left.png"),
         0, 64, 32, 32, 8, 0.15);
        this.animator.scale = 3;

         this.x = 700;
         this.y = 160;
         this.speed = -50;
         this.text = text;
         this.completed_letters = 0;
    };

    update() {
        this.x += this.speed*this.game.clockTick;
        if (this.x > 857) this.x = 220;

        if (this.x < 100 || this.completed_letters === this.text.length){
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        this.drawText(ctx, this.x, this.y);
    };

    getUntypedCharacters() {
        return this.text.substring(this.completed_letters);
    }

    drawText(ctx, x, y) {
        ctx.fillStyle = "red";
        ctx.font = "20px Arial";
        
        let competed = this.text.substring(0, this.completed_letters);
        let rest = this.getUntypedCharacters();

        // ctx.fillText(this.text, x, y);

        ctx.fillText(competed, x, y);

        x += ctx.measureText(competed, x, y).width;

        ctx.fillStyle = "#b3e6ff";
        ctx.fillText(rest, x, y);
    }

    onHit() {
        this.completed_letters++;

        console.log('next: ' + this.text.charAt(this.completed_letters));

        while (this.completed_letters < this.text.length && 
            this.text.charAt(this.completed_letters) === ' ') {
         this.completed_letters++;
     }
    }

    static words = [
        "sunlight",
        "ocean breeze",
        "mountain trail",
        "forest whisper",
        "golden meadow",
        "river stone",
        "desert wind",
        "silent thunder",
        "gentle snowfall",
        "morning dew",
        "twilight glow",
        "midnight echo",
        "crystal lake",
        "autumn leaf",
        "whispering pine",
        "hidden valley",
        "shimmering horizon",
        "distant thunder",
        "rustling leaves",
        "velvet night",
        "wildflower path",
        "ancient oak",
        "frozen waterfall",
        "chasing fireflies",
        "endless journey",
        "echoing canyon",
        "rolling hills",
        "silent woods",
        "wandering spirit",
        "stormy sky"
      ];

      static getRandomWord() {
        const index = Math.floor(Math.random() * Enemy.words.length);
        return Enemy.words[index];
      }
}