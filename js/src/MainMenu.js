
BasicGame.MainMenu = function (game) {
	this.background = null;
	this.mainMenuTheme = null;
	this.seSelect = null
	this.playButton = null;
	this.arrowImgL = null;
	this.arrowImgR = null;
	this.selectButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.mainMenuTheme = this.game.add.audio('mainMenuTheme');
		this.mainMenuTheme.volume = 0.8;
		this.mainMenuTheme.loop = true;
		this.mainMenuTheme.play();
		this.seSelect = this.game.add.audio('seSelect');
		this.background = this.add.sprite(0, 0, 'mainMenuBackground');
		this.playButton = this.add.sprite(213, 200, 'start');
		this.state.states['PreGame'].music = this.mainMenuTheme;
		this.arrowImgL = this.add.sprite(90, 220, 'arrow-img');
		this.arrowImgL.alpha = 0;
		this.arrowImgL.scale.x = 1.3;
		this.arrowImgL.scale.y = 1.3;
		this.arrowImgR = this.add.sprite(700, 220, 'arrow-img');
		this.arrowImgR.alpha = 0;
		this.arrowImgR.scale.x = -1.3;
		this.arrowImgR.scale.y = 1.3;
		this.game.add.tween(this.arrowImgL).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
		this.game.add.tween(this.arrowImgR).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
		this.selectButton = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
	},

	update: function () {
		if(this.selectButton.isDown) {
			this.startGame();
		}
	},

	startGame: function () {
		this.seSelect.play();
		this.game.state.start('PreGame');
	}

	
};
