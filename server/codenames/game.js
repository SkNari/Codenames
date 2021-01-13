const Word = require("./word.js");
const readline = require('readline');
const fs = require('fs');

const filename = 'rsc/words.txt';

class Game{

    constructor(){

        this.words = [];

    }

    async init(){
        
        var index;
        var wordDictionnary = [];
        var notAssigned = [];
        //color of the first team to pick
        var color = Math.random() > 1/2 ? "red" : "blue";

        var rl =readline.createInterface({
            input: fs.createReadStream(filename),
            terminal:false
        })

        for await (const line of rl){
            wordDictionnary.push(line);
        }

        for(let i = 0 ; i < 25 ; i++){

            index = Math.floor(Math.random() * wordDictionnary.length);
            let word = new Word(wordDictionnary[index],"white");
            this.words.push(word);
            notAssigned.push(word);
            wordDictionnary.splice(index,1);

        }

        //assigning black word
        index = Math.floor(Math.random() * notAssigned.length);
        notAssigned[index].color = "black";
        notAssigned.splice(index,1);

        for(let i = 0 ; i < 17 ; i++){

            index = Math.floor(Math.random() * notAssigned.length);
            notAssigned[index].color = color;
            notAssigned.splice(index,1);

            color = color=="blue"?"red":"blue";

        }

    }


}

module.exports = Game;