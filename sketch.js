var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 4;

  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;

  invisibleGround=createSprite(300,250,500,10);
  invisibleGround.visible=false;

  doorsGroup= new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();

  score=0;
}

function draw() {
  background(200);
  
if (gameState="play"){



  if(tower.y > 400){
      tower.y = 300
    }
   ghost.collide(invisibleGround);
   
   if(keyDown("left")){
   ghost.x=ghost.x-4;
   }
   if(keyDown("right")){
    ghost.x=ghost.x+4;
    }
    if(keyDown("space")){
      ghost.velocityY= -6;
      }

      

     ghost.velocityY=ghost.velocityY+0.8;
     if(climbersGroup.isTouching(ghost)){
     ghost.velocityY = 0;
     }
    
     










    spawnDoor();
    drawSprites();
}
 else if (gameState="end"){
  stroke("yellow"); 
  fill("yellow"); 
  textSize(30); 
  text("Game Over", 230,250)
 }
}

function spawnDoor(){
if(frameCount%240===0){
  door=createSprite(200,-50);
  climber=createSprite(200,10);
  climber.addImage("climber",climberImg);
  door.addImage("door",doorImg);
  door.x= Math.round(random(120,400));
  door.velocityY= 1; 
  door.lifeTime= 600;
  climber.x=door.x;
  climber.velocityY=1;
  climber.lifeTime= 600;
  doorsGroup.add(door);
  climbersGroup.add(climber);

  invisibleBlock=createSprite(200,10);
  //invisibleBlock.shapeColor="red";
  invisibleBlock.width=climber.width;
  invisibleBlock.height=2;
  invisibleBlock.x=door.x;
 //invisibleBlock.visible=false
   invisibleBlock.velocityY=1;
  invisibleBlockGroup.add(invisibleBlock);
  
}
if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
{
   ghost.destroy(); 
   gameState = "end"
   }
}
