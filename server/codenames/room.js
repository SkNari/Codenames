const Game = require("./game.js");
const Player = require("./player.js");

class Room{

    constructor(name,key){

        this.name = name;
        this.key = key;
        this.members = {};
        this.game = new Game();
        this.chat = [];

    }

    async init(){
        await this.game.init();
    }

    joinRoom(key,name){
        
        this.members[key] = new Player(name);

    }

    leaveRoom(key){
        delete this.members[key];
    }

}

module.exports = Room;