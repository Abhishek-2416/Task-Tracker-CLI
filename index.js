#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {Command} = require("commander");
const program = new Command();

// Helper functions
function loadTasks(){
    const filePath = path.join(__dirname,"tasks.json");

    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath,"[]","utf8");
        return [];
    }else{
        const data = fs.readFileSync(filePath,"utf8");

        try{
            const tasks = JSON.parse(data);
            return tasks;
        }catch{
            console.error("Encountered Error while parsing the Json file");
        }
    }
}

function saveTasks(tasks){
    
}

program
    .name("task-cli")
    .description("Simple task manager via CLI")
    .version("1.0.0");

// Add
program
    .command("add <description>")
    .description("Add a new task")
    .action((description) => {
        const tasks = loadTasks();
        console.log(tasks);
    });

// Update
program
    .command("update <id> <description>")
    .description("Update existing task")
    .action((id,description) => {
        console.log(`Updating the task ${id} to ${description}`)
    });

// Delete
program
    .command("delete <id>")
    .description("To delete specific task")
    .action((id) => {
        console.log(`Deleted task with the id: ${id}`)
    });

// Mark-in-progess
program
    .command("mark-in-progess <id>")
    .description("To set status of task in progess")
    .action((id) => {
        console.log("Marked the task in progress")
    });

// Mark-done
program
    .command("mark-done <id>")
    .description("To set status of task as done")
    .action((id) => {
        console.log("Marked the task as done")
    });

//List
const list_command = program
  .command("list [status]")
  .description("List tasks by status")
  .action((status) => {
    const valid = ["done", "todo", "in-progress"];

    if(status === undefined){
        console.log("We will display all the tasks");
    }else if(!valid.includes(status)){
        console.error(`Invalid status ${status}`);
        list_command.help();
    }
  });

program.parse(process.argv);