var canvas = document.getElementById("ttt-canvas");
var ctx = canvas.getContext("2d");
var currentBoard = "X O" + "O X" + " X ";
var boardSize = 3;
var drawCellSize = 100;
var strokeWidth = 20;

function getCell(board, x, y) {
  return board[x + y * boardSize];
}

function draw() {
  ctx.fillStyle = "#34495e";
  ctx.fillRect(0, 0, drawCellSize*3, drawCellSize*3);
  ctx.strokeStyle = "#ecf0f1";
  ctx.lineWidth = strokeWidth;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(drawCellSize*3, 0);
  ctx.lineTo(drawCellSize*3, drawCellSize*3);
  ctx.lineTo(0, drawCellSize*3);
  ctx.lineTo(0, 0);
  ctx.moveTo(drawCellSize, 0);
  ctx.lineTo(drawCellSize, drawCellSize*3);
  ctx.moveTo(drawCellSize*2, 0);
  ctx.lineTo(drawCellSize*2, drawCellSize*3);
  ctx.moveTo(0, drawCellSize);
  ctx.lineTo(drawCellSize*3, drawCellSize);
  ctx.moveTo(0, drawCellSize*2);
  ctx.lineTo(drawCellSize*3, drawCellSize*2);
  ctx.stroke();
  
  for(var row=0; row<boardSize; row++) {
    for(var col=0; col<boardSize; col++) {
      var current = getCell(currentBoard, col, row);
      console.log(current);
      var x = drawCellSize*col+strokeWidth*1.5;
      var y = drawCellSize*row+strokeWidth*1.5;
      if(current == "O") {
        var radius = drawCellSize-(strokeWidth*4);
        ctx.beginPath();
        ctx.arc(x+radius, y+radius, radius, 0, 2 * Math.PI, false);
        ctx.stroke();
      } else if(current == "X") {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+(drawCellSize-(strokeWidth*4))*2, y+(drawCellSize-(strokeWidth*4))*2);
        ctx.moveTo(x+(drawCellSize-(strokeWidth*4))*2, y);
        ctx.lineTo(x, y+(drawCellSize-(strokeWidth*4))*2);
        ctx.stroke();
      }
    }
  }
}

draw();
