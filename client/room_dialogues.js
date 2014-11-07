//Triggers voice dialogue when player enters certain rooms

roomDialogue = function(){
    var currentUser = Meteor.userId();
    console.log('currentUser in roomDialogue function: ' + currentUser);
    var roomOne =  Rooms.findOne({roomTitle: 'Under A Giant Fig Tree'},{_id: 1})._id;
    var roomTwo =  Rooms.findOne({roomTitle: 'Following A Babbling Brook'},{_id: 1})._id;
    var roomThree =  Rooms.findOne({roomTitle: 'The Plains of Eden'},{_id: 1})._id;
    var roomFour =  Rooms.findOne({roomTitle: 'Roaming Plains'},{_id: 1})._id;
    var roomFive =  Rooms.findOne({roomTitle: 'Deserted Wastelands'},{_id: 1})._id;
    var roomSix =  Rooms.findOne({roomTitle: 'Deep in the Wastelands of the Source'},{_id: 1})._id;
    var roomSeven =  Rooms.findOne({roomTitle: 'A Wrinkle in the Matrix'},{_id: 1})._id;
    var roomEight =  Rooms.findOne({roomTitle: 'Database Graveyards'},{_id: 1})._id;
    var roomNine =  Rooms.findOne({roomTitle: 'Beyond the Sourceflow Continuum'},{_id: 1})._id;
    var roomTen =  Rooms.findOne({roomTitle: 'Just Outside of The Hack Reactor'},{_id: 1})._id;

    var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
    console.log('roomIn in roomDialogue function: ' + roomIn);
    if (roomOne === roomIn){
    Meteor.setTimeout(function(){
      console.log('Trigger Timeout for RoomOne Dialogue woot for userId: ' + currentUser + ' with roomIn: ' + roomIn + ' and roomOne: ' + roomOne);
      new Audio('/audio/voice_dialogue/dialogue01.mp3').play();
    },2000);}

    switch (roomIn) {
        case roomOne:
          Meteor.setTimeout(function(){
          new Audio('/audio/voice_dialogue/dialogue01.mp3').play();
        },2000);
          break;
        case roomTwo:
          Meteor.setTimeout(function(){
          new Audio('/audio/voice_dialogue/dialogue02.mp3').play();
        },2000);
          break;
        case roomThree:
          Meteor.setTimeout(function(){
          new Audio('/audio/voice_dialogue/dialogue03.mp3').play();
        },2000);
          break;
        case roomFour:
          Meteor.setTimeout(function(){
          new Audio('/audio/voice_dialogue/dialogue04.mp3').play();
        },2000);
          break;
        case roomFive:
          Meteor.setTimeout(function(){
          new Audio('/audio/voice_dialogue/dialogue05.mp3').play();
        },2000);
          break;
        case roomSix:
          Meteor.setTimeout(function(){
          new Audio('/audio/voice_dialogue/dialogue06.mp3').play();
        },2000);
          break;
        case roomSeven:
          Meteor.setTimeout(function(){
          new Audio('/audio/voice_dialogue/dialogue07.mp3').play();
        },2000);
          break;
        case roomEight:
          Meteor.setTimeout(function(){
          new Audio('/audio/voice_dialogue/dialogue08.mp3').play();
        },2000);
          break;
        case roomNine:
          Meteor.setTimeout(function(){
          new Audio('/audio/voice_dialogue/dialogue09.mp3').play();
        },2000);
          break;
        case roomTen:
          Meteor.setTimeout(function(){
          new Audio('/audio/voice_dialogue/dialogue10.mp3').play();
        },2000);
          break;
      }

};

  

//hackish ugly way to delay the execution of this snippet.  fix later.
Meteor.setTimeout(function(){
    Deps.autorun(roomDialogue);
},2000)