

Meteor.publish('allUsers',function(){
        return Meteor.users.find({});
});


Meteor.methods({
  getUserId: function(){
    return Meteor.userId();
  }
});



//sets a new account location to Under A Giant Fig Tree room
Accounts.onCreateUser(function(options, user) {
  var startRoom = Rooms.findOne({roomTitle: 'Under A Giant Fig Tree'},{_id: 1})._id;
 

  if (options.profile)
    user.profile = options.profile;
    console.log('user :' + user);
    user.profile = {
    roomIn: startRoom,
    sayMsg: 'is standing here'
  };
  console.log('user.profile: ' + user.profile);
  Rooms.update({_id: startRoom}, {$push:{'roomContents.players':user._id}});
  console.log('user._id: ' + user._id);
  console.log(Rooms.findOne({_id: startRoom},{'roomContents.players': 1}).roomContents.players);
  return user;

});

Accounts.onLogin(function(result){
  var currentUser = result.user._id;
  console.log('currentUser var in Accounts.onLogin func: ' + currentUser);
  var roomIn = Meteor.users.findOne({_id: currentUser}, {'profile.roomIn': 1}).profile.roomIn;
  var roomTo = roomIn;
  console.log("roomTo: " + roomTo);
  Rooms.update({_id: roomTo},{$push:{'roomContents.players': currentUser}});
});



Hooks.onCloseSession = function(userId){
  console.log('CLient browser closed. ' + userId + " logged out.");
  var currentUser = userId;
  var roomIn = Meteor.users.findOne({_id: userId},{'profile.roomIn': 1}).profile.roomIn;
  console.log('RoomIn when logged out: ' + roomIn);
  Rooms.update({_id: roomIn},{$pull:{'roomContents.players':currentUser}});
};



/////////////////////////////////////////Execute's on server upon startup////////////////////////////////////////////////////////
Meteor.startup(function () {

    

    //Checks if Origin room has been created upon new database creation, if not, it creates one.
  var hasOrigin = Rooms.findOne({roomTitle: 'Origin of Light'});
   if (!hasOrigin){
     Rooms.insert({
              roomTitle: 'Origin of Light',
              roomDesc: 'You stand at the edge of all creation.  '+
                        'Light in a multitude of directions stream through, '+
                        'solidifying into proto shapes that keep shifting, '+
                        'waiting for you to direct it.',
              roomContents: {players: [Meteor.userId()]}
            });
    };
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






    
  });

  