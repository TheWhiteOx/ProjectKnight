


/////////////////////////////////////////Execute's on server upon startup////////////////////////////////////////////////////////
Meteor.startup(function () {

    //Checks if Origin room has been created upon new database creation, if not, it creates one.
  var hasOrigin = Rooms.findOne({roomTitle: 'Origin of Light'});
   if (!hasOrigin){
     Rooms.insert({
              roomTitle: 'Origin of Light',
              roomDesc: 'You stand at the edge of all creation.  ' + '
                        Light in a multitude of directions stream through, '+'
                        solidifying into proto shapes that keep shifting, '+'
                        waiting for you to direct it.',
              roomContents: {players: [Meteor.userId()]}
            });
    }
  });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//sets a new account location to Under A Giant Fig Tree room
  Accounts.onCreateUser(function(options, user) {
    startRoom = Rooms.findOne({roomTitle: 'Under A Giant Fig Tree'},{_id: 1})._id;
    user.profile = {
      roomIn: startRoom,
      sayMsg: 'is standing here'
    };
    console.log(user.profile.roomIn); 

    if (options.profile){
        user.profile = options.profile;
    return user;}
    });

    Meteor.publish('allUsers',function(){
        return Meteor.users.find({});
  });