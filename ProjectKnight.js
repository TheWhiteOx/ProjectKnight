Rooms = new Meteor.Collection('rooms');




if (Meteor.isClient) {
//write a helper on the formtemplate to check if userId matches builder Id
  Template.addRoom.isBuilder = function(){
    var currentUser = Meteor.userId();
    var builder = "8efHNS9m83oJcQCSx";//need to move the ID to a server method, and call the ID from client.
    if (currentUser === builder){
      return true;
    } else{
      return false;
    }
  };

  Template.roomList.listRooms = function(){
    return "A List of Rooms should be here";
  };


};















//Server stuff from here down

if (Meteor.isServer) {
  
};
