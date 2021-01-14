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

  if(!key || key=='null'){

    key = uniqid();
    socket.emit("newKey", key);

  }

  if(connectedUsers[key]){
    connectedUsers[key].sockets[socket.id] = socket;
  }else{
    connectedUsers[key] = {sockets:{},name:""};
    connectedUsers[key].sockets[socket.id] = socket;
  }

  socket.emit("sendRooms",rooms);

  socket.on('disconnect', () => {

    delete connectedUsers[key].sockets[socket.id];
    
    if(Object.keys(connectedUsers[key].sockets).length==0){
      delete connectedUsers[key];
    }

  })

  socket.on('joinRoom', (room,callback) => {

    let error = null;

    

    callback({joined:true},error);

  })

  socket.on('createRoom', function (data,callback) {

    let roomKey = uniqid.process();
    let name = connectedUsers[key].name + " 's room";
    var room = new Room(name,key);

    rooms[roomKey] = room;
    
    callback(roomKey);
    io.emit("sendRooms",rooms);
    
  })

  socket.on('askForRooms', (data,callback) => {

    callback(rooms);

  })

}

function warnRoom(room,action,data){

  Object.values(room.members).forEach(member => {
    sockets[member.socket].emit(action,data);
  })

}

function sendToPlayer(player,action,data){
  Object.values(player.sockets).forEach(socket => {
    socket.emit(action,data);
  })
}

