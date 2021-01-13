const Game = require("./game.js");
const Player = require("./player.js");

class Room{

    constructor(name){

        this.name = name;
        this.members = {};
        this.players = {};
        this.game = new Game();
        this.chat = [];

    }

    async init(){
        await this.game.init();
    }

    joinMembers(key,name,socket){
        
        this.members[key] = {player: new Player(name),socket:socket};

    }

    joinPlayers(key){
        if(this.members[key]){
            this.players[key] = this.members[key];
        }
    }

    leaveRoom(key){
        delete this.members[key];
        delete this.players[key];
    }

    getRoomSecured(){ //this function returns the current state of the rooms withour leaking sensible data like user keys

        var i = 0;
        var room = new Room();
        this.members.values.forEach( val => {
            room.members[i] = val;
            i++
        })

        i=0;
        this.players.values.forEach( val => {
            room.players[i] = val;
            i++
        })

        room.name = this.name;
        room.chat = this.chat;
        room.game = this.game;

        return room;
    }

}

module.exports = Room;