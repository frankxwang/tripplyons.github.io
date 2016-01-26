var palette = {"dark": "#303030", "light": "#F7F7F7", "primary": "#F09040"};

function GameCanvas(id) {
	this.canvas = document.getElementById(id);
	this.ctx = canvas.getContext("2d");
	
	this.width = parseInt(getStyle(canvas, "width"));
	this.height = parseInt(getStyle(canvas, "height"));
	console.log("[[SIZE:("+this.width+","+this.height+")]]");
	
	this.clear(palette["dark"]);
}

GameCanvas.prototype.clear = function(color) {
	this.color(color).rect(0, 0, this.width, this.height);
	
	return this;
}

GameCanvas.prototype.color = function (color) {
	this.ctx.fillStyle = color;
	this.ctx.strokeStyle = color;
	
	return this;
}

GameCanvas.prototype.rect = function (x, y, width, height) {
	this.ctx.fillRect(x, y, width, height);
	
	return this;
}

function Game(canvasId) {
	console.log("[[INIT]]");
	var canvas = new GameCanvas(canvasId);
}

function init() {
	var game = new Game("canvas");
}
