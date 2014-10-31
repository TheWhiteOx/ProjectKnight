// Write your package code here!
/*Template.microphone_example.rendered = function() {
var mic = new Wit.Microphone(document.getElementById("microphone"));
var info = function (msg) {
	document.getElementById("info").innerHTML = msg;
};
var error = function (msg) {
	document.getElementById("error").innerHTML = msg;
};
mic.onready = function () {
	info("Microphone is ready to record");
};
mic.onaudiostart = function () {
	info("Recording started");
	error("");
};
mic.onaudioend = function () {
	info("Recording stopped, processing started");
};
mic.onresult = function (intent, entities) {
	var r = kv("intent", intent);

	for (var k in entities) {
		var e = entities[k];
		console.log(intent);
		console.log(entities);

		if (!(e instanceof Array)) {
			r += kv(k, e.value);
		} else {
			for (var i = 0; i < e.length; i++) {
				r += kv(k, e[i].value);
			}
		}
	}

	document.getElementById("result").innerHTML = r;
};
mic.onerror = function (err) {
	error("Error: " + err);
};
mic.onconnecting = function () {
	info("Microphone is connecting");
};
mic.ondisconnected = function () {
	info("Microphone is not connected");
};

mic.connect("4O4KJDOPHBPJ2GAUNPHDLXAHJXOKVQLU");
      // mic.start();
      // mic.stop();

      function kv (k, v) {
      	if (toString.call(v) !== "[object String]") {
      		v = JSON.stringify(v);
      	}
      	if (v ==="move_north"){
      		console.log('intent was logged as move_north');
      		 var currentUser = Meteor.userId();
		     var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
		     if (!roomIn){return console.log('Alas, you cannot go that way.');};
		     var roomNorth = Rooms.findOne({_id: roomIn},{connectedNorth: 1}).connectedNorth;
		     if (!roomNorth){return console.log('Alas, you cannot go that way.');};
		     new Audio('/audio/forest_footsteps.mp3').play();
		     Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomNorth}});
		     moveTo(currentUser,roomIn,roomNorth);
      	}


      	return k + "=" + v + "\n";
      }
  };*/