var PLAY=1;
var END=0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0;
var score;
//var spawnBanana, spawnobstacle;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
   gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
 
}



function setup() {
  
  createCanvas(600,600);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-12;
  ground.x=ground.width/2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
   
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score=0;
}


function draw() {
background(250);
  
  if(gameState===PLAY) {  
    stroke("cyan");
  textSize("25");
  fill("cyan");
  text("score: "+ score, 200,50);
  
  stroke("black");
  textSize("20");
  fill("black");
  survialTime=Math.round(frameCount/frameRate())
text("survival Time:"+ survivalTime,100,50);  
  
       score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("SPACE")) {
    monkey.velocityY=-20;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
  spawnBanana();
 spawnObstacle();
    
  if(monkey.isTouching(obstacleGroup)) {
  gameState = END;  
    
  }
    

  }
    else if (gameState === END) {
    gameOver.visible = true;
   restart.visible = true;
    ground.velocityX = 0;
    monkey.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
      
      obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
      
      if(mousePressedOver(restart)) {
      reset();
    }
      
    }   
  drawSprites();
}
 
 function spawnBanana() {
   if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
 banana.velocityX = -12; 
 FoodGroup.add(banana);
   }
 }

function spawnObstacle() {
  
   if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,325,10,40);
  
      var rand = Math.round(random(1,6));
 obstacle  .addImage(obstacleImage);
 obstacle   .scale = 0.2;
 obstacle   .velocityX = -12;
  obstacleGroup.add(obstacle);
     
   }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
 FoodGroup.destroyEach();

 score = 0;
}