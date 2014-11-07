//intial login Cover Page

Template.loginTitle.welcomeAudio = function(){
  return new Audio('/audio/voice_feedback/welcome_to_origins.mp3').play();
};
  //Title Login form and new user event handler
  Template.loginTitle.events({
      'submit #loginTitlePage': function(theEvent, theTemplate){
        theEvent.preventDefault();
        var email = theTemplate.find('#userEmail').value;
        var password = theTemplate.find('#userPassword').value;
        

        Meteor.loginWithPassword(email,password,function(err){
          console.log('err: ' + err);
          if (err.reason === 'Incorrect password'){
            return console.log('Login Error: Incorrect Password');
          } else if (err.reason === 'User not found'){
            
            console.log('User doesn\'t exist.  Creating a new user.');
            
                          Accounts.createUser({email: email, password: password},
                            function(err){
                              if (err){
                                console.log("Error creating new user.");
                              } else {
                                new Audio('/audio/recall_origin.mp3').play();
                                new Audio('/audio/voice_feedback/compass_or_microphone.mp3').play();
                                console.log("Success! New user created.");
                                
                              }
                           });
          } else {
            console.log('Test loggin');
            new Audio('/audio/recall_origin.mp3').play();
            new Audio('/audio/voice_feedback/compass_or_microphone.mp3').play();
            console.log(email + " is logged in!");
            
          };      

        });
      
      }

  });

  //event that detects clicking of logout button and removes logged out playerId from current room
  Template.loginButtons.events({
    'click #login-buttons-logout': function() {
     var currentUser = Meteor.userId();
     console.log(currentUser + ' logging out!');
     var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
     console.log('RoomIn when logged out: ' + roomIn);
     Rooms.update({_id: roomIn},{$pull:{'roomContents.players':currentUser}});
    }
  });