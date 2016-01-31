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
}

var Party = function (pokes) {
	this.pokes = pokes;

	this.pokes[0].dataPromise.then(function (res) {
		this.pokes[0].init(res);
		if (pokes.length === 1) {
			this.updateHTML();
		} else {
			this.pokes[1].dataPromise.then(function (res) {
				this.pokes[1].init(res);
				if (pokes.length === 2) {
					this.updateHTML();
				} else {
					this.pokes[2].dataPromise.then(function (res) {
						this.pokes[2].init(res);
						if (pokes.length === 3) {
							this.updateHTML();
						} else {
							this.pokes[3].dataPromise.then(function (res) {
								this.pokes[3].init(res);
								if (pokes.length === 4) {
									this.updateHTML();
								} else {
									this.pokes[4].dataPromise.then(function (res) {
										this.pokes[4].init(res);
										if (pokes.length === 5) {
											this.updateHTML();
										} else {
											this.pokes[5].dataPromise.then(function (res) {
												this.pokes[5].init(res);
												if (pokes.length === 6) {
													this.updateHTML();
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
};

Party.prototype.updateHTML = function () {
	var $party = document.getElementById("yourpokes");

	for (var i = 0; i < this.pokes.length; i++) {
		this.pokes[i].updateHTML($party.children[i]);
		//		$party.children[i].innerHTML = '<img src="' + imgBaseUrl + this.pokes[i].data['name'].toLowerCase() + '.gif" alt="' + this.pokes[i].data['name'] + '">';
	}
};

var partyArr = [
	new Pokemon(1, 5),
	new Pokemon(4, 5),
	new Pokemon(7, 5)
];

var party = new Party(partyArr);

var commandWord = '';
var args = [];

var execCommand = function () {
	if (commandWord == 'set') {
		if (args.length >= 3 && args[0] <= partyArr.length + 1 && args[0] >= 1 && 1 <= args[2] <= 100) {
			if (args[0] == partyArr.length + 1) {
				partyArr.push(new Pokemon(args[1], args[2]));
			} else {
				partyArr[args[0] - 1] = new Pokemon(args[1], args[2]);
			}
			party = new Party(partyArr);
		} else {
			console.error("[[SET FAILED: " + JSON.stringify(args) + " ]]");
		}
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

	if (commandWord === 'set') {
		execCommand();
	}
}

var submit = function () {
	show(document.getElementById("input").value);
	enterCommand(document.getElementById("input").value);
	document.getElementById("input").value = "";
}