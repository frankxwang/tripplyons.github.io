var canvas;
var ctx;
var width;
var height;

function getStyle(a,c){var b;if((b=(a.ownerDocument||document).defaultView)&&b.getComputedStyle)return c=c.replace(/([A-Z])/g,"-$1").toLowerCase(),b.getComputedStyle(a,null).getPropertyValue(c);if(a.currentStyle)return c=c.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),b=a.currentStyle[c],/^\d+(em|pt|%|ex)?$/i.test(b)?function(b){var c=a.style.left,d=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;a.style.left=b||0;b=a.style.pixelLeft+"px";a.style.left=c;a.runtimeStyle.left=d;return b}(b):b};

function init() {
	console.log("[[INIT]]");
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	width = getStyle(canvas, "width");
	height = getStyle(canvas, "height");
	ctx.fillColor = "red";
	ctx.fillRect(0, 0, width, height);
}
