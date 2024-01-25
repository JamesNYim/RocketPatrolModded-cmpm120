class Menu extends Phaser.Scene {
	constructor() {
	  super("menuScene");
	}
	
	preload() {
		this.load.image('rocket', './assets/rocket.png');
		this.load.image('spaceship', './assets/spaceship.png');
		this.load.image('starfield', './assets/starfield.png');
		
		this.load.audio('sfx-select', './assets/sfx-select.wav')
		this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
		this.load.audio('sfx-shot', './assets/sfx-shot.wav')
		
		this.load.spritesheet('explosion', './assets/explosion.png', {
			frameWidth: 64,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 9
		})
	}
	
	create() {

		this.starfield = this.add.tileSprite(
			0,
			0,
			640,
			480,
			'starfield')
			.setOrigin(0,0);
	// animation configuration
		this.anims.create({
			key: 'explode',
			frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
			frameRate: 30
		})

		let menuConfig = {
			fontFamily: 'Courier',
			fontSize: '28px',
			backgroundColor: 'transparent',
			color: '#FFF',
			align: 'right',
			padding: {
				top: 5,
				bottom: 5,
			},
			fixedWidth: 0
		}

		this.add.text(
			game.config.width / 2,
			game.config.height / 2 - borderUISize - borderPadding,
			'ROCKET PATROL',
			menuConfig)
			.setOrigin(0.5);

		this.add.text(
			game.config.width / 2,
			game.config.height / 2,
			'Use <--> arrows to move & (F) to fire',
			menuConfig)
			.setOrigin(0.5);

		menuConfig.backgroundColor = 'transparent';
		menuConfig.color = '#FFF';
		
		this.add.text(
			game.config.width / 2,
			game.config.height / 2 + borderUISize + borderPadding,
			'Press <- for Novice  or -> for Expert',
			menuConfig)
			.setOrigin(0.5);
		
		this.add.text(
			game.config.width / 2,
			game.config.height / 2 + borderUISize + borderPadding + 100,
			`High Score ${highScore}`,
			menuConfig)
			.setOrigin(0.5);
		

		// define keys
		keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
		keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
	}

	
	update() {
		this.starfield.tilePositionX -= 4;
		if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
		  // easy mode
		  game.settings = {
			spaceshipSpeed: 3,
			gameTimer: 60000    
		  }
		  this.sound.play('sfx-select')
		  this.scene.start('playScene')    
		}
		if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
		  // hard mode
		  game.settings = {
			spaceshipSpeed: 4,
			gameTimer: 45000    
		  }
		  this.sound.play('sfx-select')
		  this.scene.start('playScene')    
		}
	  }
}
