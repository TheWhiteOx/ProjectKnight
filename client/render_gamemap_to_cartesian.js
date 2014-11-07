Template.roomGrid.events({

  'click input#renderGrid' : function(){

    //construct an array of objects from the Rooms collection
    var roomsArray = Rooms.find().fetch();
    console.log(roomsArray);

    //initialize a gridmap object that contains each roomID as a key and their x y coords as values
    gridMap = {};

    //A spidered room means the connected rooms have been scanned and connected rooms loaded to the gridMap
    var spideredRooms = [];

    //insert the initial room into the gridMap
    gridMap[roomsArray[0]._id] = {
      roomTitle: roomsArray[0].roomTitle,
      x: 0,
      y: 0,
    };
    console.log("gridMap with intial obj: " + _.keys(gridMap));

    //function to scan attached rooms and push them onto the gridMap obj.
    var spiderThisRoom = function(roomId){
         console.log("-------------Spidering: " + roomId + " ---------------------");
          
          var currentRoomId = roomId;
          var currentRoomObj = (function(){
                                for (var i = 0;i<roomsArray.length;i++){
                                  if (currentRoomId === roomsArray[i]._id){
                                    return roomsArray[i];
                                  };
                                };
                               })();

          var currentCoords = {x: gridMap[currentRoomId].x, y: gridMap[currentRoomId].y};
          var connectedRooms = [];

          //log all rooms connected to currentRoomObj
          console.log("N: " + currentRoomObj.connectedNorth);
          console.log("W: " + currentRoomObj.connectedWest);
          console.log("E:" + currentRoomObj.connectedEast);
          console.log("S: " + currentRoomObj.connectedSouth);
          console.log("Length of N: " +currentRoomObj.connectedNorth.length);

          if (currentRoomObj.connectedSouth.length === 17){
              gridMap[currentRoomObj.connectedSouth] = {x: currentCoords.x, y: currentCoords.y - 1};
              connectedRooms.push(currentRoomObj.connectedSouth);
              console.log("Pushing currentRoomObj.connectedSouth: " + currentRoomObj.connectedSouth);
              console.log("Checking if Gridmaps obj updated coords: x:" + gridMap[currentRoomObj.connectedSouth].x + " y:" + gridMap[currentRoomObj.connectedSouth].y )
          };

          if (currentRoomObj.connectedNorth.length === 17){//***not detecting this variable
              gridMap[currentRoomObj.connectedNorth] = {x: currentCoords.x, y: currentCoords.y + 1};
              connectedRooms.push(currentRoomObj.connectedNorth); 
              console.log("Pushing currentRoomObj.connectedNorth: " + currentRoomObj.connectedNorth);
              console.log("Checking if Gridmaps obj updated coords: x:" + gridMap[currentRoomObj.connectedNorth].x + " y:" + gridMap[currentRoomObj.connectedNorth].y )
          };

          if (currentRoomObj.connectedWest.length === 17){
              gridMap[currentRoomObj.connectedWest] = {x: currentCoords.x - 1, y: currentCoords.y};
              connectedRooms.push(currentRoomObj.connectedWest); 
              console.log("Pushing currentRoomObj.connectedWest: " + currentRoomObj.connectedWest);
              console.log("Checking if Gridmaps obj updated coords: x:" + gridMap[currentRoomObj.connectedWest].x + " y:" + gridMap[currentRoomObj.connectedWest].y )
          };

          if (currentRoomObj.connectedEast.length === 17){
              gridMap[currentRoomObj.connectedEast] = {x: currentCoords.x + 1, y: currentCoords.y};
              connectedRooms.push(currentRoomObj.connectedEast); 
              console.log("Pushing currentRoomObj.connectedEast: " + currentRoomObj.connectedEast);
              console.log("Checking if Gridmaps obj updated coords: x:" + gridMap[currentRoomObj.connectedEast].x + " y:" + gridMap[currentRoomObj.connectedEast].y )
          };
          console.log("These rooms are connected to current room: " + connectedRooms);

          //After checking all the room exits and logging connected rooms, 
          //the current roomId is pushed onto spideredRooms array
          spideredRooms.push(currentRoomId);
          console.log(spideredRooms + " have been spidered.");
          console.log('Rooms connected to this room: ' + connectedRooms);
          console.log("roomObjs that are gridded: " + _.keys(gridMap));
          
         roomsToBeSpidered = _.difference(connectedRooms,spideredRooms);
          
          //log out remaining rooms that have not been spidered that is connected
          //to current room to an array
          console.log("These rooms still need to be spidered: " + roomsToBeSpidered + " Total: " + roomsToBeSpidered.length);

          console.log("----------------End Spidering of: " + roomId + " --------------------------------------");
          //pass through each element in the roomsToBeSpidered in the spideredThisRoom func
          _.each(roomsToBeSpidered, spiderThisRoom);

        

    } //end of spiderThisRoom function


     spiderThisRoom("mfFLnAARmf3H7d79H");
    

     //log out final result of gridMaps:
     for (key in gridMap) {
      console.log(key + ":   x: " + gridMap[key].x + " y: " + gridMap[key].y);
     };


    //function that takes in gridMap objects and console logs it as an ASCII map
    var drawGridMap = function(gridMap){}
      //find out what the min x max x and min y max y
      //then find out distance of minX maxX by |X1 - X2| and |y1-y2| then 
      //find out how many needed grid points factoring in connection points and border cells for newrooms
      // Formula is ((|x1-x2|+1)  * 2)  + 3
      // Assuming: minX = -1, maxX = 1, minY = -2, maxY = 3
      // amount of columns X would be 9, amount of rows Y would be 15 

      //given columsn X would be 9 and rows Y would be 15
      //push data into two dimensional array

    var gridArray =  [];   


    
  }//end of click render grid event for Template.roomGrid.events

 });