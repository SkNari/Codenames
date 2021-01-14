class Player{

    constructor(name){

        this.name = name;
        this.role = "member";
        this.team = "none";

    }

    joinRed(){
        this.team = "red";
    }

    joinBlue(){
        this.team = "blue";
    }

    joinPlayers(){
        this.role = "player";
    }

    joinSpy(){
        this.role = "spy";
    }

    joinSpectators(){
        this.role = "spectators";
    }


}

module.exports = Player;