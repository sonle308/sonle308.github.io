
BasicGame.GameOver = function (game) {
    this.stageLevel;
    this.gameOverText = null;
    this.highScoreText = null;
    this.playButtonRetry = null;
    this.playButtonMainMenu = null;
    this.arrowImg = null;
    this.cursors = null;
    this.selectButton = null;
    this.delay = 0;
    this.key = 0;
    this.valueKey = 0;
    this.highscore;
};

BasicGame.GameOver.prototype = {

	create: function () {
        this.seSelect = this.game.add.audio('seSelect');
		this.gameOverText = this.add.sprite(this.game.world.centerX, 200, 'gameover');
        this.gameOverText.anchor.setTo(0.5, 0.5);
        this.state.states['GameOver2'].stageLevel = this.stageLevel;
        this.highScoreText = this.game.add.bitmapText(this.game.world.centerX, 300, 'font', '', 50);
        this.highScoreText.anchor.setTo(0.5, 0.5);
        this.highScoreText.text = 'HighScore: ' + this.highscore;
        this.selectButton = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.selectButton.onUp.add(this.next, this);
	},

	update: function () {

	},

    next: function () {
        this.game.state.start('GameOver2');
    }
};
