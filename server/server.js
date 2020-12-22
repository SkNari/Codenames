const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});
const Room = require("./codenames/room.js");  

var sockets = {};
var rooms = {};
var count = 0;

io.on('connection', serverInterface);

server.listen(8000);

//SERVER INTERFACE

function serverInterface(socket){

  sockets[socket.id]=socket;
  socket.emit('connection', "you are connected");
  socket.emit("sendRooms",rooms);
  
  socket.on('askForRooms', () => {
      
      socket.emit("sendRooms",rooms);
  
  })

  socket.on('createRoom', () => {

      var name = "room"+count;
      var newRoom = new Room(name);

      if(socket.room){
        socket.room.removePlayer(socket);
      }

      socket.room = newRoom;
      rooms[name] = newRoom;
      newRoom.addPlayer(socket,socket.id);
      count++;
      io.emit("sendRooms",rooms);

  })

  socket.on('joinRoom', room => {

    if(socket.room){
      socket.room.removePlayer(socket);
    }

    currentRoom = rooms[room];
    if(currentRoom){
      socket.room = newRoom;
      currentRoom.addPlayer(socker,socket.id);
    }

    io.emit("sendRooms",rooms);
  })

}