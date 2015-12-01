var AI = function(board) {
	console.log(board.data);
	var testPos = {x: Math.floor(Math.random()*board.size), y: Math.floor(Math.random()*board.size)};
	while(board.isTaken(testPos.x, testPos.y)) {
		testPos = {x: Math.floor(Math.random()*board.size), y: Math.floor(Math.random()*board.size)};
	}
	return testPos;
}