const commander = require("commander");
const command = process.argv[2];
const title = process.argv.slice(3).join(" ");
console.log(process.argv);
console.log(command);
console.log(title);

function checkTitle(){
    if(process.argv[3] == undefined){
        console.log("The fuck is wrong with you");
    }
}

function add() {
    console.log("Add command");
    checkTitle();
};

function list() {
    console.log("List command");
};

function done() {
    console.log("Done command");
};

function remove() {
    console.log("Delete command");
};

const commands = {add,list,done,remove};