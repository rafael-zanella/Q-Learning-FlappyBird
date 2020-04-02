function Pipe() {
  this.spacing = 150;
  this.top = random(245, 0);
  this.bottom = height - (this.top + this.spacing);
  this.x = width;
  this.w = 35;
  this.speed = 2;
  this.highlight = false;

  this.hits = function () {
    if (bird.y <= this.top) {
      if (bird.x >= this.x && bird.x <= this.x + this.w) {
        bird.vivo = false;
        bird.update();
        this.highlight = true;
        pipes.splice(0, 1);
        contRepeticoes++;
      }
    } else if (bird.y >= height - this.bottom) { // hit pipe bottom
      if (bird.x >= this.x && bird.x <= this.x + this.w) {
        bird.vivo = false;
        bird.update();
        contRepeticoes++;
        score = 0;
        distancia = 0;
        this.highlight = true;
        pipes.splice(0, 1);
      }
    } else if (bird.y > this.top && bird.y < this.top + this.spacing) { // hit target
      if (bird.x >= this.x && bird.x < this.x + this.w - 34) {
        bird.vivo = true;
        bird.update();
        score++;
        if (score > record) {
          record = score;
        }
      }
    } else {
      bird.bivo = true;
      bird.update();
    }
  }

  this.show = function () {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  this.update = function () {
    this.x -= this.speed;
  }

  this.offscreen = function () {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
