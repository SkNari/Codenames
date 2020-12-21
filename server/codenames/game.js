const Word = require("./word.js")

class Game{

    constructor(){

        this.words = [new Word("toto","blue"),new Word("titi","red"),new Word("tata","white"),new Word("tutu","black")];

    }


}

module.exports = Game;