
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.loading = null;
	this.msg = "Loading";
	this.dotCounter = 0;
	this.dotMax = 7;
	this.updateEvery = 15 // frames

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {
		this.game.stage.backgroundColor =  0x333333;
		this.background = this.add.sprite(20, 100, 'preloaderBackground');
		this.loading = this.game.add.text(250, 200, this.msg, { font: '30px Arial', fill: '#fff' });
		this.preloadBar = this.add.sprite(250, 250, 'loadingBar');
		this.load.setPreloadSprite(this.preloadBar);
        this.load.image('marisa-aura', 'assets/img/marisa-aura.png');
        this.load.image('reimu-aura', 'assets/img/reimu-aura.png');
        this.load.image('youmu-aura', 'assets/img/youmu-aura.png');
        this.load.image('hitboxR', 'assets/img/hitboxR.png');
        this.load.image('hitboxM', 'assets/img/hitboxM.png');
		this.load.spritesheet('marisa', 'assets/img/Marisa.png', 40, 55);
		this.load.spritesheet('reimu', 'assets/img/Reimu.png', 40, 60);
		this.load.spritesheet('youmu', 'assets/img/Youmu.png', 40, 60);
		this.load.image('marisa-img', 'assets/img/marisa-img.png');
		this.load.image('reimu-img', 'assets/img/reimu-img.png');
		this.load.image('youmu-img', 'assets/img/youmu-img.png');
		this.load.image('sakuya-img', 'assets/img/sakuya-img.png');
		this.load.image('aya-img', 'assets/img/aya-img.png');
		this.load.image('random-img', 'assets/img/random-img.png');
	    this.load.image('background', 'assets/img/BG.png');
	    this.load.image('score-table', 'assets/img/score-table.png');
	    this.load.image('bulletM', 'assets/img/bulletM.png');
	    this.load.spritesheet('sbulletM', 'assets/img/SBulletM.png', 14, 12);
	    this.load.image('bulletR', 'assets/img/bulletR.png');
	    this.load.spritesheet('sbulletR', 'assets/img/SBulletR.png', 32, 30);
	    this.load.spritesheet('sbulletY', 'assets/img/SBulletY.png', 128, 256);
	    this.load.image('bulletY', 'assets/img/bulletY.png');
	    this.load.image('eLuna', 'assets/img/eLuna.png');
	    this.load.image('eSunny', 'assets/img/eSunny.png');
	    this.load.image('eStar', 'assets/img/eStar.png');
	    this.load.image('Mini-Hakkero', 'assets/img/Mini-Hakkero.png');
	    this.load.spritesheet('Yin-Yang-Orb', 'assets/img/Yin-Yang-Orb.png', 25, 25);
	    this.load.spritesheet('Myon', 'assets/img/Myon.png', 40, 33);
	    this.load.image('star', 'assets/img/star.png');
	    this.load.spritesheet('explosion', 'assets/img/explode.png', 128, 128);
	    this.load.spritesheet('explosion-bullet', 'assets/img/explode-bullet.png', 65, 65);
	    this.load.spritesheet('fairysprite1', 'assets/img/fairysprite1.png', 30, 26);
	    this.load.spritesheet('fairysprite2', 'assets/img/fairysprite2.png', 31, 29);
	    this.load.spritesheet('fairysprite3', 'assets/img/fairysprite3.png', 33, 27);
	    this.load.spritesheet('fairysprite4', 'assets/img/fairysprite4.png', 47, 41);
	    this.load.spritesheet('bullet1', 'assets/img/bullet1.png', 16, 16);
	    this.load.spritesheet('masterspark', 'assets/img/Masterspark.png', 240, 192);
	    this.load.audio('seShot', 'assets/music/seShot.wav');
	    this.load.audio('sePlayerHit', 'assets/music/sePlayerHit.wav');
	    this.load.audio('seThemeMarisa', 'assets/music/seThemeMarisa.mp3');
	    this.load.audio('seThemeReimu', 'assets/music/seThemeReimu.mp3');
	    this.load.audio('seThemeYoumu', 'assets/music/seThemeYoumu.mp3');
	    this.load.audio('seEnemyDeath', 'assets/music/seEnemyDeath.wav');
	    this.load.audio('seSpark', 'assets/music/seSpark.wav');
	    this.load.audio('seCharge', 'assets/music/seCharge.wav');
	    this.load.audio('seSlash', 'assets/music/seSlash.wav');
	    this.load.audio('seSelect', 'assets/music/se_menu_select.wav');
	    this.load.bitmapFont('font', 'assets/font/font.png', 'assets/font/font.xml');  
	    this.load.image('mainMenuBackground', 'assets/img/mainMenuBackground.jpg');
	    this.load.image('preGameBackground', 'assets/img/preGameBackground.jpg');
	    this.load.image('start', 'assets/img/start.png');
	    this.load.image('gameover', 'assets/img/gameover.png');
	    this.load.image('arrow-img', 'assets/img/arrow-img.png');
	    this.load.image('marisa-select-button', 'assets/img/marisa-select-button.png');
	    this.load.image('reimu-select-button', 'assets/img/reimu-select-button.png');
	    this.load.image('youmu-select-button', 'assets/img/youmu-select-button.png');
	    this.load.image('sakuya-select-button', 'assets/img/sakuya-select-button.png');
	    this.load.image('aya-select-button', 'assets/img/aya-select-button.png');
	    this.load.image('random-select-button', 'assets/img/random-select-button.png');
	    this.load.image('retry-select-button', 'assets/img/retry-select-button.png');
	    this.load.image('mainmenu-select-button', 'assets/img/mainmenu-select-button.png');
	    this.load.image('marisa-select-name', 'assets/img/marisa-select-name.png');
	    this.load.image('reimu-select-name', 'assets/img/reimu-select-name.png');
	    this.load.image('youmu-select-name', 'assets/img/youmu-select-name.png');
	    this.load.image('sakuya-select-name', 'assets/img/sakuya-select-name.png');
	    this.load.image('aya-select-name', 'assets/img/aya-select-name.png');
	    this.load.image('random-select-name', 'assets/img/random-select-name.png');
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

        //this.game.state.start('MainMenu');

	},

	update: function () {
		this.loading.text = this.msg + (".").repeat(Math.floor(this.dotCounter))
    	this.dotCounter =  (this.dotCounter+1/this.updateEvery)%(this.dotMax+1)
		
		if (this.cache.isSoundDecoded('seThemeMarisa') && this.cache.isSoundDecoded('seThemeYoumu') && this.cache.isSoundDecoded('seThemeReimu') && this.ready == false)
		{
			this.ready = true;
			this.game.state.start('MainMenu');
		}
		

	}

};
