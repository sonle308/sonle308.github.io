
BasicGame.Confirm = function (game) {
	this.background = null;
	this.music;
	this.select = null

	this.playButtonReimu = null;
	this.playButtonMarisa = null;
	this.nameReimu = null;
	this.nameMarisa = null;

};

BasicGame.Confirm.prototype = {

	create: function () {
		this.select = this.game.add.audio('seSelect');
		this.background = this.add.sprite(0, 0, 'preGameBackground');
		this.playButtonReimu = this.add.button(600, 150, 'reimu-select-button', this.startGameReimu, this);
		this.playButtonReimu.onInputOver.add(this.overReimu, this);
		this.playButtonReimu.onInputOut.add(this.outReimu, this);
		this.playButtonMarisa = this.add.button(600, 250, 'marisa-select-button', this.startGameMarisa, this);
		this.playButtonMarisa.onInputOver.add(this.overMarisa, this);
		this.playButtonMarisa.onInputOut.add(this.outMarisa, this);
		this.nameReimu = this.add.sprite(50, 50, 'reimu-select-name');
		this.nameReimu.alpha = 0;
		this.nameMarisa = this.add.sprite(50, 50, 'marisa-select-name');
		this.nameMarisa.alpha = 0;
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGameReimu: function (pointer) {
		this.music.stop();
		this.select.play();
		this.game.state.start('GameReimu');

	},

	startGameMarisa: function (pointer) {
		this.music.stop();
		this.select.play();
		this.game.state.start('GameMarisa');

	},

	overReimu: function() {
		this.nameReimu.alpha = 1;
	},

	outReimu: function() {
		this.nameReimu.alpha = 0;
	},

	overMarisa: function() {
		this.nameReimu.alpha = 1;
	},

	outMarisa: function() {
		this.nameMarisa.alpha = 0;
	}

};
