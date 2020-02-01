var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

//Background
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};

//Goku
function Goku(game, spritesheet1, spritesheet2) {
    this.game = game;
    this.animation1 = new Animation(spritesheet1, 76, 81, 9, 0.1, 9, true, 2);
    this.animation2 = new Animation(spritesheet2, 51, 81, 2, 0.2, 2, true, 2);
    this.speed = 200;
    this.ctx = game.ctx;
    this.tickCount = 0;
    this.direction = 0;
    Entity.call(this, game, 0, 300);
}
Goku.prototype = new Entity();
Goku.prototype.constructor = Goku;
Goku.prototype.update = function () {
    if (this.direction == 0){
        this.x += this.game.clockTick * this.speed;
        this.tickCount += 1;
        if(this.tickCount >= 120) this.direction = 1;
    }
    if (this.direction == 1){
        this.x -= this.game.clockTick * this.speed;
        this.tickCount -= 1;
        if(this.tickCount == 0) this.direction = 0;
    }
    //Entity.prototype.update.call(this);
}
Goku.prototype.draw = function () {
    if(this.direction == 0){
        this.animation1.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        Entity.prototype.draw.call(this);
    }
    if(this.direction == 1){
        this.animation2.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        Entity.prototype.draw.call(this);
    }
}

//Piccolo ONE
function Piccolo(game, spritesheet1, spritesheet2) {
    this.animation1 = new Animation(spritesheet1, 63, 85, 6, .35, 6, true, 2);
    this.animation2 = new Animation(spritesheet2, 89, 89, 8, .1, 8, true, 2);
    this.speed = 200;
    this.ctx = game.ctx;
    this.direction = 0;
    this.tickCount = 0;
    Entity.call(this, game, 85, 310);
}
Piccolo.prototype = new Entity();
Piccolo.prototype.constructor = Piccolo;
Piccolo.prototype.update = function () {
    if (this.direction == 0){
        this.x += this.game.clockTick * this.speed;
        this.tickCount += 1;
        if(this.tickCount >= 120) this.direction = 1;
    }
    if (this.direction == 1){
        this.x -= this.game.clockTick * this.speed;
        this.tickCount -= 1;
        if(this.tickCount == 0) this.direction = 0;
    }
    Entity.prototype.update.call(this);
}
Piccolo.prototype.draw = function () {
    if(this.direction == 0){
        this.animation1.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        Entity.prototype.draw.call(this);
    }
    if(this.direction == 1){
        this.animation2.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        Entity.prototype.draw.call(this);
    }
}

//Vegeta
function Vegeta(game, spritesheet1, spritesheet2, spritesheet3, spritesheet4) {
    this.game = game;
    this.animation1 = new Animation(spritesheet1, 60, 74, 3, 0.65, 3, true, 2);
    this.animation2 = new Animation(spritesheet2, 40, 79, 2, 0.65, 2, true, 2);
    this.animation3 = new Animation(spritesheet3, 60, 74, 3, 0.65, 3, true, 2);
    this.animation4 = new Animation(spritesheet4, 40, 79, 2, 0.65, 2, true, 2);
    this.speed = 200;
    this.ctx = game.ctx;
    this.tickCount = 0;
    this.direction = 0;
    Entity.call(this, game, 580, 300);
}
Vegeta.prototype = new Entity();
Vegeta.prototype.constructor = Vegeta;

Vegeta.prototype.update = function () {
    if (this.direction == 0){
        //this.x == Goku.x;
        this.x -= this.game.clockTick * 1.5 * this.speed;
        if(this.tickCount<=60){
            //this.y == Goku.y; 
            this.y -= this.game.clockTick * 1.5 * this.speed;
             Vegeta.prototype.draw = function () {
                this.animation3.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                Entity.prototype.draw.call(this);
             }
        }

        if(this.tickCount>60){
            //this.y == Goku.y;
            this.y += this.game.clockTick * 1.5 * this.speed;
            Vegeta.prototype.draw = function () {
                this.animation2.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                Entity.prototype.draw.call(this);
            }
        }
        this.tickCount += 1;
        if(this.tickCount >= 160) this.direction = 1;
    }
    if (this.direction == 1){
        //this.x == Goku.x;
        this.x += this.game.clockTick * 1.5 * this.speed;
        if(this.tickCount<=60){
            this.y += this.game.clockTick * 1.5 * this.speed;
            Vegeta.prototype.draw = function () {
                this.animation4.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                Entity.prototype.draw.call(this);
            }
        }
        if(this.tickCount>=60){
            this.y -= this.game.clockTick * 1.5 *this.speed;
            Vegeta.prototype.draw = function () {
                this.animation1.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
                Entity.prototype.draw.call(this);
            }
        }
        this.tickCount -= 1;
        if(this.tickCount == 0) this.direction = 0;
    }
    //Entity.prototype.update.call(this);
}




AM.queueDownload("./img/dbzbg.jpg");
AM.queueDownload("./img/vegetaUp.png");
AM.queueDownload("./img/vegetaDown2.png");
AM.queueDownload("./img/vegetaUpReverse.png");
AM.queueDownload("./img/vegetaDownReverse2.png");
AM.queueDownload("./img/piccolo.png");
AM.queueDownload("./img/piccoloattacks.png");
AM.queueDownload("./img/gokuhit.png");
AM.queueDownload("./img/gokukick.png");



AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/dbzbg.jpg")));
    //gameEngine.addEntity(new Vegeta(gameEngine, AM.getAsset("./img/vegetaUp.png"),AM.getAsset("./img/vegetaDown2.png"),AM.getAsset("./img/vegetaUpReverse.png"),AM.getAsset("./img/vegetaDownReverse2.png")));
    gameEngine.addEntity(new Piccolo(gameEngine, AM.getAsset("./img/piccolo.png"), AM.getAsset("./img/piccoloattacks.png")));
    gameEngine.addEntity(new Goku(gameEngine, AM.getAsset("./img/gokukick.png"), AM.getAsset("./img/gokuhit.png")));
    

    console.log("All Done!");
});