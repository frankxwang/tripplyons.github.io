var AI = function(board) {
	var testPos = {x: Math.floor(Math.random()*board.size), y: Math.floor(Math.random()*board.size)};
	while(board.getCell(testPos.x, testPos.y) != " ") {
		testPos = {x: Math.floor(Math.random()*board.size), y: Math.floor(Math.random()*board.size)};
	}
	return testPos;
}