function Bird() {
    frameRate(2000);
    this.vivo = true;
    this.y = height / 2;
    this.x = 164;
    this.gravity = 0.9;
    this.force = -15;//-18;
    this.velocity = 0;

    this.reset = function () {
        this.vivo = true;
        this.y = height / 2;
        this.x = 164;
        this.gravity = 0.9;
        this.force = -15;//-18;
        this.velocity = 0;
        contRepeticoes++;
    }

    this.show = function () {
        fill(255);
        ellipse(this.x, this.y, 32, 32);
    }


    this.up = function () {

        //console.log("1");
        if(this.velocity <= -10){
            this.force = 1;
            //this.gravity  = 1.2;
        }else{
            this.force = -15;
            //this.gravity = 0.9;
        }
        this.velocity += this.force;
    }

    this.update = function () {
        //console.log("2");
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        if(this.velocity <= -10){
            this.force = 1;
            //this.gravity  = 1.2;
        }else{
            this.force = -15;
            //this.gravity = 0.9;
        }
        this.y += this.velocity;
        if (this.y >= height) { // height == bottom part of the screen

            this.y = height;
            this.velocity = 0;

            this.vivo = false;
        }
        if (this.y <= 0) {

            this.y = 0;
            this.velocity = 0;
            this.vivo = false;

        }
        if (this.vivo == false) {
            score = 0;
            // if(pipes.length != 0){
            //     pipes.splice(0, 1);
            // }
            let aAux = mapEstados.get(proxEstadoS1);
            if(aAux != undefined){

                aAux[2] = false;

                mapEstados.set(proxEstadoS1, aAux);
            }
            this.reset();
        }else{
            let aAux = mapEstados.get(proxEstadoS1);
            if(aAux != undefined){
                aAux[2] = true;
                mapEstados.set(proxEstadoS1, aAux);
            }
        }
        text("reward: " + r, 110, 40);
    }
}
