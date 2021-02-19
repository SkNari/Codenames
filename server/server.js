const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});
const { query } = require('express');
const Room = require("./codenames/room.js");  
const uniqid = require('uniqid');

var connectedUsers = {};
var rooms = {};
var count = 0;

io.on('connection', serverInterface);

server.listen(8000);

//SERVER INTERFACE

function serverInterface(socket){
  
  var currentRoom;
  var key = socket.handshake.query.key;
  var name = socket.handshake.query.name;

  if(!key || key=='null'){

    key = uniqid();
    socket.emit("newKey", key);

  }

  if(connectedUsers[key]){
    connectedUsers[key].sockets[socket.id] = socket;
  }else{
    connectedUsers[key] = {sockets:{},name:name};
    connectedUsers[key].sockets[socket.id] = socket;
  }

  socket.emit("sendRooms",rooms);

  socket.on('disconnect', () => {

    var currentRoom = connectedUsers[key].room;

    console.log(currentRoom);

    if(currentRoom){
      currentRoom.leaveRoom(key);
      warnRoom(currentRoom,"roomUpdate",currentRoom);
    } 

    delete connectedUsers[key].sockets[socket.id];
    
    if(Object.keys(connectedUsers[key].sockets).length==0){
      delete connectedUsers[key];
    }

  })

  socket.on('joinRoom', (roomKey,callback) => {

    let error = null;

    if(!rooms[roomKey]){
      error = "room does not exist";
      callback({joined:false},error);
    }else{
      var room = rooms[roomKey];
      var user = connectedUsers[key];
      var currentRoom = user.room;

      if(currentRoom){
        currentRoom.leaveRoom(key);
      }
      user.room = room;
      room.joinRoom(key,user.name);
      callback({joined:true},error);
      warnRoom(room,"roomUpdate",room);
    }

  })

  socket.on('createRoom', function (data,callback) {

    let roomKey = uniqid.process();
    let name = connectedUsers[key].name + " 's room";
    var room = new Room(name,roomKey);

    rooms[roomKey] = room;
    
    callback(roomKey);
    io.emit("sendRooms",rooms);
    
  })

  socket.on('askForRooms', (data,callback) => {

    callback(rooms);

  })

  socket.on('leaveRoom', () => {

    var user = connectedUsers[key];
    var currentRoom = user.room;

    if(currentRoom){
      currentRoom.leaveRoom(key);
      warnRoom(currentRoom,"roomUpdate",currentRoom);
      delete user.room;
    }

  })

}

function warnRoom(room,action,data){

  Object.keys(room.members).forEach(memberKey => {
    sendToPlayer(connectedUsers[memberKey],action,data);
  })

}

function sendToPlayer(player,action,data){
  Object.values(player.sockets).forEach(socket => {
    socket.emit(action,data);
  })
}