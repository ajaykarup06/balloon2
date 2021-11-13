var bg, backgroundImage
var balloon, ballonImage
var bottomObstacle1,bottomObstacle2,bottomObstacle3
var bottomObstacleImg1,bottomObstacleImg2,bottomObstacleImg3
var topObstacleImg1,topObstacleImg2
var play=1
var end = 0
var gameState=1
var gameOver
var restartIcon
var score=0


function preload()
{
backgroundImage = loadImage("assets/bg.png")
balloonImage = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
bottomObstacleImg1 = loadImage("assets/obsBottom1.png")
bottomObstacleImg2 = loadImage("assets/obsBottom2.png")
bottomObstacleImg3 = loadImage("assets/obsBottom3.png")
topObstacleImg1 = loadImage("assets/obsTop1.png")
topObstacleImg2 = loadImage("assets/obsTop2.png")
gameOverImg = loadImage("assets/gameOver.png")
restartIconImg = loadImage("assets/restart.png")
}

function setup()
{
  createCanvas(500,500)
bg = createSprite(200,360,1,1)
bg.addImage(backgroundImage)

balloon = createSprite(100,200,50,50)
balloon.addAnimation("balloonAnimation",balloonImage)
balloon.scale= 0.4
//balloon.velocityY=6 

obstaclesTopGroup = new Group()
obstaclesBottomGroup = new Group()
gameOver=createSprite(250,250,100,100)
restartIcon=createSprite(250,150,40,40)
gameOver.addImage(gameOverImg)
restartIcon.addImage(restartIconImg)
gameOver.visible=false
restartIcon.visible=false
}

function draw()
{
  background("black")

if(gameState==1)
{
  score=score + Math.round(getFrameRate()/40)
  if(keyDown("space"))
  {
    balloon.velocityY=-10
  }
  balloon.velocityY=balloon.velocityY+3
  spawnBottomObstacles()
  spawnTopObstacles()
  if(balloon.isTouching(obstaclesBottomGroup)||balloon.isTouching(obstaclesTopGroup)||balloon.y>=510)
  {
  gameState=2
  //console.log(gameState)
  } 
}

if(gameState==2)
{
  restart()
  //console.log(gameState)
}


//restart()
  drawSprites()
  text("score"+score,50,50)


}

function restart()
{
 gameOver.visible=true
 restartIcon.visible=true
  obstaclesTopGroup.setVelocityXEach(0)
  obstaclesBottomGroup.setVelocityXEach(0)
  balloon.velocityY=0
  balloon.x=50
  balloon.y=250


  if(mousePressedOver(restartIcon))
  {
    gameState=1
    gameOver.visible=false
    console.log(gameOver.visible)
    restartIcon.visible=false
    obstaclesTopGroup.destroyEach()
    obstaclesBottomGroup.destroyEach()
  }

  
}
function spawnBottomObstacles()
{
  if(frameCount % 40 ===0){
    var obstacle = createSprite(520,480,20,20)
    obstacle.velocityX=-5

    var rand= Math.round(random(1,3))
    switch(rand)
    {
     case 1: obstacle.addImage(bottomObstacleImg1)
     break
     case 2: obstacle.addImage(bottomObstacleImg2)
     break
     case 3: obstacle.addImage(bottomObstacleImg3)
     break
    }
    balloon.depth=obstacle.depth;
    balloon.depth=balloon.depth+1
    obstacle.scale=0.10
    obstaclesBottomGroup.add(obstacle)
  }
}

function spawnTopObstacles()
{
  if(frameCount % 40 ===0){
    var obstacle = createSprite(520,80,20,20)
    obstacle.velocityX=-5

    var rand= Math.round(random(1,2))
    switch(rand)
    {
     case 1: obstacle.addImage(topObstacleImg1)
     break
     case 2: obstacle.addImage(topObstacleImg2)
     break
     
    }
    balloon.depth=obstacle.depth;
    balloon.depth=balloon.depth+1
   obstacle.scale=0.1
   obstaclesTopGroup.add(obstacle)

  }
}