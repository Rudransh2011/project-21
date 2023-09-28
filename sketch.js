var player,playerImg;
var comet,cometImg,cometGroup;
var thun,thunImg,thunGroup;
var up_cloud,up_cloudImg;
var jumpSound;
var land;
var game_Over,game_OverImg;
var retry,retryImg;
var x;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload()
{
   playerImg = loadImage("player.png");
   cometImg = loadImage("comet.png");
   thunImg = loadImage("thunder.png");
   game_OverImg = loadImage("game_Over.png");
   retryImg = loadImage("retry_button.png");
   up_cloudImg = loadImage("upper_clouds.png");
   jumpSound = loadSound("boing.mp3");
}

function setup()
{
   canvas = createCanvas(windowWidth,windowHeight);
  
   player = createSprite(150,240,20,20);
   player.addImage(playerImg);
   player.scale = 0.09;
   player.setCollider("rectangle",0,0,500,400);
   //player.debug = true;
   

   land = createSprite(100,500,200,500);
   land.shapeColor = "lightgreen";

   game_Over = createSprite(700,200,20,20);
   game_Over.visible = false;
   game_Over.addImage(game_OverImg);
   game_Over.scale = 0.5;

   retry = createSprite(700,300,20,20);
   retry.visible = false;
   retry.addImage(retryImg);
   retry.scale = 0.5;

   up_cloud = createSprite(600,-300,20,20);
   up_cloud.addImage(up_cloudImg);
   up_cloud.scale = 3;

   cometGroup = new Group();
   thunGroup = new Group();
}

function draw()
{
   background("lightblue");

   text("SCORE:" + score,1150,125);
    
   if(gameState == PLAY)
   {
      if(keyDown("space"))
      {
         player.velocityY = -15;
         land.velocityX = -5;
         up_cloud.velocityX = -(5+3*score/100);
         score = score+1;
         jumpSound.play();
      }
      player.velocityY = player.velocityY+5;

      if(up_cloud.x < 0)
      {
         up_cloud.x = up_cloud.width/2;
      }

      if (cometGroup.isTouching(player) || thunGroup.isTouching(player)) 
      {
         gameState = END;
      }
       
      x = Math.round(random(1,2));
      switch (x) 
      {
         case 1:spawnComets();
            break;
         case 2:spawnThuder();
            break;
         default:break;
      }

      retry.visible = false;
      game_Over.visible = false;

      if (player.y <= 0 || player.y >= windowHeight) 
      {
         gameState = END;
      }
   }
   if(gameState == END)
   {
      retry.visible = true;
      game_Over.visible = true;

      if (mousePressedOver(retry)) 
      {
        reset();   
      }

      cometGroup.setLifetimeEach(-1);
      thunGroup.setLifetimeEach(-1);

      cometGroup.setVelocityXEach(0);
      thunGroup.setVelocityXEach(0);

      up_cloud.velocityX = 0;
      player.velocityY = 0;
      land.velocityX = 0;
   }
   
   player.collide(land);
       
   drawSprites();
}

function reset()
{
   cometGroup.destroyEach();
   thunGroup.destroyEach();
   gameState = PLAY;
   land.x = 100;
   land.y = 500;
   land.velocityX = 0;
   up_cloud.velocityX = 0;
   score = 0;
   player.x = 150;
   player.y = 240;
}

function spawnComets()
{
   if(frameCount % 100 == 0)
   {
     comet = createSprite(1300,Math.round(random(0,600)),20,20);
     comet.scale = 0.5
     cometGroup.add(comet);
     comet.addImage(cometImg);
     comet.velocityX = -(5+3*score/100);
     comet.lifetime = windowWidth;
     comet.setCollider("rectangle",0,0,400,200)
    // comet.debug = true;
   }
}

function spawnThuder()
{
   if(frameCount % 100 == 0)
   {
      thun = createSprite(1300,Math.round(random(0,600)),20,20);
      thunGroup.add(thun);
      thun.addImage(thunImg);
      thun.scale = 0.3
      thun.velocityX = -(5+3*score/100);
      thun.lifetime = windowWidth;
      thun.setCollider("circle",0,0,200);
     // thun.debug = true
   }
}