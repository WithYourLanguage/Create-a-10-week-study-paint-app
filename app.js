const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(210 - 40, 200 - 30, 15, 100);
ctx.fillRect(350 - 40, 200 - 30, 15, 100);
ctx.fillRect(260 - 40, 200 - 30, 60, 200);
ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath(); // 이전에 만든 것들과 연결 끊음
ctx.fillStyle = "green"; // 색을 yellow로 지정
ctx.arc(260 + 10, 80, 8, Math.PI, 2 * Math.PI); // 오른쪽 눈
ctx.fill();

ctx.beginPath(); // 이전에 만든 것들과 연결 끊음
ctx.fillStyle = "yellow";
ctx.arc(220 + 10, 80, 8, Math.PI, 2 * Math.PI); // 왼쪽 눈
ctx.fill();

ctx.beginPath(); // 이전에 만든 것들과 연결 끊음
ctx.fillStyle = "red";
ctx.arc(250, 100, 25, 0, 3); 
ctx.fill();
