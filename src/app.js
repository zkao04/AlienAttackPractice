//The Game Objects
var inputX = document.querySelector("#inputX");
var inputY = document.querySelector("#inputY");
var output = document.querySelector("#output");
var missile = document.querySelector("#missile");
var alien = document.querySelector("#alien");
var cannon = document.querySelector("#cannon");
var explosion = document.querySelector("#explosion");

//Game Variable
var coordinateX = 0;
var coordinateY = 0;
var missilesShot = 0;
var missilesLeft = 8;
var alienPositionX = Math.floor(Math.random()*280);
var alienPositionY = 20;
var attackReport = "";
var gameWon = false;


//Testing
console.log(alienPositionX);
console.log(alienPositionY);

//missile launch fire
var fire = document.querySelector("#fire");
fire.addEventListener("click", clickHandler, false);
function clickHandler(){
  validateInput();
}

// var reload = document.querySelector("#reload");
// reload.addEventListener("click", reload, false);
// function reload(){
//   missile.style.top = 260 + "px";
//   missile.style.left = 145 + "px";
// }

function validateInput(){
  coordinateX = parseInt(inputX.value);
  coordinateY = parseInt(inputY.value);
  if (isNaN(coordinateX || coordinateY)){
    output.innerHTML = "You must enter number for coordinates, Captain";
  }
  else if (coordinateX > 300 || coordinateY > 300 ) {
    output.innerHTML = "Your coordinates are out of range, Captain";
  }
  else {
    attack();
  }
}

//Functions of the Game
function attack(){
  launched();
  missilesLeft --;
  missilesShot ++;
  var attackReport =
    "Missile's X Coordinate: " + coordinateX + "<br>" +
    "Missile's Y Coordinate: " + coordinateY + "<br" +
    "Missiles Remaining: " + missilesLeft;
  if (coordinateX >= alienPositionX && coordinateX <= alienPositionX + 20) {
    if (coordinateY >= alienPositionY && coordinateY <= alienPositionY + 20) {
        gameWon = true;
        endGame();
    }
  }
  else {
    output.innerHTML = "We missed! The Alien is moving closer!" + "<br>" + attackReport;
    alienMoves();
    console.log(alienPositionX);
    console.log(alienPositionY);
    if (missilesLeft === 0) {
      endGame();
    }
  }
}

function endGame(){
  if (gameWon){
    exploded();
    output.innerHTML = "Yes Captain! We did it! The threat is now eliminated!";
  }
  else {
    output.innerHTML = "I'm sorry Captain, we have no more missiles...it's over";
  }
//Disabling Input-Field
  inputX.disabled = true;
  inputY.disabled = true;
//Disabling fire
  fire.removeEventListener("click", clickHandler, false);
  fire.disabled = true;
//Disabling Enter-Key
  // window.removeEventListener("keydown", keyHandler, false);
}

function launched(){
  missile.style.top = coordinateY + "px";
  missile.style.left = coordinateX + "px";
}

function alienMoves(){
  alienPositionX = Math.floor(Math.random()*280);
  alienPositionY += 30;
  //rendering alien
  alien.style.top = alienPositionY + "px";
  alien.style.left = alienPositionX + "px";
};

function exploded(){
  explosion.style.top = coordinateY + "px";
  explosion.style.left = coordinateX + "px";
  explosion.style.display = "block";
  alien.style.display = "none";
}
