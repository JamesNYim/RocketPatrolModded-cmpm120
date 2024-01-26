/*
James Yim
Rocket Patrol: Fun Pack
10 Hours including research
Mods:
	Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
	Implement parallax scrolling for the background (3)
	Create a new title screen (e.g., new artwork, typography, layout) (3)
	Display the time remaining (in seconds) on the screen (3)
	Create 4 new explosion sound effects and randomize which one plays on impact (3)
	Create 4 new laser sound effects and randomize which one plays on fire (3)
	Allow the player to control the Rocket after it's fired (1)
	Track a high score that persists across scenes and display it in the UI (1)
	*/

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
