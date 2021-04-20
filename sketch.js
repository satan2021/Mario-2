var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;

var ground, groundImg, mario, marioImg, bg1, brickWall, brickWallImg;
var invisibleGround;

var cloudsGroup, cloudImage;
var obstaclesGroup;
var platformGroup;
var bonusGroup;

 var score=0;
 var gameOver, restart, cloud, gameOverImg, restartImg;
 var play, playImg;


function preload(){
  bg1 = loadImage("mario/bg1.jpg");
  marioImg = loadImage("mario/Mario.png")
  mario1Img = loadImage("mario/marioRun2.png")
  M2Img = loadImage("mario/marioRun1.png")
  groundImg = loadImage("mario/ground.png")
  cloudImg = loadImage("mario/cloud.png")
  cactusImg = loadImage("mario/cactus.png")
  mushroomImg = loadImage("mario/mushroom.png")
  brickWallImg = loadImage("mario/brickWall2.jpg")
  enemyImg = loadImage("mario/enemy1.png")
  gameOverImg = loadImage("mario/Gameover.jpg")
  restartImg = loadImage("mario/restart.png")
  playImg = loadImage("mario/play.png")

}


function setup() {
  createCanvas(displayWidth, displayHeight);

  mario = createSprite(300, 637, 30, 30);
  mario.setCollider("circle", 10, 10, 320);
  
  ground = createSprite(200, 705, displayWidth - 20, displayHeight- 750);
  ground.shapeColor = "green";
  ground.x = ground.width/2;

  play = createSprite(640,460, 50, 50);
  play.addImage(playImg);
   
  gameOver = createSprite(640,380, 50, 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(640,510, 50, 50);
  restart.addImage(restartImg);

  play.scale = 0.3;
  gameOver.scale = 0.3;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  play.visible = true;
 

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  platformGroup = new Group();
  bonusGroup = new Group();
 
 textSize(25);
 fill("black");
 textFont("Georgia");

 score = 0;
  
}

function draw() {
  background(bg1); 

 
 if(gameState===START){
    score = 0;
    mario.addImage(marioImg);
    mario.scale = 0.31;
 }

 if(mousePressedOver(play) && gameState === START){
   reset();
 }

 if (gameState===PLAY){
   score = score + Math.round(getFrameRate()/60);
   text("Score: " + score, 1050, 200);

  play.visible = false;
  mario.addImage(mario1Img)
  mario.scale = 0.12;

  
 if(keyDown("space") && mario.y >= 610) {
   mario.velocityY = -18;
 }
 
  mario.velocityY = mario.velocityY + 0.8;

  if(ground.x < 0){
    ground.x = ground.width/2;
  }

  mario.collide(ground);
 
       
  spawnPower();
  spawnObstacles();
  spawnbrickWall();
  spawnCloud();


  if(bonusGroup.isTouching(mario)){
    mario.addImage(M2Img);
   bonusGroup.destroyEach();
  }


  if(platformGroup.isTouching(mario)){
    mario.collide(platformGroup);
  }

  if(obstaclesGroup.isTouching(mario)){
      
    gameState = END;
      
  }
}
 else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  
  cloud.depth = gameOver.depth;
  gameOver.depth = gameOver.depth + 2; 

  cloud.depth = restart.depth;
  restart.depth = restart.depth + 2; 
 
  mario.velocityY = 0;
  mario.velocityX = 0;

  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  platformGroup.setVelocityXEach(0);
  bonusGroup.setVelocityXEach(0);
  
 
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  platformGroup.setLifetimeEach(-1);
  bonusGroup.setLifetimeEach(-1);

  if(mousePressedOver(restart)) {
    reset();
  }
 }
  drawSprites();
}

function spawnCloud(){
  if(World.frameCount % 100 === 0){
     cloud = createSprite(1200, 380, 40, 10);
    cloud.y = Math.round(random(250, 500)) 

    cloud.addImage(cloudImg);
    cloud.scale = 0.11;
    cloud.velocityX = -3;

    cloud.lifetime = 420;

    cloud.depth = mario.depth;
    mario.depth = mario.depth + 1; 

    cloudsGroup.add(cloud);
   }
 }

 function spawnObstacles(){
  if(World.frameCount % 200 === 0){
    var obstacle  = createSprite(1200, 660, 30, 10);
    obstacle.velocityX = -5;

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1 : obstacle.addImage(cactusImg);
                 break;
      case 2 : obstacle.addImage(enemyImg);
                 break;
    }

    obstacle.scale = 0.18;
    obstacle.lifetime = 400;

    obstaclesGroup.add(obstacle);

   }
 }
  function spawnbrickWall(){
    if(World.frameCount % 300 === 0){
     var  brickWall = createSprite(1200, 520, 40, 10);
      brickWall.addImage(brickWallImg);
      brickWall.scale = 0.12;
      brickWall.velocityX = -5;
  
      brickWall.lifetime = 400;
    
    platformGroup.add(brickWall);

      }
 }

 function spawnPower(){
  if(World.frameCount % 600 === 0){
    var mushroom = createSprite(1200, 465 , 40, 10);
     mushroom.addImage(mushroomImg);
     mushroom.scale = 0.12;
     mushroom.velocityX = -5;
 
     mushroom.lifetime = 400;
   
   bonusGroup.add(mushroom);
}
 }

 function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;

  mario.x = 300;
  score = 0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  platformGroup.destroyEach();
  bonusGroup.destroyEach();

  score = 0;
}
