var tal = 0;
let r = 0;
let pos = { x: 1, y: 2, circleColor: 'blue', p1hit: 0, p2hit: 0};
/*
const flights = [
  {
    x: 100, 
    y: 100, 
    color: "blue", 
    hits: 0,
  },
  {
    x: 200, 
    y: 200, 
    color: "red", 
    hits: 0,
  },
];
*/
//let shared;
let me;
let guests;
const p1 = null;
const p2 = null;
//let circleColor = "blue";
let counter = 0;

function preload() {
  // connect to a p5party server
  partyConnect("wss://demoserver.p5party.org", "jkh_hello_party2");

  // tell p5.party to sync the pos object
  pos = partyLoadShared("pos", pos);
  me = partyLoadMyShared({ role: "observer", y: 20 });
  guests = partyLoadGuestShareds();
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  assignPlayers();

  if(counter == 0){
    console.log({me})
    console.log({pos})
    console.log({guests})
  }
  counter++;

  background(50); 
  
  fill(pos.circleColor);
  ellipse(300, 300, 40);
//  ellipse(pos.x, pos.y, 40);

  fill(255);
  textSize(25);
//  text("Antal hits player1: ", 140, 150);
//  text("Antal hits player2: ", 140, 180);

  text("Antal hits player1: " +  pos.p1hit, 40, 150);
  text("Antal hits player2: " +  pos.p2hit, 40, 180);

//  r = random(0, 4);

 // p1 = guests.find((p) => p.role === "player1");
  
  if (me.role === "player1") {
    fill("blue");
    rect(60, me.y, 20, 100);
  }

  // draw player 2
//  const p2 = guests.find((p) => p.role === "player2");
  if (me.role === "player2") {
    fill("red");
    rect(220, me.y, 20, 100);
  }

  // draw player 2
  //const p3 = guests.find((p) => p.role === "observer");
  if (me.role === "observer") {
    fill("yellow");
    rect(320, me.y, 20, 100);
  }
  
}

function mousePressed() {
console.log("mousePressed")

console.log({me})
if (me.role === "player1") {
  //fill("blue");
  //rect(60, me.y, 20, 100);
  pos.circleColor = "blue";
}
if (me.role === "player2") {
  //fill("blue");
  //rect(60, me.y, 20, 100);
  pos.circleColor = "red";
}

/*
  if (me.role === "player1") {
    let d = dist(me.x, me.y, mouseX, mouseY);
    console.log(me.x);
  
    if (d < 20) {
      pos.p1hit++;
      pos.x = random(0, 400);
      pos.y = random(0, 400);
    }
  }
  if (me.role === "player2") {
    let d = dist(me.x, me.y, mouseX, mouseY);
    console.log(me.x);
  
    if (d < 20) {
      pos.p2hit++;
      pos.x = random(0, 400);
      pos.y = random(0, 400);
    }
  }
    */
}

function assignPlayers() {
  if (!guests.find((p) => p.role === "player1")) {
    me.role = "player1";
  }
  if (!guests.find((p) => p.role === "player2")) {
    me.role = "player2";
  }
}

/*
function mousePressed() {


  let d = dist(pos.x, pos.y, mouseX, mouseY);
  console.log(d);

  console.log(pos.x);

  if (d < 20) {
    tal = tal + 1;
    pos.x = random(0, 400);
    pos.y = random(0, 400);
  }
}
*/

function assignPlayers() {
  if (!guests.find((p) => p.role === "player1")) {
    const o = guests.find((p) => p.role === "observer");
    if (o === me) {
      o.role = "player1"
      console.log({o})
    };
  }
  if (!guests.find((p) => p.role === "player2")) {
    const o = guests.find((p) => p.role === "observer");
    if (o === me) {
      o.role = "player2"
      console.log({o})
    };
  }
}
