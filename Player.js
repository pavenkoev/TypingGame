class Player {
    constructor(game, enemyManager) {
        this.game = game;
        this.enemyManager = enemyManager;
        this.animatorIdle = new Animator(ASSET_MANAGER.getAsset("./assets/player_Idle-Sheet.png"),
            0, 0, 32, 64, 3, 0.15);
        this.animatorIdle.scale = 3;

        this.animatorShooting = new Animator(ASSET_MANAGER.getAsset("./assets/Player_GunFire.png"),
            0, 0, 64, 64, 5, 0.05);
        this.animatorShooting.scale = 3;

        this.x = 0;
        this.y = 140;
        this.speed = 0;
        this.isShooting = false;

        this.game.ctx.canvas.addEventListener('keydown', e => this.onInput(e));

        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.score = 0;

        this.startDate = new Date();
    };

    update() {
        if (this.isShooting && this.animatorShooting.isRepeating) {
            this.isShooting = false;
        }
    };

    draw(ctx) {
        if (this.isShooting) {
            this.animatorShooting.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        else {
            this.animatorIdle.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }

        this.drawHealth(ctx, this.x + 16, this.y);
    };

    drawHealth(ctx, x, y) {
        ctx.fillStyle = "red";
        ctx.font = "20px Arial";

        ctx.fillText(this.health + "/" + this.maxHealth, x, y);
    }

    isLetterOrNumber(str) {
        return str.length === 1 && str.match(/[a-z0-9]/i);
    };

    onInput(event) {
        var key = event.key;
        key = key.toLowerCase();

        if (this.isLetterOrNumber(key)) {
            this.onType(key);
        }
    }

    onType(key) {
        for (const enemy of this.enemyManager.getSortedEnemies()) {
            let characters = enemy.getUntypedCharacters();
            if (characters.startsWith(key)) {
                console.log("Matched enemy", enemy);
                enemy.onHit();

                this.animatorShooting.reset();
                this.isShooting = true;

                break;
            }
        }
    }

    hit(damage) {
        this.health -= damage;

        if (this.health <= 0) {
            this.game.running = false;
            let endDate = new Date();
            let time = Math.floor((endDate - this.startDate) / 1000);
            window.location.href = "/?score=" + this.score + "&time=" + time;
        }
    }

    heal(amount) {
        this.health += amount;
        this.health = Math.min(this.health, this.maxHealth);

        this.score++;
    }
}