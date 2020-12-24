const Game = require("./game.js");

class Room{

    constructor(name){

        this.name = name;
        this.members = {};
        this.players = {}; 
        this.blue = {};
        this.red = {};  
        this.spectators = {};
        this.inspectors = {};
        this.game = new Game();
        this.chat = [];

    }

    joinPlayer(socket,name){
        this.players[socket.id] = name;
        this.leaveSpectator(socket);
    }

    leavePlayer(socket){
        delete this.players[socket.id];
    }

    joinSpectator(socket,name){
        this.spectators[socket.id] = name;
        this.leavePlayer(socket);
    }
    
    leaveSpectator(socket){
        delete this.players[socket.id];
    }

    joinGame(socket,name){
        this.members[socket.id] = name;
    }

    leaveGame(socket){
        this.leaveSpectator(socket);
        this.leavePlayer(socket);
        delete this.members[socket.id];
    }

}

module.exports = Room;