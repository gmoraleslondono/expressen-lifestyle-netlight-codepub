/****************************************************
 * index.js
 * 
 * Our predefined variables:
 * 
 *  - wasp           will contain an instance object of the class Wasp located in our predefined file wasp.js.
 *  - pipes          will contain an instance object of the class Pipe located in our predefined file pipe.js.
 *  - background     will contain an instance object of the class Background located in our predefined file background.js.
 *  - waspImg        will contain an image object from images/wasp.png.
 *  - backgroundImg  will contain an image object from images/background.png.
 *  - presentImg     will contain an image object from images/present.png.
 *  - isOver         will contain a boolean if the player has lost the game or not.
 *  - score          will contain an integer with the players score.
 *  - CANVAS_HEIGHT  contains the canvas height.
 *  - CANVAS_WIDTH   contains the canvas width.
 *
 * Our predefined methods:
 *
 *  - preload()      a p5.js method.
 *  - setup()        a p5.js method.
 *  - draw()         a p5.js method.
 *  - keyPressed()   a p5.js method.
 *  - startGame()    a custom method.
 *  - gameOver()     a custom method.
 *  - showScores()   a custom method.
 * 
 ****************************************************/


/****************************************************
 * This is all the variables we need in the game.
 * You can read more about them in the README.md.
 ****************************************************/
let wasp;
let pipes = [];
let presents = [];
let background;
let waspImg;
let backgroundImg;
let presentImg;
let isOver = false;
let score = 0;
const CANVAS_WIDTH = 350;
const CANVAS_HEIGHT = 500;


/**************************************************** 
 * This is a magical p5 function. 
 * preload() loads before setup() function and setup() 
 * waits for it to complete
 * 
 * @p5jsMethod
 ****************************************************/
function preload() {
    backgroundImg = loadImage("images/background.png");
    waspImg = loadImage("images/wasp.png");
    presentImg = loadImage("images/present.png");
}


/****************************************************
 * setup() runs only once and is used to initialize "stuffs"
 * Use the createCanvas() to set the width and height. See p5.js
 * 
 * @p5jsMethod
 ****************************************************/
function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    background = new Background();
    wasp = new Wasp();
    wasp.show();

}


/****************************************************
 * draw() is a magical p5 function which runs repeatedly and is used to draw graphics/stuffs
 * Draw our background image, then move it at the same speed as the pipes
 * 
 * @p5jsMethod
 ****************************************************/
function draw() {
    background.show();
    background.update();
    wasp.show();
    wasp.update();
    if (frameCount % 100 === 0) pipes.push(new Pipe());
    for (let pipe of pipes) {
        pipe.show();
        pipe.update();
        if (pipe.hits(wasp)) gameOver();
        if (pipe.pass(wasp)) score++;
      }

      showScore();
}


/****************************************************
 * Set the space button to make the wasp fly
 * 
 * @p5jsMethod
 ****************************************************/
function keyPressed() {
    if (key === " ") {
        wasp.up();
        if (isOver) startGame();
      }
}


/****************************************************
 * Create a new wasp and new pipe
 * Reset the score to 0
 * Reset the moving background to the start poisition
 * 
 * @customMethod
 ****************************************************/
function startGame() {
    background = new Background();  // Reset the background's x position.
  wasp = new Wasp();              // we create a new wasp to original position.
  pipes = [];                     // We will need an empty pipes array to reset pipe positions.
  presents = [];                  // We will need an empty presents array. We will implement later.
  isOver = false;                 // Set isOver to false when starting the game again.
  loop();                         // Start looping again (adding frames), else game will be paused.
  score = 0;                      // We set the score to 0. We will implement this in the next step!
}


/****************************************************
 * Display text on screen, using text function from p5 
 * You can also fill to set paintbrush color and textSize
 * 
 * @customMethod
 ****************************************************/
function gameOver() {
    textSize(50);
    fill(000);
    text("Game Over", 50, 300);
    isOver = true;
    noLoop();
}


/****************************************************
 * Display text on screen, using text function from p5
 * You can also use fill to set paintbrush color and textSize
 * 
 * @customMethod
 ****************************************************/
function showScore() {
    fill(000);
    textSize(32);
    text("Score: " + score, 1, 32);
}
