//new MongoDB collection that stores all the games rooms.
//DB has full read and write on server and client.
//The app has not been secured yet and is still in development mode
Rooms = new Meteor.Collection('rooms');




if (Meteor.isClient) {

 //playing around with grid mapper
 //var mapRooms = function(){
  //  var roomArray = Rooms.find().fetch();
  //  console.log(roomArray[0]._id);
  /*
  1.  Mapper function takes in an array of room objects
  2.  It sets the first element of the array to x y coordinates to 0,0
  3.  Does that by pushing the first room to gridMap array with an object
     with room ID as its name, and x y properties with values of 0 and 0
    gridMap = {
      "roomId1": {x: 0, y: 0};
    }
  4.  After setting the first room ID on the grid map, it pushes its current RoomID
     to an array alreadyMapped.  = [room1,]

     Also store CurrentRoom value to 0,0

    Then the function goes thru the connected E W S E properties of room1 to check if its empty
    if it has a room_id in it then it sets "newRoomId": {x: offset, y: offset} of each connected room.

    THen marks current room as "spidered" by pushing it onto a spidered array.

    then loops thru to see if connected rooms have bene spidered, if not

     then run the function again, this time set the _id of the room to the X Y coords
   
// store all room objects into an roomArray
   var roomArray = Rooms.find().fetch();
//initialize a gridMap that stores roomID with key value pairs for x y coords
   gridMap = {}
//set the first item on the roomArray to 0,0 and put it in the gridMap obj
   gridMap[roomArray[0]._id] = {
                              roomTitle: roomArray[0].roomTitle,
                              X: 0
                              Y: 0
                              Z: 0
                            }
//function to set coords of connected rooms below
  roomToSpider(roomId)  //takes in array object such as roomArray[0]
  var currentRoom = room
  var currentRoomId = room._id;
  var currentCoord = {
                      x: gridMap[currentRoom].x,
                      y: gridMap[currentRoom].y
                     }
  //maps all connected rooms to the gridMap with x y coordinates using currentCoord +- xy offset
    for (var i = 0;i < roomArray;i++){
      if (roomArray[i]._id === currentRoom){
        if (roomArray[i].connectedWest !== ""){
          gridMap.[roomArray[i].connectedWest].x = currentCoord.x -1;
          gridMap.[roomArray[i].connectedWest].y = currentCord.y;  
        }
      }
      if (roomArray[i]._id === currentRoom){
        if (roomArray[i].connectedEast !== ""){
          gridMap.[roomArray[i].connectedEast].x = currentCoord.x +1;
          gridMap.[roomArray[i].connectedEast].y = currentCord.y;  
        }
      }
      if (roomArray[i]._id === currentRoom){
        if (roomArray[i].connectedNorth !== ""){
          gridMap.[roomArray[i].connectedNorth].x = currentCoord.x;
          gridMap.[roomArray[i].connectedNorth].y = currentCord.y +1;  
        }
      }
      if (roomArray[i]._id === currentRoom){
        if (roomArray[i].connectedSouth !== ""){
          gridMap.[roomArray[i].connectedSouth].x = currentCoord.x ;
          gridMap.[roomArray[i].connectedSouth].y = currentCord.y - 1;  
        }
      }
    // after done mapping the connected rooms, set current room to Spidered.
    var spidered = [currentRoom];


    }
 





  */


 //};

 Template.roomGrid.grid = function(){
  
  





 return roomsArray;
 }
 
 Template.roomGrid.events({

  'click input#renderGrid' : function(){

    //construct an array of objects from the Rooms collection
    var roomsArray = Rooms.find().fetch();
    console.log(roomsArray);
    //initialize a gridmap object that contains each roomID as a key and their x y coords as values
    gridMap = {};

    //insert the initial room into the gridMap
    gridMap[roomsArray[0]._id] = {
      roomTitle: roomsArray[0].roomTitle,
      x: 0,
      y: 0,
    };
    console.log(gridMap);

    //function to scan attached rooms and push them onto the gridMap obj.
    var spiderThisRoom = function(roomId){
          var currentRoomId = roomId;
          var currentRoomObj = (function(){
                                for (var i = 0;i<roomsArray.length;i++){
                                  if (currentRoomId === roomsArray[i]._id){
                                    return roomsArray[i];
                                  };
                                };
                               })();

          var currentCoords = {x: gridMap[currentRoomId].x, y: gridMap[currentRoomId].y};
        
          if (currentRoomObj.connectedSouth !== ""){
              gridMap[currentRoomObj.connectedSouth] = {x: currentCoords.x, y: currentCoords.y - 1};
             

          } else if (currentRoomObj.connectedNorth !== ""){
              gridMap[currentRoomObj.connectedNorth] = {x: currentCoords.x, y: currentCoords.y + 1};
              

          } else if (currentRoomObj.connectedWest !== ""){
              gridMap[currentRoomObj.connectedWest] = {x: currentCoords.x - 1, y: currentCoords.y};
             

          } else if (currentRoomObj.connectedEast !== ""){
              gridMap[currentRoomObj.connectedEast] = {x: currentCoords.x + 2, y: currentCoords.y};
              

          };

             console.log(gridMap);
    }

     spiderThisRoom("mfFLnAARmf3H7d79H");

 
  }


 });



  //allows handlebars #each to take in objects and convert them into arrays
  Handlebars.registerHelper('arrayify', function(obj){
    result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
  });

  //temporarily subscribing to all user account info on the client.**INSECURE**
  Meteor.subscribe('allUsers');



  Template.addRoom.isBuilder = function(){//helper function to validate if user has Builder status
    var currentUserEmail = Meteor.user().emails[0].address;
    var builderEmail = 'builder@builder.com';//need to move the ID to a server method, and call the ID from client.
    if (currentUserEmail === builderEmail){ 
      return true;
    } else{
      return false;
    }
  };

Template.roomList.isBuilder = function(){//helper function to validate if user has Builder status
    var currentUserEmail = Meteor.user().emails[0].address;
    var builderEmail = 'builder@builder.com';//need to move the ID to a server method, and call the ID from client.
    if (currentUserEmail === builderEmail){ 
      return true;
    } else{
      return false;
    }
  };

  
//Helper functions for Builder form field prefills
  Template.addRoom.roomTitlePrefill = function(){
    var selectedRoom = Session.get('selectedRoom');
    return Rooms.findOne({_id: selectedRoom}, {roomTitle: 1}).roomTitle
  };
   Template.addRoom.roomDescPrefill = function(){
    var selectedRoom = Session.get('selectedRoom');
    return Rooms.findOne({_id: selectedRoom}, {roomDesc: 1}).roomDesc
  };
   Template.addRoom.roomContentsPrefill = function(){
    var selectedRoom = Session.get('selectedRoom');
    return Rooms.findOne({_id: selectedRoom}, {roomContents: 1}).roomContents
  };
   Template.addRoom.roomEventsPrefill = function(){
    var selectedRoom = Session.get('selectedRoom');
    return Rooms.findOne({_id: selectedRoom}, {roomEvents: 1}).roomEvents
  };
   Template.addRoom.connectedNorthPrefill = function(){
    var selectedRoom = Session.get('selectedRoom');
    return Rooms.findOne({_id: selectedRoom}, {connectedNorth: 1}).connectedNorth
  };
   Template.addRoom.connectedWestPrefill = function(){
    var selectedRoom = Session.get('selectedRoom');
    return Rooms.findOne({_id: selectedRoom}, {connectedWest: 1}).connectedWest
  };
   Template.addRoom.connectedEastPrefill = function(){
    var selectedRoom = Session.get('selectedRoom');
    return Rooms.findOne({_id: selectedRoom}, {connectedEast: 1}).connectedEast
  };
   Template.addRoom.connectedSouthPrefill = function(){
    var selectedRoom = Session.get('selectedRoom');
    return Rooms.findOne({_id: selectedRoom}, {connectedSouth: 1}).connectedSouth
  };
   Template.addRoom.connectedUpPrefill = function(){
    var selectedRoom = Session.get('selectedRoom');
    return Rooms.findOne({_id: selectedRoom}, {connectedUp: 1}).connectedUp
  };
   Template.addRoom.connectedDownPrefill = function(){
    var selectedRoom = Session.get('selectedRoom');
    return Rooms.findOne({_id: selectedRoom}, {connectedDown: 1}).connectedDown
  };

//helper functions to populate player panel with room that user is in
  Template.roomTitle.roomTitleGet = function(){
      var currentUser = Meteor.userId();
      var roomIn = Meteor.users.findOne({_id: currentUser}, {'profile.roomIn': 1}).profile.roomIn;
      return Rooms.findOne({_id: roomIn}, {roomTitle: 1}).roomTitle;
  };
  Template.roomDesc.roomDescGet = function(){
      var currentUser = Meteor.userId();
      var roomIn = Meteor.users.findOne({_id: currentUser}, {'profile.roomIn': 1}).profile.roomIn;
      return Rooms.findOne({_id: roomIn}, {roomDesc: 1}).roomDesc;
  };

//helper function to generate list of rooms
  Template.roomList.listRooms = function(){
    return Rooms.find().fetch();
  };
//helper to call CSS highlighting onto roomlist selection
  Template.roomList.selectedRoom = function(){  
    var selectedRoom = Session.get('selectedRoom');
    var roomId = this._id;
    if (selectedRoom === roomId){
      return 'selectedRoom';
    }
  };


  //lists players in the room and their emote messages
  Template.roomContents.listPlayers = function(){
    var playerMap = {};
    var currentUser = Meteor.userId();
    var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
    var playerList = Rooms.findOne({_id: roomIn},{'roomContents.players':1}).roomContents.players;
    //create new key value map with email and say message
    //var email = Meteor.users.findOne({_id: currentUser},{'emails[0].address':1}).emails[0].address;
    //var sayMsg = Meteor.users.findOne({_id: currentUser},{'profile.sayMsg': 1}).profile.sayMsg;
      for (var i = 0;i<playerList.length;i++){
        playerMap[Meteor.users.findOne({_id: playerList[i]},{'emails[0].address':1}).emails[0].address] = 
        Meteor.users.findOne({_id: playerList[i]},{'profile.sayMsg': 1}).profile.sayMsg
      };
      return playerMap;
    
  };

//begin wit.AI Meteor package from https://github.com/warrenmcquinn/meteor-wit-ai
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
    new Audio('/audio/chat_blip.mp3').play();
    Meteor.setTimeout(function(){
      Meteor.users.update({_id: currentUser},{$set:{'profile.sayMsg': ' is standing here'}});
    },10000);

        } else if (intent ==="move_north"){
             console.log('intent was logged as move_north');
             var currentUser = Meteor.userId();
             var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
             if (!roomIn){return console.log('Alas, you cannot go that way.');};
             var roomNorth = Rooms.findOne({_id: roomIn},{connectedNorth: 1}).connectedNorth;
             if (!roomNorth){return console.log('Alas, you cannot go that way.');};
             new Audio('/audio/forest_footsteps.mp3').play();
             Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomNorth}});
             moveTo(currentUser,roomIn,roomNorth);
        } else if (intent === "move_west"){
             var currentUser = Meteor.userId();
             var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
             if (!roomIn){return console.log('Alas, you cannot go that way.');};
             var roomWest = Rooms.findOne({_id: roomIn},{connectedWest: 1}).connectedWest;
             if (!roomWest){return console.log('Alas, you cannot go that way.');};
             new Audio('/audio/forest_footsteps.mp3').play();
             Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomWest}});
             moveTo(currentUser,roomIn,roomWest);

        } else if (intent === "move_south"){
             var currentUser = Meteor.userId();
             var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
             if (!roomIn){return console.log('Alas, you cannot go that way.');};
             var roomSouth = Rooms.findOne({_id: roomIn},{connectedSouth: 1}).connectedSouth;
             if (!roomSouth){return console.log('Alas, you cannot go that way.');};
             new Audio('/audio/forest_footsteps.mp3').play();
             Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomSouth}});
             moveTo(currentUser,roomIn,roomSouth);

        } else if (intent === "move_east"){
             var currentUser = Meteor.userId();
             var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
             if (!roomIn){return console.log('Alas, you cannot go that way.');};
             var roomEast = Rooms.findOne({_id: roomIn},{connectedEast: 1}).connectedEast;
             if (!roomEast){return console.log('Alas, you cannot go that way.');};
             new Audio('/audio/forest_footsteps.mp3').play();
             Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomEast}});
             moveTo(currentUser,roomIn,roomEast);

        } else if (intent === "move_up"){
             var currentUser = Meteor.userId();
             var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
             if (!roomIn){return console.log('Alas, you cannot go that way.');};
             var roomUp = Rooms.findOne({_id: roomIn},{connectedUp: 1}).connectedUp;
             if (!roomUp){return console.log('Alas, you cannot go that way.');};
             new Audio('/audio/forest_footsteps.mp3').play();
             Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomUp}});
             moveTo(currentUser,roomIn,roomUp);
        } else if (intent === "move_down"){
           var currentUser = Meteor.userId();
           var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
           if (!roomIn){return console.log('Alas, you cannot go that way.');};
           var roomDown = Rooms.findOne({_id: roomIn},{connectedDown: 1}).connectedDown;
           if (!roomDown){return console.log('Alas, you cannot go that way.');};
           new Audio('/audio/forest_footsteps.mp3').play();
           Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomDown}});
           moveTo(currentUser,roomIn,roomDown);
        } else if (intent === "recall_origin") {
           var currentUser = Meteor.userId();
           roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
           var roomOrigin = Rooms.findOne({roomTitle: 'Origin of Light'},{_id: 1})._id;
           new Audio('/audio/recall_origin.mp3').play();
           Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomOrigin}});
           moveTo(currentUser,roomIn,roomOrigin);
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
      // mic.start();
      // mic.stop();

};
//End wit.ai helper





  //Title Login form and new user event handler
  Template.loginTitle.events({
      'submit #loginTitlePage': function(theEvent, theTemplate){
        theEvent.preventDefault();
        var email = theTemplate.find('#userEmail').value;
        var password = theTemplate.find('#userPassword').value;
        new Audio('/audio/recall_origin.mp3').play();

        Meteor.loginWithPassword(email,password,function(err){
          if (err){
            console.log('User doesn\'t exist.  Creating a new user.');
            
                          Accounts.createUser({email: email, password: password},
                            function(err){
                              if (err){
                                console.log("Error creating new user.");
                              } else {
                                console.log("Success! New user created.");
                              }
                           });
          } else {
            console.log(email + " is logged in!");
          };      

        });
      
      }

  });

  //event that detects clicking of logout button
  Template.loginButtons.events({
    'click #login-buttons-logout': function() {
      console.log('testlogout');
     var currentUser = Meteor.userId();
     console.log(currentUser);
     var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
     console.log(roomIn);
     Rooms.update({_id: roomIn},{$pull:{'roomContents.players':currentUser}});
    }
  });
 

  //event that selects room in builder panel
  Template.roomList.events({
    'click li.roomSelect': function(){
      var roomId = this._id;
      Session.set('selectedRoom',roomId);
    },
    'click li.teleportTo': function(){
      var selectedRoom = Session.get('selectedRoom');
      var currentUser = Meteor.userId();
      Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn':selectedRoom}});
    }

  });
  //function that pushes userId into Room.roomContents.player array and
  //deletes userId from the current Room.roomContents.player array.
  var moveTo = function(currentUser,roomIn,roomTo){
    //pushes userId to new room player array
    Rooms.update({_id: roomTo},{$push:{'roomContents.players': currentUser}});
    //pull userId from the current room players array
    Rooms.update({_id: roomIn},{$pull:{'roomContents.players':currentUser}});
    //clears the players say message upon entering a new room
    Meteor.users.update({_id: currentUser},{$set:{'profile.sayMsg': undefined}});
    //sets emote to default standing position
    Meteor.users.update({_id: currentUser},{$set:{'profile.sayMsg': ' is standing here'}});
  };

  //event that clicks compass to changes roomIn of player
  Template.compass.events({
    'click td.north': function(){
     var currentUser = Meteor.userId();
     var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
     if (!roomIn){return console.log('Alas, you cannot go that way.');};
     var roomNorth = Rooms.findOne({_id: roomIn},{connectedNorth: 1}).connectedNorth;
     if (!roomNorth){return console.log('Alas, you cannot go that way.');};
     new Audio('/audio/forest_footsteps.mp3').play();
     Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomNorth}});
     moveTo(currentUser,roomIn,roomNorth);
    },
    'click td.south': function(){
     var currentUser = Meteor.userId();
     var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
     if (!roomIn){return console.log('Alas, you cannot go that way.');};
     var roomSouth = Rooms.findOne({_id: roomIn},{connectedSouth: 1}).connectedSouth;
     if (!roomSouth){return console.log('Alas, you cannot go that way.');};
     new Audio('/audio/forest_footsteps.mp3').play();
     Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomSouth}});
     moveTo(currentUser,roomIn,roomSouth);
    },
    'click td.west': function(){
     var currentUser = Meteor.userId();
     var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
     if (!roomIn){return console.log('Alas, you cannot go that way.');};
     var roomWest = Rooms.findOne({_id: roomIn},{connectedWest: 1}).connectedWest;
     if (!roomWest){return console.log('Alas, you cannot go that way.');};
     new Audio('/audio/forest_footsteps.mp3').play();
     Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomWest}});
     moveTo(currentUser,roomIn,roomWest);
    },
    'click td.east': function(){
     var currentUser = Meteor.userId();
     var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
     if (!roomIn){return console.log('Alas, you cannot go that way.');};
     var roomEast = Rooms.findOne({_id: roomIn},{connectedEast: 1}).connectedEast;
     if (!roomEast){return console.log('Alas, you cannot go that way.');};
     new Audio('/audio/forest_footsteps.mp3').play();
     Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomEast}});
     moveTo(currentUser,roomIn,roomEast);
    },
    'click td.up': function(){
     var currentUser = Meteor.userId();
     var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
     if (!roomIn){return console.log('Alas, you cannot go that way.');};
     var roomUp = Rooms.findOne({_id: roomIn},{connectedUp: 1}).connectedUp;
     if (!roomUp){return console.log('Alas, you cannot go that way.');};
     new Audio('/audio/forest_footsteps.mp3').play();
     Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomUp}});
     moveTo(currentUser,roomIn,roomUp);
    },
    'click td.down': function(){
     var currentUser = Meteor.userId();
     var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
     if (!roomIn){return console.log('Alas, you cannot go that way.');};
     var roomDown = Rooms.findOne({_id: roomIn},{connectedDown: 1}).connectedDown;
     if (!roomDown){return console.log('Alas, you cannot go that way.');};
     new Audio('/audio/forest_footsteps.mp3').play();
     Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomDown}});
     moveTo(currentUser,roomIn,roomDown);
    },
    'click td.origin': function(){
     //var currentUser = Meteor.userId();
     //roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
     //var roomOrigin = Rooms.findOne({roomTitle: 'Origin of Light'},{_id: 1})._id;
     new Audio('/audio/recall_origin.mp3').play();
    // Meteor.users.update({_id: currentUser},{$set:{'profile.roomIn': roomOrigin}});
     //moveTo(currentUser,roomIn,roomOrigin);
    } 
  });

  


  
  Template.addRoom.events({

    'submit form#addRoomForm': function(theEvent,theTemplate){
       theEvent.preventDefault();
      var roomTitleText = theTemplate.find('#roomTitle').value;
      var roomDescText = theTemplate.find('#roomDesc').value;
      //var roomContentsText = theTemplate.find('#roomContents').value;
     //var roomEventsText = theTemplate.find('#roomEvents').value;
      var connectedNorthText = theTemplate.find('#connectedNorth').value;
      var connectedUpText = theTemplate.find('#connectedUp').value;
      var connectedWestText = theTemplate.find('#connectedWest').value;
      var connectedEastText = theTemplate.find('#connectedEast').value;
      var connectedSouthText = theTemplate.find('#connectedSouth').value;
      var connectedDownText = theTemplate.find('#connectedDown').value;

      var selectedRoom = Session.get('selectedRoom');

          if (Session.get('selectedRoom') !== undefined){
            Rooms.update(
              {_id: selectedRoom},
                {$set: {roomDesc: roomDescText,
                        roomTitle: roomTitleText,
                       // roomContents: roomContentsText,
                        //roomEvents: roomEventsText,
                        connectedNorth: connectedNorthText,
                        connectedUp: connectedUpText,
                        connectedWest: connectedWestText,
                        connectedEast: connectedEastText,
                        connectedSouth: connectedSouthText,
                        connectedDown: connectedDownText 
                      }
                }
              );
          } else {
            Rooms.insert({
              roomDesc: roomDescText,
              roomTitle: roomTitleText,
              roomContents: {players: []},
             // roomEvents: roomEventsText,
              connectedNorth: connectedNorthText,
              connectedUp: connectedUpText,
              connectedWest: connectedWestText,
              connectedEast: connectedEastText,
              connectedSouth: connectedSouthText,
              connectedDown: connectedDownText
            });
          };
     
    },  

    'click #deleteRoom': function(){
      console.log('Deleting ' + Session.get('selectedRoom'))
      Rooms.remove(Session.get('selectedRoom'));
    }


  });

Template.chatBox.events({
  'submit form#chatForm': function(theEvent,theTemplate){
       theEvent.preventDefault();
    var chatMsg = theTemplate.find('#chatTextInput').value;
    var currentUser = Meteor.userId();
    $('#chatTextInput').val('');
    Session.set('emote','says, '+ '\"'+chatMsg+'.\"');
    var emote = Session.get('emote');
    var setStand = Meteor.users.update({_id: currentUser},{$set:{'profile.sayMsg': ' is standing here'}});
    Meteor.users.update({_id: currentUser},{$set:{'profile.sayMsg': emote}});
    new Audio('/audio/chat_blip.mp3').play();
    Meteor.setTimeout(function(){
      Meteor.users.update({_id: currentUser},{$set:{'profile.sayMsg': ' is standing here'}});
    },10000);
  }
});




var roomArray = Rooms.find().fetch();
console.log(roomArray);



};















//Server stuff from here down!

if (Meteor.isServer) {

  Meteor.startup(function () {

    //Checks if Origin room has been created upon startup, if not, it creates one.
    var hasOrigin = Rooms.findOne({roomTitle: 'Origin of Light'});
   if (!hasOrigin){
     Rooms.insert({
              roomTitle: 'Origin of Light',
              roomDesc: 'You stand at the edge of all creation.  Light in a multitude of directions stream through, solidifying into proto shapes that keep shifting, waiting for you to direct it.',
              roomContents: {players: [Meteor.userId()]}
            });
    }
  });

//sets a new account location to Under A Giant Fig Tree room
  Accounts.onCreateUser(function(options, user) {
  startRoom = Rooms.findOne({roomTitle: 'Under A Giant Fig Tree'},{_id: 1})._id;
  user.profile = {
    roomIn: startRoom,
    sayMsg: 'is standing here'
  };
  console.log(user.profile.roomIn); 

    if (options.profile)
      user.profile = options.profile;
  return user;
  });

  Meteor.publish('allUsers',function(){
      return Meteor.users.find({});
  });


};

//code to update users profile
// Meteor.users.update({_id:Meteor.userId()}, { $set:{'profile.roomIn':'3fHgRHFe9NhCQGXdc'}} )

//code to retreive room position that user is in
//Meteor.users.findOne({_id: Meteor.userId()}, {'profile.roomIn': 1}).profile.roomIn;