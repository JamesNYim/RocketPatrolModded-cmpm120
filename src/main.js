let config = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// Setting UI
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// Keyboard Bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;

// Setting high score
let highScore = localStorage.getItem('rocketPatrolHS') || 0;
