function getStyle(a,c){var b;if((b=(a.ownerDocument||document).defaultView)&&b.getComputedStyle)return c=c.replace(/([A-Z])/g,"-$1").toLowerCase(),b.getComputedStyle(a,null).getPropertyValue(c);if(a.currentStyle)return c=c.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),b=a.currentStyle[c],/^\d+(em|pt|%|ex)?$/i.test(b)?function(b){var c=a.style.left,d=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;a.style.left=b||0;b=a.style.pixelLeft+"px";a.style.left=c;a.runtimeStyle.left=d;return b}(b):b};

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
	this.ctx.fillRect(0, 0, width, height);
}

function Game(canvasId) {
	console.log("[[INIT]]");
	var canvas = new GameCanvas(canvasId);
}

function init() {
	var game = new Game("canvas");
}
