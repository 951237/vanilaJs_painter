const canvas = document.getElementById("jsCanvas"); // html에서 캔버스 개체 가져오기
const ctx = canvas.getContext("2d"); // canvas 

// 그림을 그릴수 있는 캔버스 크기를 js에서도 설정
canvas.width = 700;
canvas.height = 700;

ctx.strokStyle = "#2c2c2c"; // 선의 기본 색깔 검은색
ctx.lineWidth = 2.5; // 선의 굵기 지정

let painting = false; //그리기 모드 중지

// 그리기 모드 중지
function stopPainting() {
    painting = false;
}

// 캔버스에 마우스가 움직일때 좌표값을 반환
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) { // 그리기모드가 아닐때
        console.log("creating path in ", x, y);
        ctx.beginPath(); // 움질일때 패스가 만들어짐
        ctx.moveTo(x, y); // 좌표를 움직임
    } else { // 그리기 모드가 활성화 될때
        console.log("creating line in ", x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// 그림그리기 시작
function startPainting() {
    painting = true;
}

// 캔버스에 마우스를 클릭 했을 때
function onMouseDown(event) {
    painting = true; // 그리기 모드 활성화
    // console.log(event)
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}