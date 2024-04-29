let d0_1;
let d0_2;
let d1_1;
let d1_2

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  loadStart();
  setInterval(loadStart, 60000);
  noLoop();
  angleMode(DEGREES);
}


function loadStart() {
  const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=jpy'
  loadJSON(apiUrl, loadJSONComplate, loadJSONError);
}


function loadJSONComplate(data) {
  d1_1 = d0_1;
  d1_2 = d0_2;
  print(data);
  print('仮想通貨名');
  print(data[0].name);
  print('24時間の変動率');
  print(data[0].price_change_percentage_24h);
  print('時価総額の変動率');
  print(data[0].market_cap_change_percentage_24h);
  d0_1 = data[0].price_change_percentage_24h
  d0_2 = data[0].market_cap_change_percentage_24h
  

  noFill();
  strokeWeight(3);
  stroke(255, 255, 255);
  drawStar(width / 2, height / 2, 150,(abs(d0_1)), abs(d0_2));
  noFill();
  strokeWeight(3);
  stroke(200, 200, 200);
  drawStar(width / 2, height / 2, 150,(abs(d1_1)), random(5));

}

function loadJSONError() {
  print('Bitcoinの情報読み取り失敗');
}


function drawStar(x, y, r, prickleNum, angleNum) {
  let vertexNum = prickleNum * angleNum;
  let R; 

  push();
  translate(x, y);
  rotate(0);

  beginShape();
  for (let i = 0; i < vertexNum; i++) {
    R = i % 2 == 0 ? r : r / 2;

    vertex(R * cos(360 * i / vertexNum), R * sin(360 * i / vertexNum));
  }
  endShape(CLOSE);

  pop();
}