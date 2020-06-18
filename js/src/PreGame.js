
BasicGame.PreGame = function (game) {
	this.background = null;
	this.music;
	this.seSelect = null

	this.playButtonReimu = null;
	this.playButtonMarisa = null;
	this.playButtonYoumu = null;
//	this.playButtonSakuya = null;
//	this.playButtonAya = null;
	this.playButtonRandom = null;
	this.nameReimu = null;
	this.nameMarisa = null;
	this.nameYoumu = null;
//	this.nameSakuya = null;
//	this.nameAya = null;
	this.nameRandom = null;
	this.reimuImg = null;
	this.marisaImg = null;
	this.youmuImg = null;
//	this.sakuyaImg = null;
//	this.ayaImg = null;
	this.randomImg = null;
	this.arrowImg = null;
	this.cursors = null;
	this.selectButton = null;
	this.delay = 0;
	this.key = 0;
	this.valueKey = 0;
};

BasicGame.PreGame.prototype = {

	create: function () {
		this.seSelect = this.game.add.audio('seSelect');
		this.background = this.add.sprite(0, 0, 'preGameBackground');
		this.playButtonRandom = this.add.sprite(600, 80, 'random-select-button');
		this.playButtonReimu = this.add.sprite(600, 160, 'reimu-select-button');
		this.playButtonMarisa = this.add.sprite(600, 240, 'marisa-select-button');
		this.playButtonYoumu = this.add.sprite(600, 320, 'youmu-select-button');
//		this.playButtonSakuya = this.add.sprite(600, 400, 'sakuya-select-button');
//		this.playButtonAya = this.add.sprite(600, 480, 'aya-select-button');
		this.nameRandom = this.add.sprite(100, 20, 'random-select-name');
		this.nameRandom.alpha = 0;
		this.nameReimu = this.add.sprite(50, 20, 'reimu-select-name');
		this.nameReimu.alpha = 0;
		this.nameMarisa = this.add.sprite(50, 20, 'marisa-select-name');
		this.nameMarisa.alpha = 0;
		this.nameYoumu = this.add.sprite(50, 20, 'youmu-select-name');
		this.nameYoumu.alpha = 0;
//		this.nameSakuya = this.add.sprite(50, 20, 'sakuya-select-name');
//		this.nameSakuya.alpha = 0;
//		this.nameAya = this.add.sprite(50, 20, 'aya-select-name');
//		this.nameAya.alpha = 0;		
		this.randomImg = this.add.sprite(125, 200, 'random-img');
		this.randomImg.alpha = 0;
		this.marisaImg = this.add.sprite(85, 150, 'marisa-img');
		this.marisaImg.alpha = 0;
		this.reimuImg = this.add.sprite(30, 150, 'reimu-img');
		this.reimuImg.alpha = 0;
		this.youmuImg = this.add.sprite(30, 150, 'youmu-img');
		this.youmuImg.alpha = 0;
//		this.sakuyaImg = this.add.sprite(80, 150, 'sakuya-img');
//		this.sakuyaImg.alpha = 0;
//		this.ayaImg = this.add.sprite(80, 150, 'aya-img');
//		this.ayaImg.alpha = 0;
		this.arrowImg = this.add.sprite(500, 80, 'arrow-img');
		this.arrowImg.alpha = 0;
		this.game.add.tween(this.arrowImg).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.selectButton = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
	},

	update: function () {
		if (this.cursors.up.isDown)
	    {
	        if (this.game.time.now > this.delay) {
	            if(this.arrowImg.y < 160) {
	                this.arrowImg.y = 400;
	                this.key = 4;
	            }
	            else {
	                this.arrowImg.y -= 80;
	                this.delay = this.game.time.now + 200;
	                this.key-=1;
	            }
	            this.seSelect.play();
	        }
	    }
	    else if (this.cursors.down.isDown)
	    {
	        if (this.game.time.now > this.delay) {
	            if(this.arrowImg.y > 240) {
	                this.arrowImg.y = 0;
	                this.key = -1;
	            }
	            else {
	                this.arrowImg.y += 80;
	                this.delay = this.game.time.now + 200;
	                this.key+=1;
	            }
	            this.seSelect.play();
	        }
	    }
	    if(this.selectButton.isDown) {
	    	if(this.valueKey == 1) {
	    		this.startGameReimu();
	    	}
	    	if(this.valueKey == 2) {
	    		this.startGameMarisa();
	    	}
	    	if(this.valueKey == 3) {
	    		this.startGameYoumu();
	    	}
//	    	if(this.valueKey == 4) {
//	    		this.startGameSakuya();
//	    	}
//	    	if(this.valueKey == 5) {
//	    		this.startGameAya();
//	    	}
	    }
	    if (this.arrowImg.y == 80) {
	    	this.key = 0;
	    	this.playButtonRandom.x = 580;
	    	this.playButtonReimu.x = 600;
	    	this.playButtonMarisa.x = 600;
	    	this.playButtonYoumu.x = 600;
//	    	this.playButtonSakuya.x = 600;
//	    	this.playButtonAya.x = 600;
	    }
	    if (this.arrowImg.y == 160) {
	    	this.key = 1;
	    	this.playButtonRandom.x = 600;
	    	this.playButtonReimu.x = 580;
	    	this.playButtonMarisa.x = 600;
	    	this.playButtonYoumu.x = 600;
//	    	this.playButtonSakuya.x = 600;
//	    	this.playButtonAya.x = 600;
	    }
	    if (this.arrowImg.y == 240) {
	    	this.key = 2;
	    	this.playButtonRandom.x = 600;
	    	this.playButtonReimu.x = 600;
	    	this.playButtonMarisa.x = 580;
	    	this.playButtonYoumu.x = 600;
//	    	this.playButtonSakuya.x = 600;
//	    	this.playButtonAya.x = 600;
	    }
	    if (this.arrowImg.y == 320) {
	    	this.key = 3;
	    	this.playButtonRandom.x = 600;
	    	this.playButtonReimu.x = 600;
	    	this.playButtonMarisa.x = 600;
	    	this.playButtonYoumu.x = 580;
//	    	this.playButtonSakuya.x = 600;
//	    	this.playButtonAya.x = 600;
	    }
//	    if (this.arrowImg.y == 400) {
//	    	this.playButtonRandom.x = 600;
//	    	this.playButtonReimu.x = 600;
	    // 	this.playButtonMarisa.x = 600;
	    // 	this.playButtonYoumu.x = 600;
	    // 	this.playButtonSakuya.x = 580;
	    // 	this.playButtonAya.x = 600;
	    // 	this.key = 4;
	    // }
	    // if (this.arrowImg.y == 480) {
	    // 	this.key = 5;
	    // 	this.playButtonRandom.x = 600;
	    // 	this.playButtonReimu.x = 600;
	    // 	this.playButtonMarisa.x = 600;
	    // 	this.playButtonYoumu.x = 600;
	    // 	this.playButtonSakuya.x = 600;
	    // 	this.playButtonAya.x = 580;
	    // }
	    if (this.key == 0) {
	    	this.nameRandom.alpha = 1;
	    	this.randomImg.alpha = 1;
	    	this.nameReimu.alpha = 0;
	    	this.reimuImg.alpha = 0;
	    	this.nameMarisa.alpha = 0;
	    	this.marisaImg.alpha = 0;
	    	this.nameYoumu.alpha = 0;
	    	this.youmuImg.alpha = 0;
	    	// this.nameSakuya.alpha = 0;
	    	// this.sakuyaImg.alpha = 0;
	    	// this.nameAya.alpha = 0;
	    	// this.ayaImg.alpha = 0;
	    	this.valueKey = this.game.rnd.integerInRange(1,3);
	    }
	    if (this.key == 1) {
	    	this.nameRandom.alpha = 0;
	    	this.randomImg.alpha = 0;
	    	this.nameReimu.alpha = 1;
	    	this.reimuImg.alpha = 1;
	    	this.nameMarisa.alpha = 0;
	    	this.marisaImg.alpha = 0;
	    	this.nameYoumu.alpha = 0;
	    	this.youmuImg.alpha = 0;
	    	// this.nameSakuya.alpha = 0;
	    	// this.sakuyaImg.alpha = 0;
	    	// this.nameAya.alpha = 0;
	    	// this.ayaImg.alpha = 0;
	    	this.valueKey = 1;
	    }
	    if (this.key == 2) {
	    	this.nameRandom.alpha = 0;
	    	this.randomImg.alpha = 0;
	    	this.nameReimu.alpha = 0;
	    	this.reimuImg.alpha = 0;
	    	this.nameMarisa.alpha = 1;
	    	this.marisaImg.alpha = 1;
	    	this.nameYoumu.alpha = 0;
	    	this.youmuImg.alpha = 0;
	    	// this.nameSakuya.alpha = 0;
	    	// this.sakuyaImg.alpha = 0;
	    	// this.nameAya.alpha = 0;
	    	// this.ayaImg.alpha = 0;
	    	this.valueKey = 2;
	    }
	    if (this.key == 3) {
	    	this.nameRandom.alpha = 0;
	    	this.randomImg.alpha = 0;
	    	this.nameReimu.alpha = 0;
	    	this.reimuImg.alpha = 0;
	    	this.nameMarisa.alpha = 0;
	    	this.marisaImg.alpha = 0;
	    	this.nameYoumu.alpha = 1;
	    	this.youmuImg.alpha = 1;
	    	// this.nameSakuya.alpha = 0;
	    	// this.sakuyaImg.alpha = 0;
	    	// this.nameAya.alpha = 0;
	    	// this.ayaImg.alpha = 0;
	    	this.valueKey = 3;
	    }
	    // if (this.key == 4) {
	    // 	this.nameRandom.alpha = 0;
	    // 	this.randomImg.alpha = 0;
	    // 	this.nameReimu.alpha = 0;
	    // 	this.reimuImg.alpha = 0;
	    // 	this.nameMarisa.alpha = 0;
	    // 	this.marisaImg.alpha = 0;
	    // 	this.nameYoumu.alpha = 0;
	    // 	this.youmuImg.alpha = 0;
	    // 	this.nameSakuya.alpha = 1;
	    // 	this.sakuyaImg.alpha = 1;
	    // 	this.nameAya.alpha = 0;
	    // 	this.ayaImg.alpha = 0;
	    // 	this.valueKey = 4;
	    // }
	    // if (this.key == 5) {
	    // 	this.nameRandom.alpha = 0;
	    // 	this.randomImg.alpha = 0;
	    // 	this.nameReimu.alpha = 0;
	    // 	this.reimuImg.alpha = 0;
	    // 	this.nameMarisa.alpha = 0;
	    // 	this.marisaImg.alpha = 0;
	    // 	this.nameYoumu.alpha = 0;
	    // 	this.youmuImg.alpha = 0;
	    // 	this.nameSakuya.alpha = 0;
	    // 	this.sakuyaImg.alpha = 0;
	    // 	this.nameAya.alpha = 1;
	    // 	this.ayaImg.alpha = 1;	 
	    // 	this.valueKey = 5;   	
	    // }
	},

	startGameReimu: function () {
		this.music.stop();
		this.game.state.start('GameReimu');
	},

	startGameMarisa: function () {
		this.music.stop();
		this.game.state.start('GameMarisa');
	},

	startGameYoumu: function () {
		this.music.stop();
		this.game.state.start('GameYoumu');
	},

	// startGameSakuya: function () {
	// 	this.music.stop();
	// 	this.game.state.start('GameSakuya');
	// },

	// startGameAya: function () {
	// 	this.music.stop();
	// 	this.game.state.start('GameAya');
	// }
};
