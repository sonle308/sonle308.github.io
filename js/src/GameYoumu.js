BasicGame.GameYoumu = function (game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.youmu;
    this.player;
    this.player1;
    this.player2;
    this.player3;
    this.player4;
    this.player5;
    this.bomb;
    this.bomb1;
    this.bomb2;
    this.bomb3;
    this.hitbox;
    this.youmuSpeed;
    this.deathTime = 0;
    this.score;
    this.scoreText;
    this.scorePoint;
    this.killed;
    this.killedText;
    this.background;
    this.scoreTable;
    this.aura;
    this.cursors;
    this.shoot;
    this.spellCard;
    this.spellCardQuanity;
    this.masterspark;
    this.activeMasterspark = false;
    this.timeMasterspark = 0;
    this.timeMastersparkDelay = 0;
    this.mastersparkWidth = 0;
    this.mastersparkHeight = 0;
    this.targetMode;
    this.checkMode;
    this.seTheme;
    this.seShot;
    this.sePlayerHit;
    this.seEnemyDeath;
    this.seSpark;
    this.bulletTimer = 0;
    this.youmuBullets;
    this.youmuBullet;
    this.youmuSBullet;
    this.youmuSBullets;
    this.BULLET_SPEED = 1200;
    this.BULLET_SPACING = 100;
    this.angle;
    this.luna;
    this.lunaBullet;
    this.lunaBullets;
    this.sunny;
    this.sunnyBullet;
    this.sunnyBullets;
    this.star;
    this.starBullet;
    this.starBullets;
    this.explosions;
    this.youmu0;
    this.myon1;
    this.myon2;
    this.myon3;
    this.myon4;
    this.bossTimeAppear = 0;
    this.waveFairy1;
    this.waveFairy2;
    this.waveFairy3;
    this.fairy3Bullet;
    this.fairy3Bullets;
    this.waveFairy4;
    this.waveFairy5;
    this.chargeTimer;
    this.seCharge;
    this.seSlash;
};

BasicGame.GameYoumu.prototype = {
    create: function () {
        this.killed = 0;
        this.score = 0;
        this.spellCardQuanity = 2;
        this.state.states['GameOver'].stageLevel = 3;
        // Boss time
        this.bossTimeAppear = this.game.time.now + 183000;
        // Background
        background = this.game.add.tileSprite(0, 0, 500, 600, 'background');
        background.alpha = 1;

        // Sound
        this.seTheme = this.game.add.audio('seThemeYoumu');
        this.seTheme.volume = 0.9;
        this.seTheme.loop = true;
        this.seShot = this.game.add.audio('seShot');
        this.seShot.volume = 0.8;
        this.sePlayerHit = this.game.add.audio('sePlayerHit');
        this.sePlayerHit.volume = 0.1;
        this.seEnemyDeath = this.game.add.audio('seEnemyDeath');
        this.seEnemyDeath.volume = 1;
        this.seSpark = this.game.add.audio('seSpark');
        this.seSpark.volume = 0.5;
        this.seCharge = this.game.add.audio('seCharge');
        this.seCharge.volume = 0.8;
        this.seSlash = this.game.add.audio('seSlash');
        this.seSlash.volume = 0.8;

        // youmu's Special Bullet group
        this.youmuSBullets = this.game.add.group();
        this.youmuSBullets.enableBody = true;
        this.youmuSBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.youmuSBullets.createMultiple(2, 'sbulletY');
        this.youmuSBullets.setAll('anchor.x', 0.5);
        this.youmuSBullets.setAll('anchor.y', 0.5);
        this.youmuSBullets.setAll('outOfBoundsKill', true);
        this.youmuSBullets.setAll('checkWorldBounds', true);

        this.youmuSBullets.callAll('animations.add', 'animations', 'shoot', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 60, true);
        // youmu aura
        this.aura = this.game.add.sprite(250, 500, 'youmu-aura');
        this.aura.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.aura, Phaser.Physics.ARCADE);
        this.aura.body.enable = true;

        // youmu's bullet group
        this.youmuBullets = this.game.add.group();
        this.youmuBullets.enableBody = true;
        this.youmuBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.youmuBullets.createMultiple(40, 'bulletY');
        this.youmuBullets.setAll('anchor.x', 0.5);
        this.youmuBullets.setAll('anchor.y', 1);
        this.youmuBullets.setAll('outOfBoundsKill', true);
        this.youmuBullets.setAll('checkWorldBounds', true);
        this.youmuBullets.forEach(function(enemy){
            enemy.body.setSize(8, 16);
        });        

        // Wave Fairy1
        this.waveFairy1 = this.game.add.group();
        this.waveFairy1.enableBody = true;
        this.waveFairy1.physicsBodyType = Phaser.Physics.ARCADE;
        this.waveFairy1.createMultiple(50, 'fairysprite1');
        this.waveFairy1.setAll('anchor.x', 0.5);
        this.waveFairy1.setAll('anchor.y', 0.5);
        this.waveFairy1.forEach(function(enemy){
            enemy.body.setSize(20, 20);
            enemy.damageAmount = 20;
            enemy.score = 1000;
        });

        // Wave Fairy2
        this.waveFairy2 = this.game.add.group();
        this.waveFairy2.enableBody = true;
        this.waveFairy2.physicsBodyType = Phaser.Physics.ARCADE;
        this.waveFairy2.createMultiple(50, 'fairysprite1');
        this.waveFairy2.setAll('anchor.x', 0.5);
        this.waveFairy2.setAll('anchor.y', 0.5);
        this.waveFairy2.forEach(function(enemy){
            enemy.body.setSize(20, 20);
            enemy.damageAmount = 20;
            enemy.score = 1000;
        });

        // Wave Fairy3
        this.waveFairy3 = this.game.add.group();
        this.waveFairy3.enableBody = true;
        this.waveFairy3.physicsBodyType = Phaser.Physics.ARCADE;
        this.waveFairy3.createMultiple(10, 'fairysprite4');
        this.waveFairy3.setAll('anchor.x', 0.5);
        this.waveFairy3.setAll('anchor.y', 0.5);
        this.waveFairy3.forEach(function(enemy){
            enemy.body.setSize(20, 20);
            enemy.damageAmount = 20;
            enemy.score = 10000;
        });

        // Fairy3's bullets
        this.fairy3Bullets = this.game.add.group();
        this.fairy3Bullets.enableBody = true;
        this.fairy3Bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.fairy3Bullets.createMultiple(100, 'bullet1');
        this.fairy3Bullets.setAll('alpha', 0.9);
        this.fairy3Bullets.setAll('anchor.x', 0.5);
        this.fairy3Bullets.setAll('anchor.y', 0.5);
        this.fairy3Bullets.setAll('outOfBoundsKill', true);
        this.fairy3Bullets.setAll('checkWorldBounds', true);
        this.fairy3Bullets.forEach(function(enemy){
            enemy.body.setSize(10, 10);
        });

        // Wave Fairy4
        this.waveFairy4 = this.game.add.group();
        this.waveFairy4.enableBody = true;
        this.waveFairy4.physicsBodyType = Phaser.Physics.ARCADE;
        this.waveFairy4.createMultiple(10, 'fairysprite3');
        this.waveFairy4.setAll('anchor.x', 0.5);
        this.waveFairy4.setAll('anchor.y', 0.5);
        this.waveFairy4.forEach(function(enemy){
            enemy.body.setSize(20, 20);
            enemy.damageAmount = 20;
            enemy.score = 1000;
        });

        // Wave Fairy5
        this.waveFairy5 = this.game.add.group();
        this.waveFairy5.enableBody = true;
        this.waveFairy5.physicsBodyType = Phaser.Physics.ARCADE;
        this.waveFairy5.createMultiple(50, 'fairysprite3');
        this.waveFairy5.setAll('anchor.x', 0.5);
        this.waveFairy5.setAll('anchor.y', 0.5);
        this.waveFairy5.forEach(function(enemy){
            enemy.body.setSize(20, 20);
            enemy.damageAmount = 20;
            enemy.score = 1000;
        });

        //  Luna
        this.luna = this.game.add.group();
        this.luna.enableBody = true;
        this.luna.physicsBodyType = Phaser.Physics.ARCADE;
        this.luna.createMultiple(5, 'eLuna');
        this.luna.setAll('anchor.x', 0.5);
        this.luna.setAll('anchor.y', 0.5);
        this.luna.setAll('outOfBoundsKill', true);
        this.luna.setAll('checkWorldBounds', true);
        this.luna.forEach(function(enemy){
            enemy.body.setSize(20, 20);
            enemy.damageAmount = 20;
            enemy.score = 10000;
        });

        // Luna's bullets
        this.lunaBullets = this.game.add.group();
        this.lunaBullets.enableBody = true;
        this.lunaBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.lunaBullets.createMultiple(30, 'bullet1');
        this.lunaBullets.setAll('alpha', 0.9);
        this.lunaBullets.setAll('anchor.x', 0.5);
        this.lunaBullets.setAll('anchor.y', 0.5);
        this.lunaBullets.setAll('outOfBoundsKill', true);
        this.lunaBullets.setAll('checkWorldBounds', true);
        this.lunaBullets.forEach(function(enemy){
            enemy.body.setSize(10, 10);
        });

        // Sunny
        this.sunny = this.game.add.group();
        this.sunny.enableBody = true;
        this.sunny.physicsBodyType = Phaser.Physics.ARCADE;
        this.sunny.createMultiple(5, 'eSunny');
        this.sunny.setAll('anchor.x', 0.5);
        this.sunny.setAll('anchor.y', 0.5);
        this.sunny.forEach(function(enemy){
            enemy.body.setSize(20, 20);
            enemy.damageAmount = 20;
            enemy.score = 15000;
        });

        // Sunny's bullets
        this.sunnyBullets = this.game.add.group();
        this.sunnyBullets.enableBody = true;
        this.sunnyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.sunnyBullets.createMultiple(50, 'bullet1');
        this.sunnyBullets.setAll('alpha', 0.9);
        this.sunnyBullets.setAll('anchor.x', 0.5);
        this.sunnyBullets.setAll('anchor.y', 0.5);
        this.sunnyBullets.setAll('outOfBoundsKill', true);
        this.sunnyBullets.setAll('checkWorldBounds', true);
        this.sunnyBullets.forEach(function(enemy){
            enemy.body.setSize(10, 10);
        });

        //  Star
        this.star = this.game.add.group();
        this.star.enableBody = true;
        this.star.physicsBodyType = Phaser.Physics.ARCADE;
        this.star.createMultiple(15, 'eStar');
        this.star.setAll('anchor.x', 0.5);
        this.star.setAll('anchor.y', 0.5);
        this.star.forEach(function(enemy){
            enemy.body.setSize(20, 20);
            enemy.damageAmount = 20;
            enemy.score = 10000;
        });

        // Star's bullets
        this.starBullets = this.game.add.group();
        this.starBullets.enableBody = true;
        this.starBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.starBullets.createMultiple(50, 'bullet1');
        this.starBullets.setAll('alpha', 0.9);
        this.starBullets.setAll('anchor.x', 0.5);
        this.starBullets.setAll('anchor.y', 0.5);
        this.starBullets.setAll('outOfBoundsKill', true);
        this.starBullets.setAll('checkWorldBounds', true);
        this.starBullets.forEach(function(enemy){
            enemy.body.setSize(10, 10);
        });

        this.game.time.events.add(20000, this.launchLunaEnemy, this);
        this.game.time.events.add(30000, this.launchSunnyEnemy, this);
        this.game.time.events.add(40000, this.launchStarEnemy, this);
        this.game.time.events.add(10000, this.lauchWaveFairy1, this);
        this.game.time.events.add(15000, this.lauchWaveFairy2, this);
        this.game.time.events.add(20000, this.lauchWaveFairy3, this);
        this.game.time.events.add(60000, this.lauchWaveFairy4, this);
        this.game.time.events.add(5000, this.lauchWaveFairy5, this);

        //  And some controls to play the game
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.shoot = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.shoot.onUp.add(this.fireSBullet, this);
        this.shoot.onDown.add(this.chargeSBullet, this);
        this.spellCard = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.targetMode = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.targetMode.onUp.add(this.release, this);
        this.targetMode.onDown.add(this.charge, this);

        // Masterspark
        this.masterspark = this.game.add.sprite(this.aura.x, this.aura.y - 370, 'masterspark');
        this.masterspark.angle = -90;
        this.masterspark.scale.x = 2.7;
        this.masterspark.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.masterspark, Phaser.Physics.ARCADE);
        this.masterspark.body.enable = false;
        this.masterspark.damageAmount = 100;
        this.masterspark.animations.add('active', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 20, true);

        // Myon
        this.myon1 = this.game.add.sprite(280, 500, 'Myon');
        this.myon1.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.myon1, Phaser.Physics.ARCADE);
        this.myon1.alpha = 0;
        this.myon1.animations.add('myonAnimation', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);
        this.myon2 = this.game.add.sprite(280, 530, 'Myon');
        this.myon2.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.myon2, Phaser.Physics.ARCADE);
        this.myon2.alpha = 0;
        this.myon2.animations.add('myonAnimation', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);
        this.myon3 = this.game.add.sprite(250, 540, 'Myon');
        this.myon3.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.myon3, Phaser.Physics.ARCADE);
        this.myon3.alpha = 0;
        this.myon3.animations.add('myonAnimation', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);
        this.myon4 = this.game.add.sprite(220, 530, 'Myon');
        this.myon4.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.myon4, Phaser.Physics.ARCADE);
        this.myon4.alpha = 0;
        this.myon4.animations.add('myonAnimation', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);

        // youmu
        this.youmu = this.game.add.sprite(this.aura.x, this.aura.y, 'youmu');
        this.youmu.health = 60;
        this.youmu.weaponLevel = 1;
        this.youmu.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.youmu, Phaser.Physics.ARCADE);
        this.youmu.body.enable = true;

        // Hitbox
        this.hitbox = this.game.add.sprite(this.aura.x, this.aura.y, 'hitboxR');
        this.hitbox.anchor.setTo(0.5, 0.5);
        this.hitbox.scale.x = 0.8;
        this.hitbox.scale.y = 0.8;

        //  An explosion pool when fairy dead
        this.explosions = this.game.add.group();
        this.explosions.enableBody = true;
        this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
        this.explosions.createMultiple(100, 'explosion');
        this.explosions.setAll('anchor.x', 0.5);
        this.explosions.setAll('anchor.y', 0.5);
        this.explosions.forEach( function(explosion) {
            explosion.animations.add('explosion', this);
        });

        //  Explosion of bullet
        this.bulletExplosions = this.game.add.group();
        this.bulletExplosions.enableBody = true;
        this.bulletExplosions.physicsBodyType = Phaser.Physics.ARCADE;
        this.bulletExplosions.createMultiple(100, 'explosion-bullet');
        this.bulletExplosions.setAll('anchor.x', 0.5);
        this.bulletExplosions.setAll('anchor.y', 0.5);
        this.bulletExplosions.forEach( function(explosion) {
            explosion.animations.add('explosion-bullet');
        });

        // youmu animation
        this.youmu.animations.add('normal', [0, 1, 2, 3, 4, 5, 6, 7], 15, true);
        this.youmu.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 15, true);
        this.youmu.animations.add('right', [16, 17, 18, 19, 20, 21, 22, 23], 15, true);

        // Score table
        scoreTable = this.game.add.tileSprite(500, 0, 300, 600, 'score-table');

        //  Score
        var state = this;
        this.scoreText = this.game.add.bitmapText(this.game.world.width - 290, 10, 'font', '', 30);
        this.scoreText.render = function () {
            if(state.score == 0) {
                state.scoreText.text = 'Score 000000000' ;
            }
            else {
                state.scoreText.text = 'Score ' + state.scorePoint;
            }
        };
        this.scoreText.render();

        // Killed
        this.killedText = this.game.add.bitmapText(this.game.world.width - 290, 50, 'font', '', 20);
        this.killedText.render = function () {
            state.killedText.text = 'Killed     ' + state.killed;
        };
        this.killedText.render();

        //  Player alive
        this.player = this.game.add.bitmapText(this.game.world.width - 290, 110, 'font', '', 20);
        this.player.render = function () {
            state.player.text = 'Player ';
        };
        this.player.render();
        this.player1 = this.game.add.sprite(this.game.world.width - 190, 115, 'star');
        this.player1.tint = 0xff0000;
        this.player2 = this.game.add.sprite(this.game.world.width - 165, 115, 'star');
        this.player2.tint = 0xff0000;
        this.player3 = this.game.add.sprite(this.game.world.width - 140, 115, 'star');
        this.player3.tint = 0xff0000;
        this.player4 = this.game.add.sprite(this.game.world.width - 115, 115, 'star');
        this.player4.tint = 0xff0000;
        this.player5 = this.game.add.sprite(this.game.world.width - 90, 115, 'star');
        this.player5.tint = 0xff0000;

        // Bomb
        this.bomb = this.game.add.bitmapText(this.game.world.width - 290, 150, 'font', '', 20);
        this.bomb.render = function () {
            state.bomb.text = 'Spell ';
        };
        this.bomb.render();
        this.bomb1 = this.game.add.sprite(this.game.world.width - 190, 155, 'star');
        this.bomb1.tint = 0x0900ff;
        this.bomb2 = this.game.add.sprite(this.game.world.width - 165, 155, 'star');
        this.bomb2.tint = 0x0900ff;
        this.bomb3 = this.game.add.sprite(this.game.world.width - 140, 155, 'star');
        this.bomb3.tint = 0x0900ff;
        // Play theme
        this.seTheme.play();

    },

    update: function () {
        if(this.youmu.health === 0) {
            this.game.state.start('GameOver');
            this.seTheme.stop();
            this.state.states['GameOver'].highscore = this.score;
        }
        // Show score
        this.showScore();
        this.scoreText.render();
        this.killedText.render();
        //  Scroll the background
        background.tilePosition.y += 1;
        // Reset youmu velocity
        this.youmu.body.velocity.setTo(0, 0);
        this.youmu.body.setSize(5, 5);
        this.hitbox.x = this.aura.x;
        this.hitbox.y = this.aura.y;
        this.myon1.animations.play('myonAnimation');
        this.myon2.animations.play('myonAnimation');
        this.myon3.animations.play('myonAnimation');
        this.myon4.animations.play('myonAnimation');
        this.masterspark.body.setSize(this.mastersparkWidth, this.mastersparkHeight);
        if (this.youmu.health == 100) {
            this.player1.alpha = 1;
            this.player2.alpha = 1;
            this.player3.alpha = 1;
            this.player4.alpha = 1;
            this.player5.alpha = 1;
        }
        if (this.youmu.health == 80) {
            this.player5.alpha = 0;
        }
        if (this.youmu.health == 60) {
            this.player5.alpha = 0;
            this.player4.alpha = 0;
        }
        if (this.youmu.health == 40) {
            this.player5.alpha = 0;
            this.player4.alpha = 0;
            this.player3.alpha = 0;
        }
        if (this.youmu.health == 20) {
            this.player5.alpha = 0;
            this.player4.alpha = 0;
            this.player3.alpha = 0;
            this.player2.alpha = 0;
        }
        if (this.youmu.health == 0) {
            this.player5.alpha = 0;
            this.player4.alpha = 0;
            this.player3.alpha = 0;
            this.player2.alpha = 0;
            this.player1.alpha = 0;
        }
        if (this.spellCardQuanity == 3) {
            this.bomb1.alpha = 1;
            this.bomb2.alpha = 1;
            this.bomb3.alpha = 1;
        }
        if(this.spellCardQuanity == 2) {
            this.bomb3.alpha = 0;
        }
        if(this.spellCardQuanity == 1) {
            this.bomb3.alpha = 0;
            this.bomb2.alpha = 0;
        }
        if(this.spellCardQuanity == 0) {
            this.bomb3.alpha = 0;
            this.bomb2.alpha = 0;
            this.bomb1.alpha = 0;
        }
        if(this.deathTime >= this.game.time.now) {
            this.youmu.alpha = 0.5;
            this.aura.alpha = 0.5;
        }
        if(this.deathTime < this.game.time.now) {
            this.game.physics.arcade.overlap(this.youmu, this.waveFairy1, this.youmuCollide, null, this);
            this.game.physics.arcade.overlap(this.youmu, this.waveFairy2, this.youmuCollide, null, this);
            this.game.physics.arcade.overlap(this.youmu, this.waveFairy3, this.youmuCollide, null, this);
            this.game.physics.arcade.overlap(this.youmu, this.waveFairy4, this.youmuCollide, null, this);
            this.game.physics.arcade.overlap(this.youmu, this.waveFairy5, this.youmuCollide, null, this);
            this.game.physics.arcade.overlap(this.youmu, this.luna, this.youmuCollide, null, this);
            this.game.physics.arcade.overlap(this.youmu, this.sunny, this.youmuCollide, null, this);
            this.game.physics.arcade.overlap(this.youmu, this.star, this.youmuCollide, null, this);
            this.game.physics.arcade.overlap(this.lunaBullets, this.youmu, this.enemyHitsPlayer, null, this);
            this.game.physics.arcade.overlap(this.sunnyBullets, this.youmu, this.enemyHitsPlayer, null, this);
            this.game.physics.arcade.overlap(this.starBullets, this.youmu, this.enemyHitsPlayer, null, this);
            this.game.physics.arcade.overlap(this.fairy3Bullets, this.youmu, this.enemyHitsPlayer, null, this);
            this.youmu.alpha = 1;
            this.aura.alpha = 1;
        }
        //  Reset aura velocity, then check for movement keys
        this.aura.body.velocity.setTo(0, 0);
        this.aura.angle +=2;  
        if (this.cursors.left.isDown && !this.cursors.right.isDown) {
            if(this.aura.x >50){
                //  Move to the left
                this.aura.body.velocity.x = -this.youmuSpeed;
                this.youmu.body.velocity.x = -this.youmuSpeed;
                this.youmu.animations.play('left');
                this.game.physics.arcade.moveToXY(this.myon1, this.youmu.x , this.youmu.y  + 25, 0, 80);
                this.game.physics.arcade.moveToXY(this.myon2, this.youmu.x, this.youmu.y + 25, 0, 180);
                this.game.physics.arcade.moveToXY(this.myon3, this.youmu.x , this.youmu.y + 25, 0, 280);
                this.game.physics.arcade.moveToXY(this.myon4, this.youmu.x, this.youmu.y + 25, 0, 380);
            }
        }
        else if (this.cursors.right.isDown && !this.cursors.left.isDown) {
            if (this.aura.x < 450){
                //  Move to the right
                this.aura.body.velocity.x = this.youmuSpeed;
                this.youmu.body.velocity.x = this.youmuSpeed;
                this.youmu.animations.play('right');
                this.game.physics.arcade.moveToXY(this.myon1, this.youmu.x , this.youmu.y  + 25, 0, 80);
                this.game.physics.arcade.moveToXY(this.myon2, this.youmu.x, this.youmu.y + 25, 0, 180);
                this.game.physics.arcade.moveToXY(this.myon3, this.youmu.x , this.youmu.y + 25, 0, 280);
                this.game.physics.arcade.moveToXY(this.myon4, this.youmu.x, this.youmu.y + 25, 0, 380);
            }
        }
        if (this.cursors.up.isDown && !this.cursors.down.isDown) {
            if(this.aura.y >50){
                //  Move to the top     
                this.aura.body.velocity.y = -this.youmuSpeed;
                this.youmu.body.velocity.y = -this.youmuSpeed;
                this.game.physics.arcade.moveToXY(this.myon1, this.youmu.x , this.youmu.y  + 25, 0, 80);
                this.game.physics.arcade.moveToXY(this.myon2, this.youmu.x, this.youmu.y + 25, 0, 180);
                this.game.physics.arcade.moveToXY(this.myon3, this.youmu.x , this.youmu.y + 25, 0, 280);
                this.game.physics.arcade.moveToXY(this.myon4, this.youmu.x, this.youmu.y + 25, 0, 380);
            }
        }
        else if (this.cursors.down.isDown && !this.cursors.up.isDown) {
            if (this.aura.y < this.game.height - 50){
                //  Move to the bottom
                this.aura.body.velocity.y = this.youmuSpeed;
                this.youmu.body.velocity.y = this.youmuSpeed;
                this.game.physics.arcade.moveToXY(this.myon1, this.youmu.x , this.youmu.y  + 25, 0, 80);
                this.game.physics.arcade.moveToXY(this.myon2, this.youmu.x, this.youmu.y + 25, 0, 180);
                this.game.physics.arcade.moveToXY(this.myon3, this.youmu.x , this.youmu.y + 25, 0, 280);
                this.game.physics.arcade.moveToXY(this.myon4, this.youmu.x, this.youmu.y + 25, 0, 380);
            }
        }
        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.down.isDown && !this.cursors.up.isDown){
            this.youmu.animations.play('normal');
            // this.game.physics.arcade.moveToXY(this.myon1, this.youmu.x + 30, this.youmu.y, 0, 100);
            // this.game.physics.arcade.moveToXY(this.myon2, this.youmu.x + 30, this.youmu.y + 30, 0, 200);
            // this.game.physics.arcade.moveToXY(this.myon3, this.youmu.x , this.youmu.y + 40, 0, 300);
            // this.game.physics.arcade.moveToXY(this.myon4, this.youmu.x - 30, this.youmu.y + 30, 0, 400);
            this.myon1.body.velocity.x = 0;
            this.myon1.body.velocity.y = 0;
            this.myon2.body.velocity.x = 0;
            this.myon2.body.velocity.y = 0;
            this.myon3.body.velocity.x = 0;
            this.myon3.body.velocity.y = 0;
            this.myon4.body.velocity.x = 0;
            this.myon4.body.velocity.y = 0;
        }

        //  Fire bullet
        if (this.youmu.alive && this.shoot.isDown && (this.activeMasterspark === false) && (this.checkMode === false)) {
            this.fireBullet();
        }

        if (this.youmu.alive && this.shoot.isDown && (this.activeMasterspark === false) && (this.checkMode === true) && (this.youmu.weaponLevel == 1)) {
            this.fireBullet();
        }

        // Spell Card
        if (this.youmu.alive && this.spellCard.isDown && (this.game.time.now > this.timeMastersparkDelay) && (this.spellCardQuanity>0)) {
            this.activeMasterspark = true;
            this.timeMasterspark = this.game.time.now + 5000;
            this.timeMastersparkDelay = this.game.time.now + 6000;
            this.masterspark.scale.y = 0; 
            this.mastersparkWidth = 0;
            this.mastersparkHeight = 0;
            this.seSpark.play();
            this.spellCardQuanity--;
        }
        if (this.activeMasterspark === true){
            this.activeSpellCard();
            this.masterspark.body.enable = true;
        }
        if(this.game.time.now > this.timeMasterspark) {
            this.activeMasterspark = false;
        }
        if (this.activeMasterspark === false) {
            this.masterspark.animations.stop();
            this.masterspark.frame = 0;
            this.mastersparkWidth = 0;
            this.mastersparkHeight = 0;
            this.masterspark.body.enable = false;
        }
        // Masterspark
        this.masterspark.x = this.aura.x;
        this.masterspark.y = this.aura.y - 370;

        // Target mode
        if (this.youmu.alive && this.targetMode.isDown) {
            this.youmuSpeed = 150;
            this.checkMode = true;
            this.myon1.x = this.aura.x;
            this.myon1.y = this.aura.y - 40;
            this.myon2.x = this.aura.x;
            this.myon2.y = this.aura.y - 40;
            this.myon3.x = this.aura.x;
            this.myon3.y = this.aura.y - 40;
            this.myon4.x = this.aura.x;
            this.myon4.y = this.aura.y - 40;
            this.hitbox.alpha = this.game.rnd.realInRange(0.5, 1);
        }
        else {
            this.youmuSpeed = 300;
            this.checkMode = false;
            this.hitbox.alpha = 0;
        }

        //  Check collisions
        this.game.physics.arcade.overlap(this.luna, this.youmuBullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.luna, this.youmuSBullets, this.hitEnemyS, null, this);
        this.game.physics.arcade.overlap(this.luna, this.masterspark, this.destroy, null, this);

        this.game.physics.arcade.overlap(this.sunny, this.youmuBullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.sunny, this.youmuSBullets, this.hitEnemyS, null, this);
        this.game.physics.arcade.overlap(this.sunny, this.masterspark, this.destroy, null, this);
  
        this.game.physics.arcade.overlap(this.star, this.youmuBullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.star, this.youmuSBullets, this.hitEnemyS, null, this);
        this.game.physics.arcade.overlap(this.star, this.masterspark, this.destroy, null, this);

        this.game.physics.arcade.overlap(this.waveFairy1, this.youmuBullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.waveFairy1, this.youmuSBullets, this.hitEnemyS, null, this);
        this.game.physics.arcade.overlap(this.waveFairy1, this.masterspark, this.destroy, null, this);

        this.game.physics.arcade.overlap(this.waveFairy2, this.youmuBullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.waveFairy2, this.youmuSBullets, this.hitEnemyS, null, this);
        this.game.physics.arcade.overlap(this.waveFairy2, this.masterspark, this.destroy, null, this);

        this.game.physics.arcade.overlap(this.waveFairy3, this.youmuBullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.waveFairy3, this.youmuSBullets, this.hitEnemyS, null, this);
        this.game.physics.arcade.overlap(this.waveFairy3, this.masterspark, this.destroy, null, this);

        this.game.physics.arcade.overlap(this.waveFairy4, this.youmuBullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.waveFairy4, this.youmuSBullets, this.hitEnemyS, null, this);
        this.game.physics.arcade.overlap(this.waveFairy4, this.masterspark, this.destroy, null, this);

        this.game.physics.arcade.overlap(this.waveFairy5, this.youmuBullets, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.waveFairy5, this.youmuSBullets, this.hitEnemyS, null, this);
        this.game.physics.arcade.overlap(this.waveFairy5, this.masterspark, this.destroy, null, this);

        //  Weapon upgrade
        if (this.score > 50000 && this.youmu.weaponLevel < 2) {
            this.youmu.weaponLevel = 2;
        }
        else if (this.score > 200000 && this.youmu.weaponLevel < 3) {
            this.youmu.weaponLevel = 3;
        }
        else if (this.score > 700000 && this.youmu.weaponLevel < 4) {
            this.youmu.weaponLevel = 4;
        }
        else if (this.score > 2000000 && this.youmu.weaponLevel < 5) {
            this.youmu.weaponLevel = 5;
        }
        if (this.youmu.weaponLevel == 1) {
            this.myon1.alpha = 1;
            this.myon2.alpha = 0;
            this.myon3.alpha = 0;
            this.myon4.alpha = 0;
        }
        else if (this.youmu.weaponLevel == 2) {
            this.myon1.alpha = 1;
            this.myon2.alpha = 1;
            this.myon3.alpha = 0;
            this.myon4.alpha = 0;
        }
        else if (this.youmu.weaponLevel == 3) {
            this.myon1.alpha = 1;
            this.myon2.alpha = 1;
            this.myon3.alpha = 1;
            this.myon4.alpha = 0;
        }
        else if (this.youmu.weaponLevel == 4) {
            this.myon1.alpha = 1;
            this.myon2.alpha = 1;
            this.myon3.alpha = 1;
            this.myon4.alpha = 1;
        }
        else if (this.youmu.weaponLevel == 5) {
            this.myon1.alpha = 1;
            this.myon2.alpha = 1;
            this.myon3.alpha = 1;
            this.myon4.alpha = 1;
        }
        if (this.game.time.now > this.bossTimeAppear) {
            this.game.time.events.add(100, function() {
            this.game.add.tween(background).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
            }, this);
        }
    },

    release: function() {
        this.myon1.x = this.aura.x + 30;
        this.myon1.y = this.aura.y;
        this.myon2.x = this.aura.x + 30;
        this.myon2.y = this.aura.y + 30;
        this.myon3.x = this.aura.x;
        this.myon3.y = this.aura.y + 40;
        this.myon4.x = this.aura.x - 20;
        this.myon4.y = this.aura.y + 30;
        this.seCharge.stop();
    },

    charge: function() {
        if(this.shoot.isDown && (this.activeMasterspark === false) && (this.youmu.weaponLevel > 1)) {
            this.seCharge.play();
        }
    },

    chargeSBullet: function() {
        if((this.activeMasterspark === false) && (this.youmu.weaponLevel > 1)) {
            this.chargeTimer = this.game.time.now + 1000;
        }
        if(this.checkMode === true && (this.youmu.weaponLevel > 1)) {
            this.seCharge.play();
        }
    },

    fireSBullet: function() {
        this.seCharge.stop();
        if(this.game.time.now > this.chargeTimer && this.checkMode === true) {
            var size = this.youmu.weaponLevel - 1.5;
            if(this.game.time.now > this.chargeTimer && (this.activeMasterspark === false) && (this.youmu.weaponLevel > 1)){
                for(var i = 0; i < 2; i++){
                    this.youmuSBullet = this.youmuSBullets.getFirstExists(false);
                    if (this.youmuSBullet) {
                        var youmuY = this.youmu.y - 160 - size*30;
                        var state = this;
                        if(i === 0) {
                            this.youmuSBullet.reset(this.youmu.x, this.youmu.y - 40);
                            this.youmuSBullet.scale.x = 0.75 + size*0.15;
                            this.youmuSBullet.scale.y = 0.75 + size*0.15;
                            this.youmuSBullet.body.setSize(100 + size*20, 25 + size*5);
                        }
                        if(i === 1) {
                            this.youmuSBullet.reset(this.youmu.x, this.youmu.y);   
                            this.youmuSBullet.scale.x = 0.6 + size*0.1;
                            this.youmuSBullet.scale.y = 0.6 + size*0.1;                        
                            this.youmuSBullet.body.setSize(75 + size*15, 19 + size*4);
                        }                     
                        this.youmuSBullet.damageAmount = 100 + size*150;
                        this.youmuSBullet.angle = -90;
                        this.youmuSBullets.callAll('animations.play', 'animations', 'shoot');
                        this.seShot.play();
                        this.youmuSBullet.alpha = 1;
                        this.youmuSBullet.body.velocity.y = -600;
                        this.seSlash.play();
                        this.youmuSBullet.update = function() {
                            if(this.y < youmuY) {
                                this.kill();
                            }
                        }
                    }
                }
            }
        }
    },

    fireBullet: function() {
        switch (this.youmu.weaponLevel) {
            case 1:
            if (this.game.time.now > this.bulletTimer) {
                this.youmuBullet = this.youmuBullets.getFirstExists(false);
                if (this.youmuBullet) {
                    this.youmuBullet.damageAmount = 50;           
                    this.youmuBullet.reset(this.myon1.x, this.myon1.y);
                    this.youmuBullet.body.velocity.y = -this.BULLET_SPEED;
                    this.bulletTimer = this.game.time.now + this.BULLET_SPACING;
                    this.youmuBullet.angle = 0;
                    this.seShot.play();
                }                       
            }
            break;
            case 2:
            if (this.game.time.now > this.bulletTimer) {
                for(var i = 0; i < 2; i++){
                    this.youmuBullet = this.youmuBullets.getFirstExists(false);
                    if (this.youmuBullet) {         
                        if (i === 0){this.youmuBullet.reset(this.myon1.x, this.myon1.y);} 
                        if (i === 1){this.youmuBullet.reset(this.myon2.x, this.myon2.y);}
                        this.youmuBullet.body.velocity.y = -this.BULLET_SPEED;
                        this.youmuBullet.damageAmount = 50;
                        this.youmuBullet.angle = 0;
                        this.seShot.play();
                    }
                    this.bulletTimer = this.game.time.now + this.BULLET_SPACING;            
                }      
            }
            break;
            case 3:   
            if (this.game.time.now > this.bulletTimer) {
                if (this.checkMode === false) {
                    for(var i = 0; i < 3; i++){
                        this.youmuBullet = this.youmuBullets.getFirstExists(false);
                        if (this.youmuBullet) {            
                            if (i === 0){this.youmuBullet.reset(this.myon4.x, this.myon4.y);} 
                            if (i === 1){this.youmuBullet.reset(this.myon3.x, this.myon3.y);}
                            if (i === 2){this.youmuBullet.reset(this.myon2.x, this.myon2.y);} 
                            this.youmuBullet.body.velocity.y = -this.BULLET_SPEED;
                            this.youmuBullet.damageAmount = 50;
                            this.youmuBullet.angle = 0;
                            this.seShot.play();
                        }
                        this.bulletTimer = this.game.time.now + this.BULLET_SPACING;            
                    }
                }          
            }   
            break;
            case 4:   
            if (this.game.time.now > this.bulletTimer) {
                if (this.checkMode === false) {
                    for(var i = 0; i < 4; i++){
                        this.youmuBullet = this.youmuBullets.getFirstExists(false);
                        if (this.youmuBullet) {
                            if (i === 0){this.youmuBullet.reset(this.myon1.x, this.myon1.y);} 
                            if (i === 1){this.youmuBullet.reset(this.myon2.x, this.myon2.y);}
                            if (i === 2){this.youmuBullet.reset(this.myon3.x, this.myon3.y);} 
                            if (i === 3){this.youmuBullet.reset(this.myon4.x, this.myon4.y);}
                            this.youmuBullet.body.velocity.y = -this.BULLET_SPEED;
                            this.youmuBullet.damageAmount = 50;
                            this.seShot.play();
                            this.youmuBullet.angle = 0;
                        }

                        this.bulletTimer = this.game.time.now + this.BULLET_SPACING;            
                    }
                }           
            } 
            break;
            case 5:   
            if (this.game.time.now > this.bulletTimer) {
                if (this.checkMode === false) {
                    for(var i = 0; i < 4; i++){
                        this.youmuBullet = this.youmuBullets.getFirstExists(false);
                        if (this.youmuBullet) {           
                            if (i === 0){this.youmuBullet.reset(this.myon1.x, this.myon1.y);} 
                            if (i === 1){this.youmuBullet.reset(this.myon2.x, this.myon2.y);}
                            if (i === 2){this.youmuBullet.reset(this.myon3.x, this.myon3.y);} 
                            if (i === 3){this.youmuBullet.reset(this.myon4.x, this.myon4.y);}
                            this.youmuBullet.body.velocity.y = -this.BULLET_SPEED;
                            this.youmuBullet.damageAmount = 50;
                            this.seShot.play();
                            this.youmuBullet.angle = 0;
                        }

                        this.bulletTimer = this.game.time.now + this.BULLET_SPACING;            
                    }
                }          
            } 
            break;
        }
    },

    activeSpellCard: function() {
        if (this.masterspark.scale.y < 2.5) {
            this.masterspark.animations.play('active');  
            this.masterspark.scale.y += 0.025;  
        }                 
        if (this.mastersparkWidth < 170) {
            this.mastersparkWidth += 2;
        }
        this.mastersparkHeight = 700;
        this.lunaBullets.callAll('kill'); 
        this.sunnyBullets.callAll('kill');
        this.starBullets.callAll('kill');     
        this.fairy3Bullets.callAll('kill');        
    },

    launchLunaEnemy: function() {
        var i = 3;
        var delay;
        var enemy = this.luna.getFirstExists(false);
        if (enemy) {
            enemy.reset(this.game.rnd.integerInRange(0, 480), -10);
            enemy.health = 100 + this.youmu.weaponLevel*100;
            enemy.body.velocity.x = this.game.rnd.integerInRange(-100, 100);
            if (enemy.body.velocity.x >0) {
                enemy.scale.x = -1;
            }
            else {
                enemy.scale.x = 1;
            }
            enemy.body.velocity.y = this.game.rnd.integerInRange(10, 50);
            var state = this;
            enemy.update = function() {
                if (this.x > 480) {
                    this.body.velocity.x = this.game.rnd.integerInRange(-100, -50);
                    this.scale.x = 1;
                }
                if (this.x < 20) {
                    this.body.velocity.x = this.game.rnd.integerInRange(50, 100);
                    this.scale.x = -1;
                }
                if (this.y > 150) {
                    this.body.velocity.y = this.game.rnd.integerInRange(-50, -10);
                }
                if (this.y < 20) {
                    this.body.velocity.y = this.game.rnd.integerInRange(10, 50);
                }
                if (!this.lastShot) {
                    this.lastShot = 0;
                }
                //  Fire
                if (i > 0) {
                this.lunaBullet = state.lunaBullets.getFirstExists(false);
                    if (this.lunaBullet && this.alive && this.y > 0 && state.game.time.now > 200 + this.lastShot){
                        this.lastShot = state.game.time.now;
                        this.lunaBullet.reset(this.x, this.y + this.height / 2);
                        this.lunaBullet.damageAmount = 20;
                        this.lunaBullet.frame = 2;
                        this.angle = state.game.physics.arcade.moveToObject(this.lunaBullet, state.youmu, 150);
                        this.lunaBullet.angle = state.game.math.radToDeg(this.angle);
                        i--;
                    }                    
                }
                if (i==0){
                    delay = state.game.time.now + 2000; 
                    i = -1;
                }
                if (state.game.time.now > delay) {
                    i = 3;
                    delay = state.game.time.now + 2000;
                }
            }
        }
        if(this.game.time.now < this.bossTimeAppear) {
            this.game.time.events.add(33000 - this.youmu.weaponLevel*3000, this.launchLunaEnemy, this);
        }
    },

    launchSunnyEnemy: function() {
        var startingX = this.game.rnd.integerInRange(100, 400);
        var spread = 60;
        var frequency = 50;

        //  Launch wave
            var enemy = this.sunny.getFirstExists(false);
            if (enemy) {
                enemy.startingX = startingX;
                enemy.reset(500 / 2, -30);
                enemy.health = 300 + this.youmu.weaponLevel*200;
                enemy.body.velocity.y = 80;
                var state = this;
                //  Update function for each enemy
                enemy.update = function(){
                    //  Wave movement
                    this.body.x = this.startingX + Math.sin((this.y) / frequency) * spread;
                    if (this.x > 480) {
                        this.alpha = 0;
                    }
                    else {
                        this.alpha = 1;
                    }
                    if (this.y > 400) {
                        if(this.alive) {
                            var explosion = state.explosions.getFirstExists(false);
                            explosion.reset(this.body.x + this.body.halfWidth, this.body.y + this.body.halfHeight);
                            explosion.body.velocity.y = this.body.velocity.y;
                            explosion.alpha = 1;
                            explosion.play('explosion', 30, false, true);
                        }
                        var i = 36;
                        while (i > 0) {
                            this.sunnyBullet = state.sunnyBullets.getFirstExists(false);
                            if(this.sunnyBullet && this.alive) {
                                this.sunnyBullet.reset(this.x, this.y);
                                this.sunnyBullet.damageAmount = 20;
                                var angle = (Math.PI * -1) + (i * (Math.PI / 36 * 2));
                                var speed = 100;
                                this.sunnyBullet.body.velocity.x = Math.cos(angle) * speed;
                                this.sunnyBullet.body.velocity.y = Math.sin(angle) * speed;
                            }
                            i--;
                        }
                        this.kill();
                    }
                };
            }
        if(this.game.time.now < this.bossTimeAppear) {
            this.game.time.events.add(33000 - this.youmu.weaponLevel*3000, this.launchSunnyEnemy, this);
        }
    },

    launchStarEnemy: function() {
        for (var i =0; i < 3; i++) {
            var enemy = this.star.getFirstExists(false);
            if (enemy) {
                enemy.reset(-100 * i, 100);
                enemy.health = 100 + this.youmu.weaponLevel*100;
                enemy.scale.x = -1;
                enemy.body.velocity.x = 80;
                var state = this;
                //  Update function for each enemy
                enemy.update = function(){
                    //  Kill enemies once they go off screen
                    if (this.x > 480) {
                        this.kill();
                    }
                    if (!this.lastShot) {
                    this.lastShot = 0;
                    }
                    if (state.game.time.now > this.lastShot) {
                        for (i = 0; i < 3; i++) {
                            this.starBullet = state.starBullets.getFirstExists(false);
                            if (this.starBullet && this.alive){
                            var spreadAngle;    
                                if (i === 0){ spreadAngle = -15; this.starBullet.reset(this.x, this.y);} 
                                if (i === 1){ spreadAngle = 0; this.starBullet.reset(this.x, this.y);}
                                if (i === 2){ spreadAngle = 15; this.starBullet.reset(this.x, this.y);} 
                                this.starBullet.damageAmount = 20;
                                state.game.physics.arcade.velocityFromAngle(spreadAngle + 90, 150, this.starBullet.body.velocity);
                            }
                            this.lastShot = this.game.time.now + 1500;
                        }
                    }
                }
            }
        }
        if(this.game.time.now < this.bossTimeAppear) { 
            this.game.time.events.add(33000 - this.youmu.weaponLevel*3000, this.launchStarEnemy, this);
        }
    },

    lauchWaveFairy1: function() {
        var speedX = 90;
        var speedY = 30;
        var spacing = 30;
        var numEnemiesInWave = 5;
        for (var i =0; i < 5; i++) {
            var enemy = this.waveFairy1.getFirstExists(false);
            if (enemy) {
                enemy.reset(-spacing * i, 50 - (spacing * i)/5);
                enemy.frame = 0;
                enemy.health = this.youmu.weaponLevel*50;
                enemy.body.velocity.x = speedX;
                enemy.body.velocity.y = speedY;
                var state = this;
                //  Update function for each enemy
                enemy.update = function(){
                    //  Kill enemies once they go off screen
                    if (this.x > 230) {
                        this.body.velocity.x = -speedX/2;
                        this.body.velocity.y = speedY/3;
                    }
                    if (this.x < 10) {
                        this.body.velocity.x = speedX;
                        this.body.velocity.y = speedY;
                    } 
                    if (this.y > 650) {
                        this.kill();
                    }                
                }
            }
        }
        for (var i =0; i < 5; i++) {
            var enemy = this.waveFairy1.getFirstExists(false);
            if (enemy) {
                enemy.reset(500 + spacing * i, 50 - (spacing * i)/5);
                enemy.frame = 1;
                enemy.health = this.youmu.weaponLevel*50;
                enemy.body.velocity.x = -speedX;
                enemy.body.velocity.y = speedY;
                var state = this;
                //  Update function for each enemy
                enemy.update = function(){
                    if (this.x < 270) {
                        this.body.velocity.x = speedX/2;
                        this.body.velocity.y = speedY/3;
                    }
                    if (this.x > 490) {
                        this.body.velocity.x = -speedX;
                        this.body.velocity.y = speedY;
                    }
                    if (this.y > 650) {
                        this.kill();
                    }                 
                }
            }
        }
        if(this.game.time.now < this.bossTimeAppear) { 
            this.game.time.events.add(10500 - this.youmu.weaponLevel*500, this.lauchWaveFairy1, this);
        }
    },

    lauchWaveFairy2: function() {
        var speedX = 50;
        var spacing = 30;
        var numEnemiesInWave = 5;
        //  Launch wave
        for (var i =0; i < 5; i++) {
            var enemy = this.waveFairy2.getFirstExists(false);
            if (enemy) {
                enemy.reset(-spacing * i, 50);
                enemy.frame = 2;
                enemy.health = this.youmu.weaponLevel*50;
                enemy.body.velocity.x = speedX;                
                var state = this;
                //  Update function for each enemy
                enemy.update = function(){
                    this.body.y = 50 + Math.sin((this.x) / 20) * 20;  
                    if(this.x > 490) {
                        this.body.velocity.x = -speedX;
                    }  
                   if(this.x < 10) {
                        this.body.velocity.x = speedX;
                    }               
                }
            }
        }
        for (var i =0; i < 5; i++) {
            var enemy = this.waveFairy2.getFirstExists(false);
            if (enemy) {
                enemy.reset(500 + spacing * i, 100 - (spacing * i)/5);
                enemy.frame = 3;
                enemy.health = this.youmu.weaponLevel*50;
                enemy.body.velocity.x = -speedX;
                var state = this;
                //  Update function for each enemy
                enemy.update = function(){
                    this.body.y = 100 + Math.sin((this.x) / 20) * 20;
                    if(this.x < 10) {
                        this.body.velocity.x = speedX;
                    }  
                    if(this.x > 490) {
                        this.body.velocity.x = -speedX;
                    }               
                }
            }
        }
        if(this.game.time.now < this.bossTimeAppear) { 
            this.game.time.events.add(10500 - this.youmu.weaponLevel*500, this.lauchWaveFairy2, this);
        }
    },

    lauchWaveFairy3: function() {
        for (var i =0; i < 1; i++) {
            var enemy = this.waveFairy3.getFirstExists(false);
            if (enemy) {
                enemy.reset(0, 150);
                enemy.frame = 2;
                enemy.health = 300 + this.youmu.weaponLevel*200;
                enemy.body.velocity.x = 60;                
                var state = this;
                //  Update function for each enemy
                enemy.update = function(){
                    if(this.x > 180) {
                        this.body.velocity.x = 0;
                        this.body.velocity.y = -10;
                        if (!this.lastShot) {
                        this.lastShot = 0;
                        }
                        if (state.game.time.now > this.lastShot) {
                            for (i = 0; i < 3; i++) {
                                this.fairy3Bullet = state.fairy3Bullets.getFirstExists(false);
                                if (this.fairy3Bullet && this.alive){
                                var spreadAngle;    
                                    if (i === 0){ spreadAngle = -15; this.fairy3Bullet.reset(this.x, this.y);} 
                                    if (i === 1){ spreadAngle = 0; this.fairy3Bullet.reset(this.x, this.y);}
                                    if (i === 2){ spreadAngle = 15; this.fairy3Bullet.reset(this.x, this.y);} 
                                    this.fairy3Bullet.damageAmount = 20;
                                    this.fairy3Bullet.frame = 0;
                                    state.game.physics.arcade.velocityFromAngle(spreadAngle + 90, 150, this.fairy3Bullet.body.velocity);                            
                                }
                                this.lastShot = this.game.time.now + 2000;
                            }
                        }
                    }
                    if(this.y < 50) {
                        this.body.velocity.x = 0;
                        this.body.velocity.y = 0;
                    }
                }
            }
        }
        for (var i =0; i < 1; i++) {
            var enemy = this.waveFairy3.getFirstExists(false);
            if (enemy) {
                enemy.reset(500, 150);
                enemy.frame = 3;
                enemy.health = 300 + this.youmu.weaponLevel*200;
                enemy.body.velocity.x = -60;
                var state = this;
                //  Update function for each enemy
                enemy.update = function(){
                    if(this.x < 320) {
                        this.body.velocity.x = 0;
                        this.body.velocity.y = -10;
                        if (!this.lastShot) {
                        this.lastShot = 0;
                        }
                        if (state.game.time.now > this.lastShot) {
                            for (i = 0; i < 3; i++) {
                                this.fairy3Bullet = state.fairy3Bullets.getFirstExists(false);
                                if (this.fairy3Bullet && this.alive){
                                var spreadAngle;    
                                    if (i === 0){ spreadAngle = -15; this.fairy3Bullet.reset(this.x, this.y);} 
                                    if (i === 1){ spreadAngle = 0; this.fairy3Bullet.reset(this.x, this.y);}
                                    if (i === 2){ spreadAngle = 15; this.fairy3Bullet.reset(this.x, this.y);} 
                                    this.fairy3Bullet.damageAmount = 20;
                                    this.fairy3Bullet.frame = 4;
                                    state.game.physics.arcade.velocityFromAngle(spreadAngle + 90, 150, this.fairy3Bullet.body.velocity);                            
                                }
                                this.lastShot = this.game.time.now + 2000;
                            }
                        }
                    }
                    if(this.y < 50) {
                        this.body.velocity.x = 0;
                        this.body.velocity.y = 0;
                    }
                }
            }
        }
        if(this.game.time.now < this.bossTimeAppear) { 
            this.game.time.events.add(33000 - this.youmu.weaponLevel*3000, this.lauchWaveFairy3, this);
        }
    },

    lauchWaveFairy4: function() {
        var enemy = this.waveFairy4.getFirstExists(false);
        var youmuX = this.youmu.x;
        var enemyX;
        var check;
        if(enemy) {
            enemyX = this.game.rnd.pick([0, 500]);
            if(enemyX == 0) {
                check = true;
            }
            if(enemyX == 500) {
                check = false;
            }
            enemy.health = this.youmu.weaponLevel*50;
            enemy.reset(enemyX, this.game.rnd.integerInRange(20, 580));
            this.game.physics.arcade.moveToObject(enemy, this.youmu, 300);
            var state = this;
            enemy.update = function() {
                if(check === true) {
                    if(this.x > (youmuX+100)) {
                        if(this.alive) {
                            var explosion = state.explosions.getFirstExists(false);
                            explosion.reset(this.body.x + this.body.halfWidth, this.body.y + this.body.halfHeight);
                            explosion.body.velocity.y = this.body.velocity.y;
                            explosion.alpha = 1;
                            explosion.play('explosion', 30, false, true);
                        }
                        this.kill();
                    }
                }
                if(check === false) {
                    if(this.x < (youmuX-100)) {
                        if(this.alive) {
                            var explosion = state.explosions.getFirstExists(false);
                            explosion.reset(this.body.x + this.body.halfWidth, this.body.y + this.body.halfHeight);
                            explosion.body.velocity.y = this.body.velocity.y;
                            explosion.alpha = 1;
                            explosion.play('explosion', 30, false, true);
                        }
                        this.kill();
                    }
                }
            }
        }
        if(this.game.time.now < this.bossTimeAppear) {
            this.game.time.events.add(5500 - this.youmu.weaponLevel*500, this.lauchWaveFairy4, this);
        }
    },

    lauchWaveFairy5: function() {
        var speedX = 120;
        var speedY = 45;
        var spacing = 30;
        var numEnemiesInWave = 5;
        //  Launch wave
        var enemyY1 = this.game.rnd.integerInRange(50,300);
        var enemyY2 = this.game.rnd.integerInRange(50,300);
        for (var i =0; i < 5; i++) {
            var enemy = this.waveFairy5.getFirstExists(false);
            if (enemy) {                
                enemy.reset(-spacing * i, enemyY1 - (spacing * i)/5);
                enemy.frame = 2;
                enemy.health = this.youmu.weaponLevel*50;
                enemy.body.velocity.x = speedX;
                enemy.body.velocity.y = speedY;
                var state = this;
                //  Update function for each enemy
                enemy.update = function(){
                    this.angle += 30;
                    if (this.x > 490) {
                        this.kill();
                    }             
                }
            }
        }
        for (var i =0; i < 5; i++) {
            var enemy = this.waveFairy5.getFirstExists(false);
            if (enemy) {
                enemy.reset(500 + spacing * i, enemyY2 - (spacing * i)/5);
                enemy.frame = 3;
                enemy.health = this.youmu.weaponLevel*50;
                enemy.body.velocity.x = -speedX;
                enemy.body.velocity.y = speedY;
                var state = this;
                //  Update function for each enemy
                enemy.update = function(){
                    this.angle += 30;
                    if (this.x < 10) {
                        this.kill();
                    }                
                }
            }
        }
        if(this.game.time.now < this.bossTimeAppear) { 
            this.game.time.events.add(10500- this.youmu.weaponLevel*500, this.lauchWaveFairy5, this);
        }
    },

    youmuCollide: function(youmu, enemy) {
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
        explosion.body.velocity.y = enemy.body.velocity.y;
        explosion.alpha = 1;
        explosion.play('explosion', 30, false, true);
        enemy.kill();
        this.sePlayerHit.play();
        this.deathTime = this.game.time.now + 2000;
        this.spellCardQuanity = 2;

        this.youmu.damage(enemy.damageAmount);
    },

    hitEnemy: function(enemy, bullet) {
        var explosionBullet = this.bulletExplosions.getFirstExists(false);
        explosionBullet.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
        explosionBullet.body.velocity.y = enemy.body.velocity.y;
        explosionBullet.alpha = 1;
        explosionBullet.play('explosion-bullet', 30, false, true);
        bullet.kill();
        enemy.damage(bullet.damageAmount);
        if (enemy.health <= 0) {
            var explosion = this.explosions.getFirstExists(false);
            explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
            explosion.body.velocity.y = enemy.body.velocity.y;
            explosion.alpha = 1;
            explosion.play('explosion', 30, false, true);
            enemy.kill();
            this.seEnemyDeath.play();
            // Increase score
            this.score += Math.floor(enemy.score+enemy.score*(1/100)*(this.youmu.health/20)*(this.youmu.weaponLevel)*5);
           
            // Killed
            this.killed +=1;
        }
    },

    hitEnemyS: function(enemy, bullet) {
        var explosionBullet = this.bulletExplosions.getFirstExists(false);
        explosionBullet.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
        explosionBullet.body.velocity.y = enemy.body.velocity.y;
        explosionBullet.alpha = 1;
        explosionBullet.play('explosion-bullet', 30, false, true);
        enemy.damage(bullet.damageAmount);
        if (enemy.health <= 0) {
            var explosion = this.explosions.getFirstExists(false);
            explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
            explosion.body.velocity.y = enemy.body.velocity.y;
            explosion.alpha = 1;
            explosion.play('explosion', 30, false, true);
            enemy.kill();
            this.seEnemyDeath.play();
            // Increase score
            this.score += Math.floor(enemy.score+enemy.score*(1/100)*(this.youmu.health/20)*(this.youmu.weaponLevel)*5);
           
            // Killed
            this.killed +=1;
        }
    },

    destroy: function(bullet, enemy) {
        enemy.damage(bullet.damageAmount);
        if (enemy.health <= 0) {
            var explosion = this.explosions.getFirstExists(false);
            explosion.reset(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
            explosion.body.velocity.y = enemy.body.velocity.y;
            explosion.alpha = 1;
            explosion.play('explosion', 30, false, true);
            enemy.kill();
            this.seEnemyDeath.play(); 
            // Increase score
            this.score += Math.floor(enemy.score+enemy.score*(1/100)*(this.youmu.health/20)*(this.youmu.weaponLevel)*5);

            // Killed
            this.killed +=1;            
        } 
    },

    enemyHitsPlayer: function(youmu, bullet) {
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(youmu.body.x + youmu.body.halfWidth, youmu.body.y + youmu.body.halfHeight);
        explosion.alpha = 1;
        explosion.play('explosion', 30, false, true);
        bullet.kill();
        this.sePlayerHit.play();
        this.deathTime = this.game.time.now + 2000;
        this.spellCardQuanity = 2;

        youmu.damage(bullet.damageAmount);
    },

    showScore: function() {
        var num = Math.pow(10,9) + this.score;
        var str = num.toString().substring(1,10);
        this.scorePoint = str;
    }
};