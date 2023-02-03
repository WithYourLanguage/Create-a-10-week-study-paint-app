const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("Destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const fontSize = document.getElementById("fontSize");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

let fontSizeValue = "30px";

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;
let fillSituation = false;
function onMove(event) {
  if (isPainting && isFilling === false) {
    fillSituation = false;
    console.log("if진입");
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  } else if (isPainting && isFilling === true) {
    fillSituation = true;
    console.log("else if진입");
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    canvas.addEventListener("mouseup", fill);
    //ctx.fill();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
  ctx.beginPath();
}
function fill() {
  if (fillSituation === true) {
    console.log("fill 펑션 실행");
    ctx.fill();
  }
}
function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  // ctx.beginPath();
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill"; // 그리기 모드
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw"; // 채우기 모드
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserClick() {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 35;
  isFilling = false;
  modeBtn.innerText = "Fill";
}
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}
function onDoubleClick(event) {
  const text = textInput.value;
  // if (text !== "") {
  //   console.log("테스트용 console.log입니당.");
  //   ctx.save();
  //   ctx.lineWidth = 1;
  //   ctx.font = "68px MuseoModerno";
  //   ctx.fillText(text, event.offsetX, event.offsetY);
  //   ctx.restore();
  // }
  console.log("테스트용 console.log입니당.");
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = "68px MuseoModerno";
  ctx.fillText(text, event.offsetX, event.offsetY);
  ctx.restore();
}
function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "MyDrawing.png";
  a.click();
}
// function onFontSizeChange(event) {
//   fontSizeValue = event.target.value;
// }
canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
//canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);

//fontSize.addEventListener("change", onFontSizeChange); // 폰트 사이즈 input

color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
