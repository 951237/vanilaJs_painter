const canvas = document.getElementById("jsCanvas"); // html에서 캔버스 개체 가져오기
const ctx = canvas.getContext("2d"); // canvas 
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// 그림을 그릴수 있는 캔버스 크기를 js에서도 설정
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white'; // 채우기 색을 흰색으로 
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 캔버스 배경색을 흰색으로 채우기
ctx.strokStyle = INITIAL_COLOR; // 선의 기본 색깔 검은색
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 선의 굵기 지정

let painting = false; //그리기 모드 중지
let filling = false; // 채우기 모드 중지

// 그리기 모드 중지
function stopPainting() {
    painting = false;
}

// 캔버스에 마우스가 움직일때 좌표값을 반환
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) { // 그리기모드가 아닐때
        // console.log("creating path in ", x, y);
        ctx.beginPath(); // 움질일때 패스가 만들어짐
        ctx.moveTo(x, y); // 좌표를 움직임
    } else { // 그리기 모드가 활성화 될때
        // console.log("creating line in ", x, y);
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

// 캔버스를 클릭했을 때
function handleCanvasClick(click) {
    if (filling) { // 채우기가 활성화일 때만
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); // 캔버스 사이즈 만큼 색 채우기
    }
}

function handleColorClick(event) {
    // 마우스로 클릭한 개체의 배경색 가져오기 컬러피커??
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color; // 선색깔을 바꾸기
    ctx.fillStyle = color;
    console.log(color);
}

// 라인 두께바꾸기 함수
function handleRangeChange(event) {
    // console.log(event.target.value)
    const size = event.target.value; // range두께의 값 설정
    ctx.lineWidth = size; // 라인 두께를 range 값으로 설정
}

// 채우기 함수
function handleModeClick() {
    if (filling === true) { // 채우기 모드 일경우
        filling = false; // 채우기 모드 비활성화
        mode.innerText = "Fill"; // 버튼 글짜 바꾸기
    } else { // 채우기 모드가 아닌 경우
        filling = true; // 채우기 활성화
        mode.innerText = "Paint"; // 버튼 글자 바꾸기
    }
}

// 우클릭 방지
function handleCM(event) {
    event.preventDefault();
}

// 이미지 저장하기
function handleSaveClick() {
    const image = canvas.toDataURL(); // 캔버스 이미지 링크 생성
    const link = document.createElement("a"); // 'a' 태그 생성
    link.href = image; // 링스 생성
    link.download = "PaintJS"; // 이미지 다운로드
    link.click(); // 클릭하기
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contexmenu", handleCM);
}

// 컬러를 배열에 담기, 구문 찾아보기 array foreach 구문 찾아보기
if (colors) {
    Array.from(colors).forEach(colors => colors.addEventListener("click", handleColorClick));
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}