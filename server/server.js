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
        let currentRoom = socket.room;
        currentRoom.leaveGame(socket);
        warnRoom(currentRoom,"roomUpdate",currentRoom);
      }

      socket.room = newRoom;
      rooms[name] = newRoom;
      newRoom.joinGame(socket,socket.id);
      newRoom.joinSpectator(socket,socket.id);
      count++;
      socket.emit("roomCreated",newRoom);
      io.emit("sendRooms",rooms);

  })

  socket.on('joinRoom', room => {

    let currentRoom;
    if(socket.room){
      currentRoom = socket.room;
      currentRoom.leaveGame(socket);
      warnRoom(currentRoom,"roomUpdate",currentRoom);
    }

    currentRoom = rooms[room];
    if(currentRoom){
      socket.room = currentRoom;
      currentRoom.joinGame(socket,socket.id);
      currentRoom.joinSpectator(socket,socket.id);
      warnRoom(currentRoom,"roomUpdate",currentRoom);
    } 

    socket.emit("roomJoined",currentRoom);
  })

  socket.on('chat',message => {

    if(socket.room){

      let currentRoom = socket.room;
      currentRoom.chat.push(message);
      warnRoom(currentRoom,"chatUpdate",currentRoom.chat);

    }

  })

  socket.on('leaveRoom' , () => {

    if(socket.room){

      let currentRoom = socket.room;
      currentRoom.leaveGame(socket);
      socket.room = null;
      warnRoom(currentRoom,"roomUpdate",currentRoom);

    }

  })

  socket.on('disconnect', () => {

    if(socket.room){
      var currentRoom = socket.room;
      currentRoom.leaveGame(socket);
      socket.room = null;
      warnRoom(currentRoom,"roomUpdate",currentRoom);
    }

  })

}

function warnRoom(room,action,data){

  Object.keys(room.members).forEach(key => {
    sockets[key].emit(action,data);
  })

}