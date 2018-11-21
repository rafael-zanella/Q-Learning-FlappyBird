function mapToJson(map) {
  saveJSON(JSON.stringify([...map]), 'data.json');
}

let myRequest = new Request("data.json");

//var datas = {};
var estados = [];


// fetch(myRequest)
//   .then(function(resp) {
//       return resp.json();
//   })
//   .then (function(data) {
//     console.log(data);
//   });

function preload() {
  //datas = loadJSON('./data.json');
}

var bird;
var pipes = [];
var testedecisionValue = 0;
var score = 0;
var contRepeticoes = 0;
var mapEstados = new Map();
var record = 0;
var distancia = 0;
var distanciaRecord = 0;

var DistaceFromTop = 0;   // A
var DistanceFromBot = 0;  // B
var TopTarget = 0;       // C
var BotTarget = 0;             // D
var TargetDistance = 0;   // E
var proxEstadoS1 = ""; // string chave
var atuEstadoS = ""
var decisionValue; // aux valor


// 0 < a <= 1  // 0 <= y < 1; 
var a = 1.0;
var y = 0.69;
var r = 0.001;

function att(proximoEstado, atualEstado) {
  s1 = mapEstados.get(proximoEstado);
  s1 = parseFloat(s1);
  s = mapEstados.get(atualEstado);
  s = parseFloat(s);
  var Q = s + a*((r) + y*(s1) - (s));
  
  mapEstados.set(atualEstado, Q);
 
  //console.log(Q);
  //console.log("ant: "+ atualEstado +" ["+ s +"]" + " atu: " + proximoEstado +" ["+ s1 +"]");
}


function defineReward(bird, pipe) {
  if (bird.y >= height || bird.y <= 0) {  // hit ground sky
    if(bird.y > height){
      r = -10000;
    }else{
      r = +1;
    }
    
    
    score = 0;
    distancia = 0;
    bird.reset();
    //return true;

  }else if (bird.y <= pipe.top || bird.y >= height - pipe.bottom) { // hit pipe
    if (bird.x >= pipe.x && bird.x <= pipe.x + pipe.w) {
       
      r = 50;
      
      score = 0;
      distancia = 0;
        //pipe.highlight = true;
        pipes.splice(0, 1);
        contRepeticoes++;
        //return true;
    }
  }else if (bird.y > pipe.top && bird.y < pipe.top + pipe.spacing) { // hit target
    if (bird.x >= pipe.x && bird.x < pipe.x + pipe.w - 39) {
        //this.highlight = true;  
        //console.log("TRUE");
        
        r = 1;
        
        score++;
        
        if (score > record) {
          record = score;
        }
        
        //return true;  
    }
  }
    distancia++;
    if(distancia > distanciaRecord){
      distanciaRecord = distancia;
    }
    r = 2;
    
  
}

function play(proxEstadoS1) {
 if(atuEstadoS == ""){
   atuEstadoS = proxEstadoS1;
   console.log("ANT = EMPTY");
 }

  if (mapEstados.has(proxEstadoS1)) {
    //console.log("\nESTADO "+e);
    //decisionValue = (mapEstados.get(proxEstadoS1));
    //decisionValue = parseFloat(decisionValue.toFixed(3));
    att(proxEstadoS1, atuEstadoS);
    
    if (mapEstados.get(atuEstadoS) > 39) {
      bird.up();
     // console.log(atuEstadoS + "" + mapEstados.get(atuEstadoS));
      
    } else {
      //console.log("down");
    }
    atuEstadoS = proxEstadoS1;

  } else {
    //console.log("\nNOVO ESTADO "+e);
    let x = random(0, 100)
    mapEstados.set(proxEstadoS1, x);
    att(proxEstadoS1, atuEstadoS);
    //console.log("new state "+ proxEstadoS1);
    
    
  }

}

function setup() {
  // put setup code here
  createCanvas(300, 400);
  pipes.push(new Pipe());
  bird = new Bird();
  record = 0;
  score = 0;
}

function draw() {
  // put drawing code here
  background(0);
  
  for (var i = pipes.length - 1; i >= 0; i--) {

    //this.atuEstadoS = DistaceFromTop + "-" + DistanceFromBot + "-" + TopTarget + "-" + BotTarget + "-" + TargetDistance;


    pipes[i].show();
    pipes[i].update();

    // armazena estado atual
    DistaceFromTop = (parseInt((bird.y) / 40));  // A
    DistanceFromBot = (parseInt((height - bird.y) / 40));  // B 
    
    if (pipes.length == 1) {
      TopTarget = (parseInt((height - (pipes[i].bottom + pipes[i].spacing)) / 40));       // C
      BotTarget = (parseInt((pipes[i].bottom) / 40));      // D

      TargetDistance = (parseInt((pipes[i].x - bird.x) / 30)); // E
    } else {

      TopTarget = (parseInt((height - (pipes[1].bottom + pipes[1].spacing)) / 40));       // C
      BotTarget = (parseInt((pipes[1].bottom) / 40));       // D

      TargetDistance = (parseInt((pipes[1].x - bird.x) / 30)); // E
    }

    // key maker
    proxEstadoS1 = "" + DistaceFromTop + DistanceFromBot + TopTarget +  BotTarget +  TargetDistance;

    

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }

   
    defineReward(bird, pipes[i]);
    play(proxEstadoS1);
  }

  
  


  bird.update();
  bird.show();

  fill(0, 255, 0);
  text("score\n"+score, 10, 50);
  text(distancia, 10, 80)
  text("record\n "+record, 240, 50);
  text(distanciaRecord, 240, 80);

  text("value: " + parseFloat(mapEstados.get(atuEstadoS).toFixed(2)), 50, 100);
  text("reward: " + r, 110, 40);
  text("top:       " + DistaceFromTop, 50, 130);
  text("bot:       " + DistanceFromBot, 50, 160);
  text("Top Targ:  " + TopTarget, 50, 190);
  text("Bot Targ:  " + BotTarget, 50, 220);

  text("xTargetDistance: " + TargetDistance, 50, 250);

  text("Repeticoes: " + contRepeticoes, 50, 280);
  fill(255, 0, 0);

  //textAlign(CENTER);
  text("Press space to save the current states", 45, 380);


  if (frameCount % 110 == 0) {
    pipes.push(new Pipe());
  }




}

function keyPressed() {
  if (key == ' ') {
    bird.up();

   // mapToJson(mapEstados);

  }
}






/*function punish(e){
  //console.log(e);
  //console.log(mapEstados.get(e) + "=>");
  let aux = parseFloat(mapEstados.get(e));


//  if(aux > 0.10){
    
    aux = aux - 1000;
    aux = parseFloat(aux.toFixed(3));
    mapEstados.set(e, aux);
    console.log("Punindo: ["+ e +"]: "+mapEstados.get(e));
    
  //}
  //console.log(" Perdeu: "+mapEstados.get(e));
}*/


/*function reward(e){
  //console.log(mapEstados.get(e) + "=>");
  let aux = parseFloat(mapEstados.get(e));
  //if(aux < 1.0){
    
    aux = aux + 1;
    aux = parseFloat(aux.toFixed(4));
    mapEstados.set(e, aux);
    
   console.log("Recompensando: ["+ e +"]: "+mapEstados.get(e));
  //}
  //console.log(" Ganhou: "+mapEstados.get(e));
}*/
