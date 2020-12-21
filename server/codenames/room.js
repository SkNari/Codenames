const Game = require("./game.js");

class Room{

    constructor(name){

        this.name = name;
        this.players = {}; 
        this.blue = {};
        this.red = {};
        this.spectators = {};
        this.inspectors = {};
        this.game = new Game();

    }

    addPlayer(socket,name){
        this.players[socket.id] = name;
    }

    removePlayer(socket){
        delete this.players[socket.id];
    }

}

module.exports = Room;