/****************************************************
 * pipe.js
 *
 * Our predefined variables:
 * 
 *   - speed         contains the pipe speed that we will use for moving animation.
 *   - width         the width of the pipe.
 *   - x             x-axis position of pipe.
 *   - topY          the upper pipe's y-axis positioning.
 *   - bottomY       the lower pipe's y-axis positioning.
 *   - topHeight     the upper pipe's height.
 *   - bottomHeight  the lower pipe's height.
 * 
 * Our predefined methods:
 * 
 *   - show()        will be used for drawing an upper and lower pipe.
 *   - update()      will be used for animation, in this case, moving the pipes from right to left on the canvas.
 *   - hits()        will be used for checking if our wasp hits a pipe.
 *   - pass()        will be used for checking if our wasp passes (NOT hits) a pipe.
 *   - offscreen()   will be used for checking of the pipe has moved outside the canvas.
 * 
 ****************************************************/

class Pipe {
  speed = 2;
  topHeight = random(CANVAS_HEIGHT / 2);
  width = 20;
  x = CANVAS_WIDTH;
  topY = 0;
  bottomHeight = random(CANVAS_HEIGHT / 2);
  bottomY = CANVAS_HEIGHT - this.bottomHeight;

  /****************************************************
   * Create pipes
   * Use fill and rect from p5 together with
   * the variables in the top
   * @custom
   ****************************************************/
  show() {
    fill(121, 85, 72);
    rect(this.x, 0, this.width, this.topHeight);
    rect(this.x, this.bottomY, this.width, this.bottomHeight);
  }

  /****************************************************
   * Each pipe starts to the right of the canvas and
   * moves to the left
   * This function updates in draw()
   * @custom
   ****************************************************/
  update() {
    this.x -= this.speed;
  }

  /****************************************************
   * Hit detection: when the wasp hits the pipe
   * @custom
   ****************************************************/
  hits(wasp) {
    if (wasp.y < this.topHeight || wasp.y > CANVAS_HEIGHT - this.bottomHeight) {
      if (wasp.x > this.x && wasp.x < this.x + this.topWidth) return true;
      if (wasp.x > this.x && wasp.x < this.x + this.width) return true;
    }
    return false;
  }

  /****************************************************
   * When the wasp passes a pipe
   * @custom
   ****************************************************/
  pass(wasp) {
    if (wasp.x > this.x && !this.passed) {
      this.passed = true;
      return true;
    }
    return false;
  }

  /****************************************************
   * Check if the pipe is offscreen or not
   * Use the variables in the top
   * @custom
   ****************************************************/
  offscreen() {

  }
}
