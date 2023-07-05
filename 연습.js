ctx.fillRect(50, 50, 100, 200) // 선과 색상 모두 채움. X 50, Y 50 이동 후 가로100 세로 200 직사각형
ctx.lineWidth = 2; // 선 굵기 설정 (아래 글 해당)

ctx.strokeRect(300, 300, 50, 100); // 선만 보여줌
ctx.fill() // 단색으로 채움
ctx.moveTo()// 시작점 설정
ctx.lineTo() // 끝나는 좌표 어디까지 그리는지 설정
ctx.stroke() //  stroke를 써야 캔버스 위에 그려진다
ctx.fillStyle = "red";

setTimeout(() => {
    ctx.fill();
}, 5000); // 5초후에 ctx.fill() 실행.


/////
ctx.rect(50, 50, 100, 100) // X 50, Y 50 이동 후 가로100 세로 200 직사각형
ctx.rect(150, 150, 100, 100)
ctx.rect(250, 250, 100, 100)
ctx.fill() // 단색으로 채움

ctx.beginPath(); // 새 경로를 만들어서 색상 개별로 설정가능
ctx.rect(350, 350, 100, 100)
ctx.rect(450, 450, 100, 100)
ctx.fillStyle = "red";
ctx.fill();
//////

///만약 rect function을 사용하지 않으면 아래와 같이 길게 사각형을 만들어야 함

ctx.moveTo(50, 50); //X 50, Y 50 이동 
ctx.lineTo(150, 50); // X는 50 ->150 으로 직선 그음 
ctx.lineTo(150, 150); 
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);
ctx.stroke()

/////