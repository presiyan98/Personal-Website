const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const box = 32;

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const AppleImg = new Image();
AppleImg.src = "img/apple.png";

const GrapeImg = new Image();
GrapeImg.src = "img/grape.png";





let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
let background = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";


let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};



let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box

}
var foodKind = getRandomInt(3);


let score = 0;



let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}
// check if there is collision
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// generate random number in range


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
//generate random RGB color
function makeColor()
{
  var arr = [];
      for (var i = 0; i < 3; i++)
      {
        var num = Math.floor(Math.random()*256);
        arr.push(num);
      }
  var newRgb = 'rgb('+arr[0]+','+arr[1]+','+arr[2]+')';
  return newRgb;
}


var head = makeColor();

function draw(){

    ctx.drawImage(ground,0,0);
    var tail = makeColor();

  //console.log(tail);
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? head : tail;
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "white";
        ctx.lineWidth="2";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);

    }


  if( foodKind === 0)
  {
     ctx.drawImage(foodImg, food.x, food.y);
  }
  else if (foodKind === 1)
  {
    ctx.drawImage(AppleImg, food.x, food.y);
  }else if (foodKind === 2)
  {
    ctx.drawImage(GrapeImg, food.x, food.y);

  }



    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        foodKind = getRandomInt(3);

    }else{

        snake.pop();
    }

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();

        setTimeout(function(){if(!alert("Game Over!!! \nYour Score is :"+ " "+score+"\nPress OK to start a new game. ")){window.location.reload();}}, 500);
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}
//speed of the game
let game = setInterval(draw,125);
