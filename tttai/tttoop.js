var Board = function (data, size) {
	this.size = size;
	this.data = data;
};

Board.prototype.getCell = function (x, y) {
	return this.data.charAt(x + y * this.size);
};

Board.prototype.setCell = function (contents, x, y) {
	console.log("x: " + x + ", y: " + y + ", pos: " + (x+y*this.size) + ", contents: \"" + contents + "\"");
	this.data[x + y * this.size] = contents;
};

var TicTacToe = function () {
	this.canvas = document.getElementById("ttt-canvas");
	this.ctx = this.canvas.getContext("2d");
	this.board = new Board("         ", 3);
	console.log(this.board.data);
	this.board.setCell("O", 0, 0);
	this.board.setCell("X", 2, 0);
	console.log(this.board.data);
	this.drawCellSize = 100;
	this.strokeWidth = 20;
	this.winner = " ";
	this.turn = "O";
	this.playerSymb = "X";
};

TicTacToe.prototype.draw = function () {
	this.ctx.fillStyle = "#34495e";
	this.ctx.fillRect(0, 0, this.drawCellSize * this.board.size, this.drawCellSize * this.board.size);
	this.ctx.strokeStyle = "#ecf0f1";
	this.ctx.lineWidth = this.strokeWidth;
	this.ctx.beginPath();
	this.ctx.moveTo(0, 0);
	this.ctx.lineTo(this.drawCellSize * this.board.size, 0);
	this.ctx.lineTo(this.drawCellSize * this.board.size, this.drawCellSize * this.board.size);
	this.ctx.lineTo(0, this.drawCellSize * this.board.size);
	this.ctx.lineTo(0, 0);
	for (var col = 0; col < this.board.size; col++) {
		this.ctx.moveTo(col * this.drawCellSize, 0);
		this.ctx.lineTo(col * this.drawCellSize, this.drawCellSize * this.board.size);
	}
	for (var row = 0; row < this.board.size; row++) {
		this.ctx.moveTo(0, row * this.drawCellSize);
		this.ctx.lineTo(300, row * this.drawCellSize);
	}
	this.ctx.stroke();

	for (var row = 0; row < this.board.size; row++) {
		for (var col = 0; col < this.board.size; col++) {
			var current = this.board.getCell(col, row);
			var x = this.drawCellSize * col + this.strokeWidth * 1.5;
			var y = this.drawCellSize * row + this.strokeWidth * 1.5;
			if (current == "O") {
				var radius = this.drawCellSize - (this.strokeWidth * 4);
				this.ctx.beginPath();
				this.ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI, false);
				this.ctx.stroke();
			} else if (current == "X") {
				this.ctx.beginPath();
				this.ctx.moveTo(x, y);
				this.ctx.lineTo(x + (this.drawCellSize - (this.strokeWidth * 4)) * 2, y + (this.drawCellSize - (this.strokeWidth * 4)) * 2);
				this.ctx.moveTo(x + (this.drawCellSize - (this.strokeWidth * 4)) * 2, y);
				this.ctx.lineTo(x, y + (this.drawCellSize - (this.strokeWidth * 4)) * 2);
				this.ctx.stroke();
			}
		}
	}
};

TicTacToe.prototype.update = function () {
	// if(this.turn != this.playerSymb) {
	// 	console.log("[[AI]]");
	// 	var AIpos = AI(this.board);
	// 	console.log(AIpos);
	// 	this.board.setCell(AIpos.x, AIpos.y);
	// 	console.log(this.board);
	// }
};

var ttt = new TicTacToe();
ttt.draw();
ttt.update();
ttt.draw();