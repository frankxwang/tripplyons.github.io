var canvas = document.getElementById("ttt-canvas");
var ctx = canvas.getContext("2d");

function draw() {
  ctx.fillStyle = "#34495e";
  ctx.fillRect(0, 0, 300, 300);
  ctx.fillStyle = "#ecf0f1";
  ctx.fillRect(95, 0, 10, 300);
  ctx.fillRect(195, 0, 10, 300);
  ctx.fillRect(0, 95, 300, 10);
  ctx.fillRect(0, 195, 300, 10);
}

draw();
