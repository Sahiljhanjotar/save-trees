var gameState="begin";
var backgroundImage,ground;
var treeImage;
var treeImage2;
var mario;
var marioImage;
var edges;
var trees;
var treesGroup;
var ground;
var score = 0;
var axe;
var axeImage;
var axeGroup;



function preload(){
  
  backgroundImage = loadImage("background.jpg");
  treeImage = loadImage("tree cutten down 1 (1)-2.png");
  treeImage2 = loadImage("tree cutten down 1 (1)-1.png");
  marioImage = loadAnimation("Capture1.png","Capture3.png","Capture4.png");
  axeImage = loadImage("axe1.png");
  
}

function setup() {
  createCanvas(600, 400);
  
  //creating background
  background = createSprite(0,0,600,600);
  background.addImage(backgroundImage);
  background.scale = 1.5;
  mario = createSprite(50,200,20,50);
  mario.addAnimation("marioRunning",marioImage);
  mario.scale = 0.7;
  edges = createEdgeSprites();
  treesGroup = new Group();
  axeGroup = new Group();
 ground = createSprite(0, 400, 1200, 10);
  


}

function draw() {
  // moving ground
 
    background.velocityX = -3;
  mario.y = World.mouseY;
  
mario.collide(ground);
ground.visible=false;
    if (background.x < 0){
      background.x = background.width/2;
    }
   drawSprites();
  if (gameState === "begin"){
    fill ("yellow")
    textSize(30);
    text ("Touch trees to protect them from cutting",50,300);
    text ("Press space key to play",50,350);
    background.velocityX = 0;
    mario.visible = false;
    
    
    
  }
  
  if (mario.isTouching(treesGroup)){
    score = score + 1;
    treesGroup[0].destroy();
  }
  
  if (gameState === "begin" && keyDown("space")){
    gameState="Play";
    mario.visible = true;
  }
  
 if (keyDown("r")){
     reset();
     }

  
  if (gameState === "Play") {
    spawnTrees();
    spawnAxe();
    
    

  }
  
  if (gameState === "end"){
    background.velocityX = 0;
    mario.visible = false;
     fill("yellow")
     textSize(30);
    text("GAME OVER",200,250);
    treesGroup.destroyEach();
    axeGroup.destroyEach();
      
      }
  
  
    fill("brown")
     textSize(20);
    text("treesSave " + score,300,100 );
  
  if (mario.isTouching(axeGroup)){
    gameState = "end";
  }
}

function spawnTrees() {
 if (frameCount % 50 === 0) {
   trees = createSprite(550,200,10,40) ;
   trees.velocityX = -5;
   trees.y = Math.round(random(200,400));
   trees.lifetime = 300;
   trees.addImage(treeImage2);
   trees.scale = 0.2;
   treesGroup.add(trees);
   
     }

  
}
function spawnAxe() {
 if (frameCount % 100 === 0) {
  axe = createSprite(500,200,10,40) ;
   axe.velocityX = -5;
   axe.y = Math.round(random(200,400));
   axe.lifetime = 300;
   axe.addImage(axeImage);
   axe.scale = 0.2;
   axeGroup.add(axe);
   
     }

  
}


function reset(){
  gameState = "Play";
  score = 0;
  mario.visible = true;
}

