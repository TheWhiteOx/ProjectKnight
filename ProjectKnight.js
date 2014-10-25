Rooms = new Meteor.Collection('rooms');




if (Meteor.isClient) {
//write a helper on the formtemplate to check if userId matches builder Id
Template.addRoom.isBuilder = function(){
  var currentUser = Meteor.userId();
  var builder = "8efHNS9m83oJcQCSx";
  if (currentUser === builder){
    return true;
  } else{
    return false;
  }
}


};

if (Meteor.isServer) {
  
};
