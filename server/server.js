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

var connectedUsers = {};
var rooms = {};
var count = 0;

io.on('connection', serverInterface);

server.listen(8000);

//SERVER INTERFACE

function serverInterface(socket){
  
  var key = socket.handshake.query.key;

  if(!key || key=='null'){

    key = (new Date()).getTime();
    socket.emit("newKey", key);

  }

  if(connectedUsers[key]){
    connectedUsers[key].sockets[socket.id] = socket;
  }else{
    connectedUsers[key] = {sockets:{},name:""};
    connectedUsers[key].sockets[socket.id] = socket;
  }

}

function warnRoom(room,action,data){

  Object.values(room.members).forEach(member => {
    sockets[member.socket].emit(action,data);
  })

}