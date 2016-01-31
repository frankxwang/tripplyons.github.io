var canvas;

var palette = {
	"dark": "#303030",
	"light": "#F7F7F7",
	"primary": "#F09040"
};

function GameCanvas(id) {
	this.canvas = document.getElementById(id);
	this.ctx = this.canvas.getContext("2d");

	this.width = parseInt(getStyle(this.canvas, "width"));
	this.height = parseInt(getStyle(this.canvas, "height"));
	console.log("[[SIZE:(" + this.width + "," + this.height + ")]]");

	this.clear(palette["dark"]);
}

GameCanvas.prototype.clear = function (color) {
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
	this.ctx.beginPath();

	this.ctx.moveTo(pointList[0][0], pointList[0][1]);
	for (var i = 1; i < pointList.length; i++) {
		this.ctx.lineTo(pointList[i][0], pointList[i][1]);
	}

	this.ctx.closePath();
	this.ctx.fill();

	return this;
}

function Rect(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Rect.prototype.containsPoint = function (x, y) {
	return !(x < this.x || y < this.y || x > this.x + this.width || y > this.y + this.height);
}

function MenuState() {
	this.playBtn = new Rect(
		canvas.width / 4,
		canvas.height / 4,
		canvas.width / 2,
		canvas.height / 2
	);
}

MenuState.prototype.draw = function () {
	canvas.color(palette["primary"]).rect(this.playBtn.x, this.playBtn.y, this.playBtn.width, this.playBtn.height);
	canvas.color(palette["light"]).path([[6 / 18 * canvas.width, 6 / 18 * canvas.height], [6 / 18 * canvas.width, 12 / 18 * canvas.height], [12 / 18 * canvas.width, 9 / 18 * canvas.height]]);
}

MenuState.prototype.update = function (dt) {

}

MenuState.prototype.click = function (e, pos) {
	if (this.playBtn.containsPoint(pos.x, pos.y)) {
		console.log("[[PLAY]]");
		return new PlayState();
	}
	return null;
}

function PlayState() {

}

PlayState.prototype.draw = function () {

}

PlayState.prototype.update = function (dt) {

}

PlayState.prototype.click = function (e, pos) {
	return null;
}

function Game(canvasId) {
	console.log("[[INIT]]");

	canvas = new GameCanvas(canvasId);

	var fps = 30;
	var wait = Math.round(1000/fps);

	var state = new MenuState();

	window.addEventListener('click', function (e) {
		var x;
		var y;
		if (e.pageX || e.pageY) {
			x = e.pageX;
			y = e.pageY;
		} else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;

		var result = state.click(e, {
			x: x,
			y: y
		});
		if (result) {
			state = result;
		}
	});

	setInterval(function () {
		canvas.clear(palette["dark"]);
		state.draw(canvas);

		var result = state.update(wait);
		if (result) {
			state = result;
		}
	}, wait)

}

function init() {
	var game = new Game("canvas");
}