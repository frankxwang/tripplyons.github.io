var palette = {"dark": "#202020"};

function GameCanvas(id) {
	this.canvas = document.getElementById(id);
	this.ctx = canvas.getContext("2d");
	
	this.width = parseInt(getStyle(canvas, "width"));
	this.height = parseInt(getStyle(canvas, "height"));
	console.log("[[SIZE:("+this.width+","+this.height+")]]");
	
	this.clear(palette["dark"]);
}

GameCanvas.prototype.clear = function(color) {
	this.ctx.fillStyle = color;
	this.ctx.fillRect(0, 0, this.width, this.height);
}

function Game(canvasId) {
	console.log("[[INIT]]");
	var canvas = new GameCanvas(canvasId);
}

function init() {
	var game = new Game("canvas");
}
