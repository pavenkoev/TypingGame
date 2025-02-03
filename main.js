const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/player_Idle-Sheet.png")
ASSET_MANAGER.queueDownload("./assets/Player_GunFire.png")
ASSET_MANAGER.queueDownload("./assets/Zombie_left.png")

const gameProperties = {
	height: 1080,
	width: 1920,
	imageSmoothing: false
}


const resizeCanvas = () => {
	const canvas = document.getElementById("gameWorld");

	const windowBounds = document.body.getBoundingClientRect()
	const verticalRatio = windowBounds.height / gameProperties.height
	const horizontalRatio = windowBounds.width / gameProperties.width
	const ratio = verticalRatio < horizontalRatio ? verticalRatio : horizontalRatio
	canvas.style.transform = `scale(${ratio})`
}


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	// canvas.height = gameProperties.height
	// canvas.width = gameProperties.width

	// resizeCanvas()
	// document.body.onresize = resizeCanvas

	gameEngine.init(ctx);


	let enemyManager = new EnemyManager(gameEngine);
	gameEngine.addEntity(enemyManager);
	gameEngine.addEntity(new Player(gameEngine, enemyManager));

	// enemyManager.createEnemy();


	gameEngine.start();
});
