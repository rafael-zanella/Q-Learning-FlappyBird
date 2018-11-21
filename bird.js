function Bird(){
    frameRate(2000);
    this.y = height/2;
    this.x = 164;

    this.gravity = 0.9;
    this.force = -10;//-18;
    this.velocity = 0;

    this.reset = function() {
        this.y = height/2;
        this.x = 164;
        this.gravity = 0.9;
        this.force = -10;//-18;
        this.velocity = 0;
    }

    this.show = function(){
        fill(255);
        ellipse(this.x, this.y, 32, 32);
    }


    this.up = function() {
        this.velocity += this.force;
        
        //console.log(this.velocity);
    }

    this.update = function() {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
    
        // if(this.y > height) {
        //     this.y = height;
        //     this.velocity = 0;
        // }
        // if(this.y < 0) {
        //     this.y = 0;
        //     this.velocity = 0;
        // }
    
    }
}