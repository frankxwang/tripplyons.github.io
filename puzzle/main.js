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

GameCanvas.prototype.path = function (pointList) {
	console.log("[[PATH:"+this.ctx.fillStyle+","+pointList+"]]")
	
	this.ctx.beginPath();
	
	this.ctx.moveTo(pointList[0][0] , pointList[0][1]);
	for(var i=1; i<pointList.length; i++) {
		this.ctx.lineTo(pointList[i][0], pointList[i][1]);
	}
	
	this.ctx.closePath();
	this.ctx.fill();
	
	return this;
}

function MenuState() {
	
}

MenuState.prototype.draw = function(canvas) {
	canvas.clear(palette["dark"]).color(palette["primary"]).rect(canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);
	canvas.color(palette["light"]).path([[3/7*canvas.width, 3/7*canvas.width], [3/7*canvas.width, 5/7*canvas.width]], [5/7*canvas.width, 4/7*canvas.width]);
}

function Game(canvasId) {
	console.log("[[INIT]]");
	
	var canvas = new GameCanvas(canvasId);
	
	var state = new MenuState();
	state.draw(canvas);
}

function init() {
	var game = new Game("canvas");
}
