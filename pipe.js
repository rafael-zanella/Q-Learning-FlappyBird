function Pipe() {
    this.spacing = 190;
    this.top = random(height / 6, 3 / 4 * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 40;
    this.speed = 2;
    this.highlight = false;



    

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


// salvar json;
// qdo iniciar, converter pro mapEstados;