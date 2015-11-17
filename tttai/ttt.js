var canvas = document.getElementById("ttt-canvas");
var ctx = canvas.getContext("2d");

function draw() {
  ctx.fillStyle = "#34495e";
  ctx.fillRect(0, 0, 300, 300);
  ctx.strokeStyle = "#ecf0f1";
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.lineTo(100, 300);
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 300);
  ctx.moveTo(0, 100);
  ctx.lineTo(300, 100);
  ctx.moveTo(0, 200);
  ctx.lineTo(300, 200);
  ctx.stroke();
}

draw();
