var dog,dogImg,dogImg2;
var database;
var foodS,foodStock;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg2=loadImage("Images/happy dog.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.25;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}


function draw() {
  background("blue");
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2);
  }

  drawSprites();
  fill("yellow");
  stroke("black");
  text("FOOD LEFTOVER : "+foodS,150,170);
  textSize(13);
  text("PRESS UP KEY TO FEED THE SHIRO MILK!",120,10,300,20);
}


function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}