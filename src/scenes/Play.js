class Play extends Phaser.Scene {
	constructor() {
	  super("playScene");
	}
	
	create() {
		this.starfield = this.add.tileSprite(
			0,
			0,
			640,
			480,
			'starfield')
			.setOrigin(0,0);
		
	  	const greenColor = (0, 255, 0, 50);
	  	const whiteColor = 0xFFFFFF;

	  // green UI background
		this.add.rectangle(0, 
			borderUISize + borderPadding, 
			game.config.width, borderUISize * 2, 
			greenColor)
			.setOrigin(0, 0)

		// white borders

		this.add.rectangle(0,
			0, 
			game.config.width, 
			borderUISize, 
			whiteColor)
			.setOrigin(0, 0)

		this.add.rectangle(0, 
			game.config.height - borderUISize, 
			game.config.width, 
			borderUISize, 
			whiteColor)
			.setOrigin(0, 0)

		this.add.rectangle(0, 
			0, 
			borderUISize, 
			game.config.height, 
			whiteColor)
			.setOrigin(0, 0);

		this.add.rectangle(game.config.width - borderUISize,
			0, 
			borderUISize, 
			game.config.height, 
			whiteColor)
			.setOrigin(0, 0)

		this.p1Rocket = new Rocket(
			this,
			game.config.width / 2,
			game.config.height - borderUISize - borderPadding,
			'rocket')
			.setOrigin(0.5, 0);

		this.ship01 = new Spaceship(
			this, 
			game.config.width + borderUISize*6, 
			borderUISize*4, 
			'spaceship', 
			0, 
			30)
			.setOrigin(0, 0);

		this.ship02 = new Spaceship(
			this, 
			game.config.width + borderUISize*3, 
			borderUISize*5 + borderPadding*2, 
			'spaceship', 
			0, 
			20)
			.setOrigin(0,0);

		this.ship03 = new Spaceship(
			this, 
			game.config.width, 
			borderUISize*6 + borderPadding*4, 
			'spaceship', 
			0, 
			10)
			.setOrigin(0,0);

		keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
		keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		// initialize score and timer
		this.p1Score = 0;
		this.timeLeft = game.settings.gameTimer;
		this.timeHandler = this.time.addEvent({
			delay: this.timeLeft
		});

		// display score and timer
		this.scoreConfig = {
			fontFamily: 'Courier',
			fontSize: '18px',
			backgroundColor: 'transparent',
			color: '#fff',
			align: 'right',
			padding: {
			top: 5,
			bottom: 5,
			},
			width: 'flex'
		}

		this.timerConfig = {
			fontFamily: 'Courier',
			fontSize: '24px',
			backgroundColor: 'transparent',
			color: '#fff',
			align: 'right',
			padding: {
			top: 5,
			bottom: 5,
			},
			fixedWidth: 100
		}

		this.gameOverConfig = {
			fontFamily: 'Courier',
			fontSize: '24px',
			backgroundColor: 'transparent',
			color: '#fff',
			align: 'right',
			padding: {
			top: 5,
			bottom: 5,
			},
			width: 'flex'
		}

		this.highScoreConfig = {
			fontFamily: 'Courier',
			fontSize: '18px',
			backgroundColor: 'transparent',
			color: '#fff',
			align: 'right',
			padding: {
			top: 5,
			bottom: 5,
			},
			width: 'flex'
		}

		this.scoreLeft = this.add.text(
			borderUISize + borderPadding, 
			borderUISize + borderPadding, 
			`Score: ${this.p1Score}`, 
			this.scoreConfig)

		this.timerRight = this.add.text(
			borderUISize + borderPadding + game.config.width / 1.4, 
			borderUISize + borderPadding * 2, 
			this.timer, 
			this.timerConfig)
		
		this.highScoreUI = this.add.text(
			borderUISize + borderPadding, 
			borderUISize + borderPadding + 15, 
			`High Score: ${highScore}`, 
			this.highScoreConfig)
	}

	update() {
		let timeElapsed = this.timeHandler.getElapsedSeconds();
		let timeLeft = (this.timeLeft / 1000) - timeElapsed;
		this.timerRight.text = timeLeft;
		this.isGameOver(timeLeft);
		// check key input for restart
		if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
			this.scene.restart()
		}
		if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
			this.scene.start("menuScene")
		  }
		
		if (keyLEFT.isDown) {
			this.starfield.tilePositionX -= this.p1Rocket.moveSpeed + .5
		}
		else if (keyRIGHT.isDown) {
			this.starfield.tilePositionX += this.p1Rocket.moveSpeed - .5
		}
		else {
			this.starfield.tilePositionX -= 1;
		}
		
		if(!this.gameOver) {               
			this.p1Rocket.update()         // update rocket sprite
			this.ship01.update()           // update spaceships (x3)
			this.ship02.update()
			this.ship03.update()
		} 
	
		// check collisions
		if(this.checkCollision(this.p1Rocket, this.ship03)) {
			this.p1Rocket.reset()
			this.shipExplode(this.ship03)
			
			
		}
		if (this.checkCollision(this.p1Rocket, this.ship02)) {
			this.p1Rocket.reset()
			this.shipExplode(this.ship02)

			
		}
		if (this.checkCollision(this.p1Rocket, this.ship01)) {
			this.p1Rocket.reset()
			this.shipExplode(this.ship01)
		}

		this.checkOutOfBounds(this.p1Rocket);
			
	}

	checkOutOfBounds(rocket) {
		if (rocket.y <= borderUISize * 3 + borderPadding) {
			rocket.reset();
			this.timeLeft += -10 * 1000;
			this.timeHandler.delay = this.timeLeft;
		}
	}
	checkCollision(rocket, ship) {
		// simple AABB checking

		if (rocket.x < ship.x + ship.width && 
		  rocket.x + rocket.width > ship.x && 
		  rocket.y < ship.y + ship.height &&
		  rocket.height + rocket.y > ship. y) {
			return true
		} 
		else {
		  return false
		}
	  }

	  shipExplode(ship) {
		// temporarily hide ship
		ship.alpha = 0
		// create explosion sprite at ship's position
		let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
		boom.anims.play('explode')             // play explode animation
		boom.on('animationcomplete', () => {   // callback after anim completes
		  ship.reset()                         // reset ship position
		  ship.alpha = 1                       // make ship visible again
		  boom.destroy()                       // remove explosion sprite
		})
		this.sound.play('sfx-explosion')
		// score add and text update
		this.p1Score += ship.points
		this.scoreLeft.text = `Score: ${this.p1Score}`
		if (this.p1Score > highScore) {
			highScore = this.p1Score;
			this.highScoreUI.text = `High Score: ${highScore}`;
		}
		
		this.timeLeft += ship.points * 1000;
		this.timeHandler.delay = this.timeLeft;
	  }

	  // GAME OVER 
	  isGameOver(currentTime) {
		this.scoreConfig.fixedWidth = 0
		if (currentTime <= 0) {
			this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.gameOverConfig).setOrigin(0.5)
			this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', this.gameOverConfig).setOrigin(0.5)
			this.gameOver = true
		}
		else {
			this.gameOver = false;
		}
	}
}
