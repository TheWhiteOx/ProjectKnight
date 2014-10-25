//new MongoDB collection that stores all the games rooms.
//DB has full read and write on server and client.
//The app has not been secured yet and is still in development mode
Rooms = new Meteor.Collection('rooms');




if (Meteor.isClient) {



  Template.addRoom.isBuilder = function(){//helper function to validate if user has Builder status
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

 

  //event that selects room in builder panel
  Template.roomList.events({
    'click li.roomSelect': function(){
      var roomId = this._id;
      Session.set('selectedRoom',roomId);
      
    }
  });


  
  Template.addRoom.events({

    'submit form': function(theEvent,theTemplate){
       theEvent.preventDefault();
      var roomTitleText = theTemplate.find('#roomTitle').value;
      var roomDescText = theTemplate.find('#roomDesc').value;
      var roomContentsText = theTemplate.find('#roomContents').value;
      var roomEventsText = theTemplate.find('#roomEvents').value;
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
                        roomContents: roomContentsText,
                        roomEvents: roomEventsText,
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
              roomContents: roomContentsText,
              roomEvents: roomEventsText,
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


};















//Server stuff from here down

if (Meteor.isServer) {
  
};
