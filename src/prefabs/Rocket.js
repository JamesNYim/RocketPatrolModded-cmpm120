class Rocket extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
		scene.add.existing(this);
		this.isFiring = false;
		this.moveSpeed = 2;
		this.sfxShot1 = scene.sound.add('sfx-shot1')
		this.sfxShot2 = scene.sound.add('sfx-shot2')
		this.sfxShot3 = scene.sound.add('sfx-shot3')
		this.sfxShot4 = scene.sound.add('sfx-shot4')
		this.hasHit = false;
	}

	update() {
		// left & right movement
		if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
			this.x -= this.moveSpeed;
		}
		else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
			this.x += this.moveSpeed;
			}

		// Shooting
		if (Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
			this.isFiring = true;
			this.randomLaserSound();
		}
		if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
			this.y -= this.moveSpeed;
		}

		//reset on miss
		//if (this.y <= borderUISize * 3 + borderPadding) {
		//	this.reset();
		//}
	}

	reset() {
		this.isFiring = false;
		this.y = game.config.height - borderUISize - borderPadding;
	}

	randomLaserSound() {
		let laserArray = [this.sfxShot1, this.sfxShot2,this.sfxShot3,this.sfxShot4];
		this.sfxShot = laserArray[Math.floor(Math.random() * 4)]
		this.sfxShot.play();
	}
}