var mario,marioimg,mario_jumpimg;
var ground , ground_img;
var invisible_ground,invisible_ground2;
var cloudImage,cloudsGroup;
var brickimg2,brickimg3,brickimg4,brickimg5,brickGroup,qoustionboximg;
var enemyimg,enemyGroup;
var enemyimg2,enemy2Group;
var enemyimg3,enemy3Group;
var life,life2,life3,life_img,lifelost_img;
var coin, coinimg,coinGroup;
var gameOver;
count = "0";
var touch = false;
var coinFlag = false;
var coinFlag2 = false;
var overflag  = false;

var score =0;

const PLAY =0;
const ONBRICKS =1;
const END =2;
var gameState = PLAY;

function preload() {

marioimg = loadAnimation("pictures/m.png","pictures/m2.png","pictures/m3.png")
mario_jumpimg = loadAnimation("pictures/mstill.png")
ground_img = loadAnimation("pictures/ground.png")
cloudImage = loadAnimation("pictures/cloud.png")
brickimg2 = loadAnimation("pictures/brick2.jpg")
brickimg3 = loadAnimation("pictures/brick3.png")
brickimg4 = loadAnimation("pictures/brick4.png")
qoustionboximg = loadAnimation("pictures/questionblock.jpg")

enemyimg = loadAnimation("pictures/enemy.png")
enemyimg2 = loadAnimation("pictures/enemy2.png")
enemyimg3 = loadAnimation("pictures/enemy3.png")

life_img = loadAnimation("pictures/heart.png")
lifelost_img = loadAnimation("pictures/heart_lost.png")

coinimg = loadImage("pictures/coin.png");

gameOver = loadImage("pictures/gameOver.png");
}

function setup() {

canvas = createCanvas(1400, 700);

ground = createSprite(width/2,height-30,width,10);
ground.addAnimation("ground",ground_img);

mario =  createSprite(width/2, 200, 50, 50);
mario.addAnimation("running",marioimg);
mario.addAnimation("jumping",mario_jumpimg);
mario.debug = true;
mario.setCollider("rectangle",0,0,mario.width/2,mario.height/1.5)

invisible_ground = createSprite(width/2,height-110,width,10);
invisible_ground.visible = false;
invisible_ground2 = createSprite(width/2,height-200,width,10);
invisible_ground2.visible = false;

life = createSprite(1350,50,10,10);
life.addAnimation("life",life_img);
life.addAnimation("lost",lifelost_img);
life.scale = 0.05;

life2 = createSprite(1320,50,10,10);
life2.addAnimation("life",life_img);
life2.addAnimation("lost",lifelost_img);
life2.scale = 0.05;

life3 = createSprite(1290,50,10,10);
life3.addAnimation("life",life_img);
life3.addAnimation("lost",lifelost_img);
life3.scale = 0.05;

coin = null ;

cloudsGroup = new Group();
brickGroup = new Group();
enemyGroup = new Group();
enemy2Group = new Group();
enemy3Group = new Group();
coinGroup = new Group();

}

function draw() {
background("purple");  
  
if (gameState === PLAY ){
  ground.velocityX = -4;
  console.log(mario.y)

  if (ground.x < 0){
    ground.x = ground.width/2;
    }
    if((touches.length > 0 || keyDown("space") && mario.y>= 536)) {
      mario.velocityY = -15;
       touches = [];
    }
    
    if (!overflag)
    {mario.velocityY = mario.velocityY + 0.5
    }
    
    if ((mario.isTouching(enemyGroup)||mario.isTouching(enemy2Group))&& !touch){
    touch = true
    if (count === "0"){
    life.changeAnimation("lost",lifelost_img)
    count = "1"
    }
    
    else if (count === "1"){
    life2.changeAnimation("lost",lifelost_img)
    count = "2"
    }
    
    else if (count === "2"){
    life3.changeAnimation("lost",lifelost_img)
    gameState = END;

    }
  

    }

    for (var i = 0 ; i< brickGroup.length;i++){
    if (mario.isTouching(brickGroup.get(i))&& !coinFlag&& i%3==0){
    
    coinFlag = true;
    coin = createSprite(brickGroup.get(i).x,brickGroup.get(i).y)
    
    coin.addImage(coinimg);
    coin.scale = 0.05;
    coin.velocityY = -50;
    coin.velocityX = random(-2,-1);
    coinGroup.add(coin);
    score += 50 ;
    console.log(score)

    if ( mario.y< brickGroup.get(i).y-50){
      console.log("over")
      mario.velocityY = 0;
      overflag = true;
      gameState = ONBRICKS;
      mario.changeAnimation("jumping",mario_jumpimg);

    }

    }

  }
    
  mario.velocityX=0;
  
    coinGroup.setVelocityYEach(-10);
    
    spawnClouds();
    bricks();
    spawnenemy();
    spawnenemy2();
    spawnenemy3();
    }

    if (gameState === END ){
mario.visible = false;
      ground.velocityX = 0;
cloudsGroup.setVelocityXEach(0);
brickGroup.setVelocityXEach(0);
enemyGroup.setVelocityXEach(0);
enemy2Group.setVelocityXEach(0);
enemy3Group.setVelocityXEach(0);

ground.visible = false;
cloudsGroup.destroyEach();
brickGroup.destroyEach();                                       
enemyGroup.destroyEach();
enemy2Group.destroyEach();
enemy3Group.destroyEach();
imageMode(CENTER);
image(gameOver,width/2,height/2);
    }
if (gameState === ONBRICKS){

  ground.velocityX = 0;
  cloudsGroup.setVelocityXEach(0);
  brickGroup.setVelocityXEach(0);
  enemyGroup.setVelocityXEach(0);
  enemy2Group.setVelocityXEach(0);
  enemy3Group.setVelocityXEach(0);

  if((touches.length > 0 || keyDown("space") && mario.y>= 536)) {
    touches = [];
mario.velocityX = 2;
mario.velocityY = 2;
mario.changeAnimation("running",marioimg);
brickGroup.destroyEach();
enemyGroup.destroyEach();
enemy2Group.destroyEach();
enemy3Group.destroyEach();

gameState = PLAY;
overflag =false;
  }

}
    mario.collide(invisible_ground);
    enemyGroup.collide(invisible_ground);
    enemy2Group.collide(invisible_ground);
    enemy3Group.collide(invisible_ground2);
    
    drawSprites();
fill("white");
textSize(17)
  text("score :"+score,1150,55);
}


function spawnClouds() {

if (frameCount % 90 === 0) {

var cloud = createSprite(600,120,40,10);

cloud.y = Math.round(random(80,120));

cloud.addAnimation("cloud",cloudImage);

cloud.scale = 0.5;

cloud.velocityX = -3;

cloud.lifetime = 200;

cloud.depth = mario.depth;

mario.depth = mario.depth + 1;

cloudsGroup.add(cloud);

}

}

function bricks() {

if(frameCount % 90 === 0) {

var obstacle = createSprite(width,Math.round(random(500,250)),10,40);

obstacle.velocityX = -4;

var rand = Math.round(random(1,3));

switch(rand) {

case  1: obstacle.addAnimation("brick",brickimg2);
break;

case 2: obstacle.addAnimation("brick",brickimg3);
break;

case 3: obstacle.addAnimation("brick",brickimg4);
break;

default: break;


}

obstacle.scale = 0.3;

obstacle.lifetime = 3000;

brickGroup.add(obstacle);

coinFlag = false;

}
}

function bricks() {

  if(frameCount % 90 === 0) {
  
  var obstacle = createSprite(width,Math.round(random(500,250)),10,40);
  
  obstacle.velocityX = -4;
  
  var rand = Math.round(random(1,3));
  
  switch(rand) {
  
  case  1: obstacle.addAnimation("brick",brickimg2);
  break;
  
  case 2: obstacle.addAnimation("brick",brickimg3);
  break;
  
  case 3: obstacle.addAnimation("brick",brickimg4);
  break;
  
  default: break;
  
  
  }
  
  obstacle.scale = 0.3;
  
  obstacle.lifetime = 3000;
  
  brickGroup.add(obstacle);
  
  coinFlag = false;
  
  }
  }function bricks() {

    if(frameCount % 90 === 0) {
    
    var obstacle = createSprite(width,Math.round(random(500,250)),10,40);
    
    obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,3));
    
    switch(rand) {
    
    case  1: obstacle.addAnimation("brick",brickimg2);
    break;
    
    case 2: obstacle.addAnimation("brick",brickimg3);
    break;
    
    case 3: obstacle.addAnimation("brick",brickimg4);
    break;
    
    default: break;
    
    
    }
    
    obstacle.scale = 0.3;
    
    obstacle.lifetime = 3000;
    
    brickGroup.add(obstacle);
    
    coinFlag = false;
    
    }
    }function bricks() {

if(frameCount % 90 === 0) {

var obstacle = createSprite(width,Math.round(random(500,250)),10,40);

obstacle.velocityX = -4;

var rand = Math.round(random(1,3));

switch(rand) {

case  1: obstacle.addAnimation("brick",brickimg2);
break;

case 2: obstacle.addAnimation("brick",brickimg3);
break;

case 3: obstacle.addAnimation("brick",brickimg4);
break;

default: break;


}

obstacle.scale = 0.3;

obstacle.lifetime = 3000;

brickGroup.add(obstacle);

coinFlag = false;

}
}
function spawnenemy (){

if(frameCount % 100 === 0) {


var enemy = createSprite(random(800,1300),random(100,500),20,20);


enemy.addAnimation("enemy",enemyimg);

enemy.scale = 0.05;

enemy.velocityY = 7;
enemy.velocityX = -5;

enemy.lifetime = 2000;

enemyGroup.add(enemy);

touch = false;
enemy.debug = true;

}
}

function spawnenemy2 (){

if(frameCount % 400 === 0) {


var enemy2 = createSprite(random(800,1300),random(100,150),20,20);


enemy2.addAnimation("enemy",enemyimg2);

enemy2.scale = 0.2;

enemy2.velocityY = 5;
enemy2.velocityX = -5;

enemy2.lifetime = 2000;

enemy2Group.add(enemy2);

touch = false;

enemy2.debug = true;
}
}

function spawnenemy3 (){

if(frameCount % 800 === 0) {


var enemy3 = createSprite(random(800,1300),height,20,20);


enemy3.addAnimation("enemy",enemyimg3);

enemy3.scale = 0.5;

enemy3.velocityY = -5;
enemy3.velocityX = -5;

enemy3.lifetime = 2000;

enemy3Group.add(enemy3);

}
}