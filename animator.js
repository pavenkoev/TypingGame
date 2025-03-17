class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration});

        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
        this.scale = 1;
        this.isRepeating = false;
        this.reverse = false
    };

    drawFrame(tick, ctx, x, y) {
        this.elapsedTime += tick;
        if(this.elapsedTime > this.totalTime) {
            this.elapsedTime -= this.totalTime;
            this.isRepeating = true;
        }
        const frame = this.currentFrame();

        if (this.reverse) {
			ctx.save()
			ctx.scale(-1, 1)
			ctx.translate(ctx.width, 0)
		}

		if (this.reverse) {
			x = -(x + this.width)
		}

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width*frame, this.yStart,
            this.width, this.height,
            x, y,
            this.width * this.scale, this.height * this.scale);

        if (this.reverse) {
            ctx.restore()
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };

    reset() {
        this.elapsedTime = 0;
        this.isRepeating = false;
    };
};