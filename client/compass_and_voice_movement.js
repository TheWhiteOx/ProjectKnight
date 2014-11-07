  //This file contains helpers and events pertaining to
  //Moving the player through clicking of the compass
  //and issuing voice commands to the microphone



  //function that plays a random audio from a list
  var randAudio = function(list) {
    console.log(_.sample(list));
    new Audio('/audio/forest_footsteps.mp3').play();
    new Audio(_.sample(list)).play();
  };

  var moveNorthAudio = ['/audio/voice_feedback/north01.mp3','/audio/voice_feedback/north02.mp3','/audio/voice_feedback/north03.mp3'];
  var moveSouthAudio = ['/audio/voice_feedback/south01.mp3','/audio/voice_feedback/south02.mp3','/audio/voice_feedback/south03.mp3'];
  var moveWestAudio = ['/audio/voice_feedback/west01.mp3','/audio/voice_feedback/west02.mp3','/audio/voice_feedback/west03.mp3'];
  var moveEastAudio = ['/audio/voice_feedback/east01.mp3','/audio/voice_feedback/east02.mp3','/audio/voice_feedback/east03.mp3'];
  var moveUpAudio = ['/audio/voice_feedback/up01.mp3','/audio/voice_feedback/up02.mp3','/audio/voice_feedback/up03.mp3'];
  var moveDownAudio = ['/audio/voice_feedback/down01.mp3','/audio/voice_feedback/down02.mp3','/audio/voice_feedback/down03.mp3'];
  var moveAlasAudio = ['/audio/voice_feedback/alas01.mp3','/audio/voice_feedback/alas02.mp3','/audio/voice_feedback/alas03.mp3'];
  var moveOriginAudio = ['/audio/voice_feedback/origin_recall01.mp3','/audio/voice_feedback/origin_recall02.mp3','/audio/voice_feedback/origin_recall03.mp3'];

// function and helpers to move players position and reset emote message
var moveTo = function(direction){
    var currentUser = Meteor.userId();
    var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
    if (!roomIn){return randAudio(moveAlasAudio);};

        //helper function that updates new room and player profile with player location data
        var updatePlayerLoc = function(roomTo){
          Rooms.update({_id: roomIn},{$pull:{'roomContents.players':currentUser}});
          Rooms.update({_id: roomTo},{$push:{'roomContents.players': currentUser}});
          Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomTo}});
        };
        //helper function that resets emotes or chat msgs when a player moves to another room
        var resetEmote = function(){
          var currentEmote = Meteor.users.findOne({_id: currentUser},{'profile.sayMsg': 1}).profile.sayMsg;
          console.log('currentEmote: ' + currentEmote);
          if (currentEmote !== ' is standing here'){
            Session.set('sayAudio','not_a_number_wont_trigger_reactive_chatbeep');
            Meteor.users.update({_id: currentUser},{$set:{'profile.sayMsg': undefined}});
            Meteor.users.update({_id: currentUser},{$set:{'profile.sayMsg': ' is standing here'}});
          }
        }

    switch (direction){
      case 'north':
        var roomNorth = Rooms.findOne({_id: roomIn},{connectedNorth: 1}).connectedNorth;
        if (!roomNorth){return randAudio(moveAlasAudio);};
        randAudio(moveNorthAudio);
        updatePlayerLoc(roomNorth);
        resetEmote();
        break;
      
      case 'south':
        var roomSouth = Rooms.findOne({_id: roomIn},{connectedSouth: 1}).connectedSouth;
        if (!roomSouth){return randAudio(moveAlasAudio);};
        randAudio(moveSouthAudio);
        updatePlayerLoc(roomSouth);
        resetEmote();
        break;
      
      case 'east':
        var roomEast = Rooms.findOne({_id: roomIn},{connectedEast: 1}).connectedEast;
        if (!roomEast){return randAudio(moveAlasAudio);};
        randAudio(moveEastAudio);
        updatePlayerLoc(roomEast);
        resetEmote();
        break;
      
      case 'west':
        var roomWest = Rooms.findOne({_id: roomIn},{connectedWest: 1}).connectedWest;
        if (!roomWest){return randAudio(moveAlasAudio);};
        randAudio(moveWestAudio);
        updatePlayerLoc(roomWest);
        resetEmote();
        break;
      
      case 'up':
        var roomUp = Rooms.findOne({_id: roomIn},{connectedUp: 1}).connectedUp;
        if (!roomUp){return randAudio(moveAlasAudio);};
        randAudio(moveUpAudio);
        updatePlayerLoc(roomUp);
        resetEmote();
        break;
      
      case 'down':
        var roomDown = Rooms.findOne({_id: roomIn},{connectedDown: 1}).connectedDown;
        if (!roomDown){return randAudio(moveAlasAudio);};
        randAudio(moveDownAudio);
        updatePlayerLoc(roomDown);
        resetEmote();
        break;
      case 'origin':
       var roomOrigin = Rooms.findOne({roomTitle: 'Origin of Light'},{_id: 1})._id;
       randAudio(moveOriginAudio);
       updatePlayerLoc(roomOrigin);
       resetEmote();
    }
  };





//begin modified wit.AI Meteor package from https://github.com/warrenmcquinn/meteor-wit-ai  
Template.microphone_example.rendered = function() {

var mic = new Wit.Microphone(document.getElementById("microphone"));
var info = function (msg) {
  console.log(msg);
};
var error = function (msg) {
  console.log(msg);
};
mic.onready = function () {
  console.log("Microphone is ready to record.");
};
mic.onaudiostart = function () {
  console.log("Recording Started");
};
mic.onaudioend = function () {
   console.log("Recording stopped, processing started");
};

//results of voice command query, intent as string, entities as object
mic.onresult = function (intent, entities) {
  console.log("Intent: " + intent);
  console.log("Entities: " + entities);

  if (intent === 'say') {
    var chatMsg = "";
    var currentUser = Meteor.userId();
      if (entities.message_body) {
        chatMsg = entities.message_body.value;
      } else {
        chatMsg = '...';
      }
    Session.set('emote','says, '+ '\"'+chatMsg+'.\"');
    var emote = Session.get('emote');
    var setStand = Meteor.users.update({_id: currentUser},{$set:{'profile.sayMsg': ' is standing here'}});
    Meteor.users.update({_id: currentUser},{$set:{'profile.sayMsg': emote}});
    Meteor.setTimeout(function(){
      Meteor.users.update({_id: currentUser},{$set:{'profile.sayMsg': ' is standing here'}});
    },10000);
        } else if (intent ==="move_north"){
          moveTo('north');
        } else if (intent === "move_west"){
          moveTo('west');
        } else if (intent === "move_south"){
          moveTo('south');
        } else if (intent === "move_east"){
          moveTo('east');
        } else if (intent === "move_up"){
          moveTo('up');
        } else if (intent === "move_down"){
          moveTo('down');
        } else if (intent === "recall_origin") {
          moveTo('origin');
        }
};

mic.onerror = function (err) {
  console.log("Error: " + err);
};
mic.onconnecting = function () {
  info("Microphone is connecting");
};
mic.ondisconnected = function () {
  info("Microphone is not connected");
};

mic.connect("4O4KJDOPHBPJ2GAUNPHDLXAHJXOKVQLU");
};
//End wit.ai helper

  Template.compass.events({
    'click td.north': function(){
      moveTo('north');
    },
    'click td.south': function(){
      moveTo('south');
    },
    'click td.west': function(){
      moveTo('west');
    },
    'click td.east': function(){
      moveTo('east');
    },
    'click td.up': function(){
      moveTo('up');
    },
    'click td.down': function(){
      moveTo('down');
    },
    'click td.origin': function(){
      new Audio('/audio/recall_origin.mp3').play();
    } 
  });