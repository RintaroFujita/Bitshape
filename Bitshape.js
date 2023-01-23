let d0_1;
let d0_2;
let d1_1;
let d1_2;
let s1;
let s2;
// let angle = 0;


function setup() {
	createCanvas(windowWidth, windowHeight);
	rotate(canvas);
	loadStart();
	setInterval(loadStart, 60000);
	noLoop();
	angleMode(DEGREES);
	background(100);
	s1 = createSprite(windowWidth / 2, windowHeight / 7, 50, 50);
	s1.shapeColor = color('red');
	s1.rotation = 0;
	s1.rotateSpeed =1;
	s2 = createSprite(windowWidth / 2, windowHeight / 7, 50, 50);
	s2.rotation =0;
	s2.rotateSpeed =1;
	s2.shapeColor = color('blue');
}



function loadStart() {
	const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=jpy'
	loadJSON(apiUrl, loadJSONComplate, loadJSONError);
}


function loadJSONComplate(data) {
	d1_1 = d0_1;
	d1_2 = d0_2;
	print('仮想通貨名');
	print(data[0].name);
	print('24時間の変動率');
	print(data[0].price_change_percentage_24h);
	print('時価総額の変動率');
	print(data[0].market_cap_change_percentage_24h);
	d0_1 = data[0].price_change_percentage_24h
	d0_2 = data[0].market_cap_change_percentage_24h

	// 星
	noFill();
	strokeWeight(3);
	stroke(255, 255, 255, 255);
	drawStar(width / 2, height / 2, 150, (abs(d0_1)), abs(d0_2)); //ここの角の値をBitcoinの24時間の変動率パーセンテージにする
	noFill();
	strokeWeight(2);
	stroke(200, 200, 200, 10);
	drawStar(width / 2, height / 2, 150, (abs(d1_1)), abs(d1_2)); //ここの角の値をBitcoinの24時間の変動率パーセンテージにする
	if (d0_1 < d1_1) {
		print('上昇中');
		drawSprite(s1);
	} else if (d0_1 > d1_1) {
		print('下落中');
		drawSprite(s2);
	}



}

function loadJSONError() {
	print('Bitcoinの情報読み取り失敗');
}



function drawStar(x, y, r, prickleNum, angleNum) {
	let vertexNum = prickleNum * angleNum; // 時価総額の変動率のパーセンテージをここに持ってくる
	let R;

	push();
	translate(x, y);
	beginShape();
	for (let i = 0; i < vertexNum; i++) {
		R = i % 2 == 0 ? r : r / 2;

		vertex(R * cos(360 * i / vertexNum), R * sin(360 * i / vertexNum));
	}
	endShape(CLOSE);
	pop();
}