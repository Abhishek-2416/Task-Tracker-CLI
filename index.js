const { isUtf8 } = require("buffer");
const { Command } = require("commander");
const fs = require("fs");
const { type } = require("os");
const path = require("path");
const program = new Command();

program
    .name('Task Tracker CLI')
    .description('Tool one can use to track their tasks on their CLI')
    .version('0.0.1');

/*
.command is for what you will put into the CLI 
.description is slef explanatory lol
*/
program.command('list')
    .description('This is to list all the tasks on the list')
    .action(() => {
        const filePath = path.join(__dirname,"tasks.json");
        let list = fs.readFileSync(filePath,"utf8");
        console.log(list);
    });

program.command("add")
    .description("This is to add a task to your exisiting list")
    .argument('<string>', 'task to be added')
    .action((task) => {
        const filePath = path.join(__dirname,"tasks.json");

        let tasks = [];
        const tasksLength = tasks.length;
        console.log(tasksLength);
        let prevTaskId = tasks.length === 0 ? 0 : tasks[tasksLength - 1].id;
        console.log(tasksLength);
        tasks.push({
            id: prevTaskId + 1,
            title: task,
            done: false
        });
        prevTaskId += 1;
        console.log(tasks);
    });


program.parse(process.argv);
// So how we get the options for the CLI tools with lets say --help, we do that or create that using the option()