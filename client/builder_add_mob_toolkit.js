Template.addMobs.events({
    
    'submit form#addMobsForm': function(theEvent,theTemplate){
    theEvent.preventDefault();
    var mobLongDescText = theTemplate.find('#mobLongDesc').value;
    var mobShortDescText = theTemplate.find('#mobShortDesc').value;
    var mobHealthText = theTemplate.find('#mobHealth').value;
    var currentEmote = 'is here';
    var emoteOneText = theTemplate.find('#mobEmote1').value;
    var emoteTwoText = theTemplate.find('#mobEmote2').value;
    var emoteThreeText = theTemplate.find('#mobEmote3').value;
    var roomIn = Session.get('selectedRoom');
    var selectedMob = Session.get('selectedMob');
    var selectedRoom = Session.get('selectedRoom');

    if (Session.get('selectedMob') !== undefined){
        Mobs.update({_id:selectedMob},
          {$set:{
              mobLongDesc: mobLongDescText,
              mobShortDesc: mobShortDescText,
              mobHealth: mobHealthText,
              currentEmote: currentEmote,
              emoteOne: emoteOneText,
              emoteTwo: emoteTwoText,
              emoteThree: emoteThreeText,
              roomIn: roomIn
          }}
          )

   }  else {
      Mobs.insert({
              mobLongDesc: mobLongDescText,
              mobShortDesc: mobShortDescText,
              mobHealth: mobHealthText,
              currentEmote: currentEmote,
              emoteOne: emoteOneText,
              emoteTwo: emoteTwoText,
              emoteThree: emoteThreeText,
              roomIn: roomIn
      },function(err,_id){
        console.log("ID of newly created MOB: " + _id);
        var roomIn = Mobs.findOne({_id: _id}, {roomIn: 1}).roomIn;
        console.log("roomIn that the new mob is in: " + roomIn);
        Rooms.update({_id: roomIn},{$push:{'roomContents.mobs': _id}});
      });
    }
  },

  'click #deleteMob': function(){
      var selectedMob = Session.get('selectedMob');
      var roomIn = Mobs.findOne({_id: selectedMob},{roomIn: 1}).roomIn;
      Rooms.update({_id: roomIn},{$pull:{'roomContents.mobs': selectedMob}});
      console.log('Deleting Mob Id:' + Session.get('selectedMob'))
      Mobs.remove(Session.get('selectedMob'));
  }

  });



  Template.addMobs.mobLongDescPrefill = function(){
    var selectedMob = Session.get('selectedMob');
    return Mobs.findOne({_id: selectedMob}, {mobLongDesc: 1}).mobLongDesc
  };
  Template.addMobs.mobShortDescPrefill = function(){
    var selectedMob = Session.get('selectedMob');
    return Mobs.findOne({_id: selectedMob}, {mobShortDesc: 1}).mobShortDesc
  };
  Template.addMobs.mobHealthPrefill = function(){
    var selectedMob = Session.get('selectedMob');
    return Mobs.findOne({_id: selectedMob}, {mobHealth: 1}).mobHealth
  };
  Template.addMobs.mobEmoteOnePrefill = function(){
    var selectedMob = Session.get('selectedMob');
    return Mobs.findOne({_id: selectedMob}, {emoteOne: 1}).emoteOne
  };
 
  Template.addMobs.mobEmoteTwoPrefill = function(){
    var selectedMob = Session.get('selectedMob');
    return Mobs.findOne({_id: selectedMob}, {emoteTwo: 1}).emoteTwo
  };
  Template.addMobs.mobEmoteThreePrefill = function(){
    var selectedMob = Session.get('selectedMob');
    return Mobs.findOne({_id: selectedMob}, {emoteThree: 1}).emoteThree
  };
  Template.addMobs.mobSpawnToPrefill = function(){
    var selectedMob = Session.get('selectedMob');
    return Mobs.findOne({_id: selectedMob}, {roomIn: 1}).roomIn
  };



Template.mobList.events({
    'click li.mobSelect': function(){
      var mobId = this._id;
      console.log('Clicking Mob ID: ' + mobId);
      Session.set('selectedMob',mobId);
    },

  });

  Template.mobList.listMobs = function(){
    return Mobs.find().fetch();
  };

  Template.mobList.selectedMob = function(){
    var selectedMob = Session.get('selectedMob');
    var mobId = this._id;
    if (selectedMob === mobId) {
      return 'selectedMob';
    }
  }
