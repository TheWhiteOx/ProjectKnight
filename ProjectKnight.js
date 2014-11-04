//new MongoDB collection that stores all the games rooms.
Rooms = new Meteor.Collection('rooms');
Mobs = new Meteor.Collection('mobs');

//MOBS-------------
/*
id:
shortDesc
longDesc
events
inventory



*/
var forestBunny = {};
var forestButterfly = {};
var forestBird = {};


//loading mobs function
var loadMob = function(mobType,location){

};




//code to update users profile
// Meteor.users.update({_id:Meteor.userId()}, { $set:{'profile.roomIn':'3fHgRHFe9NhCQGXdc'}} )

//code to retreive room position that user is in
//Meteor.users.findOne({_id: Meteor.userId()}, {'profile.roomIn': 1}).profile.roomIn;