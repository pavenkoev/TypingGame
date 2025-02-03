class EnemyManager {
    constructor(game) {
        this.game = game;
        this.lastSpawnTime = 0;
        this.spawnDelay = 3;
    };

    update() {
        let seconds = new Date().getTime() / 1000;
        if (seconds - this.lastSpawnTime > this.spawnDelay) {
            this.lastSpawnTime = seconds;
            this.createEnemy();
        }
    };

    draw () {}

    getSortedEnemies() {
        let enemies = [];

        for (let obj of this.game.entities) {
            if (obj instanceof Enemy) enemies.push(obj);
        }

        enemies.sort((a, b) => a.x - b.x);
        return enemies;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createEnemy() {
        let enemy = new Enemy(this.game);
        enemy.x = 700;
        enemy.y = this.getRandomInt(100, 200)
        enemy.speed = -this.getRandomInt(10, 60);

        this.game.addEntity(enemy);

        // this.enemies.push(enemy);
        // this.enemies.sort((a, b) => a.x - b.x);
    }
}