function getStyle(a, c) {
	var b;
	if ((b = (a.ownerDocument || document).defaultView) && b.getComputedStyle) return c = c.replace(/([A-Z])/g, "-$1").toLowerCase(), b.getComputedStyle(a, null).getPropertyValue(c);
	if (a.currentStyle) return c = c.replace(/\-(\w)/g, function (a, b) {
		return b.toUpperCase()
	}), b = a.currentStyle[c], /^\d+(em|pt|%|ex)?$/i.test(b) ? function (b) {
		var c = a.style.left,
			d = a.runtimeStyle.left;
		a.runtimeStyle.left = a.currentStyle.left;
		a.style.left = b || 0;
		b = a.style.pixelLeft + "px";
		a.style.left = c;
		a.runtimeStyle.left =
			d;
		return b
	}(b) : b
};

function getOffset(el) {
	var _x = 0;
	var _y = 0;
	while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return {
		top: _y,
		left: _x
	};
}

var getText = function () {
	return document.getElementById("result").innerText;
}

var show = function (text) {
	document.getElementById("result").innerText = text;
};

var log = function (text) {
	console.log(text);
	if (getText() === "") {
		show(text);
	} else {
		show(getText() + "\n" + text);
	}
}

// http://stackoverflow.com/questions/22780430/javascript-xmlhttprequest-using-jsonp
var jsonp = function (url, callback) {
	var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
	window[callbackName] = function (data) {
		delete window[callbackName];
		document.body.removeChild(script);
		//			callback(data);
		callback.apply(this, [data]);
	};

	var script = document.createElement('script');
	script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
	document.body.appendChild(script);
};

function readJSON(url, arr) {
	return new Promise(function (fulfill, reject) {
		if (arr) {
			arr.push(jsonp(url, fulfill));
		}
		return jsonp(url, fulfill);
	});
}
var imgBaseUrl = 'http://img.pokemondb.net/sprites/black-white/anim/normal/'; //'http://www.pokestadium.com/sprites/black-white/animated/';

var Pokemon = function (number) {
	this.num = number;
	this.dataPromise = readJSON('http://pokeapi.co/api/v1/pokemon/' + this.num.toString() + '/');
	this.positionCorrected = false;
};

Pokemon.prototype.init = function (res) {
	show(JSON.stringify(res));
	this.data = res;
	this.getReady();
}

Pokemon.prototype.getReady = function () {
	this.hp = this.data["hp"]; //Math.round(this.data["hp"] * Math.random());
}

Pokemon.prototype.updateHTML = function ($el) {
	$el.innerHTML = '<img src="' + imgBaseUrl + this.data['name'].toLowerCase() + '.gif" alt="' + this.data['name'] + '">';
	var val = this.hp / this.data["hp"] / 2 + 0.5;
	val = val > 1 ? 1 : val;
	$el.children[0].style.opacity = val;

	$el.innerHTML += '<div></div>';

	val = this.hp / this.data["hp"];

	$el.children[1].style.width = (val * 100).toString() + "%";
	$el.children[1].style.height = "16px";
	var color = "#cc3f33";
	if (val * 8 > 1) {
		color = "#cccc28";
		if (val * 3 > 1) {
			color = "#1ecc1e";
		}
	}
	$el.children[1].style.backgroundColor = color;

	var $party = document.getElementById(party.htmlId);
//	if (parseInt(getStyle($el, "height")) !== parseInt(getStyle($party, "height"))) {
	if(!this.positionCorrected) {
		$el.style.paddingTop = (parseInt(getStyle($party, "height")) - parseInt(getStyle($el, "height"))).toString() + "px";
		this.positionCorrected = true;
	}
}

///////////
// PARTY //
///////////

var Party = function (pokes, htmlId) {
	this.pokes = pokes;
	this.current = 0;
	this.htmlId = htmlId;

	//	this.doWhenAll(function () {
	//		this.updateHTML();
	//	});
};

Party.prototype.doWhenAll = function (callback) {
	this.pokes[0].dataPromise.then(function (res) {
		this.pokes[0].init(res);
		if (this.pokes.length === 1) {
			callback.apply(this, []);
		} else {
			this.pokes[1].dataPromise.then(function (res) {
				this.pokes[1].init(res);
				if (this.pokes.length === 2) {
					callback.apply(this, []);
				} else {
					this.pokes[2].dataPromise.then(function (res) {
						this.pokes[2].init(res);
						if (this.pokes.length === 3) {
							callback.apply(this, []);
						} else {
							this.pokes[3].dataPromise.then(function (res) {
								this.pokes[3].init(res);
								if (this.pokes.length === 4) {
									callback.apply(this, []);
								} else {
									this.pokes[4].dataPromise.then(function (res) {
										this.pokes[4].init(res);
										if (this.pokes.length === 5) {
											callback.apply(this, []);
										} else {
											this.pokes[5].dataPromise.then(function (res) {
												this.pokes[5].init(res);
												if (this.pokes.length === 6) {
													callback.apply(this, []);
												} else {
													console.error(">6 PKMN");
												}
											}.bind(this));
										}
									}.bind(this));
								}
							}.bind(this));
						}
					}.bind(this));
				}
			}.bind(this));
		}
	}.bind(this));
}

Party.prototype.updateHTML = function () {
	this.doWhenAll(function () {
		var $party = document.getElementById(this.htmlId);

		for (var i = 0; i < this.pokes.length; i++) {

			$party = document.getElementById(party.htmlId);

			this.pokes[i].updateHTML($party.children[i]);

			//		console.log(parseInt(getStyle($party.children[i], "height")));
			//		if (parseInt(getStyle($party.children[i], "height")) !== 122) {
			//			$party.children[i].style.paddingTop = (128 - parseInt(getStyle($party.children[i], "height"))).toString() + "px";
			//		}
		}

		var div = $party.getElementsByClassName("current")[0];
		var offset = getOffset($party.children[i]);
		//	console.log($party.children[this.current].getBoundingClientRect().top.toString() + "px");
		div.style.top = $party.getBoundingClientRect().top.toString() + "px";
		div.style.left = $party.children[this.current].getBoundingClientRect().left.toString() + "px";

		//	div.style.left = getOffset($party.children[this.current]).left.toString() + "px";
	});
};

var partyArr = [
	new Pokemon(4, 5)
];

var opposingParty = [
	new Pokemon(7, 5)
];

var party = new Party(partyArr, "yourpokes");
//var opposing = new Party(opposingParty, "opposingpokes");

var commandWord = '';
var args = [];

var battling = false;

var execCommand = function () {
	if (commandWord === 'set') {
		if (args.length >= 3 && args[0] <= partyArr.length + 1 && args[0] >= 1 && 1 <= args[2] <= 100) {
			if (args[0] == partyArr.length + 1) {
				partyArr.push(new Pokemon(args[1], args[2]));
			} else {
				partyArr[args[0] - 1] = new Pokemon(args[1], args[2]);
			}
			party = new Party(partyArr, "yourpokes");
		} else {
			console.error("[[SET FAILED: " + JSON.stringify(args) + " ]]");
		}
	}
	if (commandWord === 'battle') {
		battling = true;
	}

	commandWord = "";
	args = [];
}

var enterCommand = function (command) {
	var arr = command.split(" ");
	commandWord = arr[0];
	args = arr.slice(1, arr.length);
	for (var i = 0; i < args.length; i++) {
		if (args[i].match(/[0-9]+/)) {
			args[i] = parseInt(args[i]);
		}
	}

	if (commandWord === 'set' && !battling) {
		execCommand();
	}
	if (commandWord === 'battle' && !battling) {
		execCommand();
	}
}

var submit = function () {
	show(document.getElementById("input").value);
	enterCommand(document.getElementById("input").value);
	document.getElementById("input").value = "";
}

var update = function () {
	party.updateHTML();
}

window.onresize = update;
window.onscroll = update;