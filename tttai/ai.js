var Board = function (data, size) {
	this.size = size;
	this.data = data;
};

Board.prototype.getCell = function (x, y) {
	return this.data.charAt(y * this.size + x);
};

Board.prototype.isEmpty = function (x, y) {
	return this.getCell(x, y) == " ";
};

Board.prototype.isTaken = function (x, y) {
	return !this.isEmpty(x, y);
};

Board.prototype.containsWinner = function (symbol) {
	for (var row = 0; row < this.size; row++) {
		var isWinner = true;
		for (var col = 0; col < this.size; col++) {
			isWinner = isWinner && this.getCell(col, row) == symbol;
		}
		if (isWinner) {
			return true;
		}
	}
	for (var col = 0; col < this.size; col++) {
		var isWinner = true;
		for (var row = 0; row < this.size; row++) {
			isWinner = isWinner && this.getCell(col, row) == symbol;
		}
		if (isWinner) {
			return true;
		}
	}
	var isWinner = true;
	for (var i = 0; i < this.size; i++) {
		var row = i;
		var col = i;
		isWinner = isWinner && this.getCell(col, row) == symbol;
	}
	if (isWinner) {
		return true;
	}
	isWinner = true;
	for (var i = 0; i < this.size; i++) {
		var row = i;
		var col = this.size - 1 - i;
		isWinner = isWinner && this.getCell(col, row) == symbol;
	}
	if (isWinner) {
		return true;
	}

	return false;
};

Board.prototype.isFull = function () {
	for (var i = 0; i < this.data.length; i++) {
		if (this.data.charAt(i) == " ") {
			return false;
		}
	}

	return true;
};

Board.prototype.setCell = function (x, y, contents) {
	// console.log("[[BEFORE:"+this.data+"]]");
	var pos = y * this.size + x;
	// console.log("x: " + x + ", y: " + y + ", pos: " + pos + ", contents: \"" + contents + "\"");
	this.data = this.data.substring(0, pos) + contents + this.data.substring(pos + 1);
	// console.log("[[AFTER:"+this.data+"]]");
};

var Trainer = function () {
	this.net = new brain.NeuralNetwork();
	this.net.train([{input:  [0, 0, 0, 0, 0, 0, 0, 0, 0],
            	     output: [0, 0, 0, 0, 0, 0, 0, 0, 0]}]);
	for(var i=0; i<250; i++) {
		this.init();
	}
};

Trainer.prototype.init = function () {
	this.board = new Board("         ", 3);

	this.turn = "X";
	this.aiSymb1 = "X";
	this.aiSymb2 = "O";
	this.mem1 = [];
	this.mem2 = [];
	this.isPlaying = true;
	this.update();
}

var count = 0;

var runBoard = function(net, board, symb, trainer) {
	var newBoard = [];
	for(var i=0; i<board.size*board.size; i++) {
		if(board.getCell(i%3, Math.floor(i/3)) == " ") {
			newBoard.push(0);
		} else if(board.getCell(i%3, Math.floor(i/3)) == symb) {
			newBoard.push(1);
		} else {
			newBoard.push(2);
		}
	}
	if(trainer === undefined) {
		alert(newBoard);
	}
	var results = net.run(newBoard);
	
	var greatestValue = -1;
	for(var i=0; i<board.size*board.size; i++) {
		if(results[i] > greatestValue && newBoard[i] == 0) {
			greatestValue = results[i];
		}
	}
	
	var greatestPositions = [];
	for(var i=0; i<board.size*board.size; i++) {
		if(results[i] == greatestValue) {
			greatestPositions.push({x: i%3, y: Math.floor(i/3)});
		}
	}
	
	var where = greatestPositions[Math.floor(Math.random()*greatestPositions.length)];
	var outList = [];
	for(var i=0; i<board.size*board.size; i++) {
		outList.push(0);
	}
	outList[where] = 1;
	if (trainer !== undefined) {
		if(symb == trainer.aiSymb1) {
			trainer.mem1.push({input: newBoard, output: outList});
		} else {
			trainer.mem2.push({input: newBoard, output: outList});
		}
	}
	
	return where;
}

Trainer.prototype.update = function () {
	console.log("[[UPDATE]]");
	this.isPlaying = !this.board.isFull() && !this.board.containsWinner("X") && !this.board.containsWinner("O");
	if (this.isPlaying) {
		if (this.turn == this.aiSymb1) {
			var AIpos = runBoard(this.net, this.board, this.aiSymb1, this);
			console.log(AIpos);
			this.board.setCell(AIpos.x, AIpos.y, this.aiSymb1);
			this.turn = this.aiSymb2;
		} else {
			var AIpos = runBoard(this.net, this.board, this.aiSymb2, this);
			console.log(AIpos);
			this.board.setCell(AIpos.x, AIpos.y, this.aiSymb2);
			this.turn = this.aiSymb1;
		}
		this.update();
	} else {
		this.remember();
	}
};

Trainer.prototype.remember = function () {
	this.net = new brain.NeuralNetwork();
	if(this.board.containsWinner(this.aiSymb1)) {
		this.net.train(this.mem1);
	}
	if(this.board.containsWinner(this.aiSymb2)) {
		this.net.train(this.mem2);
	}
}

var trainer = new Trainer();

var AI = function (board, symb) {
	var net = trainer.net;
	return runBoard(net, board, symb);
}
