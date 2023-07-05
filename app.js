const modeButton = document.querySelector("#mode-Button") // 5.
const clearButton = document.querySelector("#clear-Button") // 7.
const eraserButton = document.querySelector("#eraser-Button") // 8
const fileInput = document.querySelector("#file"); //9
const textInput = document.querySelector("#text"); //10
const saveButton = document.querySelector("#save");
const colorOptions = Array.from(document.querySelectorAll(".color-option")) // 4.컬러옵션 설정, array가 아니므로 array.from으로 설정.(forEach 함수 사용해야하기때문)
const canvas = document.querySelector("canvas");
const lineWidth = document.querySelector("#line-width"); //1.캔버스 선 굵기 조절할 수 있도록 불러들임
const color = document.querySelector("#color"); // 3. 컬러표

const ctx = canvas.getContext("2d"); // context는 캔버스에 그림을 그릴 때 사용하는 붓이다. canvas.getContext 로 불러온 다음 2d를 선택
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value; // html 디폴트 벨류가 5이기 때문에 js가 실행될 떄 ctx.lineWidth를 input의 기본값으로 초기화 해줘야함
ctx.lineCap = "round";
ctx.fillcolor = color.value;
let isPainting = false;
let isFilling = false;

function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath(); // 선 굵기 변경시 이전에 그었던 선의 굵기 그대로 유지될 수 있도록 해줌.
    ctx.moveTo(event.offsetX, event.offsetY)
}

function startPainting() {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
    // 여기에도  ctx.beginPath(); 넣을 수 있음.
}

function onLineWidthChange(event) { // 2. input 값이 바뀔 때 마다 ctx의 lineWidth를 변경해줌
    ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value; // 3.선 색상 변경(파레트)
    ctx.fillStyle = event.target.value; // 3. 채우기 색상 변경(파레트)

}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.fillStyle = colorValue; // 4.채우기 색상 변경
    ctx.strokeStyle = colorValue; // 4.선 색상 변경
    color.value = colorValue; // 4.color input값 바꿔줌(어떤 색상으로 선택했는지 확인 해줌)
}

function onModeClick() { // 채우기 모드(isFilling) 일때와 아닐때 버튼을 클릭하면 모드를 바꿈
    if (isFilling) {
        isFilling = false;
        modeButton.innerText = "◼ Fill";
    } else {
        isFilling = true;
        modeButton.innerText = "🖋 Draw";
    }
}

function onCanvasClick() {
    if (isFilling) { // 6.만약 isFilling 이 true면 선택된 색상으로 캔버스 전체를 덮음
        ctx.fillRect(0, 0, 800, 800);
    }
}

function onDestroyClick() { // 7
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 800); // x 0, y 0 에서 x 800, y 800 까지
}

function onEraserClick() { // 8
    ctx.strokeStyle = "white";
    isFilling = false;
    modeButton.innerText = "Fill";
}

function onFileChange(event) { //9. 
    const file = event.target.files[0]; // 파일을 선택하면 업로드한 파일을 가져옴
    const url = URL.createObjectURL(file) // url 요청 ->이미지를 만들기위해 url 이용해야함
    const image = document.querySelector("#img");
    image.src = url; // img태그의 src속성을 브라우저에서 불러온 URL로 설정
    image.onload = function () { // 이벤트리스너 사용안하는 방법. 이미지가 로드되면 캔버스위에 어떻게 나올것인지 설정
        ctx.drawImage(image, 200, 200, 50, 50) // x위치, y위치, 가로크기, 세로크기
        fileInput.value = null; // 그림을 선택한 상태에서 새로운 그림 불러오기 가능
    };
}

function onDoubleClick(event) { // 10 텍스트 설정
    const text = textInput.value;
    if (text !== "") {
        ctx.save() // ctx의 현재 상태, 색상, 스타일등 모든것을 저장해놓음
        ctx.lineWidth = 1;
        ctx.font = "48px serif"
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore() // save ~ restore 사이 값들은 저장되지 않고, save 상태로 복귀
    }
}

function onSaveClick() { // 11.그림 저장하기
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}


canvas.addEventListener("dblclick", onDoubleClick); // 10
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick); //6.
lineWidth.addEventListener("change", onLineWidthChange) // 2.
color.addEventListener("change", onColorChange) // 3.(파레트)

colorOptions.forEach(color => color.addEventListener("click", onColorClick)) // 4.

modeButton.addEventListener("click", onModeClick); //5. 채우기 모드와 긋기 모드 변경
clearButton.addEventListener("click", onDestroyClick); // 7
eraserButton.addEventListener("click", onEraserClick); // 8
fileInput.addEventListener("change", onFileChange); //9
saveButton.addEventListener("click", onSaveClick); //11