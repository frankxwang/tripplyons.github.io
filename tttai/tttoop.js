var Board = function (data, size) {
	this.size = size;
	this.data = data;
};

Board.prototype.getCell = function (x, y) {
	return this.data.charAt(x + y * this.size);
};

Board.prototype.isEmpty = function (x, y) {
	return this.getCell(x, y) == " ";
}

Board.prototype.isTaken = function (x, y) {
	return !this.isEmpty(x, y);
}

Board.prototype.setCell = function (x, y, contents) {
	// console.log("[[BEFORE:"+this.data+"]]");
	var pos = x + y * this.size;
	// console.log("x: " + x + ", y: " + y + ", pos: " + pos + ", contents: \"" + contents + "\"");
	this.data = this.data.substring(0, pos - 1) + contents + this.data.substring(pos + 1);
	// console.log("[[AFTER:"+this.data+"]]");
};

var TicTacToe = function () {
	this.canvas = document.getElementById("ttt-canvas");
	this.ctx = this.canvas.getContext("2d");
	this.board = new Board("         ", 3);
	this.drawCellSize = 100;
	this.strokeWidth = 20;
	this.winner = " ";
	this.turn = "X";
	this.playerSymb = "X";
	this.aiSymb = "O";

	var self = this;
	document.addEventListener("mousedown", function (e) { self.handleMouse(e); });
};

TicTacToe.prototype.draw = function () {
	console.log("[[DRAW]]");
	console.log(this.canvas);
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
		this.ctx.lineTo(this.drawCellSize * this.board.size, row * this.drawCellSize);
	}
	this.ctx.stroke();

	for (var row = 0; row < this.board.size; row++) {
		for (var col = 0; col < this.board.size; col++) {
			var current = this.board.getCell(col, row);
			var x = this.drawCellSize * col + this.strokeWidth * 1.5;
			var y = this.drawCellSize * row + this.strokeWidth * 1.5;
			var radius = this.drawCellSize / 2 - this.strokeWidth * 1.5;
			if (current == "O") {
				this.ctx.beginPath();
				this.ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI, false);
				this.ctx.stroke();
			} else if (current == "X") {
				this.ctx.beginPath();
				this.ctx.moveTo(x, y);
				this.ctx.lineTo(x + radius * 2, y + radius * 2);
				this.ctx.moveTo(x + radius * 2, y);
				this.ctx.lineTo(x, y + radius * 2);
				this.ctx.stroke();
			}
		}
	}
};

TicTacToe.prototype.update = function () {
	// console.log("[[UPDATE]]");
	// console.log(this.board.data);
	// if (this.turn == this.aiSymb) {
	// 	console.log("[[AI]]");
	// 	var AIpos = AI(this.board);
	// 	console.log(AIpos);
	// 	this.board.setCell(AIpos.x, AIpos.y, this.aiSymb);
	// 	this.draw();
	// }
};

function getOffsetLeft(elem) {
    var offsetLeft = 0;
    do {
		if (!isNaN(elem.offsetLeft)) {
			offsetLeft += elem.offsetLeft;
		}
    } while (elem = elem.offsetParent);
    return offsetLeft;
}

function getOffsetTop(elem) {
    var offsetTop = 0;
    do {
		if (!isNaN(elem.offsetTop)) {
			offsetTop += elem.offsetTop;
		}
    } while (elem = elem.offsetParent);
    return offsetTop;
}

TicTacToe.prototype.handleMouse = function (e) {
	if (this.turn == this.playerSymb) {
		console.log(this.canvas);
		var x = e.pageX - getOffsetLeft(this.canvas);
		var y = e.pageY - getOffsetTop(this.canvas);
		console.log("("+x+", "+y+")");
		if (x > 0 && y >= 0 && x <= this.drawCellSize * this.board.size && y <= this.drawCellSize * this.board.size) {
			var boardX = Math.floor(x / this.drawCellSize);
			var boardY = Math.floor(y / this.drawCellSize);
			console.log("("+boardX+", "+boardY+")");
			console.log("[[BEFORE:"+ this.board.data +"]]");
			if (this.board.isEmpty(boardX, boardY)) {
				console.log("[[EMPTY]]");
				this.board.setCell(boardX, boardY, this.playerSymb);
				console.log("[[AFTER:"+ this.board.data +"]]");
				this.turn = this.aiSymb;
				this.draw();
				this.update();
			}
		}
	}
};

var ttt = new TicTacToe();
ttt.draw();