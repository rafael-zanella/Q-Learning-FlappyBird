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
var Velocity = 0;       // F
// 0 - pula, 1 - nao pula, 2 - vivo?
var proxEstadoS1 = ""; // string chave
var atuEstadoS = "";
var decisionValue; // aux valor


var lastDistanceFromTop = 0;
var lastDistanceFromBot = 0;;
var lastBotTarget = 0;
var lastTopTarget = 0;

// 0 < a <= 1  // 0 <= y < 1;
var a = 0.1;
var y = 1.0;
var r = 0.0;

function updateQ(atualEstado, proximoEstado, ultimaAcao) {

  // pega o maior valor da proximo estado
  s1 = mapEstados.get(proximoEstado);
  maiorS1 = Math.max(s1[0], s1[1]);

  // pega o maior valor do estado atual
  s = mapEstados.get(atualEstado);
  maiorS = Math.max(s[0], s[1]);
if(s1[2]==false){
    r = -0.6;

}else if(lastDistanceFromTop <= 2 && ultimaAcao == 0){
    r = -1;
}else if(lastDistanceFromBot <= 1 && ultimaAcao == 1) {
    r = -1;
}else if (lastDistanceFromTop <= 2 && ultimaAcao == 1) {
    r = 1;
}else if (lastDistanceFromBot <= 1 && ultimaAcao == 0) {
    r = 1;

}else if(lastBotTarget <= 1 && ultimaAcao == 1){
    r = -0.1;
}else if(lastTopTarget >= -2 && ultimaAcao == 0){
    r = -0.1;
}else if(lastBotTarget <= 1 && ultimaAcao == 0){
    r = 0.01;
}else if(lastTopTarget >= -2 && ultimaAcao == 1){
    r = 0.01;

}else{
    r = 0.0005;
}


  var Q = s[ultimaAcao] + a*((r) + y*(maiorS1) - (s[ultimaAcao]));

  //console.log(s[ultimaAcao] + "  " + s1[2] + " " + " R: " + r + " Q: " + Q + "[p " + s[0] + " n " + s[1] + "]");
  // let vetAux = mapEstados.get(atualEstado);
  // if(ultimaAcao == 0 && s1[2]==true){
  //   vetAux[0] = Q;
  //   vetAux[1] = 1-Q;
  //
  //   //r = 0.0001;
  // }else if(ultimaAcao == 0 && s1[2]==false){
  //   vetAux[0] = Q;
  //   vetAux[1] = 1-Q;
  //
  //   //r = -1;
  // }else if(ultimaAcao == 1 && s1[2]==true){
  //   vetAux[1] = Q;
  //   vetAux[0] = 1-Q;
  //
  //   //r = 0;
  // }else if(ultimaAcao == 1 && s1[2]==false){
  //   vetAux[1] = Q;
  //   vetAux[0] = 1-Q;
  //   //r = 10;
  // }

  let vetAux = mapEstados.get(atualEstado);
  if(ultimaAcao == 0){
    vetAux[0] = Q;
    vetAux[1] = 1-Q;
    //r = 0.0001;
  }else{
    vetAux[1] = Q;
    vetAux[0] = 1-Q;
    //r = 10;
  }

  //mapEstados.set(antEstado, pS);


  mapEstados.set(atualEstado, vetAux);
  //console.log("[p " + s[0] + " n " + s[1] + "]");
  //console.log("ant: "+ atualEstado +" ["+ maiorS +"]" + " atu: " + roximoEstado +" ["+ maiorS1 +"]");
}

function defineStates(proxEstadoS1){
    if(atuEstadoS == ""){
   atuEstadoS = proxEstadoS1;
   //mapEstados.set(atuEstadoS, [0.4, 0.6, true]);
   console.log("ANT = EMPTY");
   lastDistanceFromTop = DistaceFromTop;
   lastBotTarget = BotTarget;
   lastTopTarget = TopTarget;
   lastDistanceFromBot = DistanceFromBot;
 }
 vals = [];


  if (mapEstados.has(proxEstadoS1)) {
    //console.log(proxEstadoS1+ "\nESTADO "+ mapEstados.get(proxEstadoS1));
    //console.log("2");
    let ultimaAcao;
    let sPlayed = mapEstados.get(atuEstadoS);
    if (sPlayed[0] >= 0.5) {
      bird.up();
      //console.log(bird.vivo);
      ultimaAcao = 0;
     // console.log(atuEstadoS + "" + mapEstados.get(atuEstadoS));
    }else{
     ultimaAcao = 1;
    }
   //bird.update();
    //console.log(atuEstadoS + " " + mapEstados.get(atuEstadoS));
    updateQ(atuEstadoS, proxEstadoS1, ultimaAcao);
    //console.log(atuEstadoS + " " + mapEstados.get(atuEstadoS));

    atuEstadoS = proxEstadoS1;

    lastDistanceFromTop = DistaceFromTop;
    lastBotTarget = BotTarget;
    lastTopTarget = TopTarget;
    lastDistanceFromBot = DistanceFromBot;

  } else {
    //console.log("1");
    //console.log("\nNOVO ESTADO "+e);
    //let x = random(0, 0.8);
    let x = 0.49;
    vals.push(x);
    vals.push(1-x);
    vals.push(bird.vivo);
    mapEstados.set(proxEstadoS1, vals);

     atuEstadoS = proxEstadoS1;
    // lastDistanceFromTop = DistaceFromTop;
    // lastBotTarget = BotTarget;
    // lastTopTarget = TopTarget;

    //console.log(proxEstadoS1 +"  "+ mapEstados.get(proxEstadoS1));
    //updateS(proxEstadoS1, atuEstadoS);
    //play(proxEstadoS1);
  }
}


function setup() {
  // put setup code here
  createCanvas(300, 400);
  pipes.push(new Pipe());
  bird = new Bird();
  record = 0;
  score = 0;
  bird.vivo = true;
}

function draw() {
  // put drawing code here
  background(0);

  for (var i = pipes.length - 1; i >= 0; i--) {

    //this.atuEstadoS = DistaceFromTop + "-" + DistanceFromBot + "-" + TopTarget + "-" + BotTarget + "-" + TargetDistance;
    pipes[i].show();
    pipes[i].update();

    // armazena estado atual
    DistaceFromTop = (parseInt((bird.y) / 20));  // A
    DistanceFromBot = (parseInt((height - bird.y) / 20));  // B
    if (pipes.length == 1) {
      TopTarget = (parseInt( ( (pipes[i].top - bird.y )/20)));
      BotTarget = (parseInt(((pipes[i].top + pipes[i].spacing)-bird.y)  / 20));      // D
      TargetDistance = (parseInt((pipes[i].x - bird.x) / 16)); // E
    } else {
      //TopTarget = (parseInt((height - (pipes[1].bottom + pipes[1].spacing)) / 20));       // C
      TopTarget = (parseInt( ( (pipes[1].top - bird.y )/20)));
      BotTarget = (parseInt(((pipes[1].top + pipes[i].spacing)-bird.y)  / 20));      // D
      TargetDistance = (parseInt((pipes[1].x - bird.x) / 16)); // E
    }
    Velocity = parseInt(bird.velocity / 2);
    // key maker
    proxEstadoS1 = ""+[DistaceFromTop, DistanceFromBot, TopTarget, BotTarget, TargetDistance, Velocity];



//FIM ESTADO ATUAL
if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
}


    pipes[i].hits();
    defineStates(proxEstadoS1);

}


  fill(0, 255, 0);
   text("Geracao: " + contRepeticoes, 30, 20);
  text("SCORE\n"+score, 10, 50);
  //text(distancia, 10, 80)
  text("RECORD\n "+record, 240, 50);
  //text(distanciaRecord, 240, 80);



  text("Top:       " + lastDistanceFromTop, 40, 160);
  text("Bot:       " + lastDistanceFromBot, 40, 190);
  text("yTop Targ:  " + lastTopTarget, 40, 220);
  text("yBot Targ:  " + lastBotTarget, 40, 250);
  text("xTarget:    " + TargetDistance, 40, 280);
  text("bVelocity : " + Velocity, 40, 310);

  fill(255, 0, 0);

  //textAlign(CENTER);
  text("Press space to save the current states", 45, 380);

  bird.update();
  bird.show();

//text("vivo: "+bird.vivo, 110, 50);
  if (frameCount % 110 == 0) { //110
    pipes.push(new Pipe());
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.up();

   // mapToJson(mapEstados);

  }
}
