class EnemyManager {
    constructor(game) {
        this.game = game;
        this.lastSpawnTime = 0;
        this.spawnDelay = 5;
        this.startWord = null;
        this.minYPosition = 100;
        this.maxYPosition = 240;
        this.nextYPosition = 100;
        this.yStep = 32;

        this.paramPresets = [
            {
                words: 1,
                speed_min: 50,
                speed_max: 70
            },
            {
                words: 2,
                speed_min: 30,
                speed_max: 40
            },
            {
                words: 3,
                speed_min: 10,
                speed_max: 20
            }
        ];
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

    getYPositionSequential() {
        let y = this.nextYPosition;
        this.nextYPosition = this.nextYPosition + this.yStep;
        if (this.nextYPosition > this.maxYPosition) {
            this.nextYPosition = this.minYPosition;
        }

        return y;
    }

    getYPosition() {
        const occupiedPositions = [];
        for (const entity of this.game.entities) {
            if (entity instanceof Enemy) {
                occupiedPositions.push(entity.y);
            }
        }

        const availablePositions = [];

        for (let y = this.minYPosition; y <= this.maxYPosition; y += this.yStep) {
            if (!occupiedPositions.includes(y)) {
                availablePositions.push(y);
            }
        }

        if (!availablePositions) {
            return null;
        }

        const y = availablePositions[Math.floor(Math.random() * availablePositions.length)];

        return y;
    }

    getEnemyParams() {
        return this.paramPresets[Math.floor(Math.random() * this.paramPresets.length)];
    }

    createRandomEnemy(game, text) {
        let func = EnemyManager.enemyTypes[Math.floor(Math.random() * EnemyManager.enemyTypes.length)];
        return func(game, text);
    }

    createEnemy() {
        const yPos = this.getYPosition();
        if (yPos === null) {
            return;
        }

        const params = this.getEnemyParams();

        let words = this.game.generator.generateText(null, params.words - 1);
        this.startWord = words[words.length - 1];
        let text = words.join(' ');
        // let enemy = new FlyingEyeEnemy(this.game, text);
        let enemy = this.createRandomEnemy(this.game, text);
        enemy.x = 700;
        enemy.y = yPos;
        enemy.speed = -this.getRandomInt(params.speed_min, params.speed_max);

        this.game.addEntity(enemy);
    }

    static enemyTypes = [
        // (game, text) => new ZombieEnemy(game, text),
        (game, text) => new SkeletonEnemy(game, text),
        (game, text) => new MushroomEnemy(game, text),
        (game, text) => new GoblinEnemy(game, text),
        (game, text) => new FlyingEyeEnemy(game, text),
    ];
}