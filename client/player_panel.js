

//helper functions to populate player panel with room and room description that user is in
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

  //lists players in the room and their emote messages
  Template.roomContents.listPlayers = function(){
    var playerMap = {};
    var currentUser = Meteor.userId();
    var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
    var playerList = Rooms.findOne({_id: roomIn},{'roomContents.players':1}).roomContents.players;
    console.log(playerList);
    //create new key value map with email and say message
    //var email = Meteor.users.findOne({_id: currentUser},{'emails[0].address':1}).emails[0].address;
    //var sayMsg = Meteor.users.findOne({_id: currentUser},{'profile.sayMsg': 1}).profile.sayMsg;
      for (var i = 0;i<playerList.length;i++){
        playerMap[Meteor.users.findOne({_id: playerList[i]},{'emails[0].address':1}).emails[0].address] = 
        Meteor.users.findOne({_id: playerList[i]},{'profile.sayMsg': 1}).profile.sayMsg
      };
      console.log(playerMap);

      //play chatblip if Session.get('')
      if (_.isNumber(Session.get('sayAudio')) ){
        new Audio('/audio/chat_blip.mp3').play();
      };
      return playerMap;
  };

  Template.roomMobs.listMobs = function(){
    var mobMap = {};
    var mobList = [];
    var currentUser = Meteor.userId();
    var roomIn = Meteor.users.findOne({_id: currentUser},{'profile.roomIn': 1}).profile.roomIn;
    mobList = Rooms.findOne({_id: roomIn},{'roomContents.mobs':1}).roomContents.mobs;
    console.log('mobList from Template.roomMobs: ' + mobList);

  
    //establishes initial display of mobs upon rendering room
  _.each(mobList,function(mobId){
      var emoteArray = [];
      var randomEmote = "";
      var mobLongDesc = Mobs.findOne({_id: mobId},{mobLongDesc: 1}).mobLongDesc
      emoteArray.push(Mobs.findOne({_id: mobId},{emoteOne: 1}).emoteOne);
      emoteArray.push(Mobs.findOne({_id: mobId},{emoteTwo: 1}).emoteTwo);
      emoteArray.push(Mobs.findOne({_id: mobId},{emoteThree: 1}).emoteThree);
      console.log("emoteArray: " + emoteArray);
      randomEmote = _.sample(emoteArray,1);
      console.log('randomEmote is: ' + randomEmote);
      mobMap[mobLongDesc] = randomEmote;
    });
    return mobMap;
  };