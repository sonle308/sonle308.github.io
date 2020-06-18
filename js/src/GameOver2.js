
BasicGame.GameOver2 = function (game) {
    this.stageLevel;
    this.playButtonRetry = null;
    this.playButtonMainMenu = null;
    this.arrowImg = null;
    this.cursors = null;
    this.selectButton = null;
    this.delay = 0;
    this.key = 0;
    this.valueKey = 0;
};

BasicGame.GameOver2.prototype = {

	create: function () {
        this.seSelect = this.game.add.audio('seSelect');
        this.playButtonRetry = this.add.sprite(this.game.world.centerX, 250, 'retry-select-button');
        this.playButtonRetry.anchor.setTo(0.5, 0.5);
        this.playButtonMainMenu = this.add.sprite(this.game.world.centerX, 350, 'mainmenu-select-button');
        this.playButtonMainMenu.anchor.setTo(0.5, 0.5);
        this.arrowImg = this.add.sprite(150, 250, 'arrow-img');
        this.arrowImg.alpha = 0;
        this.arrowImg.anchor.setTo(0.5, 0.5);
        this.game.add.tween(this.arrowImg).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.selectButton = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
	},

	update: function () {
        if (this.cursors.up.isDown)
        {
            if (this.game.time.now > this.delay) {
                if(this.arrowImg.y < 350) {
                    this.arrowImg.y = 450;
                }
                else {
                    this.arrowImg.y -= 100;
                    this.delay = this.game.time.now + 200;
                }
                this.seSelect.play();
            }
        }
        else if (this.cursors.down.isDown)
        {
            if (this.game.time.now > this.delay) {
                if(this.arrowImg.y > 250) {
                    this.arrowImg.y = 150;
                }
                else {
                    this.arrowImg.y += 100;
                    this.delay = this.game.time.now + 200;
                }
                this.seSelect.play();
            }
        }
        if (this.arrowImg.y == 250) {
            this.key = this.stageLevel;
        }
        else if (this.arrowImg.y == 350) {
            this.key = 100;
        }
        if(this.selectButton.isDown) {
            if(this.key == 1) {
                this.startGameReimu();
            }
            if(this.key == 2) {
                this.startGameMarisa();
            }
            if(this.key == 3) {
                this.startGameYoumu();
            }
            if(this.key == 4) {
                this.startGameSakuya();
            }
            if(this.key == 5) {
                this.startGameAya();
            }
            if(this.key == 100) {
                this.startMainMenu();
            }
        }
	},

    startGameReimu: function () {
        this.game.state.start('GameReimu');
    },

    startGameMarisa: function () {
        this.game.state.start('GameMarisa');
    },

    startGameYoumu: function () {
        this.game.state.start('GameYoumu');
    },

    startGameSakuya: function () {
        this.game.state.start('GameSakuya');
    },

    startGameAya: function () {
        this.game.state.start('GameAya');
    },

    startMainMenu: function () {
        this.game.state.start('PreGame');
    }

};
