const canvas = document.getElementById("jsCanvas");


let painting = false; //그리기 모드 중지

// 그리기 모드 중지
function stopPainting() {
    painting = false;
}

// 캔버스에 마우스가 움직일때 좌표값을 반환
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
}

// 캔버스에 마우스를 클릭 했을 때
function onMouseDown(event) {
    painting = true; // 그리기 모드 활성화
    // console.log(event)
}

// 캔버스에서 마우스를 떼었을 때 함수
function onMouseUp(event) {
    stopPainting(); // 그리기 모드 비활성화
}


if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
}