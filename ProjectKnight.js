Rooms = new Meteor.Collection('rooms');




if (Meteor.isClient) {
//write a helper on the formtemplate to check if userId matches builder Id
  Template.addRoom.isBuilder = function(){//helper function to validate if user has Builder status
    var currentUser = Meteor.userId();
    var builder = "8efHNS9m83oJcQCSx";//need to move the ID to a server method, and call the ID from client.
    if (currentUser === builder){
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


};















//Server stuff from here down

if (Meteor.isServer) {
  
};
