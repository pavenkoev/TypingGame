const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/player_Idle-Sheet.png")
ASSET_MANAGER.queueDownload("./assets/Player_GunFire.png")
ASSET_MANAGER.queueDownload("./assets/Zombie_left.png")
ASSET_MANAGER.queueDownload("./assets/Goblin-Run.png")
ASSET_MANAGER.queueDownload("./assets/FlyingEye-Flight.png")
ASSET_MANAGER.queueDownload("./assets/Skeleton-Walk.png")
ASSET_MANAGER.queueDownload("./assets/Mushroom-Run.png")

const gameProperties = {
	height: 1080,
	width: 1920,
	imageSmoothing: false
}

function trySetupGameOverScreen() {
	const paramsString = window.location.search;
	const searchParams = new URLSearchParams(paramsString);
	const score = searchParams.get("score");
	const time = searchParams.get("time");

	if (score && time) {
		document.getElementById("game-over").style.visibility = 'visible';
		document.getElementById("score").innerText = "Score: " + score;
		document.getElementById("time").innerText = 
			"Time: " + Math.floor(time / 60)  + "m " + time % 60 + "s";
	}
}

const resizeCanvas = () => {
	const canvas = document.getElementById("gameWorld");

	const windowBounds = document.body.getBoundingClientRect()
	const verticalRatio = windowBounds.height / gameProperties.height
	const horizontalRatio = windowBounds.width / gameProperties.width
	const ratio = verticalRatio < horizontalRatio ? verticalRatio : horizontalRatio
	canvas.style.transform = `scale(${ratio})`
}

function loadTextFileSync(url) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send(null);
	if (xhr.status === 200) {
	  return xhr.responseText;
	} else {
	  throw new Error(`Failed to load file: ${xhr.status}`);
	}
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

	const generator = new MarkovChain();

	const text = loadTextFileSync("assets/the_war_of_the_worlds.txt");
	generator.buildChain(text);

	let enemyManager = new EnemyManager(gameEngine);

	let player = new Player(gameEngine, enemyManager);

	gameEngine.generator = generator;
	gameEngine.player = player;

	gameEngine.addEntity(enemyManager);
	gameEngine.addEntity(player);

	// enemyManager.createEnemy();


	// gameEngine.start();
});

function startGame(){
	document.getElementById("menu")?.remove();

	gameEngine.player.startDate = new Date();

	gameEngine.start();
}