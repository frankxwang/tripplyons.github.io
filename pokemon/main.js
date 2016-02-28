var overworldmusic = new Audio("route-1.mp3");
overworldmusic.play();
overworldmusic.addEventListener("ended", function (e) {
	overworldmusic.play();
}, false);
var battlemusic = new Audio("wild-battle.mp3");
battlemusic.play();
battlemusic.addEventListener("ended", function (e) {
	battlemusic.play();
}, false);
var tilesize = 32;
var keys = [
	false,
	false,
	false,
	false,
	false
];
var garySprite = new Image();
garySprite.src = "gary.png";
// [sprite, x, y, text]
var trainers = [[garySprite, 11, 4, "I HATE YOU!"]];
var oldkeys = keys;
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;
var ACTION = 4;
var canvaswidth;
var canvasheight;
var shownTilesWidth;
var shownTilesHeight;
var playerx = 7;
var playery = 4;
var playerscreenx;
var playerscreeny;
var playerdir = DOWN;
var playerstopping = false;
var fps = 60;
var dt = Math.round(1000 / fps);
// DT in Seconds
var dts = dt / 1000;
var playermoving = false;
var playeranim = ["1", "2", "1", "3"];
var pressingaction = false;
var amountperanimframe = 4;
var newarr = [];
for (var i = 0; i < playeranim.length; i++) {
	for (var j = 0; j < amountperanimframe; j++) {
		newarr.push(playeranim[i]);
	}
}
playeranim = newarr;
var currentanimindex = 0;
var state;

var battlebg = new Image();
battlebg.src = "battlebg.png";
var menu = new Image();
menu.src = "menu.png";

var textbeingshown = null;

var directiontable = [
	"u",
	"d",
	"l",
	"r"
];

var playeranimimg = {};
for (var i = 0; i < 4; i++) {
	for (var j = 1; j <= 3; j++) {
		playeranimimg[directiontable[i] + j.toString()] = new Image();
		playeranimimg[directiontable[i] + j.toString()].src = directiontable[i] + j.toString() + ".png";
	}
}

document.addEventListener("keydown", function (e) {
	e = e || window.event;
	if (e.keyCode == 38) {
		keys[UP] = true;
	}
	if (e.keyCode == 40) {
		keys[DOWN] = true;
	}
	if (e.keyCode == 37) {
		keys[LEFT] = true;
	}
	if (e.keyCode == 39) {
		keys[RIGHT] = true;
	}
	if (e.keyCode == 32) {
		keys[ACTION] = true;
	}
});
document.addEventListener("keyup", function (e) {
	e = e || window.event;
	if (e.keyCode == 38) {
		keys[UP] = false;
	}
	if (e.keyCode == 40) {
		keys[DOWN] = false;
	}
	if (e.keyCode == 37) {
		keys[LEFT] = false;
	}
	if (e.keyCode == 39) {
		keys[RIGHT] = false;
	}
	if (e.keyCode == 32) {
		keys[ACTION] = false;
		pressingaction = false;
	}
});

var playermovecamerainterval = 0.0625;

window.onload = function () {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvaswidth = parseInt(getStyle(canvas, "width"));
	canvasheight = parseInt(getStyle(canvas, "height"));
	var tileset = new Image();
	tileset.src = "tiles.png";
	shownTilesWidth = canvaswidth / tilesize;
	shownTilesHeight = canvasheight / tilesize;
	playerscreenx = canvaswidth / 2 - tilesize / 2;
	playerscreeny = canvasheight / 2 - tilesize / 2;


	// TREE:
	//  /\
	//  {}
	//  []
	//
	// TWO TREE TRUNK TO TOP CONNECTOR
	//  ()
	var data = ["}{}{}{}{}{}{}{}{}{}{}{}{}{}{",
				")()()()()()()()()()()()()()(",
				"}{}{}{}{}{}{}{}{}{}{}{}{}{}{",
				")()()()[][][][][][][]()()()(",
			    "}{}{}{}...@......$...{}{}{}{",
			    ")()()()....../\\......()()()(",
			    "}{}{}{}.####.{}.####.{}{}{}{",
			    ")()()().####.().####.()()()(",
			    "}{}{}{}.####.{}.####.{}{}{}{",
			    ")()()().####.[].####.()()()(",
			    "}{}{}{}..............{}{}{}{",
			    ")()()()/\\/\\/\\/\\/\\/\\/\\()()()(",
				"}{}{}{}{}{}{}{}{}{}{}{}{}{}{",
				")()()()()()()()()()()()()()(",
				"}{}{}{}{}{}{}{}{}{}{}{}{}{}{"]

	var datamap = {
		".": new TileType("grass", 1, 0, true),
		"#": new TileType("tallgrass", 2, 0, true),
		"/": new TileType("treetopleft", 3, 0, false),
		"\\": new TileType("treetopright", 4, 0, false),
		"{": new TileType("treemidleft", 3, 1, false),
		"}": new TileType("treemidright", 4, 1, false),
		"[": new TileType("treebottomleft", 3, 2, false),
		"]": new TileType("treebottomright", 4, 2, false),
		"(": new TileType("treebothleft", 5, 0, false),
		")": new TileType("treebothright", 6, 0, false),
		"@": new Sign("Welcome to Pokemon! We have signs!"),
		"$": new Sign("Here is another sign! It is long!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
	};

	var map = new Map(tileset, data, datamap);

	var setstate = function (name) {
		if (name === "battle") {
			overworldmusic.pause();
			battlemusic.play();
			pressingaction = keys[ACTION];
			state = "battle";
		}
		if (name === "overworld") {
			battlemusic.pause();
			battlemusic.currentTime = 0;
			overworldmusic.play();
			state = "overworld";
		}
	}

	setstate("overworld");

	var trainerat = function (x, y) {
		console.log("LOOKING FOR TRAINER");
		console.log(x, y);
		for (var i = 0; i < trainers.length; i++) {
			if (trainers[i][1] === Math.round(x) && trainers[i][2] === Math.round(y)) {
				console.log("TRAINER FOUND");
				return trainers[i];
			}
		}
		return null;
	}

	var draw = function () {
		if (state === "overworld") {
			ctx.fillStyle = "#000000";
			ctx.fillRect(0, 0, canvaswidth, canvasheight);
			map.draw(ctx);

			for (var i = 0; i < trainers.length; i++) {
				if (trainers[i][2] < playery) {
					ctx.drawImage(trainers[i][0], Math.round((trainers[i][1] - playerx) * tilesize + playerscreenx), Math.round((trainers[i][2] - playery) * tilesize + playerscreeny) - 12);
				}
			}

			ctx.drawImage(playeranimimg[directiontable[playerdir] + playeranim[currentanimindex]], playerscreenx, playerscreeny - 6);

			for (var i = 0; i < trainers.length; i++) {
				if (trainers[i][2] >= playery) {
					ctx.drawImage(trainers[i][0], Math.round((trainers[i][1] - playerx) * tilesize + playerscreenx), Math.round((trainers[i][2] - playery) * tilesize + playerscreeny) - 12);
				}
			}
		} else if (state === "battle") {
			ctx.fillStyle = "#000000";
			ctx.fillRect(0, 0, canvaswidth, canvasheight);
			ctx.drawImage(battlebg, 0, 0);
		}

		if (textbeingshown) {
			ctx.drawImage(menu, 16, 208);
			ctx.fillStyle = "#202020";
			ctx.font = "12px monospace";
			ctx.fillText(textbeingshown, 48, 236, 384);
		}
	}



	var moveplayer = function () {
		if ((playerdir === UP && playery === 0) ||
			(playerdir === DOWN && playery === map.data.length - 1) ||
			(playerdir === LEFT && playerx === 0) ||
			(playerdir === RIGHT && playerx === map.data[0].length - 1))
			return;
		if ((playerdir === DOWN && trainerat(playerx, Math.floor(playery) + 1)) ||
			(playerdir === UP && trainerat(playerx, Math.ceil(playery) - 1)) ||
			(playerdir === LEFT && trainerat(Math.ceil(playerx) - 1, playery)) ||
			(playerdir === RIGHT && trainerat(Math.floor(playerx) + 1, playery)))
			return;
		if (!((playerdir === DOWN && map.get(playerx, Math.floor(playery) + 1).passable) ||
				(playerdir === UP && map.get(playerx, Math.ceil(playery) - 1).passable) ||
				(playerdir === LEFT && map.get(Math.ceil(playerx) - 1, playery).passable) ||
				(playerdir === RIGHT && map.get(Math.floor(playerx) + 1, playery).passable)))
			return;
		if (playermoving) {
			if (playerdir == UP) {
				playery -= playermovecamerainterval;
			}
			if (playerdir == DOWN) {
				playery += playermovecamerainterval;
			}
			if (playerdir == LEFT) {
				playerx -= playermovecamerainterval;
			}
			if (playerdir == RIGHT) {
				playerx += playermovecamerainterval;
			}

			if (playerx < 0) {
				playerx = 0;
			}
			if (playery < 0) {
				playery = 0;
			}
			if (playerx > map.data[0].length - 1) {
				playerx = map.data[0].length - 1;
			}
			if (playery > map.data.length - 1) {
				playery = map.data.length - 1;
			}
		}
	}

	var onblock = function () {
		return playerx.toPrecision(5) % 1.0 === 0 && playery.toPrecision(5) % 1.0 === 0;
	}

	var directionplayer = function (dir) {
		if (onblock()) {
			if (map.get(playerx, playery).name === "tallgrass" && Math.floor(Math.random() * 7) === 0) {
				setstate("battle");
			} else {
				playerdir = dir;
			}
		}
	}

	tileset.onload = function () {
		setInterval(function () {
			draw();

			if (state === "overworld") {
				if (!textbeingshown) {
					if (keys[UP]) {
						directionplayer(UP);
						if (playerdir === UP) {
							playermoving = true;
						}
					} else if (playerdir === UP) {
						playerstopping = true;
					}
					if (keys[DOWN]) {
						directionplayer(DOWN);
						if (playerdir === DOWN) {
							playermoving = true;
						}
					} else if (playerdir === DOWN) {
						playerstopping = true;
					}
					if (keys[LEFT]) {
						directionplayer(LEFT);
						if (playerdir === LEFT) {
							playermoving = true;
						}
					} else if (playerdir === LEFT) {
						playerstopping = true;
					}
					if (keys[RIGHT]) {
						directionplayer(RIGHT);
						if (playerdir === RIGHT) {
							playermoving = true;
						}
					} else if (playerdir === RIGHT) {
						playerstopping = true;
					}


					if (playermoving) {
						currentanimindex++;
						if (currentanimindex === playeranim.length) {
							currentanimindex = 0;
						}
					}

					moveplayer();

					if (onblock()) {
						currentanimindex = 0;
					}

					if (onblock() && playerstopping) {
						playerstopping = false;
						playermoving = false;
					}
				} else {
					if (keys[ACTION] && !pressingaction) {
						pressingaction = true;
						textbeingshown = null;
					}
				}

				if (playerdir === UP && keys[ACTION] && onblock() && map.get(playerx, playery - 1).name === "sign" && !pressingaction) {
					pressingaction = true;
					textbeingshown = map.get(playerx, playery - 1).text;
				}
				if (!pressingaction && keys[ACTION] && onblock()) {
					if (playerdir === UP && trainerat(playerx, playery - 1)) {
						pressingaction = true;
						textbeingshown = trainerat(playerx, playery - 1)[3];
					}
					if (playerdir === DOWN && trainerat(playerx, playery + 1)) {
						pressingaction = true;
						textbeingshown = trainerat(playerx, playery + 1)[3];
					}
					if (playerdir === LEFT && trainerat(playerx - 1, playery)) {
						pressingaction = true;
						textbeingshown = trainerat(playerx - 1, playery)[3];
					}
					if (playerdir === RIGHT && trainerat(playerx + 1, playery)) {
						pressingaction = true;
						textbeingshown = trainerat(playerx + 1, playery)[3];
					}
				}
			} else if (state === "battle") {
				textbeingshown = "LET\'S BATTLE!";
				if (keys[ACTION] && !pressingaction) {
					pressingaction = true;
					textbeingshown = null;
					setstate("overworld");
				}
			}
		}, dt);
	}

}